import type { V2_MetaFunction, LoaderArgs, HeadersFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Home_Block, ServiceCard } from "./get_home_block.server";
import { Link, useLoaderData } from "@remix-run/react";
import { Image } from "~/lib/types";
import { FramedContent } from "~/components/FramedContent";
import { Heading } from "~/components/Heading";
import { HTMLProps } from "react";

type LoaderData = {
    meta: ReturnType<V2_MetaFunction>;
    home: Home_Block;
};

export async function loader({ request, context }: LoaderArgs) {
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
                    id: "1",
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

export const meta: V2_MetaFunction = ({ data }: { data: LoaderData }) => {
    return data.meta;
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
    return (
        <li>
            {/* img */}
            <Link
                to={card.route}
                className='block mt-3 relative'
            >
                <img
                    src={card.image.url}
                    alt={card.image.alt}
                    className='aspect-square hover:scale-105 transition-all duration-300 motion-reduce:duration-0'
                />
            </Link>

            {/* title */}
            <Link
                to={card.route}
                className='block mt-3'
            >
                <h2 className='font-bold'>{card.label}</h2>
            </Link>
        </li>
    );
}
