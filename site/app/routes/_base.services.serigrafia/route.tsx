import { ChevronDownIcon } from "@heroicons/react/24/outline";
import * as Accordion from "@radix-ui/react-accordion";
import type { HeadersFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { SerigrafiaBlock, SerigrafiaNote } from "services/content/Serigrafia";
import { FramedContent } from "~/components/FramedContent";
import { Heading } from "~/components/Heading";
import { HeroImage } from "~/components/HeroImage";

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

export const headers: HeadersFunction = ({
    // actionHeaders,
    loaderHeaders,
    parentHeaders,
    // errorHeaders,
}) => {
    const fullTimingHeader = parentHeaders
        .get("Server-Timing")
        ?.concat(", ", loaderHeaders.get("Server-Timing") as string) as string;
    return {
        "Server-Timing": fullTimingHeader, //loaderHeaders.get("Server-Timing") as string,
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
            <FramedContent>
                <Heading>{title}</Heading>
                <Notes notes={notes} />
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
                className='grid gap-6'
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

/*



{notes.map((note) => {
                    return (
                       
                        <Accordion.AccordionItem
                            value={note.id}
                            key={note.id}
                        >
                            <Accordion.AccordionTrigger>{note.title}</Accordion.AccordionTrigger>
                            <Accordion.AccordionContent>
             <div dangerouslySetInnerHTML={{ __html: note.content }}></div>{" "} 
                                </Accordion.AccordionContent>
                                </Accordion.AccordionItem>
                            );
                        })}

                        */
