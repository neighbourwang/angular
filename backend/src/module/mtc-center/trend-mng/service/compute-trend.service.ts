import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';
import { PlfList_mock }from '../model/plf-list.mock';
import { BasicList_mock }from '../model/basic-list.mock';
import {legend_mock} from '../model/legend.mock';
import {CpuData_mock} from '../model/bar-data.mock';
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
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => PlfList_mock );
    }

    //post ´ýÍêÉÆ
    getBasicList(): Promise<any> {
        //const api = this.restApiCfg.getRestApi("compute-trend.basic.info");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => BasicList_mock );
    }

    getLegend(): Promise<any> {
        //const api = this.restApiCfg.getRestApi("compute-trend.basic.info");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => legend_mock);
    }

    getCpuData(): Promise<any> {
        //const api = this.restApiCfg.getRestApi("compute-trend.basic.info");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => CpuData_mock);
    }
}