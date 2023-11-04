import type { V2_MetaFunction, LoaderArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { SEO } from "~/lib/seo.server";

type Image = {
    url: string;
    alt: string;
};

type Home_Key_Point_Block = {
    id: string;
    image: Image;
    route: string;
    label: string;
};

type Home_Key_Points_Section_Block = {
    title: string;
    points: Home_Key_Point_Block[];
};

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

type Contact_Block = {
    contact_info: {
        title: string;
        whats_app: string;
        email: string;
    };
    find_us: {
        title: string;
        address: string;
        phone: string;
    };
    know_us: {
        title: string;
        instagram: string;
        facebook: string;
    };
};
// !nGXnj8K1xG4QMXX8Z5Up*
type Home_Block = {
    seo: SEO;
    hero_image: Image;
    key_points: Home_Key_Points_Section_Block;
    packs: Home_Packs_Section_Block;
    offers: Home_Offers_Section_Block;
    // contact: Contact_Block;
};

type LoaderData = {
    meta: ReturnType<V2_MetaFunction>;
    home: Home_Block;
};

export async function loader({ request, context }: LoaderArgs) {
    // temp static home block
    const s_home: any = {
        seo: {
            title: "",
            description: "",
            og_image: "",
        },
    };
    return json<LoaderData>({
        meta: context.seo_meta_tags(s_home.seo, "/"),
        home: s_home,
    });
}

export const meta: V2_MetaFunction = ({ data }: { data: LoaderData }) => {
    return data.meta;
};

export default function Index() {
    return (
        <div className='w-full min-h-screen  flex items-center justify-center'>
            <div className='text-center text-3xl'>
                <h1 className=''> Nawe Personalizado</h1>
                <p>🚧</p>
            </div>
        </div>
    );
}
