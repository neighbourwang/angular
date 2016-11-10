import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RestApiCfg, RestApi } from "../../../../architecture";

 
import "rxjs/add/operator/toPromise";

import { imageList } from "../model/images-mock.model";
import { Image } from "../model/image.model";

@Injectable()
export class ImgMngService_my {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getImages():Promise<any>{
        const pathParams=[
            {
                key:"page",
                value:1
            },
            {
                key:"size",
                value:1
            }
        ]
        const api = this.restApiCfg.getRestApi("image.mng.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
    }

    getImagesByMock():Promise<any>{
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => imageList);
    }
    

     updateImage(image: Image): Promise<any> {
        const pathParams = [
            {
                key: "image_id",
                value: image.id
            } 
        ];

        //const api = this.restApiCfg.getRestApi("image.mng.update");
        //return this.restApi.request(api.method, api.url, pathParams, null, image);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return imageList });
    }
}

