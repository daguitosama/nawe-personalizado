import PocketBase from "pocketbase";
import { z } from "zod";
import { HeroImage } from "~/components/HeroImage";
import { BackendFileService } from "./BackendFileService";
import { seoTagsParams } from "./Seo";
import { Timer } from "./Timer";
const COLLECTION = "services";
const RECORD_ID = "s22a2afbu05hc5t";

export interface BolsasCard {
    id: string;
    image: string;
    imageAltText: string;
    title: string;
    priceUSD: number;
    slug: string;
}
export interface BolsasGroup {
    id: string;
    articleCards: BolsasCard[];
}

export interface BolsasBlock {
    seo: seoTagsParams;
    title: string;
    heroImage: HeroImage;
    bodyCopy: string;
    bolsasGroup: BolsasGroup[];
}

export class BolsasService {
    private client: PocketBase;
    private backendFileService: BackendFileService;
    constructor(client: PocketBase, backendFileService: BackendFileService) {
        this.client = client;
        this.backendFileService = backendFileService;
    }

    async get(): Promise<{ bolsasBlock: BolsasBlock; delta: number }> {
        const timer = new Timer();
        const data = await this.client.collection(COLLECTION).getOne(RECORD_ID, {
            expand: "article_group_grid.article_groups.articles",
        });
        const bolsasBlock = getEtiquetasParser(this.backendFileService).parse(data);
        return { bolsasBlock, delta: timer.delta() };
    }
}

export const getEtiquetasParser = (backendFileService: BackendFileService) =>
    z
        .object({
            article_group_grid: z.string(),
            body_copy: z.string(),
            created: z.string(),
            details: z.array(z.unknown()),
            expand: z.object({
                article_group_grid: z.object({
                    article_groups: z.array(z.string()),
                    collectionId: z.string(),
                    collectionName: z.string(),
                    created: z.string(),
                    expand: z.object({
                        article_groups: z.array(
                            z.object({
                                articles: z.array(z.string()),
                                collectionId: z.string(),
                                collectionName: z.string(),
                                created: z.string(),
                                expand: z.object({
                                    articles: z.array(
                                        z.object({
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
                                        })
                                    ),
                                }),
                                for_page: z.string(),
                                id: z.string(),
                                title: z.string(),
                                updated: z.string(),
                            })
                        ),
                    }),
                    for_page: z.string(),
                    id: z.string(),
                    updated: z.string(),
                }),
            }),
            id: z.string(),
            main_image_alt_text: z.string(),
            main_image_desktop: z.string(),
            main_image_mobile: z.string(),
            meta_description: z.string(),
            meta_title: z.string(),
            slug: z.string(),
            social_image: z.string(),
            title: z.string(),
            updated: z.string(),
        })
        .transform(function toEtiquetasBlock(rawData): BolsasBlock {
            const bolsasGroup: BolsasGroup[] = rawData.expand.article_group_grid.expand.article_groups.map(function toBolsasGroup(
                rawArticleGroup
            ): BolsasGroup {
                return {
                    id: rawArticleGroup.id,
                    articleCards: rawArticleGroup.expand.articles.map(function toArticleCard(rawArticle): BolsasCard {
                        return {
                            id: rawArticle.id,
                            image: backendFileService.getUrl(rawArticle.main_image_mobile, "articles", rawArticle.id),
                            imageAltText: rawArticle.main_image_alt_text,
                            priceUSD: rawArticle.price_usd,
                            title: rawArticle.title,
                            slug: rawArticle.slug,
                        };
                    }),
                };
            });
            return {
                seo: {
                    title: rawData.meta_title,
                    description: rawData.meta_description,
                    socialImage: backendFileService.getUrl(rawData.social_image, COLLECTION, RECORD_ID),
                },
                title: rawData.title,
                heroImage: {
                    desktop: {
                        alt: rawData.main_image_alt_text,
                        url: backendFileService.getUrl(rawData.main_image_desktop, COLLECTION, RECORD_ID),
                    },
                    mobile: {
                        alt: rawData.main_image_alt_text,
                        url: backendFileService.getUrl(rawData.main_image_mobile, COLLECTION, RECORD_ID),
                    },
                },
                bodyCopy: rawData.body_copy,
                bolsasGroup,
            };
        });
