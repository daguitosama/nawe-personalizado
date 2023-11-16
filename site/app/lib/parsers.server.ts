import { type Home_Block } from "~/routes/_base._index/get_home_block.server";
import { type Image } from "./types";
import { z } from "zod";

export const Hero_Image_Parser = z
    .array(
        z.object({
            mobile: z
                .object({
                    alt: z.string(),
                    filename: z.string(),
                })
                .transform(function to_Image({ alt, filename }): Image {
                    return {
                        alt,
                        url: filename,
                    };
                }),
            desktop: z
                .object({
                    alt: z.string(),
                    filename: z.string(),
                })
                .transform(function to_Image({ alt, filename }): Image {
                    return {
                        alt,
                        url: filename,
                    };
                }),
        })
    )
    .transform(function to_hero_image(raw): Home_Block["hero_image"] {
        const r: Home_Block["hero_image"] = {
            desktop: { alt: "not found", url: "not found" },
            mobile: { alt: "not found", url: "not found" },
        };

        if (!raw.length) {
            return r;
        }
        r.desktop = raw[0].desktop;
        r.mobile = raw[0].mobile;
        return r;
    });
