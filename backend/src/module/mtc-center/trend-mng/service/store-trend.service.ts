import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel, SystemDictionaryService} from '../../../../architecture';
import {StoreQuery} from "../model/store-query.model";
import {general_mock} from "../model/general.mock";
@Injectable()
export class StoreTrendService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }

    diskStatusDic = this.dict.get({
        owner: "MAINTAIN",
        field: "DISKSTATUS"
    });
    diskSizeDic = this.dict.get({
        owner: "MAINTAIN",
        field: "DISKSIZE"
    });
    trendPeridDic = this.dict.get({
        owner: "MAINTAIN",
        field: "TRENDPERIOD"
    });

    getPlfList(): Promise<any> {
        const api = this.restApiCfg.getRestApi("query.plf.list");
        return this.restApi.request(api.method, api.url, null, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => PlfList_mock );
    }

    getGeneral(query:StoreQuery): Promise<any> {
        //const api = this.restApiCfg.getRestApi("store.trend.general");
        //return this.restApi.request(api.method, api.url, null, null, query);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => general_mock );
    }
}