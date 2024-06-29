import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, Outlet, useLoaderData, useMatches } from "@remix-run/react";
import clsx from "clsx";
import { ComponentPropsWithoutRef, useState } from "react";
import { MenuLink } from "services/content/BusinessData";
import { FramedContent } from "~/components/FramedContent";
import { getMessageLink } from "~/lib.client/utils";
import { Footer } from "./footer";
import { Navigation } from "./navigation";

export async function loader({ context }: LoaderFunctionArgs) {
    const static_navigation_links: MenuLink[] = [
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
        // {
        //     id: "2",
        //     label: "Artículos Importados y Confeccionados ",
        //     route: "/articulos-importados-y-confeccionados",
        // },
        {
            id: "3",
            label: "Contactos",
            route: "/contacto",
        },
    ];
    const { businessData, delta } = await context.content.businessData.get();
    return json(
        {
            navigation_links: static_navigation_links,
            businessData,
        },
        {
            headers: {
                "Server-Timing": `getBusinessData;desc="(pb) Get Business Data";dur=${delta}`,
            },
        }
    );
}

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
    const { navigation_links, businessData } = useLoaderData<typeof loader>();
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

                <WhatsAppCallToAction />

                <div className='mt-[60px]'>
                    <Footer business_data={businessData} />
                </div>
            </div>
        </div>
    );
}

function WhatsAppCallToAction() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [rootMatch, baseMatch, thisMatch] = useMatches();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const phone = baseMatch.data?.businessData?.whatsapp_phone || "";
    return (
        <div className='fixed w-full bottom-8 flex items-end justify-end h-0'>
            <FramedContent className='flex items-center justify-end h-0'>
                <Link
                    className='shadow-2xl -translate-y-8 bg-black rounded-full p-2 text-white flex items-center justify-between gap-2'
                    to={getMessageLink(phone, `Hola, vengo de la web, me interesa...`)}
                >
                    <WhatsAppLogo className='h-10 w-10' />
                    <span className='text-sm font-medium leading-none sr-only'>What&apos;s App</span>
                </Link>
            </FramedContent>
        </div>
    );
}

function WhatsAppLogo(props: ComponentPropsWithoutRef<"svg">) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            height={800}
            width={1200}
            viewBox='-83.77245 -140.29175 726.0279 841.7505'
            {...props}
        >
            <path
                d='M407.185 336.283c-6.948-3.478-41.108-20.284-47.477-22.606-6.368-2.318-11-3.476-15.632 3.478-4.632 6.954-17.948 22.606-22.001 27.244-4.052 4.636-8.106 5.218-15.054 1.738-6.948-3.477-29.336-10.813-55.874-34.486-20.655-18.424-34.6-41.176-38.652-48.132-4.054-6.956-.434-10.716 3.045-14.18 3.127-3.114 6.95-8.116 10.423-12.174 3.474-4.056 4.632-6.956 6.948-11.59 2.316-4.639 1.158-8.695-.58-12.172-1.736-3.478-15.632-37.679-21.422-51.592-5.64-13.547-11.368-11.712-15.633-11.927-4.048-.201-8.685-.244-13.316-.244-4.632 0-12.16 1.739-18.53 8.693-6.367 6.956-24.317 23.767-24.317 57.964 0 34.202 24.896 67.239 28.371 71.876 3.475 4.639 48.993 74.818 118.695 104.914 16.576 7.16 29.518 11.434 39.609 14.636 16.644 5.289 31.79 4.542 43.763 2.753 13.349-1.993 41.108-16.807 46.898-33.036 5.79-16.233 5.79-30.144 4.052-33.041-1.736-2.899-6.368-4.638-13.316-8.116m-126.776 173.1h-.093c-41.473-.016-82.15-11.159-117.636-32.216l-8.44-5.01-87.475 22.947 23.348-85.288-5.494-8.745c-23.136-36.798-35.356-79.328-35.338-123 .051-127.431 103.734-231.106 231.22-231.106 61.734.022 119.763 24.094 163.402 67.782 43.636 43.685 67.653 101.754 67.629 163.51-.052 127.442-103.733 231.126-231.123 231.126M477.113 81.55C424.613 28.989 354.795.03 280.407 0 127.136 0 2.392 124.736 2.33 278.053c-.02 49.011 12.784 96.847 37.118 139.019L0 561.167l147.41-38.668c40.617 22.153 86.346 33.83 132.886 33.845h.115c153.254 0 278.009-124.748 278.072-278.068.028-74.301-28.87-144.165-81.37-196.725'
                fill='#fff'
                fillRule='evenodd'
            />
        </svg>
    );
}
