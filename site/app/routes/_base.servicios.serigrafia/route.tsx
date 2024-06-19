/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import * as Accordion from "@radix-ui/react-accordion";
import * as Toggle from "@radix-ui/react-toggle";
import type { HeadersFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, useLoaderData, useMatches } from "@remix-run/react";
import clsx from "clsx";
import { ComponentPropsWithoutRef, useState } from "react";
import { SerigrafiaBlock, SerigrafiaNote } from "services/content/Serigrafia";
import { FramedContent } from "~/components/FramedContent";
import { Heading } from "~/components/Heading";
import { HeroImage } from "~/components/HeroImage";
import { RadioGroupCombo, RadioGroupOption } from "~/components/RadioGroup";
import { WhatsAppIcon } from "~/components/WhatsAppIcon";

export async function loader({ context }: LoaderFunctionArgs) {
    const { serigrafiaBlock, delta } = await context.content.serigrafia.get();
    return json(
        {
            meta: context.content.seoService.getMetaTags(serigrafiaBlock.seo, "/servicios/serigrafia"),
            serigrafiaBlock,
        },
        {
            headers: {
                "Server-Timing": `serigrafia.get;desc="(st) Get Serigrafia";dur=${delta}`,
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
    const {
        serigrafiaBlock: { hero_image, notes, title },
    } = useLoaderData<typeof loader>();
    return (
        <div className=''>
            <HeroImage hero_image={hero_image} />
            <FramedContent className='flex flex-col gap-20'>
                <div>
                    <Heading variant='fluid'>{title}</Heading>
                    <Notes notes={notes} />
                </div>
                <OrderForm />
            </FramedContent>
        </div>
    );
}

function Notes({ notes }: { notes: SerigrafiaBlock["notes"][0][] }) {
    // const defaultAccordionValue = notes[0].id;
    return (
        <div>
            <Accordion.Root
                type='single'
                className='grid gap-8 md:gap-10'
            >
                {notes.map((note) => {
                    return (
                        <Note
                            note={note}
                            key={note.id}
                        />
                    );
                })}
            </Accordion.Root>
        </div>
    );
}

function Note({ note }: { note: SerigrafiaNote }) {
    return (
        <Accordion.AccordionItem
            value={note.id}
            className='group'
        >
            <Accordion.Header>
                <Accordion.AccordionTrigger className=' w-full flex items-center justify-between'>
                    <h3 className='font-bold text-lg'>{note.title}</h3>
                    <ChevronDownIcon
                        className='size-5 group-data-[state=open]:rotate-180 transition-transform duration-300'
                        aria-hidden
                    />
                </Accordion.AccordionTrigger>
            </Accordion.Header>
            <Accordion.AccordionContent className='mt-2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden '>
                <div
                    className=''
                    dangerouslySetInnerHTML={{ __html: note.content }}
                />
            </Accordion.AccordionContent>
        </Accordion.AccordionItem>
    );
}

function OrderForm() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [rootMatch, baseMatch, serviciosMatch, thisMatch] = useMatches();
    // @ts-ignore
    const phone = baseMatch.data?.business_data?.whatsapp_phone || "";
    // const wLink = getMessageLink(phone, order);
    // //
    // FORM ORDER OPTIONS
    //
    // Has article option
    //
    const [clientHasArticle, setClientHasArticle] = useState<boolean>(true);
    const clientHasArticleOptions: RadioGroupOption[] = [
        {
            id: "hart-0",
            value: "Si",
            label: "Sí. Lo tengo, sólo necesito personalizar el producto",
        },
        {
            id: "hart-1",
            value: "No",
            label: "No. Necesito que ustedes me suministren",
        },
    ];
    function updateHasArticle(newValue: string) {
        const hasArticle = newValue == "Si";
        setClientHasArticle(hasArticle);
    }
    //
    // prenda
    const [prenda, setPrenda] = useState("");
    //
    // numberOfArticles
    const [numberOfArticles, setNumberOfArticles] = useState(20);
    //
    // location1
    const [location1, setLocation1] = useState("");
    const [location2, setLocation2] = useState("");
    //
    const [location1Size, setLocation1Size] = useState("");
    const [location2Size, setLocation2Size] = useState("");
    //
    const [location1NumberOfColors, setLocation1NumberOfColors] = useState(1);
    const [location2NumberOfColors, setLocation2NumberOfColors] = useState(1);
    //
    const [location2Enabled, setLocation2Enabled] = useState(false);
    //
    return (
        <div className='flex flex-col gap-10'>
            <FormField>
                <H2>Articulo a personalizar</H2>
                <RadioGroupCombo
                    options={clientHasArticleOptions}
                    defaultOptionValue='Si'
                    onValueChange={updateHasArticle}
                />
            </FormField>

            <FormField>
                <H2>Prenda o soporte</H2>
                <div>
                    <Input
                        type='text'
                        value={prenda}
                        placeholder='Ej: T-Shirt'
                        onChange={(evt) => setPrenda(evt.target.value)}
                    />
                    <p className='mt-2 text-sm'>Solo manejamos superficies de papel y textiles. </p>
                </div>
            </FormField>

            <FormField>
                <H2>Cantidad Total</H2>
                <Input
                    type='number'
                    min={20}
                    defaultValue={20}
                    value={numberOfArticles}
                    onChange={(evt) => setNumberOfArticles(parseInt(evt.target.value))}
                />
            </FormField>

            <H2 className='text-xl pt-5'>Diseño a imprimir</H2>
            {/* location 1 */}
            <FormField>
                <H3>Locación 1</H3>
                <Input
                    type='text'
                    defaultValue={20}
                    value={location1}
                    placeholder='Ej: por delante'
                    onChange={(evt) => setLocation1(evt.target.value)}
                />
            </FormField>

            <FormField>
                <H3>Tamaño aproximado (cm)</H3>
                <Input
                    type='text'
                    value={location1Size}
                    placeholder='Ej: 20 x 30'
                    onChange={(evt) => setLocation1Size(evt.target.value)}
                />
            </FormField>

            <FormField>
                <H3>No. de colores de la imagen a imprimir</H3>
                <div>
                    <Input
                        type='number'
                        min={1}
                        max={4}
                        value={location1NumberOfColors}
                        onChange={(evt) => setLocation1NumberOfColors(parseInt(evt.target.value))}
                    />
                    <p className='mt-2 text-sm'>Máximo 4 colores. </p>
                </div>
            </FormField>

            <Toggle.Root
                onPressedChange={(newValue) => setLocation2Enabled(newValue)}
                className='hover:bg-slate-100 rounded-lg p-2 border border-black data-[state=on]:bg-black data-[state=on]:text-white  flex  items-center justify-center bg-white text-base focus:shadow-black'
            >
                + Otra Locación
            </Toggle.Root>
            {/* location 2 */}
            {location2Enabled && (
                <div className='flex flex-col gap-10'>
                    <FormField>
                        <H3>Locación 2</H3>
                        <Input
                            type='text'
                            defaultValue={20}
                            value={location2}
                            placeholder='Ej: por delante'
                            onChange={(evt) => setLocation2(evt.target.value)}
                        />
                    </FormField>

                    <FormField>
                        <H3>Tamaño aproximado (cm)</H3>
                        <Input
                            type='text'
                            value={location2Size}
                            placeholder='Ej: 20 x 30'
                            onChange={(evt) => setLocation2Size(evt.target.value)}
                        />
                    </FormField>

                    <FormField>
                        <H3>No. de colores de la imagen a imprimir</H3>
                        <div>
                            <Input
                                type='number'
                                min={1}
                                max={4}
                                value={location2NumberOfColors}
                                onChange={(evt) => setLocation2NumberOfColors(parseInt(evt.target.value))}
                            />
                            <p className='mt-2 text-sm'>Máximo 4 colores. </p>
                        </div>
                    </FormField>
                </div>
            )}

            <Link
                target='_blank'
                rel='noreferrer'
                to={getMessageLink(
                    phone,
                    craftOrderMessage({
                        clientHasArticle,
                        prenda,
                        numberOfArticles,
                        location1,
                        location2,
                        location1Size,
                        location2Size,
                        location1NumberOfColors,
                        location2NumberOfColors,
                        location2Enabled,
                    })
                )}
                className=' rounded-lg p-2 text-white bg-black flex items-center justify-center gap-4'
            >
                <WhatsAppIcon className='size-6 fill-white' /> <span className='text-xl font-medium'>Realizar Orden</span>
            </Link>

            {/* debug */}
            {false && (
                <div className='fixed w-full bottom-0 left-0 z-20 p-[30px] bg-slate-200 rounded-t-2xl'>
                    <pre>
                        <code className='text-sm'>
                            {JSON.stringify(
                                {
                                    clientHasArticle,
                                    numberOfArticles,
                                    prenda,
                                    location1,
                                    location1Size,
                                    location1NumberOfColors,
                                    location2Enabled,
                                    location2,
                                    location2Size,
                                    location2NumberOfColors,
                                },
                                null,
                                2
                            )}
                        </code>
                    </pre>
                </div>
            )}
        </div>
    );
}

function H2({ children, className, ...props }: ComponentPropsWithoutRef<"h2">) {
    return (
        <h2
            className={clsx("font-bold text-lg", className)}
            {...props}
        >
            {children}
        </h2>
    );
}

function H3({ children, className, ...props }: ComponentPropsWithoutRef<"h2">) {
    return (
        <h3
            className={clsx("font-bold text-lg", className)}
            {...props}
        >
            {children}
        </h3>
    );
}

function Input({ className, type, ...props }: ComponentPropsWithoutRef<"input">) {
    return (
        <input
            type={type || "text"}
            {...props}
            className={clsx("border border-black rounded-lg p-2 w-full", className)}
        />
    );
}

function FormField({ children, className }: ComponentPropsWithoutRef<"div">) {
    return <div className={clsx("grid gap-4", className)}>{children}</div>;
}

function getMessageLink(phoneNumber: string, message: string) {
    return `https://api.whatsapp.com/send/?phone=${encodeURIComponent(phoneNumber)}&text=${encodeURIComponent(
        message
    )}&type=phone_number&app_absent=0`;
}

function craftOrderMessage({
    clientHasArticle,
    prenda,
    numberOfArticles,
    location1,
    location2,
    location1Size,
    location2Size,
    location1NumberOfColors,
    location2NumberOfColors,
    location2Enabled,
}: {
    clientHasArticle: boolean;
    prenda: string;
    numberOfArticles: number;
    location1: string;
    location2: string;
    location1Size: string;
    location2Size: string;
    location1NumberOfColors: number;
    location2NumberOfColors: number;
    location2Enabled: boolean;
}): string {
    if (!location2Enabled) {
        return `
    Hola necesito el servicio de Serigrafía para:

    - prenda: ${prenda}
    - la tengo: ${clientHasArticle ? "Si" : "No"}
    - cantidad: ${numberOfArticles} 
    - locación: ${location1}
    - tamaño: ${location1Size}
    - numero de colores: ${location1NumberOfColors}

    *vía web*
    `;
    } else {
        return `
    Hola necesito el servicio de Serigrafía para:

    - prenda: ${prenda}
    - la tengo: ${clientHasArticle ? "Si" : "No"}
    - cantidad: ${numberOfArticles}

    Locación 1:
    - locación: ${location1}
    - tamaño: ${location1Size}
    - numero de colores: ${location1NumberOfColors}

    Locación 2:
    - locación: ${location2}
    - tamaño: ${location2Size}
    - numero de colores: ${location2NumberOfColors}

    *vía web*
    `;
    }
}
