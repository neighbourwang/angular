import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel,SystemDictionaryService  } from '../../../../architecture';

import {QueryModel} from "../model/query.model";
import { EntList_mock }from '../model/ent-list.mock';
import { PlfList_mock }from '../model/plf-list.mock';
import { CloudHostSpec_mock }from '../model/cloud-host-spec.mock';
import {UsageState_mock}from '../model/usage-state-list.mock';
import { HyperList_mock} from '../model/hyper-list.mock';

@Injectable()
export class AssignMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }

    powerStatusDic = this.dict.get({
        owner: "COMPUTE",
        field: "STATUS"
    });
    rateDic = this.dict.get({
        owner: "MAINTAIN",
        field: "RATE"
    });
    topDic = this.dict.get({
        owner: "MAINTAIN",
        field: "TOP"
    });
    peridDic = this.dict.get({
        owner: "MAINTAIN",
        field: "PERIOD"
    });

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getEntList(): Promise<any> {
        const api = this.restApiCfg.getRestApi("query.ent.list");
        return this.restApi.request(api.method, api.url, null, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => EntList_mock);
    }

    getPlfList(): Promise<any> {
        const api = this.restApiCfg.getRestApi("query.plf.list");
        return this.restApi.request(api.method, api.url, null, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => PlfList_mock );
    }

    getCloudHostSpec(): Promise<any> {
        const api = this.restApiCfg.getRestApi("query.flavor");
        return this.restApi.request(api.method, api.url, null, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => CloudHostSpec_mock);
    }
  
    getUsageState(query:QueryModel): Promise<any> {   
        const api = this.restApiCfg.getRestApi("assign-mng.usagestate.info");
        return this.restApi.request(api.method, api.url, null, null, query);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => UsageState_mock);
    }

    
    getHyperList(query:QueryModel): Promise<any> {
        const api = this.restApiCfg.getRestApi("assign-mng.hyper.list");
        return this.restApi.request(api.method, api.url, null, null, query);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => HyperList_mock);
    }

    exportCurrent(query:QueryModel): Promise<any> {
        const api = this.restApiCfg.getRestApi("assign-mng.hyper.export.current");
        return this.restApi.request(api.method, api.url, null, null, query);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => HyperList_mock);
    }

    acceptExport(Flag:number,start?:string, end?:string, period?:string): Promise<any> {
        //const api = this.restApiCfg.getRestApi("assign-mng.hyper.export");
        //const pathParams = [
        //    {
        //        key: "type",
        //        value: Flag
        //    }
        //    ];
        //if (Flag == 1) {            
        //    return this.restApi.request(api.method, api.url, pathParams, null, { "period": period });
        //}
        //else if (Flag == 2) {
        //    return this.restApi.request(api.method, api.url, pathParams, null,
        //        {
        //            "startDate":start,
        //            "endDate":end,                 
        //        }
        //    );
        //}
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => HyperList_mock);
    }
}