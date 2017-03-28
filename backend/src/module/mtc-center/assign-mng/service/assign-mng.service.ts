import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

import { EntList_mock }from '../model/ent-list.mock';
import { PlfList_mock }from '../model/plf-list.mock';
import {UsageState_mock}from '../model/usage-state-list.mock';
import { HyperList_mock} from '../model/hyper-list.mock';

@Injectable()
export class AssignMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getEntList(): Promise<any> {
        //const api = this.restApiCfg.getRestApi("assign-mng.ent.list");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => EntList_mock);
    }

    getPlfList(): Promise<any> {
        //const api = this.restApiCfg.getRestApi("assign-mng.plf.list");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => PlfList_mock );
    }

    //post ´ýÍêÉÆ
    getUsageState(): Promise<any> {
    
        //const api = this.restApiCfg.getRestApi("assign-mng.usagestate.info");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => UsageState_mock);
    }

    //post ´ýÍêÉÆ
    getHyperList(): Promise<any> {

        //const api = this.restApiCfg.getRestApi("assign-mng.hyper.list");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => HyperList_mock);
    }
}