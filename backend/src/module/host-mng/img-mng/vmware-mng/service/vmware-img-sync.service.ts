import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../../architecture';

import 'rxjs/add/operator/toPromise';

//model
import { VmwareImgSyncModel } from '../model/vmware-img-list.model';

//mock
import { VmwareImgSyncModel_mock } from '../model/vmware-img-list.mock';
import { success_resp_mock } from '../model/vmware-img-enable-disable.mock';


@Injectable()
export class VmwareImgSyncService{
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getVmwareImgSyncList(platformId: string): Promise<any>{
        const pathParams = [
            {
                key: "platformId",
                value: platformId

            }
        ];
        
        /*
        const api = this.restApiCfg.getRestApi("host-mng.img-mng.vmware-mng.vmware-img.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        */
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return VmwareImgSyncModel_mock });
    }

    VmwareSyncImages(platformId: string): Promise<any>{
        const pathParams = [
            {
                key: "platformId",
                value: platformId

            }
        ];
        
        /*
        const api = this.restApiCfg.getRestApi("host-mng.img-mng.vmware-mng.vmware-img.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        */
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return success_resp_mock });
    }

    
}