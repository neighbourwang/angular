import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RestApiCfg, RestApi } from "../../../../architecture";

import { Images_mock } from "../model/img-mng.mock.model";
import { Image } from "../model/img-mng.model";
import { CriteriaQuery } from "../model/criteria-query.model";

import "rxjs/add/operator/toPromise";

@Injectable()
export class ImgMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getImages(criteriaQuery: CriteriaQuery, pageIndex: number, pageSize: number): Promise<any> {
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

        //{
        //    "criteriaQuery": {
        //        "areaList": "上海A区",
        //            "imageOwner": "部门资源",
        //                "imageName": "windows2012dc",
        //                    "os": "windows2012dc",
        //                        "status": "0",
        //                            "imageType": "0"
        //    }
        //}


        //const api = this.restApiCfg.getRestApi("image.mng.list");
        //return this.restApi.request(api.method, api.url, pathParams, null, {"criteriaQuery":criteriaQuery});

        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Images_mock });
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
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Images_mock });
    }

    deleteImage(image: Image): Promise<any> {
        const pathParams = [
            {
                key: "image_id",
                value: image.id
            }
        ];

        //const api = this.restApiCfg.getRestApi("image.mng.update");
        //return this.restApi.request(api.method, api.url, pathParams, null, image);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Images_mock });
    }

}

