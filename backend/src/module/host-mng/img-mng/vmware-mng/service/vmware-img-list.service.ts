import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../../architecture';

import 'rxjs/add/operator/toPromise';

//model
import { VmwareImgModel_mock } from '../model/vmware-img-list.mock';
import { VmwareImgModel } from '../model/vmware-img-list.model';


@Injectable()
export class VmwareImgListService{
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getVmwareImgList( platformId: string, pageIndex: number, pageSize: number): Promise<any>{
        const pathParams = [
            {
                key: "platformId",
                value: platformId

            },
            {
                key: "page",
                value: pageIndex
            },
            {
                key: "size",
                value: pageSize
            }
        ];
        
        /*const api = this.restApiCfg.getRestApi("host-mng.img-mng.vmware-mng.vmware-img.list");
        return this.restApi.request(api.method, api.url, pathParams, null, 
            {
                "platformId": criteriaQuery.platformId,
                "type": criteriaQuery.type,
                "tenantId": criteriaQuery.tenantId
            }
        );
        */
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return VmwareImgModel_mock });
    }
    
}