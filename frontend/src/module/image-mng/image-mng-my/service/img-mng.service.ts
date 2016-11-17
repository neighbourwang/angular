import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RestApiCfg, RestApi } from "../../../../architecture";

 
import "rxjs/add/operator/toPromise";

import { imageList, AreaList_mock } from "../model/images-mock.model";
import { Image } from "../model/image.model";
import { CriteriaQuery } from "../model/criteria-query.model";

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

    getImages(criteriaQuery:CriteriaQuery, pageIndex: number, pageSize:number):Promise<any>{
        const pathParams=[
            {
                key:"page",
                value:pageIndex
            },
            {
                key:"size",
                value:pageSize
            }
        ]
        // const api = this.restApiCfg.getRestApi("image.mng.list");
        // return this.restApi.request(api.method, api.url, pathParams, null, {"criteriaQuery":criteriaQuery});
        
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => imageList);

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

    getAreaList(): Promise<any> {

        //const api = this.restApiCfg.getRestApi("image.mng.update");
        //return this.restApi.request(api.method, api.url, null, null, image);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return AreaList_mock });
    }

    
}

