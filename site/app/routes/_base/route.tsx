import type { HeadersFunction, LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";
import { type MenuLink, Navigation } from "./navigation";
import { useState } from "react";
import clsx from "clsx";
import { Footer } from "./footer";

type LoaderData = {
    navigation_links: MenuLink[];
};

export const loader: LoaderFunction = async ({ context }) => {
    const _sample_compound_navigation_links: MenuLink[] = [
        {
            id: "compound-link-0",
            label: "Servicios",
            links: [
                // suministros
                {
                    id: "id-0",
                    label: "Serigrafía ",
                    route: "/servicios/serigrafia",
                },
                // Confección
                {
                    id: "id-1",
                    label: "Etiquetas",
                    route: "/servicios/etiquetas",
                },
                // Impresiones en Serigrafía y Sublimación
                {
                    id: "id-2",
                    label: "Empaquetado",
                    route: "/servicios/empaquetado",
                },
            ],
        },
        {
            id: "2",
            label: "Artículos Importados y Confeccionados ",
            route: "/articulos-importados-y-confeccionados",
        },
        {
            id: "3",
            label: "Contactos",
            route: "/contacto",
        },
    ];
    // const globalSettingsResult = await context.content.globalSettings.get();
    console.log({ context });

    return json<LoaderData>(
        {
            navigation_links: _sample_compound_navigation_links, //globalSettingsResult.links,
        },

        {
            headers: {
                "Server-Timing": `get_links_op;desc="(st) Get Links";dur=${0 /*globalSettingsResult.delta */}`,
            },
        }
    );
};

export const headers: HeadersFunction = ({
    // actionHeaders,
    loaderHeaders,
    // parentHeaders,
    // errorHeaders,
}) => {
    return {
        "Server-Timing": loaderHeaders.get("Server-Timing") as string,
    };
};

export default function BaseLayout() {
    const { navigation_links } = useLoaderData<typeof loader>();
    const [is_nav_open, set_is_open] = useState<boolean>(false);
    return (
        <div className='antialiased'>
            <Navigation
                links={navigation_links}
                signal_nav_toggle={() => {
                    set_is_open(!is_nav_open);
                }}
            />
            <div className={clsx("transition-all duration-500 ", is_nav_open ? "motion-safe:scale-90 " : "")}>
                <main className='pt-[70px]'>
                    <Outlet />
                </main>
                <div className='mt-[60px]'>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
