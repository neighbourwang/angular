import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

//model
import {Criteria} from "../model/criteria.model";
import {PhyCreat} from "../model/phy-creat.model";

import 'rxjs/add/operator/toPromise';


@Injectable()
export class PhyPoolMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

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

    phyIfEnable(pmpoolId: string, status: string){
        const pathParams=[
            {
                key:"pmpool_id",
                value: pmpoolId
            },
            {
                key:"status",
                value: status
            }
        ];
        const api= this.restApiCfg.getRestApi("phy-mng.phy-pool.phylist.enable");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
    }

    edit(criteria: Criteria, pmpoolId: string){
        const pathParams=[
            {
                key:"pmpool_id",
                value: pmpoolId
            }
        ];
        const api= this.restApiCfg.getRestApi("phy-mng.phy-pool.phylist.edit");
        return this.restApi.request(api.method, api.url, pathParams, null,
            {
                "poolName": criteria.poolName,
                "region": criteria.region,
                "dataCenter": criteria.dataCenter,
                "description": criteria.description

            });
    }

    creat(phy: PhyCreat){
        const api= this.restApiCfg.getRestApi("phy-mng.phy-pool.phylist.creat");
        return this.restApi.request(api.method, api.url, null, null,
            {
                "dataCenter": "string",
                "description": "string",
                "poolName": "string",
                "region": "string"

            });
    }

}
