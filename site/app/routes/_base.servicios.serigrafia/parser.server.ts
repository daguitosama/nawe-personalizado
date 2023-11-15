import { z } from "zod";
import type { Serigrafia_Block } from "./get_serigrafia_block";

export const Serigrafia_Block_Parser = z
    .object({})
    .transform(function to_serigrafia_block(): Serigrafia_Block {
        return {} as Serigrafia_Block; // tmp
    });
