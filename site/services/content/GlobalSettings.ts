import { KyInstance } from "ky";
import z from "zod";
import { GRAPHQL_API_URL } from "../constants";
import { Timer } from "./Timer";

export type CompoundNavigationLink = {
    id: string;
    label: string;
    links: {
        id: string;
        label: string;
        route: string;
    }[];
};

export type NavigationLink = {
    id: string;
    label: string;
    route: string;
};

export type MenuLink = NavigationLink | CompoundNavigationLink;

export class GlobalSettings {
    private client: KyInstance;
    constructor(client: KyInstance) {
        this.client = client;
    }

    async get(): Promise<Global_Settings_Result> {
        const timer = new Timer();

        const query = `#graphql
            {
                GlobalsettingsItems {
                    items {
                        id
                        content {
                            navigation_links
                            business_data
                        }
                    }
                }
            }
        `;

        const res = await this.client.post(GRAPHQL_API_URL, {
            body: JSON.stringify({ query }),
        });
        const data = await res.json();
        const { links, business_data } = GlobalSettingsQueryParser.parse(data);
        return { links, business_data, delta: timer.delta() };
    }
}

type Global_Settings_Result = {
    links: MenuLink[];
    business_data: BusinessData;
    delta: number;
};

const GlobalSettingsQueryParser = z
    .object({
        data: z.object({
            GlobalsettingsItems: z.object({
                items: z.array(
                    z.object({
                        content: z.object({
                            navigation_links: z.array(
                                z.object({
                                    _uid: z.string(),
                                    label: z.string(),
                                    component: z.string(),
                                    route: z.optional(z.string()),
                                    links: z.optional(
                                        z.array(
                                            z
                                                .object({
                                                    _uid: z.string(),
                                                    label: z.string(),
                                                    route: z.string(),
                                                })
                                                .transform(({ _uid, label, route }): NavigationLink => {
                                                    return {
                                                        id: _uid,
                                                        label,
                                                        route,
                                                    };
                                                })
                                        )
                                    ),
                                })
                            ),
                            business_data: z.array(
                                z.object({
                                    _uid: z.string(),
                                    email: z.string(),
                                    phone: z.string(),
                                    address: z.string(),
                                    business_name: z.string(),
                                    instagram_link: z.string(),
                                    whatsapp_phone: z.string(),
                                })
                            ),
                        }),
                    })
                ),
            }),
        }),
    })
    .transform(function get_links_and_business_data({ data }): { links: MenuLink[]; business_data: BusinessData } {
        const links: MenuLink[] = [];

        function is_simple_link(link: { component: string }): link is { route: string } & { component: string } {
            // `.component` could also be `Link_Compound` in the other case
            // see sample payload
            return link.component == "Link";
        }

        for (let i = 0; i < data.GlobalsettingsItems.items[0].content.navigation_links.length; i++) {
            if (is_simple_link(data.GlobalsettingsItems.items[0].content.navigation_links[i])) {
                links.push({
                    id: data.GlobalsettingsItems.items[0].content.navigation_links[i]._uid,
                    label: data.GlobalsettingsItems.items[0].content.navigation_links[i].label,
                    route: data.GlobalsettingsItems.items[0].content.navigation_links[i].route as string,
                });
            } else {
                links.push({
                    id: data.GlobalsettingsItems.items[0].content.navigation_links[i]._uid,
                    label: data.GlobalsettingsItems.items[0].content.navigation_links[i].label,
                    links: data.GlobalsettingsItems.items[0].content.navigation_links[i].links as NavigationLink[],
                });
            }
        }
        const business_data: BusinessData = data.GlobalsettingsItems.items[0].content.business_data[0];

        return { links, business_data };
    });

export type BusinessData = {
    email: string;
    phone: string;
    address: string;
    business_name: string;
    instagram_link: string;
    whatsapp_phone: string;
};
