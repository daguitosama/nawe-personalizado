/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { HeadersFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { ArticleCard, ArticlesGroup } from "services/content/Etiquetas";
import { FramedContent } from "~/components/FramedContent";
import { Heading, HeadingL2 } from "~/components/Heading";

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
            {/* <HeroImage heroImage={etiquetasBlock.heroImage} /> */}
            <FramedContent className='flex flex-col gap-20'>
                <div>
                    <Heading variant='fluid'>{etiquetasBlock.title}</Heading>
                    <div dangerouslySetInnerHTML={{ __html: etiquetasBlock.bodyCopy }} />
                </div>
                {/* <OrderForm /> */}
                <ArticleGroups articleGroups={etiquetasBlock.articlesGroups} />
            </FramedContent>
        </div>
    );
}

function ArticleGroups({ articleGroups }: { articleGroups: ArticlesGroup[] }) {
    return (
        <div className='grid gap-10'>
            {articleGroups.map((articleGroup) => {
                return (
                    <ArticlesGroupSection
                        articlesGroup={articleGroup}
                        key={articleGroup.id}
                    />
                );
            })}
        </div>
    );
}

function ArticlesGroupSection({ articlesGroup }: { articlesGroup: ArticlesGroup }) {
    const { title, articleCards } = articlesGroup;
    return (
        <div className=''>
            <HeadingL2 variant='fluid'>{title}</HeadingL2>
            <ul className='grid grid-cols-2 gap-4 md:grid-cols-3'>
                {articleCards.map((articleCard) => {
                    return (
                        <ArticleCardSection
                            key={articleCard.id}
                            articleCard={articleCard}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

function ArticleCardSection({ articleCard }: { articleCard: ArticleCard }) {
    const { title, colors, image, imageAltText, slug, priceUSD } = articleCard;
    return (
        <li className='h-full '>
            <Link
                to={`/articulos/${slug}`}
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
                    <div className='flex items-center justify-start gap-1 '>
                        {colors.map((color) => {
                            return (
                                <div
                                    style={{ backgroundColor: `#${color.colorCode}` }}
                                    className='w-4 h-4 rounded-full'
                                    key={color.id}
                                >
                                    <span className='sr-only'>{color.name}</span>
                                </div>
                            );
                        })}
                    </div>

                    <span className='text-xs md:text-sm text-slate-700'>$ {priceUSD} USD</span>
                </div>
            </Link>
        </li>
    );
}
