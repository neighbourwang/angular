import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

import { Network_mock } from '../model/network.mock.model';
import { CriteriaQuery } from '../model/criteria-query.model';
@Injectable()
export class OpenstackService{
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getNetworks( criteriaQuery: CriteriaQuery, pageIndex: number, pageSize: number): Promise<any>{
        const pathParams = [
            {
                key: "page",
                value: pageIndex
            },
            {
                key: "size",
                value: pageSize
            }
        ];

        //const api = this.restApiCfg.getRestApi("");
        //return this.restApi.request(api.method, api.url, pathParams, null, {"criteriaQuery":criteriaQuery});

        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Network_mock });
    }
}