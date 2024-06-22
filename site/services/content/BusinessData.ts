import PocketBase from "pocketbase";
import z from "zod";
import { Timer } from "./Timer";

export type CompoundNavigationLink = {
    id: string;
    label: string;
    links: {
        id: string;
        label: string;
        route: string;
    }[];
};

export type NavigationLink = {
    id: string;
    label: string;
    route: string;
};

export type MenuLink = NavigationLink | CompoundNavigationLink;

export class BusinessDataService {
    private client: PocketBase;
    constructor(client: PocketBase) {
        this.client = client;
    }

    async get(): Promise<Global_Settings_Result> {
        const timer = new Timer();

        const data = await this.client.collection("business_data").getOne("1z9c8o6ccyqms9c");
        const businessData = businessDataParser.parse(data);
        console.log({ businessData, delta: timer.delta() });
        return { businessData, delta: timer.delta() };
    }
}

type Global_Settings_Result = {
    businessData: BusinessData;
    delta: number;
};
const businessDataParser = z.object({
    email: z.string(),
    phone: z.string(),
    address: z.string(),
    instagram_link: z.string(),
    whatsapp_phone: z.string(),
});

export type BusinessData = {
    email: string;
    phone: string;
    address: string;
    instagram_link: string;
    whatsapp_phone: string;
};
