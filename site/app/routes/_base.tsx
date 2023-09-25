import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/cloudflare";
import { Link, Outlet } from "@remix-run/react";
import { useBodyOverflow } from "~/hooks";
import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
type LoaderData = {
    p: string;
};

export async function loader({ request }: LoaderArgs) {
    return json<LoaderData>({
        p: "prop",
    });
}

export default function BaseLayout() {
    return (
        <div>
            <Navigation />
            <div>
                <main>
                    <Outlet />
                </main>
            </div>
            <footer>Footer</footer>
        </div>
    );
}

type CompoundNavigationLink = {
    id: string;
    label: string;
    links: {
        id: string;
        label: string;
        route: string;
    }[];
};

function Navigation() {
    const [is_open, set_is_open] = useState<boolean>(false);
    const { hideOverflow, showOverflow } = useBodyOverflow();
    function open_menu() {
        hideOverflow();
        set_is_open(true);
    }
    function close_menu() {
        showOverflow();
        set_is_open(false);
    }
    function onMenuButtonClick() {
        if (is_open) {
            close_menu();
        } else {
            open_menu();
        }
    }
    const compound_navigation_links: CompoundNavigationLink[] = [
        {
            id: "compound-link-0",
            label: "Servicios",
            links: [
                // suministros
                {
                    id: "id-0",
                    label: "Importación de Suministros",
                    route: "/servicios/importacion-de-suministros",
                },
                // Confección
                {
                    id: "id-1",
                    label: "Confección",
                    route: "/servicios/confeccion",
                },
                // Impresiones en Serigrafía y Sublimación
                {
                    id: "id-2",
                    label: "Impresiones en Serigrafía y Sublimación ",
                    route: "/servicios/impresiones_en_serigrafía_y_sublimacion",
                },
                // Etiquetas y Bolsas de Papel
                {
                    id: "id-3",
                    label: "Etiquetas y Bolsas de Papel",
                    route: "/servicios/etiquetas-y-bolsas-de-papel",
                },
            ],
        },

        {
            id: "compound-link-1",
            label: "Paquetes y Ofertas",
            links: [
                // suministros
                {
                    id: "id-lv-2-0",
                    label: "Alto Volumen de Producción / Eventos",
                    route: "/paquetes_y_ofertas/alto_volumen_de_producción_o_eventos",
                },
                // Confección
                {
                    id: "id-lv-2-1",
                    label: "Emprendimientos / Merchandising",
                    route: "/paquetes_y_ofertas/emprendimientos_merchandising",
                },
                // Impresiones en Serigrafía y Sublimación
                {
                    id: "id-lv-2-2",
                    label: "Proyectos Artísticos y Alternativos",
                    route: "/paquetes_y_ofertas/proyectos_artísticos_y_alternativos",
                },
                // Etiquetas y Bolsas de Papel
                {
                    id: "id-lv-2-3",
                    label: "In Situ",
                    route: "/servicios/in-situ",
                },
            ],
        },

        {
            id: "compound-link-2",
            label: "Atículos  en Oferta",
            links: [
                // suministros
                {
                    id: "id-lv-3-0",
                    label: "Importación de Suministros",
                    route: "/servicios/importacion-de-suministros",
                },
                // Confección
                {
                    id: "id-lv-3-1",
                    label: "Confección",
                    route: "/servicios/confeccion",
                },
                // Impresiones en Serigrafía y Sublimación
                {
                    id: "id-lv-3-2",
                    label: "Impresiones en Serigrafía y Sublimación ",
                    route: "/servicios/impresiones_en_serigrafía_y_sublimacion",
                },
                // Etiquetas y Bolsas de Papel
                {
                    id: "id-lv-3-3",
                    label: "Etiquetas y Bolsas de Papel",
                    route: "/servicios/etiquetas-y-bolsas-de-papel",
                },
            ],
        },

        // {
        //     id: "compound-link-3",
        //     label: "Contactos",
        //     links: [
        //         // suministros
        //         {
        //             id: "id-0",
        //             label: "Importación de Suministros",
        //             route: "/servicios/importacion-de-suministros",
        //         },
        //         // Confección
        //         {
        //             id: "id-1",
        //             label: "Confección",
        //             route: "/servicios/confeccion",
        //         },
        //         // Impresiones en Serigrafía y Sublimación
        //         {
        //             id: "id-2",
        //             label: "Impresiones en Serigrafía y Sublimación ",
        //             route: "/servicios/impresiones_en_serigrafía_y_sublimacion",
        //         },
        //         // Etiquetas y Bolsas de Papel
        //         {
        //             id: "id-3",
        //             label: "Etiquetas y Bolsas de Papel",
        //             route: "/servicios/etiquetas-y-bolsas-de-papel",
        //         },
        //     ],
        // },
    ];

    return (
        <div>
            {/* menu header */}
            <div className='px-[30px] h-[70px] max-w-screen-xl mx-auto w-full sticky top-0 left-0 z-30 flex items-center justify-between '>
                <div className='flex items-center gap-[15px]'>
                    <div className=''>
                        <Link
                            to='/'
                            className='h-full block'
                        >
                            <img
                                src='/img/nawe-logo.svg'
                                alt='NAWE Logo'
                                height={24}
                                width={113}
                            />
                        </Link>
                    </div>
                    <div className=''>
                        <Personalizado />
                    </div>
                </div>

                <MenuButton
                    is_open={is_open}
                    on_click={onMenuButtonClick}
                />
            </div>
            {/* menu items */}
            <div>
                <Menu
                    open={is_open}
                    on_close={close_menu}
                    compound_navigation_links={compound_navigation_links}
                />
            </div>
        </div>
    );
}
function Personalizado() {
    return (
        <div className='text-xss flex gap-[5px] items-center  '>
            <span>P</span>
            <span>E</span>
            <span>R</span>
            <span>S</span>
            <span>O</span>
            <span>N</span>
            <span>A</span>
            <span>L</span>
            <span>I</span>
            <span>Z</span>
            <span>A</span>
            <span>D</span>
            <span>O</span>
        </div>
    );
}

interface MenuBtnProps {
    /**
     * State
     */
    is_open: boolean;
    /**
     * Click handler
     */
    on_click: () => void;

    // /**
    //  * Classes
    //  */
    // calssName?: string;
}

/**
 * NavigationMobileMenuBtn
 */
function MenuButton({ is_open, on_click, ...props }: MenuBtnProps) {
    return (
        <button
            aria-label={is_open ? "Abrir menú de navegación" : "Cerrar menú de navegación"}
            onClick={on_click}
        >
            <span className='sr-only'>{is_open ? "Cerrar menú" : "Abrir menú"}</span>
            {is_open ? (
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-8 h-8'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6 18L18 6M6 6l12 12'
                    />
                </svg>
            ) : (
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-8 h-8'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                    />
                </svg>
            )}
        </button>
    );
}

function Menu({
    open,
    on_close,
    compound_navigation_links,
}: {
    open: boolean;
    on_close: () => void;
    compound_navigation_links: CompoundNavigationLink[];
}) {
    return (
        <Transition
            as={Fragment}
            show={open}
            enter='transform transition duration-[500ms]'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transform duration-300 transition ease-in-out'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full '
        >
            <div className='bg-white w-full h-[calc(100dvh_-_70px)] flex justify-center'>
                <div className='border border-black/0 w-full p-[30px] max-w-screen-xl mx-0'>
                    <MenuCompoundNavigationLinks compound_links={compound_navigation_links} />
                </div>
            </div>
        </Transition>
    );
}
function MenuCompoundNavigationLinks({
    compound_links,
}: {
    compound_links: CompoundNavigationLink[];
}) {
    return (
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] pb-[50px]'>
            {compound_links.map((compound_link) => (
                <li
                    key={compound_link.id}
                    className='border border-black/0'
                >
                    <MenuCompoundNavigationLink compound_link={compound_link} />
                </li>
            ))}
        </ul>
    );
}
function MenuCompoundNavigationLink({ compound_link }: { compound_link: CompoundNavigationLink }) {
    return (
        <div>
            <h2 className='font-medium text-lg py-[12px]'>{compound_link.label}</h2>
            <ul className=''>
                {compound_link.links.map((link) => (
                    <li
                        key={link.id}
                        className=' '
                    >
                        <Link
                            to={link.route}
                            className='block py-[12px] pl-[30px]'
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
