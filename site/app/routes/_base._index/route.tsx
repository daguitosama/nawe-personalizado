import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import type { HeadersFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import type { HTMLProps } from "react";
import { FramedContent } from "~/components/FramedContent";
import { Heading, HeadingL2 } from "~/components/Heading";
import { HeroImage } from "~/components/HeroImage";
import type { Home_Block, ServiceCard } from "./get_home_block.server";

type LoaderData = {
    meta: ReturnType<MetaFunction>;
    home: Home_Block;
};

export async function loader({ context }: LoaderFunctionArgs) {
    const result = await context.content.home.get();

    return json<LoaderData>(
        {
            meta: context.content.seoService.getMetaTags(result.homeBlock.seo, "/"),
            home: result.homeBlock,
        },
        {
            headers: {
                "Server-Timing": `content.home.get();desc="(st) Get Home";dur=${result.delta};`,
            },
        }
    );
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    if (!data) return [];
    return data.meta;
};

export const headers: HeadersFunction = ({
    // actionHeaders,
    loaderHeaders,
    parentHeaders,
    // errorHeaders,
}) => {
    const stKey = "Server-Timing";
    const parentTiming = parentHeaders.get(stKey) || "";
    const loaderTiming = loaderHeaders.get(stKey) || "";
    const timingValues = `${parentTiming}, ${loaderTiming}`;

    return {
        "Server-Timing": timingValues,
    };
};
// 🏡
export default function Index() {
    const loaderData = useLoaderData<typeof loader>();
    return (
        <div>
            <HeroImage hero_image={loaderData.home.hero_image} />
            <FramedContent className='mt-[50px] pb-10 grid gap-16'>
                <ServicesBlock block={loaderData.home.services_block} />
                <ArticlesBlock block={loaderData.home.articles_block} />
            </FramedContent>
        </div>
    );
}

function ServicesBlock({ block }: { block: Home_Block["services_block"] }) {
    return (
        <section>
            <Heading variant='with-borders'>{block.title}</Heading>
            <ServiceBlockCards
                service_cards={block.service_cards}
                className='mt-[50px]'
            />
        </section>
    );
}

interface ServiceBlockCardsProps extends HTMLProps<HTMLDivElement> {
    service_cards: ServiceCard[];
}
function ServiceBlockCards({ service_cards, ...props }: ServiceBlockCardsProps) {
    return (
        <div {...props}>
            <ul className='grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-12 '>
                {service_cards.map((s_card) => {
                    return (
                        <ServiceBlockCard
                            key={s_card.id}
                            card={s_card}
                        />
                    );
                })}
            </ul>
        </div>
    );
}

interface ServiceBlockCardProps extends HTMLProps<HTMLDivElement> {
    card: ServiceCard;
}
function ServiceBlockCard({ card }: ServiceBlockCardProps) {
    return (
        <li className='group grid gap-3'>
            {/* img */}
            <Link
                to={card.route}
                className='block relative overflow-hidden'
            >
                <img
                    src={card.image.url}
                    alt={card.image.alt}
                    className='aspect-square group-hover:scale-105 transition-all duration-300 motion-reduce:duration-0'
                />
            </Link>

            {/* title */}
            <Link
                to={card.route}
                className=' flex items-center'
            >
                <h2 className='font-bold'>{card.label}</h2>
                <span
                    className='relative '
                    aria-hidden
                >
                    <ArrowSmallRightIcon
                        aria-hidden
                        className='w-4 h-4 relative left-0 group-hover:left-2 opacity-0 group-hover:opacity-100 transition-all duration-300'
                    />
                </span>
            </Link>
        </li>
    );
}

function ArticlesBlock({ block }: { block: Home_Block["articles_block"] }) {
    return (
        <div className='grid gap-y-12'>
            <HeadingL2>{block.title}</HeadingL2>
            <div className='group relative overflow-hidden grid gap-3 max-w-[450px] mx-auto'>
                <div className='relative w-full overflow-hidden'>
                    <img
                        src={block.card.image.url}
                        alt={block.card.image.alt}
                        className='aspect-square group-hover:scale-105 transition-all duration-300 motion-reduce:duration-0'
                    />
                </div>
                <h3 className='font-bold flex items-center'>
                    <Link
                        to={block.card.route}
                        className=''
                    >
                        {block.card.title}
                    </Link>
                    <span
                        className='relative '
                        aria-hidden
                    >
                        <ArrowSmallRightIcon
                            aria-hidden
                            className='w-4 h-4 relative left-0 group-hover:left-2 opacity-0 group-hover:opacity-100 transition-all duration-300'
                        />
                    </span>
                </h3>
            </div>
        </div>
    );
}
