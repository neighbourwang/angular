import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

import {PlatformList_mock} from "../model/platform-list.mock";
import {PlatformModel} from "../model/platform.model";


@Injectable()
export class CapacityMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

   selectedPlatform:PlatformModel;
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
        //const api = this.restApiCfg.getRestApi("net-img.vm-mng.network.list");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => PlatformList_mock);
    }
}