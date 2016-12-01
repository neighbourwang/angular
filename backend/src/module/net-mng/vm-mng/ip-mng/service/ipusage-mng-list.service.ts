import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../../architecture';

//model 
import { IpUsageMngModel } from '../model/ipusage-mng.model';
import { IpUsageMngModel_mock } from '../model/ipusage-mng.mock';
import { Success_mock } from '../model/success.mock';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class IpUsageMngListService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    getIpUsageMngList( pg_id: string ): Promise <any> {
        //API CALL
        const pathParams = [
            {
                key: "portGroup_id",
                value: pg_id
            }
        ];
        const api = this.restApiCfg.getRestApi("net-mng.vmware.ipusagemng.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);        
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return IpUsageMngModel_mock });
    }

    enableIP(ipusage: IpUsageMngModel): Promise <any>  {
        console.log("enableIP");               
        //API CALL
        const pathParams = [
            {
                key: "ip_id",
                value: ipusage.id
            }
        ];
        const body = [ipusage.description]; 
        const api = this.restApiCfg.getRestApi("net-mng.vmware.subnetip.occupy");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Success_mock });


    }

    disableIP(ipusage: IpUsageMngModel): Promise <any>  {
        console.log("disableIP");        
        //API CALL
        const pathParams = [
            {
                key: "ip_id",
                value: ipusage.id
            }
        ];
        const body = [ipusage.description]; 
        const api = this.restApiCfg.getRestApi("net-mng.vmware.subnetip.release");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Success_mock });

    }

}
