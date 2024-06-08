import { type ServerBuild, logDevReady } from "@remix-run/cloudflare";
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";
import z from "zod";

if (process.env.NODE_ENV === "development") {
    logDevReady(build as ServerBuild);
}
const env_schema = z.object({
    COOKIE_SECRET: z.array(z.string()),
    ST_ACCESS_TOKEN: z.string(),
    DB_URL: z.string(),
});

declare global {
    var DB_URL: string;
    var ST_ACCESS_TOKEN: string;
    var COOKIE_SECRET: string[];
}

export const onRequest = createPagesFunctionHandler({
    build: build as ServerBuild,
    getLoadContext: (context) => {
        // make sure we have all the env vars we need
        env_schema.parse({
            COOKIE_SECRET: context.env.COOKIE_SECRET,
            DB_URL: context.env.DB_URL,
            ST_ACCESS_TOKEN: context.env.ST_ACCESS_TOKEN,
        });
        /* 
        This global `Keys` vars would be used by: 
          - db
          - storyblok content
          - auth`
        modules for configuration of the env vars!
        */
        globalThis.DB_URL = context.env.DB_URL;
        globalThis.ST_ACCESS_TOKEN = context.env.ST_ACCESS_TOKEN;
        globalThis.COOKIE_SECRET = context.env.COOKIE_SECRET;
        /**
         This way, there is no need to drill env vars all the way down.
         */

        return {};
    },
    mode: process.env.NODE_ENV,
});
