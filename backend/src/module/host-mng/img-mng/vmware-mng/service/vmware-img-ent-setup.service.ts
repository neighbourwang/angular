import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../../architecture';

import 'rxjs/add/operator/toPromise';

//model
import { EnterpriseModel } from '../model/vmware-img-list.model';

//mock
import { TenantModel_mock } from '../model/vmware-img-ent-setup.mock';
import { success_resp_mock } from '../model/vmware-img-enable-disable.mock';


@Injectable()
export class VmwareImgEntSetupService{
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getAllEnts(platformId: string): Promise<any>{
        const pathParams = [
            {
                key: "platformId",
                value: platformId

            }
        ];
        
        //*
        const api = this.restApiCfg.getRestApi("host-mng.vmware-mng.ents.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //*/
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return TenantModel_mock });
    }
    saveVmwareImgEnts(imageId: string, selectedEnts: Array<EnterpriseModel>): Promise<any> {
        const pathParams = [
            {
                key: "imageId",
                value: imageId

            }
        ];
        const obj = {
                "tenants": selectedEnts
        };
        console.log(imageId, selectedEnts, "((((((((((((((((((selectedEnts))))))))))))))))))")
        //*
        const api = this.restApiCfg.getRestApi("host-mng.vmware-mng.ents.list");
        return this.restApi.request(api.method, api.url, pathParams, null, obj);
        //*/
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return success_resp_mock });
    }
    
}