import { type AppLoadContext } from "@remix-run/cloudflare";
import { type PlatformProxy } from "wrangler";
import { Content } from "./services/content";

// When using `wrangler.toml` to configure bindings,
// `wrangler types` will generate types for those bindings
// into the global `Env` interface.
// Need this empty interface so that typechecking passes
// even if no `wrangler.toml` exists.
export interface Env {
    ST_ACCESS_TOKEN: string;
    BACKEND_API_URL: string;
}

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
    interface AppLoadContext {
        cloudflare: Cloudflare;
        content: Content; // augmented
    }
}

type GetLoadContext = (args: {
    request: Request;
    context: { cloudflare: Cloudflare }; // load context _before_ augmentation
}) => AppLoadContext;

// Shared implementation compatible with Vite, Wrangler, and Cloudflare Pages
export const getLoadContext: GetLoadContext = ({ context }) => {
    return {
        ...context,
        content: new Content(context.cloudflare.env),
    };
};
