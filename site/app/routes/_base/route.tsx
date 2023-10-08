import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";
import { Navigation } from "./navigation";

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
