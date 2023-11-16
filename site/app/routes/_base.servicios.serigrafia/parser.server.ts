import { z } from "zod";
import type { Note, Serigrafia_Block } from "./get_serigrafia_block";
import { SEO_Parser } from "~/lib/seo.server";
import { type ISbRichtext } from "@storyblok/js";
import { Hero_Image_Parser } from "~/lib/parsers.server";

const Note_Parser = z
    .object({
        _uid: z.string(),
        summary: z.string(),
        details: z.object({
            content: z.array(z.any()),
        }),
        component: z.string(), //  "Title",
    })
    .transform(function to_note({ _uid, summary, details }): Note {
        var _details: ISbRichtext = details as ISbRichtext;
        return {
            id: _uid,
            summary,
            details: _details,
        };
    });

export const Serigrafia_Block_Parser = z
    .object({
        data: z.object({
            SerigrafiapageItem: z.object({
                content: z.object({
                    seo: SEO_Parser,
                    hero_image: Hero_Image_Parser,
                    title: z.string(),
                    notes: z.array(Note_Parser),
                }),
            }),
        }),
    })
    .transform(function to_serigrafia_block(raw): Serigrafia_Block {
        return {
            seo: raw.data.SerigrafiapageItem.content.seo,
            hero_image: raw.data.SerigrafiapageItem.content.hero_image,
            title: raw.data.SerigrafiapageItem.content.title,
            notes: raw.data.SerigrafiapageItem.content.notes,
        } as Serigrafia_Block; // tmp
    });
