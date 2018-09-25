import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RestApiCfg, RestApi } from "../../../../architecture";

import { Images_wxl, ImageAreas_wxl } from "../model/img-mng.mock.model";

import { Image_wxl } from "../model/img-mng.model";
import { ImageArea_wxl } from "../model/area.model";
import { ImageQuery_wxl } from "../model/imagequery.model";

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

    getAreas(): Promise<any> {
        //const api = this.restApiCfg.getRestApi("image.mng.area.list");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return ImageAreas_wxl});
    }

    getImages(imageQuery: ImageQuery_wxl, pageIndex: number, pageSize: number): Promise<any> {
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

        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Images_wxl});
    }

    updateImage(image: Image_wxl): Promise<any> {
        //const api = this.restApiCfg.getRestApi("image.mng.upate");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);

        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Images_wxl});
        
    }
    
}

