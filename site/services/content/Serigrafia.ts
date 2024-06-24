import PocketBase from "pocketbase";
import { Detail } from "services/types";
import { z } from "zod";
import { HeroImage } from "~/components/HeroImage";
import { BackendFileService } from "./BackendFileService";
import { seoTagsParams } from "./Seo";
import { Timer } from "./Timer";
const COLLECTION = "services";
const RECORD_ID = "679lydk8ay1wy20";
export class Serigrafia {
    private client: PocketBase;
    private backendFileService: BackendFileService;
    constructor(client: PocketBase, backendFileService: BackendFileService) {
        this.client = client;
        this.backendFileService = backendFileService;
    }

    async get(): Promise<SerigrafiaResult> {
        const timer = new Timer();

        const data = await this.client.collection(COLLECTION).getOne<SerigrafiaBlock>(RECORD_ID, {
            expand: "details",
        });
        // console.log(JSON.stringify(data, null, 2));
        const serigrafiaBlock = getSerigrafiaPageParser(this.backendFileService).parse(data);
        return { serigrafiaBlock, delta: timer.delta() };
    }
}

const noteParser = z.object({
    id: z.string(),
    summary: z.string(),
    details: z.string(),
});
export type SerigrafiaNote = z.infer<typeof noteParser>;

export type SerigrafiaBlock = {
    seo: seoTagsParams;
    title: string;
    heroImage: HeroImage;
    details: Detail[];
};

export const detailParser = z.object({
    id: z.string(),
    summary: z.string(),
    content: z.string(),
});
const getSerigrafiaPageParser = (backendFileService: BackendFileService) =>
    z
        .object({
            main_image_desktop: z.string(),
            main_image_mobile: z.string(),
            meta_description: z.string(),
            meta_title: z.string(),
            slug: z.string(),
            social_image: z.string(),
            title: z.string(),
            main_image_alt_text: z.string(),
            expand: z.object({
                details: z.array(detailParser),
            }),
        })
        .transform(function toSerigrafiaBlock(rawData): SerigrafiaBlock {
            return {
                seo: {
                    title: rawData.meta_title,
                    description: rawData.meta_description,
                    socialImage: backendFileService.getUrl(rawData.social_image, COLLECTION, RECORD_ID),
                },
                heroImage: {
                    desktop: {
                        url: backendFileService.getUrl(rawData.main_image_desktop, COLLECTION, RECORD_ID),
                        alt: rawData.main_image_alt_text,
                    },
                    mobile: {
                        url: backendFileService.getUrl(rawData.main_image_mobile, COLLECTION, RECORD_ID),
                        alt: rawData.main_image_alt_text,
                    },
                },
                title: rawData.title,
                details: rawData.expand.details,
            };
        });

export type SerigrafiaResult = {
    serigrafiaBlock: SerigrafiaBlock;
    delta: number;
};
