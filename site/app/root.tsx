import type { LinksFunction } from "@remix-run/cloudflare";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import font_styles from "~/fonts.css?url";
import global_styles from "~/global.css?url";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: global_styles },
    { rel: "stylesheet", href: font_styles },
    {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
    },
    {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
    },
    {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
    },
    {
        rel: "manifest",
        type: "image/png",
        sizes: "16x16",
        href: "/site.webmanifest",
    },
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
            <body className='antialiased'>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
