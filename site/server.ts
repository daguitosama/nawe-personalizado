import { logDevReady } from "@remix-run/cloudflare";
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";
import { seo_meta_tags } from "~/lib/seo.server";

if (process.env.NODE_ENV === "development") {
    logDevReady(build);
}

export interface Env {
    ST_ACCESS_TOKEN: string;
}
declare module "@remix-run/server-runtime" {
    interface AppLoadContext extends Env {
        seo_meta_tags: typeof seo_meta_tags;
    }
}

export const onRequest = createPagesFunctionHandler({
    build,
    getLoadContext: (context) => {
        return {
            seo_meta_tags,
            ST_ACCESS_TOKEN: context.env.ST_ACCESS_TOKEN,
        };
    },
    mode: process.env.NODE_ENV,
});
