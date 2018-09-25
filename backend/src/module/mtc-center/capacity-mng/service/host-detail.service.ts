import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi,SystemDictionaryService } from '../../../../architecture';

import { HostInfo_mock } from '../model/host-info-list.mock';
import {HostGraph_mock} from '../model/host-graph-list.mock';
@Injectable()
export class HostDetailService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }

    runningDic = this.dict.get({
        owner: "MAINTAIN",
        field: "RUNNING"
    });
    statusDic = this.dict.get({
        owner: "MAINTAIN",
        field: "STATUS"
    });
    peridDic = this.dict.get({
        owner: "MAINTAIN",
        field: "PERIOD"
    });

     init(): void {
        this.restApiCfg.loadCfgData();
    }

    //获取宿主机列表详情
     getHostDetail(HostId:string, Period:string): Promise<any> {
         const pathParams = [
            {
                key: "hostId",
                value: HostId
             },
             {
                key: "period",
                value: Period
            },
           
        ];
        const api = this.restApiCfg.getRestApi("host-detail.host.info");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => HostInfo_mock);
     }

    //获取宿主机折线图
     getHostGraph(HostId:string, Period:string): Promise<any> {
         const pathParams = [
            {
                key: "hostId",
                value: HostId
             },
             {
                key: "period",
                value: Period
            },
           
        ];
        const api = this.restApiCfg.getRestApi("host-detail.host.graph");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => HostGraph_mock);
     }

}