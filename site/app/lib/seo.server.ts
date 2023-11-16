import { z } from "zod";
import { type SEO } from "./types";

/**
 * Returns the required SEO meta tags
 * `$route` shall all ways start with `/` or will throw
 * @param seo
 * @param route
 * @returns
 */
export function seo_meta_tags(seo: SEO, relative_route: string) {
    if (relative_route[0] != "/") {
        throw new Error("(seo_meta_tags) `relative_route` shall start all ways with a `/`");
    }
    return [
        { title: seo.title },
        { name: "description", content: seo.description },
        // og
        {
            property: "og:url",
            content:
                `https://nawepersonalizado.com` + // `/` is not at the end to leave that part to relative route
                relative_route,
        },
        { property: "og:title", content: seo.title },
        { property: "og:description", content: seo.description },
        { property: "og:image", content: seo.og_image },
        // tw
        { property: "twitter:card", content: "summary_large_image" },
    ];
}

export const SEO_Parser = z
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
    .transform(function to_SEO_Block(raw): SEO {
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
