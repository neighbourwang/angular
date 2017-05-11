import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import {PlatformList_mock} from "../model/platform-list.mock";
import {PlatformModel} from "../model/platform.model";


@Injectable()
export class CapacityMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }

    selectedPlatform: PlatformModel;
    
    pfDic = this.dict.get({
        owner: "PLATFORM",
        field: "TYPE"
    });
    statusDic = this.dict.get({
        owner: "GLOBAL",
        field: "STATUS"
    });
    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getPlatformList(page:number,size:number): Promise<any> {
        const pathParams = [
            {
                key: "_page",
                value: page
            },
            {
                key: "_size",
                value: size
            }
        ];
        const api = this.restApiCfg.getRestApi("capacity-mng.platforms.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => PlatformList_mock);
    }

    getReport(): Promise<any> {
        const api = this.restApiCfg.getRestApi("capacity-mng.report");
        return this.restApi.request(api.method, api.url, null, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => PlatformList_mock);
    }
}