import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";
import clsx from "clsx";
import { useState } from "react";
import { Footer } from "./footer";
import { Navigation } from "./navigation";

export async function loader({ context }: LoaderFunctionArgs) {
    const globalSettingsResult = await context.content.globalSettings.get();
    return json(
        {
            navigation_links: globalSettingsResult.links,
            business_data: globalSettingsResult.business_data,
        },
        {
            headers: {
                "Server-Timing": `get_links_op;desc="(st) Get Links";dur=${0 /*globalSettingsResult.delta */}`,
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
    const { navigation_links, business_data } = useLoaderData<typeof loader>();
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
                    <Footer business_data={business_data} />
                </div>
            </div>
        </div>
    );
}
