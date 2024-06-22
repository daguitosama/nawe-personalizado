import PocketBase from "pocketbase";
import { BusinessDataService } from "./BusinessData";
import { SeoService } from "./Seo";
export class Content {
    private client: PocketBase;
    public businessData: BusinessDataService;
    public seoService: SeoService;
    // public home: Home;
    // public serigrafia: Serigrafia;
    constructor(backendApiURL: string) {
        this.client = new PocketBase(backendApiURL);
        this.businessData = new BusinessDataService(this.client);
        this.seoService = new SeoService();
        // this.home = new Home(this.client);
        // this.serigrafia = new Serigrafia(this.client);
    }
}
