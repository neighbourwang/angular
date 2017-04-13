import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel, SystemDictionaryService } from '../../../../architecture';

//model
import {SubList_mock, SubInfo_mock} from "../model/sub-list.mock.model";
import {Success_mock, DepartList_mock} from "../model/major-list.mock.model";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AliSubService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getData(id: string): Promise<any>{
        const pathParams=[
            {
                key:"id",
                value: id
            }
        ];
        /* const api= this.restApiCfg.getRestApi("user-center.ali-cloud.sublist");
         return this.restApi.request(api.method, api.url, pathParams, null, null);*/
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => SubList_mock);
    }

    getDetail(id: string): Promise<any>{
        const pathParams=[
            {
                key:"id",
                value: id
            }
        ];
        /* const api= this.restApiCfg.getRestApi("user-center.ali-cloud.subinfo");
         return this.restApi.request(api.method, api.url, pathParams, null, null);*/
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => SubInfo_mock);
    }

    getDepartsList(): Promise<any>{
        /* const api= this.restApiCfg.getRestApi("user-center.ali-cloud.departsublist");
         return this.restApi.request(api.method, api.url, null, null, null);*/
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => DepartList_mock);
    }



}
