import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import type { HTMLProps } from "react";
import { seoTagsParams } from "services/content/Seo";
import { FramedContent } from "~/components/FramedContent";
import { Heading, HeadingL2 } from "~/components/Heading";
import { HeroImage } from "~/components/HeroImage";

export type Image = {
    url: string;
    alt: string;
};
/* Services Block */
type ServicesBlock = {
    title: string;
    serviceCards: ServiceCard[];
};
export type ServiceCard = {
    id: string;
    label: string;
    route: string;
    image: Image;
};
/* End of Services Block */

/* Articles Block */
type ArticlesBlock = {
    title: string;
    card: {
        route: string;
        title: string;
        image: Image;
    };
};

export type HomeBlock = {
    seo: seoTagsParams;
    heroImage: {
        mobile: Image;
        desktop: Image;
    };
    servicesBlock: ServicesBlock;
    articlesBlock: ArticlesBlock;
};

type LoaderData = {
    meta: ReturnType<MetaFunction>;
    home: HomeBlock;
};

export async function loader({ context }: LoaderFunctionArgs) {
    const homeBlock: HomeBlock = {
        seo: {
            title: "Servicios de Producción para el Emprendimiento y la Creación Independiente en Cuba | NAWE Estudio",
            description: "",
            socialImage: "",
        },
        heroImage: {
            desktop: {
                alt: "NAWE Estudio",
                url: "/img/home/nawe-personalizado-desktop.webp",
            },
            mobile: {
                alt: "NAWE Estudio",
                url: "/img/home/nawe-personalizado-mobile.webp",
            },
        },
        servicesBlock: {
            title: "Servicios de Producción para el Emprendimiento y la Creación Independiente",
            serviceCards: [
                {
                    id: "sc-0",
                    image: { alt: "Etiquetas NAWE", url: "/img/home/etiquetas-nawe-personalizado.webp" },
                    label: "Etiquetas",
                    route: "/servicios/etiquetas",
                },
                {
                    id: "sc-1",
                    image: {
                        alt: "Serigrafia en bolsa NAWE",
                        url: "/img/home/bolsa-de-lienzo-personalizada-con-serigrafia.webp",
                    },
                    label: "Serigrafía",
                    route: "/servicios/serigrafia",
                },
                {
                    id: "sc-2",
                    image: { alt: "Bolsas de Papel Kraft personalizadas NAWE", url: "/img/home/bolsas-de-papel-kraft.webp" },
                    label: "Empaquetado",
                    route: "/servicios/empaquetado",
                },
            ],
        },
        articlesBlock: {
            title: "Artículos",
            card: {
                route: "/articles",
                title: "Artículos importados y confeccionados",
                image: { alt: "Conjunto de artículos NAWE", url: "/img/home/articles-nawe-personalizado.webp" },
            },
        },
    };

    return json<LoaderData>({
        meta: context.content.seoService.getMetaTags({
            seo: homeBlock.seo,
            relativeRoute: "/",
        }),
        home: homeBlock,
    });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    if (!data || !data.meta) return [];
    return data.meta;
};

// 🏡
export default function Index() {
    const loaderData = useLoaderData<typeof loader>();
    return (
        <div>
            <HeroImage heroImage={loaderData.home.heroImage} />
            <FramedContent className='mt-[50px] pb-10 grid gap-16'>
                <ServicesBlock block={loaderData.home.servicesBlock} />
                {/* <ArticlesBlock block={loaderData.home.articlesBlock} /> */}
            </FramedContent>
        </div>
    );
}

function ServicesBlock({ block }: { block: HomeBlock["servicesBlock"] }) {
    return (
        <section>
            <Heading variant='with-borders'>{block.title}</Heading>
            <ServiceBlockCards
                service_cards={block.serviceCards}
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

function ArticlesBlock({ block }: { block: HomeBlock["articlesBlock"] }) {
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
