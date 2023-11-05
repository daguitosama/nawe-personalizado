import { SEO } from "~/lib/seo.server";
import { Image } from "~/lib/types";

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
    image: Image;
};

/* End of Articles Block */

/* Paquetes y Ofertas */
type Home_Pack_Block = {
    id: string;
    image: Image;
    label: string;
    route: string;
};

type Home_Packs_Section_Block = {
    title: string;
    packs: Home_Pack_Block[];
};

type Home_Offers_Section_Block = {
    title: string;
    links: { label: string; route: string }[];
};
/* End of Paquetes y Ofertas */

export type Home_Block = {
    seo: SEO;
    hero_image: {
        mobile: Image;
        desktop: Image;
    };
    services_block: ServicesBlock;
    // packs: Home_Packs_Section_Block;
};
