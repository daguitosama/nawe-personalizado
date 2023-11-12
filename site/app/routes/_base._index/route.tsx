import type { MetaFunction, LoaderFunctionArgs, HeadersFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import type { Home_Block, ServiceCard } from "./get_home_block.server";
import { Link, useLoaderData } from "@remix-run/react";
import { FramedContent } from "~/components/FramedContent";
import { Heading } from "~/components/Heading";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";

import {
    //  useState,
    type HTMLProps,
} from "react";

type LoaderData = {
    meta: ReturnType<MetaFunction>;
    home: Home_Block;
};

export async function loader({ request, context }: LoaderFunctionArgs) {
    // temp static home block
    const s_home: Home_Block = {
        seo: {
            title: "Personaliza tu talla, tu lo pides, NAWE Personalizado lo entrega!",
            description: "",
            og_image: "",
        },
        hero_image: {
            mobile: {
                alt: "foo",
                url: "/img/00.webp",
            },
            desktop: {
                alt: "foo",
                url: "/img/00_desktop.webp",
            },
        },
        services_block: {
            title: "Servicios de Producción para el Emprendimiento y la Creación Independiente",
            service_cards: [
                {
                    id: "0",
                    image: {
                        alt: "foo",
                        url: "/img/04.webp",
                    },
                    label: "Etiquetas",
                    route: "/servicios/etiquetas",
                },
                {
                    id: "1",
                    image: {
                        alt: "foo",
                        url: "/img/12.webp",
                    },
                    label: "Empaquetado",
                    route: "/servicios/empaquetado",
                },

                {
                    id: "2",
                    image: {
                        alt: "foo",
                        url: "/img/07.webp",
                    },
                    label: "Serigrafía  ",
                    route: "/servicios/serigraia",
                },
            ],
        },
    };
    return json<LoaderData>({
        meta: context.seo_meta_tags(s_home.seo, "/"),
        home: s_home,
    });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    return data ? data.meta : [{ title: "Meta not found" }];
};

export const headers: HeadersFunction = ({
    actionHeaders,
    loaderHeaders,
    parentHeaders,
    errorHeaders,
}) => {
    return {
        "Server-Timing": [
            // loaderHeaders.get("Server-Timing") as string,
            parentHeaders.get("Server-Timing") as string,
        ].join(","),
    };
};
// 🏡
export default function Index() {
    const loaderData = useLoaderData<typeof loader>();
    return (
        <div>
            <HeroImage hero_image={loaderData.home.hero_image} />
            <FramedContent className='mt-[50px] pb-10'>
                <ServicesBlock block={loaderData.home.services_block} />
            </FramedContent>
        </div>
    );
}

function HeroImage({ hero_image }: { hero_image: Home_Block["hero_image"] }) {
    return (
        <div>
            <div className='max-w-[580px] mx-auto md:hidden'>
                <img
                    src={hero_image.mobile.url}
                    alt={hero_image.mobile.alt}
                    className='w-full h-auto '
                />
            </div>
            <div className='w-full hidden md:block'>
                <img
                    src={hero_image.desktop.url}
                    alt={hero_image.desktop.alt}
                    className='w-full h-auto '
                />
            </div>
        </div>
    );
}

function ServicesBlock({ block }: { block: Home_Block["services_block"] }) {
    return (
        <section>
            <Heading>{block.title}</Heading>
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
function ServiceBlockCard({ card, ...props }: ServiceBlockCardProps) {
    // const [mode, set_mode] = useState<'normal' | 'hover'>('')
    // function onMouseEnter() {
    //     console.log("onMouseEnter");
    // }

    // function onMouseLeave() {
    //     console.log("onMouseLeave");
    // }
    return (
        <li
            // onMouseEnter={onMouseEnter}
            // onMouseLeave={onMouseLeave}
            className='group'
        >
            {/* img */}
            <Link
                to={card.route}
                className='block mt-3 relative overflow-hidden'
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
                className=' mt-3 flex items-center gap-2'
            >
                <h2 className='font-bold'>{card.label}</h2>
                <span className='relative border'>
                    <ArrowSmallRightIcon
                        aria-hidden
                        className='w-4 h-4   left-0 group-hover:left-2 opacity-0 group-hover:opacity-100 transition-all duration-300'
                    />
                </span>
            </Link>
        </li>
    );
}
