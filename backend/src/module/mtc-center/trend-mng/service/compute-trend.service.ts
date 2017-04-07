import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';
import { ComputeQuery} from '../model/compute-query.model';
import { PlfList_mock }from '../model/plf-list.mock';
import { BasicList_mock }from '../model/basic-list.mock';
import {CpuData_mock,VmData_mock,MemData_mock} from '../model/bar-data.mock';
@Injectable()
export class ComputeTrendService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getPlfList(): Promise<any> {
        //const api = this.restApiCfg.getRestApi("assign-mng.plf.list");
        //return this.restApi.request(api.method, api.url, null, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => PlfList_mock );
    }

    
    getBasicList(query: ComputeQuery): Promise<any> {
        //const api = this.restApiCfg.getRestApi("compute-trend.basic.info");
        //return this.restApi.request(api.method, api.url, null, null, query);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => BasicList_mock );
    }

    

    getCpuData(): Promise<any> {
        //const api = this.restApiCfg.getRestApi("compute-trend.basic.info");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 10)).then(() => CpuData_mock);
    }

     getVmData(): Promise<any> {
        //const api = this.restApiCfg.getRestApi("compute-trend.basic.info");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 10)).then(() => VmData_mock);
    }

     getMemData(): Promise<any> {
        //const api = this.restApiCfg.getRestApi("compute-trend.basic.info");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 10)).then(() => MemData_mock);
     }

    exportCurrent(query:ComputeQuery): Promise<any> {
        //const api = this.restApiCfg.getRestApi("compute-trend.export.current");
        //return this.restApi.request(api.method, api.url, null, null, query);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => BasicList_mock );
     }

    exportAll(): Promise<any> {
        //const api = this.restApiCfg.getRestApi("compute-trend.export.all");
        //return this.restApi.request(api.method, api.url, null, null, query);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => BasicList_mock );
     }
}