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
export type Env = z.infer<typeof env_schema>;

declare module "@remix-run/server-runtime" {
    interface AppLoadContext extends Env {}
}
declare global {
    var DB_URL: string;
}
type Context = EventContext<Env, string, unknown>;
//
export const onRequest = createPagesFunctionHandler({
    build: build as ServerBuild,
    getLoadContext: (context: Context) => {
        /* 
        This global `DB_URL` var would be used by the `db` module's connection instantiation.
        This way, there is no need to drill the env var all the way down. 
        */
        globalThis.DB_URL = context.env.DB_URL;

        return {
            COOKIE_SECRET: context.env.COOKIE_SECRET,
            ST_ACCESS_TOKEN: context.env.ST_ACCESS_TOKEN,
            DB_URL: context.env.DB_URL,
        };
    },
    mode: process.env.NODE_ENV,
});
