import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RestApiCfg, RestApi } from "../../../../architecture";

import { Images } from "../model/img-mng.mock.model";
import { ImageListModule } from "../model/img-mng.model";

 
import "rxjs/add/operator/toPromise";

@Injectable()
export class ImgMngService_wxl {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getImages(pageIndex: number, pageSize: number): Promise<any> {
        const pathParams = [
            {
                key: "page",
                value: pageIndex
            },
            {
                key: "size",
                value: pageSize
            }
        ];


        //const api = this.restApiCfg.getRestApi("image.mng.list");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);

        return new Promise(resovle => setTimeout(resovle, 200)).then(() => {return Images});
    }
    
}

