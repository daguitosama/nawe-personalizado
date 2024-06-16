import type { LinksFunction } from "@remix-run/cloudflare";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import global_styles from "~/global.css?url";
import font_styles from "~/fonts.css?url";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: global_styles },
    { rel: "stylesheet", href: font_styles },
];

export default function App() {
    return (
        <html lang='es'>
            <head>
                <meta charSet='utf-8' />
                <meta
                    name='viewport'
                    content='width=device-width,initial-scale=1'
                />
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
