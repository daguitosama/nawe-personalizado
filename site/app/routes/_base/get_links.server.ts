import { new_timer } from "~/lib/misc.server";
import type { MenuLink, NavigationLink } from "./navigation";
import z from "zod";

const _query_response_sample = {
    data: {
        GlobalsettingsItems: {
            items: [
                {
                    id: 528208,
                    content: {
                        navigation_links: [
                            {
                                _uid: "eb420f0f-082d-4439-bb95-ef37fe292348",
                                label: "Artículos Importados y Confeccionados",
                                route: "/articulos-importados-y-confeccionados",
                                component: "Link",
                                _editable:
                                    '<!--#storyblok#{"name": "Link", "space": "1016508", "uid": "eb420f0f-082d-4439-bb95-ef37fe292348", "id": "528208"}-->',
                            },
                            {
                                _uid: "32945a70-ee26-44de-aca3-c7fb1acacb61",
                                label: "Servicios",
                                links: [
                                    {
                                        _uid: "de417e17-3cb0-4fc7-8cad-acdb3cc72f7e",
                                        label: "Serigrafía",
                                        route: "/servicios/serigrafia",
                                        component: "Link",
                                        _editable:
                                            '<!--#storyblok#{"name": "Link", "space": "1016508", "uid": "de417e17-3cb0-4fc7-8cad-acdb3cc72f7e", "id": "528208"}-->',
                                    },
                                ],
                                component: "Link_Compound",
                                _editable:
                                    '<!--#storyblok#{"name": "Link_Compound", "space": "1016508", "uid": "32945a70-ee26-44de-aca3-c7fb1acacb61", "id": "528208"}-->',
                            },
                            {
                                _uid: "eb420f0f-082d-4439-bb95-ef37fe292348",
                                label: "Artículos Importados y Confeccionados",
                                route: "/articulos-importados-y-confeccionados",
                                component: "Link",
                                _editable:
                                    '<!--#storyblok#{"name": "Link", "space": "1016508", "uid": "eb420f0f-082d-4439-bb95-ef37fe292348", "id": "528208"}-->',
                            },
                        ],
                    },
                },
            ],
        },
    },
};

const MenuLinksQueryParser = z
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
                                                .transform(
                                                    ({ _uid, label, route }): NavigationLink => {
                                                        return {
                                                            id: _uid,
                                                            label,
                                                            route,
                                                        };
                                                    }
                                                )
                                        )
                                    ),
                                })
                            ),
                        }),
                    })
                ),
            }),
        }),
    })
    .transform(function from_valid_query_to_menu_links({ data }): MenuLink[] {
        const links: MenuLink[] = [];

        function is_simple_link(link: {
            component: string;
        }): link is { route: string } & { component: string } {
            // `.component` could also be `Link_Compound` in the other case
            // see sample payload
            return link.component == "Link";
        }

        for (
            let i = 0;
            i < data.GlobalsettingsItems.items[0].content.navigation_links.length;
            i++
        ) {
            if (is_simple_link(data.GlobalsettingsItems.items[0].content.navigation_links[i])) {
                links.push({
                    id: data.GlobalsettingsItems.items[0].content.navigation_links[i]._uid,
                    label: data.GlobalsettingsItems.items[0].content.navigation_links[i].label,
                    route: data.GlobalsettingsItems.items[0].content.navigation_links[i]
                        .route as string,
                });
            } else {
                links.push({
                    id: data.GlobalsettingsItems.items[0].content.navigation_links[i]._uid,
                    label: data.GlobalsettingsItems.items[0].content.navigation_links[i].label,
                    links: data.GlobalsettingsItems.items[0].content.navigation_links[i]
                        .links as NavigationLink[],
                });
            }
        }
        return links;
    });

type Get_Navigation_Links_Operation_Success = {
    ok: { links: MenuLink[]; time: number };
    err: null;
};
type Get_Navigation_Links_Operation_Error = {
    ok: null;
    err: Error;
};
type Get_Navigation_Links_Operation_Result =
    | Get_Navigation_Links_Operation_Success
    | Get_Navigation_Links_Operation_Error;

export default async function get_links({
    token,
}: {
    token: string;
}): Promise<Get_Navigation_Links_Operation_Result> {
    // global-settings
    var _g_api_url = `https://gapi-us.storyblok.com/v1/api`;
    const timer = new_timer();
    const query = `#graphql
    {
        GlobalsettingsItems {
            items {
                id
                content {
                    navigation_links
                }
            }
        }
    }

    `;

    try {
        const res = await fetch(_g_api_url, {
            method: "POST",
            body: JSON.stringify({ query }),
            headers: {
                "Content-Type": "application/json",
                Token: token,
            },
        });

        if (!res.ok) {
            throw new Error(`API Error: Content API responded with ${res.status}`);
        }
        const data = await res.json();
        const links = MenuLinksQueryParser.parse(data);
        return { ok: { links, time: timer.delta() }, err: null };
    } catch (error) {
        console.error(error);
        return { ok: null, err: error instanceof Error ? error : new Error("Unknown Error") };
    }
}
