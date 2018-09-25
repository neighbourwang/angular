import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

//model
import { ServiceList_mock } from "../model/mng-service-list.mock.model";

import 'rxjs/add/operator/toPromise';


@Injectable()
export class MngDetailService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }


    getInfo(serviceId: string): Promise<any>{
        const pathParams=[
            {
                key:"itemId",
                value: serviceId
            }
        ];
        const api = this.restApiCfg.getRestApi("mtc-center.mng-detail.detail");
        return this.restApi.request(api.method, api.url, pathParams, null,null  );
    }

}
