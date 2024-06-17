import { type KyInstance } from "ky";
import { ISbRichtext } from "node_modules/@storyblok/js/dist/types";
import RichTextResolver from "storyblok-js-client/richTextResolver";
import { z } from "zod";
import { GRAPHQL_API_URL } from "../constants";
import { heroImageParser } from "./Home";
import { seoParser } from "./Seo";
import { Timer } from "./Timer";

export class Serigrafia {
    private client: KyInstance;
    constructor(client: KyInstance) {
        this.client = client;
    }

    async get(): Promise<SerigrafiaResult> {
        const timer = new Timer();
        const query = `#graphql
            {
                SerigrafiapageItem(id: "servicios/serigrafia"){
                    content{
                        seo
                        title
                        hero_image
                        notes
                    }
                }
            }
        `;

        const res = await this.client.post(GRAPHQL_API_URL, {
            body: JSON.stringify({ query }),
        });
        const data = await res.json();
        const serigrafiaBlock = serigrafiaParser.parse(data);
        return { serigrafiaBlock, delta: timer.delta() };
    }
}

const noteParser = z
    .object({
        _uid: z.string(),
        summary: z.string(),
        details: z.object({
            content: z.array(z.any()),
        }),
    })
    .transform((noteData) => {
        const content = new RichTextResolver().render(noteData.details as ISbRichtext);
        return {
            id: noteData._uid,
            title: noteData.summary,
            content,
            // content: new RichTextResolver().render(noteData.details.content[0] as ISbRichtext),
        };
    });
export type SerigrafiaNote = z.infer<typeof noteParser>;

const serigrafiaParser = z
    .object({
        data: z.object({
            SerigrafiapageItem: z.object({
                content: z.object({
                    seo: seoParser,
                    title: z.string(),
                    hero_image: heroImageParser,
                    notes: z.array(noteParser),
                }),
            }),
        }),
    })
    .transform(({ data }) => {
        return data.SerigrafiapageItem.content;
    });

export type SerigrafiaBlock = z.infer<typeof serigrafiaParser>;

export type SerigrafiaResult = {
    serigrafiaBlock: SerigrafiaBlock;
    delta: number;
};
