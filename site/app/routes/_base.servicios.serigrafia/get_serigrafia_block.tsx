import { new_timer } from "~/lib/misc.server";
import type { SEO, Image } from "~/lib/types";
import { Serigrafia_Block_Parser } from "./parser.server";
import { type ISbRichtext } from "@storyblok/js";

export type Note = {
    id: string;
    summary: string;
    details: ISbRichtext;
};
export type Serigrafia_Block = {
    seo: SEO;
    title: string;
    hero_image: {
        mobile: Image;
        desktop: Image;
    };
    notes: Note[];
};

export const sample_data: Serigrafia_Block = {
    seo: { description: "", og_image: "", title: "" },
    hero_image: {
        desktop: { alt: "", url: "" },
        mobile: { alt: "", url: "" },
    },
    title: "Foo",
    notes: [
        {
            id: "0",
            summary: "Note",
            details: {
                type: "paragraph",
                content: [
                    {
                        text: "Es la técnica de impresión que permite transferir un diseño mediante el uso de tinta y una malla.",
                        type: "text",
                        marks: [
                            {
                                type: "textStyle",
                                attrs: {
                                    color: "",
                                },
                            },
                        ],
                    },
                    {
                        type: "hard_break",
                        marks: [
                            {
                                type: "textStyle",
                                attrs: {
                                    color: "",
                                },
                            },
                        ],
                    },
                    {
                        type: "hard_break",
                        marks: [
                            {
                                type: "textStyle",
                                attrs: {
                                    color: "",
                                },
                            },
                        ],
                    },
                    {
                        text: "Conlleva un fuerte componente artesanal. Es la más económica, rápida y efectiva. Ideal para encargos de grandes cantidades. ",
                        type: "text",
                        marks: [
                            {
                                type: "textStyle",
                                attrs: {
                                    color: "",
                                },
                            },
                        ],
                    },
                    {
                        type: "hard_break",
                        marks: [
                            {
                                type: "textStyle",
                                attrs: {
                                    color: "",
                                },
                            },
                        ],
                    },
                    {
                        type: "hard_break",
                        marks: [
                            {
                                type: "textStyle",
                                attrs: {
                                    color: "",
                                },
                            },
                        ],
                    },
                    {
                        text: "Presenta un acabado llamativo y nítido con colores intensos. ",
                        type: "text",
                        marks: [
                            {
                                type: "textStyle",
                                attrs: {
                                    color: "",
                                },
                            },
                        ],
                    },
                    {
                        type: "hard_break",
                        marks: [
                            {
                                type: "textStyle",
                                attrs: {
                                    color: "",
                                },
                            },
                        ],
                    },
                ],
            },
        },
    ],
};

type Get_Serigrafia_Block_Operation_Success = {
    ok: { serigrafia_block: Serigrafia_Block; time: number };
    err: null;
};
type Get_Serigrafia_Block_Operation_Error = {
    ok: null;
    err: Error;
};
type Get_Serigrafia_Block_Operation_Result =
    | Get_Serigrafia_Block_Operation_Success
    | Get_Serigrafia_Block_Operation_Error;

export async function get_serigrafia_block({
    token,
}: {
    token: string;
}): Promise<Get_Serigrafia_Block_Operation_Result> {
    // global-settings
    var _g_api_url = `https://gapi-us.storyblok.com/v1/api`;
    const timer = new_timer();

    var query = `#graphql
        {
            SerigrafiapageItem(id:"/servicios/serigrafia"){
                content{
                    seo
                    hero_image
                    title
                    notes
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
        const serigrafia_block = Serigrafia_Block_Parser.parse(data);
        return { ok: { serigrafia_block, time: timer.delta() }, err: null };
    } catch (error) {
        console.error(error);
        return { ok: null, err: error instanceof Error ? error : new Error("Unknown Error") };
    }
}
