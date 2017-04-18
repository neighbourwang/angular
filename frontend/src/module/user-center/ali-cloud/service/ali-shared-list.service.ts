import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel, SystemDictionaryService } from '../../../../architecture';

//model
import {SharedList_mock} from "../model/shared-list.mock.model";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AliSharedService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getData(): Promise<any>{
        /* const api= this.restApiCfg.getRestApi("user-center.ali-cloud.sharedlist");
         return this.restApi.request(api.method, api.url, null, null, null);*/
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => SharedList_mock);
    }
}
