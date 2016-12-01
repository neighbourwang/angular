import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RestApiCfg, RestApi } from "../../../../architecture";

import { Images_mock, AreaList_mock } from "../model/img-mng.mock.model";
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

        let opt = $.extend({}, criteriaQuery);
        for (var o in opt) {
            if (!opt[o] || opt[o] === "")
                delete opt[o];
        }

        const api = this.restApiCfg.getRestApi("image.mng.list");
        return this.restApi.request(api.method, api.url, pathParams, null, opt);

       //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Images_mock });
    }

    updateImage(image: Image): Promise<any> {
        delete image.createTime;
        const api = this.restApiCfg.getRestApi("image.mng.update");
        return this.restApi.request(api.method, api.url, null, null, image);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Images_mock });
    }

    deleteImage(image: Image): Promise<any> {
        const pathParams = [
            {
                key: "id",
                value: image.id
            }
        ];
        const api = this.restApiCfg.getRestApi("image.mng.delete");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
      //  return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Images_mock });
    }

    getAreaList(): Promise<any> {

        const api = this.restApiCfg.getRestApi("image.mng.area.list");
        return this.restApi.request(api.method, api.url, null, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return AreaList_mock });
    }
}

