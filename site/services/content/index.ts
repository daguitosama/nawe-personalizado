import ky, { type KyInstance } from "ky";
import { GlobalSettings } from "./GlobalSettings";
import { Home } from "./Home";
import { SeoService } from "./Seo";
export class Content {
    private client: KyInstance;
    public globalSettings: GlobalSettings;
    public seoService: SeoService;
    public home: Home;
    constructor(stAccessToken: string) {
        this.client = ky.create({
            headers: {
                "Content-Type": "application/json",
                Token: stAccessToken,
            },
        });
        this.globalSettings = new GlobalSettings(this.client);
        this.seoService = new SeoService();
        this.home = new Home(this.client);
    }
}
