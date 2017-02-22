import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

import {StoreInfoList_mock} from '../model/store-info-list.mock';
@Injectable()
export class StoreDetailService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getStoreInfoList(StorageId:string): Promise<any> {
        const pathParams = [
            {
                key: "storageId",
                value: StorageId
            }
           
        ];
        //const api = this.restApiCfg.getRestApi("net-img.vm-mng.network.list");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => StoreInfoList_mock);
    }
}