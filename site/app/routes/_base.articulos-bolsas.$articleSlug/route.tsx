/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { HeadersFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, useLoaderData, useMatches } from "@remix-run/react";
import { useState } from "react";
import { FramedContent } from "~/components/FramedContent";
import { Heading } from "~/components/Heading";
import { HeroImage } from "~/components/HeroImage";
import { RadioGroupCombo, RadioGroupOption } from "~/components/RadioGroup";
import { WhatsAppIcon } from "~/components/WhatsAppIcon";
import { FormField, H2, Input } from "~/components/form";
import { getMessageLink } from "~/lib.client/utils";

export async function loader({ params, context }: LoaderFunctionArgs) {
    const articleSlug = params.articleSlug || "";

    const { bolsaBlock, delta } = await context.content.bolsaService.get(articleSlug);
    if (!bolsaBlock) {
        return json(
            {
                meta: null,
                bolsaBlock,
            },
            {
                headers: {
                    status: "404",
                    statusText: "Not Found | NAWE Personalizado.",
                    "Server-Timing": `bolsa.get;desc="(pb) Get Bolsa";dur=${delta}`,
                },
            }
        );
    }
    return json(
        {
            meta: context.content.seoService.getMetaTags({
                seo: bolsaBlock.seo,
                relativeRoute: `/article-bolsa/${articleSlug}`,
            }),
            bolsaBlock,
        },
        {
            headers: {
                "Server-Timing": `bolsa.get;desc="(pb) Get Bolsa";dur=${delta}`,
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
    if (!data || !data.bolsaBlock) return [];
    return data.meta;
};

export default function ArticleRoute() {
    const { bolsaBlock } = useLoaderData<typeof loader>();
    if (!bolsaBlock) {
        return <NotFoundArticle />;
    }
    const { title } = bolsaBlock;
    return (
        <div>
            <HeroImage heroImage={bolsaBlock.heroImage} />
            <FramedContent className='flex flex-col gap-20'>
                <div>
                    <Heading variant='default'>{title}</Heading>
                    <div dangerouslySetInnerHTML={{ __html: bolsaBlock.description }} />
                </div>
                <OrderForm articleName={title} />
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

function OrderForm({ articleName }: { articleName: string }) {
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
                        quantity,
                        clientNeedsDesign,
                    })
                )}
                className=' rounded-lg p-2 text-white bg-black flex items-center justify-center gap-4'
            >
                <WhatsAppIcon className='size-6 fill-white' /> <span className='text-xl font-medium'>Realizar Orden</span>
            </Link>
        </div>
    );
}

function craftOrderMessage({
    title,
    quantity,
    clientNeedsDesign,
}: {
    title: string;
    quantity: number;
    clientNeedsDesign: boolean;
}) {
    return `
    Hola necesito encargar Etiquetas: 

    - modelo: ${title}
    - cantidad: ${quantity} 
    - necesito asesoramiento con el diseño: ${clientNeedsDesign ? "Si" : "No"}

    *vía web*
    `;
}
