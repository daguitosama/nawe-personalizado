import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";
import { MenuLink, Navigation } from "./navigation";
import { useState } from "react";
import clsx from "clsx";

type LoaderData = {
    p: string;
};

export async function loader({ request }: LoaderArgs) {
    return json<LoaderData>({
        p: "prop",
    });
}

export default function BaseLayout() {
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

    const [is_nav_open, set_is_open] = useState<boolean>(false);
    return (
        <div>
            <Navigation
                links={_sample_compound_navigation_links}
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
