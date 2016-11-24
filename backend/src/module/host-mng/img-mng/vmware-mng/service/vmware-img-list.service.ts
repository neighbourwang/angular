import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../../architecture';

import 'rxjs/add/operator/toPromise';

//model
import { VmwareImgModel, CriteriaQuery } from '../model/vmware-img-list.model';

//mock
import { VmwareImgModel_mock } from '../model/vmware-img-list.mock';
import { success_resp_mock } from '../model/vmware-img-enable-disable.mock';


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

    getVmwareImgList( platformId: string, queryOpt: CriteriaQuery, pageIndex: number, pageSize: number): Promise<any>{
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
        
        /*
        const api = this.restApiCfg.getRestApi("host-mng.img-mng.vmware-mng.vmware-img.list");
        return this.restApi.request(api.method, api.url, pathParams, null, 
            {
                "type": criteriaQuery.type,
                "tenantId": criteriaQuery.tenantId
            }
        );
        */
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return VmwareImgModel_mock });
    }

    enableImage(img_id: string, status: string): Promise<any> {
        //const api = this.restApiCfg.getRestApi("host-mng.img-mng.vmware-mng.vmware-img.list");
        //return this.restApi.request(api.method, api.url, null, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return success_resp_mock });
    }

    disableImage(img_id: string, status: string): Promise<any> {
        //const api = this.restApiCfg.getRestApi("host-mng.img-mng.vmware-mng.vmware-img.list");
        //return this.restApi.request(api.method, api.url, null, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return success_resp_mock });
    }
    
}