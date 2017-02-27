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
    }

    updateIpStatus(pn_id: string, ipusage: IpUsageMngModel): Promise <any>  {
        const pathParams = [
            {
                key: "pmNetworkId",
                value: pn_id
            },
            {
                key: "status",
                value: ipusage.status
            },
            {
                key: "pmNetworkIPId",
                value: ipusage.id
            }
        ];
        const body = [ipusage.description];
        console.log(pathParams, body, "pathParams and body");
        const api = this.restApiCfg.getRestApi("phy-mng.phy-net-mng.network.ips.status.set");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }
}
