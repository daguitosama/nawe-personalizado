import PocketBase from "pocketbase";
import { z } from "zod";
import { HeroImage } from "~/components/HeroImage";
import { BackendFileService } from "./BackendFileService";
import { seoTagsParams } from "./Seo";
import { Timer } from "./Timer";
const COLLECTION = "articles";
export class BolsaService {
    private client: PocketBase;
    private backendFileService: BackendFileService;
    constructor(client: PocketBase, backendFileService: BackendFileService) {
        this.client = client;
        this.backendFileService = backendFileService;
    }

    async get(articleSlug: string): Promise<{ bolsaBlock: BolsaBlock | null; delta: number }> {
        const timer = new Timer();
        const data = await this.client.collection(COLLECTION).getList(1, 1, {
            filter: `slug='${articleSlug}'`,
        });
        const rawArticle = data.items.length ? data.items[0] : null;
        if (!rawArticle || !rawArticle.id) {
            return { bolsaBlock: null, delta: timer.delta() };
        }
        const bolsaBlock = getArticleParser(this.backendFileService, rawArticle.id).parse(rawArticle);
        return { bolsaBlock, delta: timer.delta() };
    }
}

export interface BolsaBlock {
    id: string;
    heroImage: HeroImage;
    seo: seoTagsParams;
    title: string;
    description: string;
    priceUSD: number;
    slug: string;
}

const getArticleParser = (backendFileService: BackendFileService, articleId: string) =>
    z
        .object({
            collectionId: z.string(),
            collectionName: z.string(),
            created: z.string(),
            id: z.string(),
            main_image_alt_text: z.string(),
            main_image_desktop: z.string(),
            main_image_mobile: z.string(),
            meta_description: z.string(),
            meta_title: z.string(),
            option_colors: z.array(z.string()),
            price_usd: z.number(),
            slug: z.string(),
            social_image: z.string(),
            title: z.string(),
            updated: z.string(),
            description: z.string().optional(),
        })
        .transform(function rawArticleToArticleBlock(rawArticle): BolsaBlock {
            return {
                id: rawArticle.id,
                slug: rawArticle.slug,
                seo: {
                    title: rawArticle.meta_title,
                    description: rawArticle.meta_description,
                    socialImage: rawArticle.social_image,
                },
                heroImage: {
                    desktop: {
                        alt: rawArticle.main_image_alt_text,
                        url: backendFileService.getUrl(rawArticle.main_image_desktop, COLLECTION, articleId),
                    },
                    mobile: {
                        alt: rawArticle.main_image_alt_text,
                        url: backendFileService.getUrl(rawArticle.main_image_mobile, COLLECTION, articleId),
                    },
                },
                description: rawArticle.description || "",
                priceUSD: rawArticle.price_usd,
                title: rawArticle.title,
            };
        });
