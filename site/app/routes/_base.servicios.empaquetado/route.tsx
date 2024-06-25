/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { HeadersFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { BolsasCard, BolsasGroup } from "services/content/Empaquetado";
import { FramedContent } from "~/components/FramedContent";
import { Heading } from "~/components/Heading";
import { HeroImage } from "~/components/HeroImage";
// import { BolsasCard, BolsasGroup } from "~/services/content/Empaquetado";

export async function loader({ context }: LoaderFunctionArgs) {
    const { delta, bolsasBlock } = await context.content.bolsasService.get();
    return json(
        {
            meta: context.content.seoService.getMetaTags({
                seo: bolsasBlock.seo,
                relativeRoute: "/servicios/empaquetado",
            }),
            bolsasBlock,
        },
        {
            headers: {
                "Server-Timing": `empaquetado.get;desc="(pb) Get Empaquetado";dur=${delta}`,
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

export default function Etiquetas() {
    const { bolsasBlock } = useLoaderData<typeof loader>();
    return (
        <div className=''>
            <HeroImage heroImage={bolsasBlock.heroImage} />
            <FramedContent className='flex flex-col gap-20'>
                <div>
                    <Heading variant='fluid'>{bolsasBlock.title}</Heading>
                    <div dangerouslySetInnerHTML={{ __html: bolsasBlock.bodyCopy }} />
                </div>
                <BolsasGroups bolsasGroups={bolsasBlock.bolsasGroup} />
            </FramedContent>
        </div>
    );
}

function BolsasGroups({ bolsasGroups: articleGroups }: { bolsasGroups: BolsasGroup[] }) {
    return (
        <div className='grid gap-10'>
            {articleGroups.map((articleGroup) => {
                return (
                    <BolsasGroupSection
                        bolsasGroup={articleGroup}
                        key={articleGroup.id}
                    />
                );
            })}
        </div>
    );
}

function BolsasGroupSection({ bolsasGroup }: { bolsasGroup: BolsasGroup }) {
    const { articleCards } = bolsasGroup;
    return (
        <div className=''>
            <ul className='grid grid-cols-2 gap-4 md:grid-cols-3'>
                {articleCards.map((articleCard) => {
                    return (
                        <BolsaCardSection
                            key={articleCard.id}
                            articleCard={articleCard}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

function BolsaCardSection({ articleCard }: { articleCard: BolsasCard }) {
    const { title, image, imageAltText, slug, priceUSD } = articleCard;
    return (
        <li className='h-full '>
            <Link
                to={`/articulos-bolsas/${slug}`}
                className='flex flex-col h-full'
            >
                <div className='relative w-full h-[160px] md:h-[240px] shrink-0'>
                    <img
                        src={image}
                        alt={imageAltText}
                        className='absolute inset-0 w-full h-full object-cover '
                    />
                </div>
                <div className='flex flex-col gap-2 py-3 h-full'>
                    <h3 className='text-sm md:text-lg font-medium line-clamp-2'>{title}</h3>

                    <span className='text-xs md:text-sm text-slate-700'>$ {priceUSD} USD</span>
                </div>
            </Link>
        </li>
    );
}
