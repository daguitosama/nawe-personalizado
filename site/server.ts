import { type ServerBuild, logDevReady } from "@remix-run/cloudflare";
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";
import { init_env } from "~/lib/env.server";

if (process.env.NODE_ENV === "development") {
    logDevReady(build as ServerBuild);
}

// declare module "@remix-run/server-runtime" {
//     interface AppLoadContext {}
// }
export const onRequest = createPagesFunctionHandler({
    build: build as ServerBuild,
    getLoadContext: (context) => {
        init_env({
            COOKIE_SECRET: context.env.COOKIE_SECRET,
            ST_ACCESS_TOKEN: context.env.ST_ACCESS_TOKEN,
        });

        return {};
    },
    mode: process.env.NODE_ENV,
});
