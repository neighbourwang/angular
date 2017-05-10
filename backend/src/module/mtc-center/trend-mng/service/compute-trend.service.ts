import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel,SystemDictionaryService } from '../../../../architecture';
import { ComputeQuery} from '../model/compute-query.model';
import { PlfList_mock }from '../model/plf-list.mock';
import { CloudHostSpec_mock }from '../model/cloud-host-spec.mock';
import { BasicList_mock }from '../model/basic-list.mock';
import { GrowthRatelist_mock } from '../model/growth-rate-list.mock';
import {CpuData_mock,VmData_mock,MemData_mock} from '../model/bar-data.mock';
@Injectable()
export class ComputeTrendService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }

    queryTypeDic = this.dict.get({
        owner: "MAINTAIN",
        field: "TRENDQUERYTYPE"
    });
    powerStatusDic = this.dict.get({
        owner: "COMPUTE",
        field: "STATUS"
    });
    trendPeridDic = this.dict.get({
        owner: "MAINTAIN",
        field: "TRENDPERIOD"
    });

    init(): void {
        this.restApiCfg.loadCfgData();
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

    getBasicList(query: ComputeQuery): Promise<any> {
        const api = this.restApiCfg.getRestApi("compute-trend.basic.info");
        return this.restApi.request(api.method, api.url, null, null, query);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => BasicList_mock );
    }

    getGrowthRateList(query: ComputeQuery): Promise<any> {
        const api = this.restApiCfg.getRestApi("compute-trend.compare");
        return this.restApi.request(api.method, api.url, null, null, query).then(
            res =>{
                if (res && 100 == res["resultCode"]) {
                    return res.resultContent;
                } else {
                    throw "error";
                }
            }
        );
        // return new Promise(resovle => setTimeout(resovle, 10)).then(() => GrowthRatelist_mock.resultContent);
        
        
    }

    getCpuData(query:ComputeQuery): Promise<any> {
        const api = this.restApiCfg.getRestApi("compute-trend.graph.cpu");
        return this.restApi.request(api.method, api.url, null, null, query);
        //return new Promise(resovle => setTimeout(resovle, 10)).then(() => CpuData_mock);
    }

     getVmData(query:ComputeQuery): Promise<any> {
        const api = this.restApiCfg.getRestApi("compute-trend.graph.vm");
        return this.restApi.request(api.method, api.url, null, null, query).then(
            res =>{
                if (res && 100 == res["resultCode"]) {
                    return res.resultContent;
                } else {
                    throw "error";
                }
            }
        );
        // return new Promise(resovle => setTimeout(resovle, 10)).then(() => VmData_mock.resultContent);
        
            
    }

     getMemData(query:ComputeQuery): Promise<any> {
        const api = this.restApiCfg.getRestApi("compute-trend.graph.mem");
        return this.restApi.request(api.method, api.url, null, null, query);
        //return new Promise(resovle => setTimeout(resovle, 10)).then(() => MemData_mock);
     }

    exportCurrent(query:ComputeQuery): Promise<any> {
        const api = this.restApiCfg.getRestApi("compute-trend.export.current");
        return this.restApi.request(api.method, api.url, null, null, query);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => BasicList_mock );
     }

    exportAll(): Promise<any> {
        //const api = this.restApiCfg.getRestApi("compute-trend.export.all");
        //return this.restApi.request(api.method, api.url, null, null, query);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => BasicList_mock );
     }
}