import type { HeadersFunction, LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";
import { MenuLink, Navigation } from "./navigation";
import { useState } from "react";
import clsx from "clsx";
import get_links from "./get_links.server";

type LoaderData = {
    navigation_links: MenuLink[];
};

export async function loader({ request, context }: LoaderArgs) {
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
    const get_links_op = await get_links({ token: context.ST_ACCESS_TOKEN });
    if (get_links_op.err) {
        throw get_links_op.err;
    }

    return json<LoaderData>(
        {
            navigation_links: get_links_op.ok.links,
        },

        {
            headers: {
                "Server-Timing": `get_links_op;desc="(st) Get Links";dur=${get_links_op.ok.time}`,
            },
        }
    );
}

export const headers: HeadersFunction = ({
    actionHeaders,
    loaderHeaders,
    parentHeaders,
    errorHeaders,
}) => {
    return {
        "Server-Timing": loaderHeaders.get("Server-Timing") as string,
    };
};

export default function BaseLayout() {
    const { navigation_links } = useLoaderData<typeof loader>();
    const [is_nav_open, set_is_open] = useState<boolean>(false);
    return (
        <div>
            <Navigation
                links={navigation_links}
                signal_nav_toggle={() => {
                    set_is_open(!is_nav_open);
                }}
            />
            <div>
                <main
                    className={clsx("transition-all duration-500", is_nav_open ? "scale-90" : "")}
                >
                    <Outlet />
                </main>
            </div>
            <footer>Footer</footer>
        </div>
    );
}
