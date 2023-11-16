import type { HeadersFunction, LoaderArgs } from "@remix-run/server-runtime";
import { type V2_MetaFunction, json } from "@remix-run/cloudflare";
import { get_serigrafia_block, type Serigrafia_Block } from "./get_serigrafia_block";
import { useLoaderData } from "@remix-run/react";

type LoaderData = {
    serigrafia_block: Serigrafia_Block;
    meta: ReturnType<V2_MetaFunction>;
};

export async function loader({ context }: LoaderArgs) {
    const get_serigrafia_op = await get_serigrafia_block({ token: context.ST_ACCESS_TOKEN });

    if (get_serigrafia_op.err) {
        throw get_serigrafia_op.err;
    }

    return json<LoaderData>(
        {
            meta: context.seo_meta_tags(
                get_serigrafia_op.ok.serigrafia_block.seo,
                "/servicios/serigraia"
            ),
            serigrafia_block: get_serigrafia_op.ok.serigrafia_block,
        },
        {
            headers: {
                "Server-Timing": `get_serigrafia_op;desc="(st) Get Serigrafia";dur=${get_serigrafia_op.ok.time}`,
            },
        }
    );
}

export const meta: V2_MetaFunction = ({ data }: { data: LoaderData }) => {
    return data.meta;
};

export const headers: HeadersFunction = ({
    // actionHeaders,
    loaderHeaders,
    parentHeaders,
    // errorHeaders,
}) => {
    return {
        "Server-Timing": [
            loaderHeaders.get("Server-Timing") as string,
            parentHeaders.get("Server-Timing") as string,
        ].join(","),
    };
};

export default function Route() {
    const { serigrafia_block } = useLoaderData<typeof loader>();
    return (
        <div className='px-4'>
            <h1>Serigrafia coming soon 🚧</h1>
            <div className='w-full overflow-scroll p-4 rounded-xl bg-gray-200 '>
                <pre className='text-sm'>
                    <code>{JSON.stringify(serigrafia_block, null, 2)}</code>
                </pre>
            </div>
        </div>
    );
}
