import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

//model
import {Criteria} from "../model/criteria.model";

import 'rxjs/add/operator/toPromise';


@Injectable()
export class PhyUnitMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    statusDic = this.dict.get({
        owner: "PMRESOURCE",
        field: "STATUS"
    });

    getData(criteria: Criteria, pageIndex: number, pageSize: number): Promise<any>{
        const pathParams=[
            {
                key:"page",
                value: pageIndex
            },
            {
                key:"size",
                value: pageSize
            }
        ];
        const api= this.restApiCfg.getRestApi("phy-mng.phy-pool.phylist.data");
        return this.restApi.request(api.method, api.url, pathParams, null,
            {
                "poolName": criteria.poolName,
                "region": criteria.region,
                "dataCenter": criteria.dataCenter
            });
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => Phylist_mock);
    }
    
}
