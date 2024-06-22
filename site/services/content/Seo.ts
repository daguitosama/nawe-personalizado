import { MetaFunction } from "@remix-run/cloudflare";

export type seoTagsParams = {
    title: string;
    description: string;
    socialImage: string;
};

export class SeoService {
    public getMetaTags({ seo, relativeRoute }: { seo: seoTagsParams; relativeRoute: string }): ReturnType<MetaFunction> {
        if (relativeRoute[0] != "/") {
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
                    relativeRoute,
            },
            { property: "og:title", content: seo.title },
            { property: "og:description", content: seo.description },
            { property: "og:image", content: seo.socialImage },
        ];
    }
}
