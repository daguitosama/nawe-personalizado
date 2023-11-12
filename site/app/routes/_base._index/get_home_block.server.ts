import type { SEO } from "~/lib/seo.server";
import type { Image } from "~/lib/types";

/* Services Block */
type ServicesBlock = {
    title: string;
    service_cards: ServiceCard[];
};
export type ServiceCard = {
    id: string;
    label: string;
    route: string;
    image: Image;
};
/* End of Services Block */

/* Articles Block */
type ArticlesBlock = {
    title: string;
    route: string;
    card: {
        title: string;
        image: Image;
    };
};

/* End of Articles Block */

export type Home_Block = {
    seo: SEO;
    hero_image: {
        mobile: Image;
        desktop: Image;
    };
    services_block: ServicesBlock;
    articles_block: ArticlesBlock;
    // packs: Home_Packs_Section_Block;
};

/* Paquetes y Ofertas for later */
// type Home_Pack_Block = {
//     id: string;
//     image: Image;
//     label: string;
//     route: string;
// };

// type Home_Packs_Section_Block = {
//     title: string;
//     packs: Home_Pack_Block[];
// };

// type Home_Offers_Section_Block = {
//     title: string;
//     links: { label: string; route: string }[];
// };
/* End of Paquetes y Ofertas */
