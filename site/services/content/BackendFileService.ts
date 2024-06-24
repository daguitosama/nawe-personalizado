import { Env } from "getLoadContext";

export class BackendFileService {
    private env: Env;
    constructor(env: Env) {
        this.env = env;
    }

    getUrl(filename: string, collection: string, recordId: string) {
        // http://DOAMIN/api/files/COLLECTION_ID_OR_NAME/RECORD_ID/FILENAME
        return this.env.BACKEND_API_URL + "/api/files" + `/${collection}/${recordId}/` + filename;
    }
}
