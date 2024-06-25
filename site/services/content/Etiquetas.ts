import PocketBase from "pocketbase";
import { z } from "zod";
import { HeroImage } from "~/components/HeroImage";
import { BackendFileService } from "./BackendFileService";
import { seoTagsParams } from "./Seo";
import { Timer } from "./Timer";
const COLLECTION = "services";
const RECORD_ID = "h5i7v8wn33imat7";
interface ArticleOptionColor {
    id: string;
    name: string;
    colorCode: string;
}

export interface ArticleCard {
    id: string;
    image: string;
    imageAltText: string;
    title: string;
    priceUSD: number;
    colors: ArticleOptionColor[];
    slug: string;
}
export interface ArticlesGroup {
    id: string;
    title: string;
    articleCards: ArticleCard[];
}

export interface EtiquetasBlock {
    seo: seoTagsParams;
    title: string;
    heroImage: HeroImage;
    bodyCopy: string;
    articlesGroups: ArticlesGroup[];
}

export class EtiquetasService {
    private client: PocketBase;
    private backendFileService: BackendFileService;
    constructor(client: PocketBase, backendFileService: BackendFileService) {
        this.client = client;
        this.backendFileService = backendFileService;
    }

    async get(): Promise<{ etiquetasBlock: EtiquetasBlock; delta: number }> {
        const timer = new Timer();
        const data = await this.client.collection(COLLECTION).getOne(RECORD_ID, {
            expand: "article_group_grid.article_groups.articles.option_colors",
        });
        const etiquetasBlock = getEtiquetasParser(this.backendFileService).parse(data);
        return { etiquetasBlock, delta: timer.delta() };
    }
}

export const getEtiquetasParser = (backendFileService: BackendFileService) =>
    z
        .object({
            article_group_grid: z.string(),
            body_copy: z.string(),
            collectionId: z.string(),
            collectionName: z.string(),
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
                                            expand: z.object({
                                                option_colors: z.array(
                                                    z.object({
                                                        collectionId: z.string(),
                                                        collectionName: z.string(),
                                                        color_code: z.string(),
                                                        created: z.string(),
                                                        id: z.string(),
                                                        name: z.string(),
                                                        updated: z.string(),
                                                    })
                                                ),
                                            }),
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
        .transform(function toEtiquetasBlock(rawData): EtiquetasBlock {
            const articlesGroups: ArticlesGroup[] = rawData.expand.article_group_grid.expand.article_groups.map(
                function toArticleGroup(rawArticleGroup): ArticlesGroup {
                    return {
                        id: rawArticleGroup.id,
                        title: rawArticleGroup.title,
                        articleCards: rawArticleGroup.expand.articles.map(function toArticleCard(rawArticle): ArticleCard {
                            return {
                                id: rawArticle.id,
                                image: backendFileService.getUrl(rawArticle.main_image_mobile, "articles", rawArticle.id),
                                imageAltText: rawArticle.main_image_alt_text,
                                priceUSD: rawArticle.price_usd,
                                title: rawArticle.title,
                                slug: rawArticle.slug,
                                colors: rawArticle.expand.option_colors.map(function toArticleOptionColors(
                                    rawColor
                                ): ArticleOptionColor {
                                    return {
                                        id: rawColor.id,
                                        name: rawColor.name,
                                        colorCode: rawColor.color_code,
                                    };
                                }),
                            };
                        }),
                    };
                }
            );
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
                articlesGroups,
            };
        });
