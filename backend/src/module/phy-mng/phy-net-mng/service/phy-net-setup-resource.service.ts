import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel, SystemDictionaryService } from '../../../../architecture';

//model 
import { PhySetResPmPoolModel, PhySetResPmModel } from '../model/phy-net.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PhyNetSetupResourceService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,        
        private dict: SystemDictionaryService,
    ) { }

    getPhyResPmPool(pn_id: string): Promise<any> { 
        const pathParams = [
            {
                key: "pmNetworkId",
                value: pn_id
            }
        ];
        /*
        const body = {
                "subnetCIDR": subn.subnetCIDR,
                "subnetMask": subn.subnetMask,
                "gateway": subn.gateway,
                "dnsPre": subn.dnsPre,
                "dnsAlt": subn.dnsAlt
        };
        */
        const api = this.restApiCfg.getRestApi("phy-mng.phy-net-mng.network.pmpool.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
    }

    getPhyResPmHost(pn_id: string, pmpool_ids: string): Promise<any> { 
        const pathParams = [
            {
                key: "pmNetworkId",
                value: pn_id
            },
            {
                key: "pmPoolIds",
                value: pmpool_ids
            }
        ];
        const api = this.restApiCfg.getRestApi("phy-mng.phy-net-mng.network.pmhost.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
    }

    setPhyRes(pn_id: string, pmIds: string, poolIds: string): Promise<any> {
        const pathParams = [
            {
                key: "pmNetworkId",
                value: pn_id
            }
        ];
        const body = {
            "pmIds": pmIds,
            "poolIds": poolIds
        };
        console.log(body, "body of setPhyRes");
        const api = this.restApiCfg.getRestApi("phy-mng.phy-net-mng.network.pmres.set");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
    }
}
