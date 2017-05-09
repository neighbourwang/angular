import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import {HyperInfo_mock} from '../model/hyper-info-list.mock';
import {HyperGraph_mock} from '../model/hyper-graph-list.mock';
@Injectable()
export class AssignDetailService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }

    peridDic = this.dict.get({
        owner: "MAINTAIN",
        field: "PERIOD"
    });

     init(): void {
        this.restApiCfg.loadCfgData();
    }

    //超分管理-宿主机列表详情
     getHyperInfo(vmId:string, Period:string): Promise<any> {
         const pathParams = [
            {
                key: "vmid",
                value: vmId
             },
             {
                key: "period",
                value: Period
            },
           
        ];
        const api = this.restApiCfg.getRestApi("assign-detail.hyper.info");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => HyperInfo_mock);
     }


    getHyperGraph(vmId:string, Period:string): Promise<any> {
         const pathParams = [
            {
                key: "vmid",
                value: vmId
             },
             {
                key: "period",
                value: Period
            },
           
        ];
        const api = this.restApiCfg.getRestApi("assign-detail.hyper.graph");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => HyperGraph_mock);
     }
}