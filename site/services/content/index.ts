import ky, { type KyInstance } from "ky";
import { GlobalSettings } from "./GlobalSettings";
// import { HomeBlock } from "./Home";
export class Content {
    private client: KyInstance;
    public globalSettings: GlobalSettings;
    // public homeBlock: HomeBlock;
    constructor(stAccessToken: string) {
        this.client = ky.create({
            headers: {
                "Content-Type": "application/json",
                Token: stAccessToken,
            },
        });
        this.globalSettings = new GlobalSettings(this.client);
        // this.homeBlock = new HomeBlock(this.client);
    }
}
