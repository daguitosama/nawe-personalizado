// import accordionPkg from "@radix-ui/react-accordion";
import type { HeadersFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { SerigrafiaBlock } from "services/content/Serigrafia";
import { FramedContent } from "~/components/FramedContent";
import { Heading } from "~/components/Heading";
import { HeroImage } from "~/components/HeroImage";
// const Accordion = accordionPkg;
import * as Accordion from "@radix-ui/react-accordion";

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
            <Accordion.Root type='multiple'>
                {notes.map((note) => {
                    return (
                        <Accordion.AccordionItem
                            value={note.id}
                            key={note.id}
                        >
                            <Accordion.AccordionTrigger>{note.title}</Accordion.AccordionTrigger>
                            <Accordion.AccordionContent>
                                <div dangerouslySetInnerHTML={{ __html: note.content }} />
                                id:{note.id}
                            </Accordion.AccordionContent>
                        </Accordion.AccordionItem>
                    );
                })}
            </Accordion.Root>
        </div>
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
