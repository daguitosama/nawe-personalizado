import type { HeadersFunction, LoaderArgs } from "@remix-run/server-runtime";
import { type V2_MetaFunction, json } from "@remix-run/cloudflare";
import { sample_data, type Serigrafia_Block } from "./get_serigrafia_block";

type LoaderData = {
    serigrafia_block: Serigrafia_Block;
    meta: ReturnType<V2_MetaFunction>;
};

export async function loader({ context }: LoaderArgs) {
    return json<LoaderData>(
        {
            meta: context.seo_meta_tags(sample_data.seo, "/servicios/serigraia"),
            serigrafia_block: sample_data,
        },
        {
            headers: {
                "Server-Timing": `get_links_op;desc="(st) Get Links";dur=${0}`,
            },
        }
    );
}

export const meta: V2_MetaFunction = ({ data }: { data: LoaderData }) => {
    return data.meta;
};

export const headers: HeadersFunction = ({
    // actionHeaders,
    // loaderHeaders,
    parentHeaders,
    // errorHeaders,
}) => {
    return {
        "Server-Timing": [
            // loaderHeaders.get("Server-Timing") as string,
            parentHeaders.get("Server-Timing") as string,
        ].join(","),
    };
};

export default function Route() {
    return (
        <div>
            <h1>Serigrafia coming soon 🚧</h1>
        </div>
    );
}
