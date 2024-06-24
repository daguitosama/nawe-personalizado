/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { HeadersFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { FramedContent } from "~/components/FramedContent";
import { Heading } from "~/components/Heading";
import { HeroImage } from "~/components/HeroImage";

export async function loader({ context }: LoaderFunctionArgs) {
    const { delta, etiquetasBlock } = await context.content.etiquetasService.get();
    return json(
        {
            meta: context.content.seoService.getMetaTags({
                seo: etiquetasBlock.seo,
                relativeRoute: "/servicios/serigrafia",
            }),
            etiquetasBlock,
        },
        {
            headers: {
                "Server-Timing": `etiquetas.get;desc="(pb) Get Etiquetas";dur=${delta}`,
            },
        }
    );
}

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
    const fullTimingHeader = parentHeaders
        .get("Server-Timing")
        ?.concat(", ", loaderHeaders.get("Server-Timing") as string) as string;
    return {
        "Server-Timing": fullTimingHeader,
    };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    if (!data) return [];
    return data.meta;
};

export default function Serigrafia() {
    const { etiquetasBlock } = useLoaderData<typeof loader>();
    return (
        <div className=''>
            <HeroImage heroImage={etiquetasBlock.heroImage} />
            <FramedContent className='flex flex-col gap-20'>
                <div>
                    <Heading variant='fluid'>{etiquetasBlock.title}</Heading>
                    <div dangerouslySetInnerHTML={{ __html: etiquetasBlock.bodyCopy }} />
                </div>
                {/* <OrderForm /> */}
            </FramedContent>
        </div>
    );
}
