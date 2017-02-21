import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel, SystemDictionaryService } from '../../../../architecture';

//model 
import { IpUsageMngModel } from '../model/phy-net.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PhyNetMngIpAddrService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }

    getIpUsageMngList( pg_id: any ): Promise <any> {
        console.log("getIpUsageMngList"); 
        const pathParams = [
            {
                key: "pmNetworkId",
                value: pg_id
            }
        ];
        console.log(pathParams, "pathParams");
        const api = this.restApiCfg.getRestApi("phy-mng.phy-net-mng.network.ips.get");
        return this.restApi.request(api.method, api.url, pathParams, null, null);        
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return IpUsageMngModel_mock });
    }

    updateIpStatus(ipusage: IpUsageMngModel): Promise <any>  {
        const pathParams = [
            {
                key: "pmNetworkId",
                value: ipusage.id
            },
            {
                key: "status",
                value: ipusage.status
            }
        ];
        const body = [ipusage.description];
        console.log(pathParams, body, "pathParams and body");
        const api = this.restApiCfg.getRestApi("phy-mng.phy-net-mng.network.ips.status.set");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Success_mock });
    }
/*
    disableIP(ipusage: IpUsageMngModel): Promise <any>  {
        console.log("disableIP");   
        const pathParams = [
            {
                key: "id",
                value: ipusage.id
            }
        ];
        const body = [""]; 
        console.log(pathParams, body, "pathParams and body");
        const api = this.restApiCfg.getRestApi("net-mng.vmware.nsx.subnetip.release");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Success_mock });
    }
*/
}
