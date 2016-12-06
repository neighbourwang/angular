import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../../architecture';

import 'rxjs/add/operator/toPromise';

//model
import { EnterpriseModel_mock } from '../model/vmware-img-list.mock';
import { VmwareEntModel } from '../model/vmware-img-list.model';


@Injectable()
export class VmwareEntListService{
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getEntList( platformId: string ): Promise<any>{
        //*
        const pathParams = [
            {
                key: "platformId",
                value: platformId

            }
        ];
        //const obj = {
        //        "platformId": criteriaQuery.platformId,
        //        "type": criteriaQuery.type,
        //        "tenantId": criteriaQuery.tenantId
        //};
        console.log(platformId, "platformId in getEntList()");
        const api = this.restApiCfg.getRestApi("host-mng.vmware-mng.dropdown-ent.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //*/
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return EnterpriseModel_mock });
    }
    
}