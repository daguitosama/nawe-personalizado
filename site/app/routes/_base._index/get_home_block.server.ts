import type { Image, SEO } from "~/lib/types";
import z from "zod";
import { new_timer } from "~/lib/misc.server";
import { SEO_Parser } from "~/lib/seo.server";
import { Hero_Image_Parser } from "~/lib/parsers.server";
import env from "~/lib/env.server";
/* Services Block */
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

export type Home_Block = {
    seo: SEO;
    hero_image: {
        mobile: Image;
        desktop: Image;
    };
    services_block: ServicesBlock;
    articles_block: ArticlesBlock;
    // packs: Home_Packs_Section_Block;
};

/* Paquetes y Ofertas for later */
// type Home_Pack_Block = {
//     id: string;
//     image: Image;
//     label: string;
//     route: string;
// };

// type Home_Packs_Section_Block = {
//     title: string;
//     packs: Home_Pack_Block[];
// };

// type Home_Offers_Section_Block = {
//     title: string;
//     links: { label: string; route: string }[];
// };
/* End of Paquetes y Ofertas */

// temp queries

/* Home
{
  PageItem(id: "home") {
    content {
      seo
      body
    }
  }
}


*/

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
        var r: ArticlesBlock = {
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
                    seo: SEO_Parser,
                    body: z.array(
                        z.object({
                            hero_image: Hero_Image_Parser,
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

type Get_Home_Block_Operation_Success = {
    ok: { home: Home_Block; time: number };
    err: null;
};
type Get_Home_Block_Operation_Error = {
    ok: null;
    err: Error;
};
type Get_Home_Block_Operation_Result =
    | Get_Home_Block_Operation_Success
    | Get_Home_Block_Operation_Error;

export async function get_home_block(): Promise<Get_Home_Block_Operation_Result> {
    // global-settings
    var _g_api_url = `https://gapi-us.storyblok.com/v1/api`;
    const timer = new_timer();
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

    try {
        const res = await fetch(_g_api_url, {
            method: "POST",
            body: JSON.stringify({ query }),
            headers: {
                "Content-Type": "application/json",
                Token: env().ST_ACCESS_TOKEN,
            },
        });

        if (!res.ok) {
            throw new Error(`API Error: Content API responded with ${res.status}`);
        }
        const data = await res.json();
        const home = Home_Block_Parser.parse(data);
        return { ok: { home, time: timer.delta() }, err: null };
    } catch (error) {
        console.error(error);
        return { ok: null, err: error instanceof Error ? error : new Error("Unknown Error") };
    }
}
