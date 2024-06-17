import { KyInstance } from "ky";
import { Image } from "services/types";
import z from "zod";
import { GRAPHQL_API_URL } from "../constants";
import { SEO, seoParser } from "./Seo";
import { Timer } from "./Timer";

export class Home {
    private client: KyInstance;
    constructor(client: KyInstance) {
        this.client = client;
    }

    public async get(): Promise<Get_Home_Block_Result> {
        const timer = new Timer();
        const query = `#graphql
        {
            PageItem(id: "home") {
                content {
                seo
                body
                }
            }
        }
    `;

        const res = await this.client.post(GRAPHQL_API_URL, {
            body: JSON.stringify({ query }),
        });
        const data = await res.json();
        const homeBlock = Home_Block_Parser.parse(data);
        return { homeBlock, delta: timer.delta() };
    }
}

type ServicesBlock = {
    title: string;
    service_cards: ServiceCard[];
};
export type ServiceCard = {
    id: string;
    label: string;
    route: string;
    image: Image;
};
/* End of Services Block */

/* Articles Block */
type ArticlesBlock = {
    title: string;
    card: {
        route: string;
        title: string;
        image: Image;
    };
};

/* End of Articles Block */
export type HeroImage = {
    mobile: Image;
    desktop: Image;
};
export type Home_Block = {
    seo: SEO;
    hero_image: HeroImage;
    services_block: ServicesBlock;
    articles_block: ArticlesBlock;
    // packs: Home_Packs_Section_Block;
};

type Get_Home_Block_Result = {
    homeBlock: Home_Block;
    delta: number;
};

export const heroImageParser = z
    .array(
        z.object({
            mobile: z
                .object({
                    alt: z.string(),
                    filename: z.string(),
                })
                .transform(function to_Image({ alt, filename }): Image {
                    return {
                        alt,
                        url: filename,
                    };
                }),
            desktop: z
                .object({
                    alt: z.string(),
                    filename: z.string(),
                })
                .transform(function to_Image({ alt, filename }): Image {
                    return {
                        alt,
                        url: filename,
                    };
                }),
        })
    )
    .transform(function to_hero_image(raw): Home_Block["hero_image"] {
        const r: Home_Block["hero_image"] = {
            desktop: { alt: "not found", url: "not found" },
            mobile: { alt: "not found", url: "not found" },
        };

        if (!raw.length) {
            return r;
        }
        r.desktop = raw[0].desktop;
        r.mobile = raw[0].mobile;
        return r;
    });
const Articles_Parser = z
    .array(
        z.object({
            title: z.string(),
            card: z.array(
                z.object({
                    title: z.string(),
                    route: z.string(),
                    image: z
                        .object({
                            alt: z.string(),
                            filename: z.string(),
                        })
                        .transform(function to_Image({ alt, filename }): Image {
                            return {
                                alt,
                                url: filename,
                            };
                        }),
                })
            ),
        })
    )
    .transform(function to_Articles_Block(raw): ArticlesBlock {
        const r: ArticlesBlock = {
            title: "",
            card: {
                route: "",
                title: "",
                image: {
                    alt: "not found",
                    url: "",
                },
            },
        };
        if (!raw) {
            return r;
        }
        r.title = raw[0].title;
        r.card = raw[0].card[0];
        return r;
    });

const Services_Parser = z
    .array(
        z.object({
            title: z.string(),
            service_cards: z
                .array(
                    z.object({
                        _uid: z.string(),
                        label: z.string(),
                        route: z.string(),
                        image: z
                            .object({
                                alt: z.string(),
                                filename: z.string(),
                            })
                            .transform(function to_Image({ alt, filename }): Image {
                                return {
                                    alt,
                                    url: filename,
                                };
                            }),
                    })
                )
                .transform(function to_service_cards(raw): ServiceCard[] {
                    return raw.map((raw_card) => {
                        return {
                            id: raw_card._uid,
                            image: raw_card.image,
                            label: raw_card.label,
                            route: raw_card.route,
                        };
                    });
                }),
        })
    )
    .transform(function to_services(raw): ServicesBlock {
        const r: ServicesBlock = {
            title: "",
            service_cards: [],
        };
        if (!raw) {
            return r;
        }

        r.title = raw[0].title;
        r.service_cards = raw[0].service_cards;
        return r;
    });

export const Home_Block_Parser = z
    .object({
        data: z.object({
            PageItem: z.object({
                content: z.object({
                    seo: seoParser,
                    body: z.array(
                        z.object({
                            hero_image: heroImageParser,
                            articles_block: Articles_Parser,
                            services_block: Services_Parser,
                        })
                    ),
                }),
            }),
        }),
    })
    .transform(function home_payload_to_home_block(raw): Home_Block {
        return {
            seo: raw.data.PageItem.content.seo,
            hero_image: raw.data.PageItem.content.body[0].hero_image,
            articles_block: raw.data.PageItem.content.body[0].articles_block,
            services_block: raw.data.PageItem.content.body[0].services_block,
        };
    });
