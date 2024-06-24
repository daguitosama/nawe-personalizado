import { Env } from "getLoadContext";
import PocketBase from "pocketbase";
import { BackendFileService } from "./BackendFileService";
import { BusinessDataService } from "./BusinessData";
import { SeoService } from "./Seo";
import { Serigrafia } from "./Serigrafia";
export class Content {
    private env: Env;
    private client: PocketBase;
    public businessData: BusinessDataService;
    public seoService: SeoService;
    public serigrafia: Serigrafia;
    private backendFileService: BackendFileService;
    constructor(env: Env) {
        this.env = env;
        this.client = new PocketBase(this.env.BACKEND_API_URL);
        this.businessData = new BusinessDataService(this.client);
        this.seoService = new SeoService();
        this.backendFileService = new BackendFileService(this.env);
        this.serigrafia = new Serigrafia(this.client, this.backendFileService);
    }
}
