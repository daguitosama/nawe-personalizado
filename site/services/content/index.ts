import { Env } from "getLoadContext";
import PocketBase from "pocketbase";
import { BackendFileService } from "./BackendFileService";
import { BusinessDataService } from "./BusinessData";
import { EtiquetasService } from "./Etiquetas";
import { SeoService } from "./Seo";
import { Serigrafia } from "./Serigrafia";
export class Content {
    private env: Env;
    private client: PocketBase;
    private backendFileService: BackendFileService;
    //
    public businessData: BusinessDataService;
    public seoService: SeoService;
    public serigrafia: Serigrafia;
    public etiquetasService: EtiquetasService;
    constructor(env: Env) {
        this.env = env;
        this.client = new PocketBase(this.env.BACKEND_API_URL);
        this.businessData = new BusinessDataService(this.client);
        this.seoService = new SeoService();
        this.backendFileService = new BackendFileService(this.env);
        this.serigrafia = new Serigrafia(this.client, this.backendFileService);
        this.etiquetasService = new EtiquetasService(this.client, this.backendFileService);
    }
}
