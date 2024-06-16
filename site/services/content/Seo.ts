import { MetaFunction } from "@remix-run/cloudflare";
import { z } from "zod";

export type SEO = {
    title: string;
    description: string;
    og_image: string;
};

export const seoParser = z
    .array(
        z.object({
            _uid: z.string(),
            title: z.string(),
            description: z.string(),
            social_image: z.object({
                filename: z.string(),
            }),
        })
    )
    .transform(function toSeoBlock(raw): SEO {
        const result: SEO = {
            title: "not found",
            description: "not found",
            og_image: "not found",
        };
        if (!raw.length) {
            return result;
        }
        result.title = raw[0].title;
        result.description = raw[0].description;
        result.og_image = raw[0].social_image.filename;
        return result;
    });
export class SeoService {
    public getMetaTags(seoBlock: SEO, relativeRoute: string): ReturnType<MetaFunction> {
        if (relativeRoute[0] != "/") {
            throw new Error("(seo_meta_tags) `relative_route` shall start all ways with a `/`");
        }
        return [
            { title: seoBlock.title },
            { name: "description", content: seoBlock.description },
            // og
            {
                property: "og:url",
                content:
                    `https://nawepersonalizado.com` + // `/` is not at the end to leave that part to relative route
                    relativeRoute,
            },
            { property: "og:title", content: seoBlock.title },
            { property: "og:description", content: seoBlock.description },
            { property: "og:image", content: seoBlock.og_image },
            // tw
            { property: "twitter:card", content: "summary_large_image" },
        ];
    }
}
