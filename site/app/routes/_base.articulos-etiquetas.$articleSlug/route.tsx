/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { HeadersFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, useLoaderData, useMatches } from "@remix-run/react";
import clsx from "clsx";
import { useState } from "react";
import { ArticleOptionColor } from "services/content/Article";
import { FramedContent } from "~/components/FramedContent";
import { Heading } from "~/components/Heading";
import { HeroImage } from "~/components/HeroImage";
import { RadioGroupCombo, RadioGroupOption } from "~/components/RadioGroup";
import { WhatsAppIcon } from "~/components/WhatsAppIcon";
import { FormField, H2, Input } from "~/components/form";
import { getMessageLink } from "~/lib.client/utils";

export async function loader({ params, context }: LoaderFunctionArgs) {
    const articleSlug = params.articleSlug || "";

    const { articleBlock, delta } = await context.content.articleService.get(articleSlug);
    if (!articleBlock) {
        return json(
            {
                meta: null,
                articleBlock,
            },
            {
                headers: {
                    status: "404",
                    statusText: "Not Found | NAWE Personalizado.",
                    "Server-Timing": `etiquetas.get;desc="(pb) Get Etiquetas";dur=${delta}`,
                },
            }
        );
    }
    return json(
        {
            meta: context.content.seoService.getMetaTags({
                seo: articleBlock.seo,
                relativeRoute: `/article-etiquetas/${articleSlug}`,
            }),
            articleBlock,
        },
        {
            headers: {
                "Server-Timing": `etiquetas.get;desc="(pb) Get Etiquetas";dur=${delta}`,
            },
        }
    );
}

export const headers: HeadersFunction = ({ loaderHeaders, parentHeaders }) => {
    const fullTimingHeader = parentHeaders.get("Server-Timing")?.concat(", ", loaderHeaders.get("Server-Timing") as string) as string;
    return {
        "Server-Timing": fullTimingHeader,
    };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    if (!data || !data.articleBlock) return [];
    return data.meta;
};

export default function ArticleRoute() {
    const { articleBlock } = useLoaderData<typeof loader>();
    if (!articleBlock) {
        return <NotFoundArticle />;
    }
    const { title, colors } = articleBlock;
    return (
        <div>
            <HeroImage heroImage={articleBlock.heroImage} />
            <FramedContent className='flex flex-col gap-20'>
                <div>
                    <Heading variant='default'>{title}</Heading>
                    <div dangerouslySetInnerHTML={{ __html: articleBlock.description }} />
                </div>
                <OrderForm
                    colorOptions={colors}
                    articleName={title}
                />
            </FramedContent>
        </div>
    );
}

function NotFoundArticle() {
    return (
        <FramedContent>
            <h1>El artículo solicitado no existe, revise el enlace e intente de nuevo.</h1>
        </FramedContent>
    );
}

function OrderForm({ colorOptions, articleName }: { colorOptions: ArticleOptionColor[]; articleName: string }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [rootMatch, baseMatch, thisMatch] = useMatches();

    // @ts-ignore
    const phone = baseMatch.data?.businessData?.whatsapp_phone || "";
    // //
    // FORM ORDER OPTIONS
    //
    // Quantity
    //
    const [quantity, setQuantity] = useState<number>(100);
    //
    const [color, setColor] = useState<string>(colorOptions[0].name);
    const clientNeedDesignServiceOptions: RadioGroupOption[] = [
        {
            id: "ds-op-1",
            label: "Si",
            value: "Si",
        },
        {
            id: "ds-op-2",
            label: "No",
            value: "No",
        },
    ];

    const [clientNeedsDesign, setClientNeedsDesign] = useState<boolean>(true);
    function updateNeedsDesign(newValue: string) {
        const hasArticle = newValue == "Si";
        setClientNeedsDesign(hasArticle);
    }
    return (
        <div className='flex flex-col gap-10'>
            <FormField>
                <H2>Cantidad</H2>
                <Input
                    type='number'
                    min={100}
                    value={quantity}
                    onChange={(evt) => setQuantity(parseInt(evt.target.value))}
                />
            </FormField>

            <FormField>
                <H2>Color</H2>
                <ul className='flex items-center justify-start gap-3'>
                    {colorOptions.map((colorOption) => {
                        return (
                            <li
                                className='block'
                                key={colorOption.id}
                            >
                                <button
                                    onClick={() => setColor(colorOption.name)}
                                    className={clsx(
                                        "p-2 rounded-xl transition-all duration-200",
                                        color == colorOption.name ? "border border-black shadow-xl" : "border border-gray-400 shadow-md "
                                    )}
                                >
                                    <div
                                        className='w-10 h-10 rounded-full '
                                        style={{ backgroundColor: `#${colorOption.colorCode}` }}
                                        aria-hidden
                                    ></div>
                                    <span className='sr-only'>{colorOption.name}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </FormField>

            <FormField>
                <H2>Asesoramiento en cuanto al diseño gráfico</H2>
                <RadioGroupCombo
                    options={clientNeedDesignServiceOptions}
                    defaultOptionValue='Si'
                    onValueChange={updateNeedsDesign}
                />
            </FormField>

            <Link
                target='_blank'
                rel='noreferrer'
                to={getMessageLink(
                    phone,
                    craftOrderMessage({
                        title: articleName,
                        color,
                        quantity,
                        clientNeedsDesign,
                    })
                )}
                data-test-id='order-link'
                className=' rounded-lg p-2 text-white bg-black flex items-center justify-center gap-4'
            >
                <WhatsAppIcon className='size-6 fill-white' /> <span className='text-xl font-medium'>Realizar Orden</span>
            </Link>
        </div>
    );
}

function craftOrderMessage({
    title,
    color,
    quantity,
    clientNeedsDesign,
}: {
    title: string;
    color: string;
    quantity: number;
    clientNeedsDesign: boolean;
}) {
    return `
    Hola necesito encargar Etiquetas: 

    - modelo: ${title}
    - cantidad: ${quantity} 
    - color: ${color}
    - necesito asesoramiento con el diseño: ${clientNeedsDesign ? "Si" : "No"}

    *vía web*
    `;
}
