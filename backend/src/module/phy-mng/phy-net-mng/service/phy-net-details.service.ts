import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel, SystemDictionaryService } from '../../../../architecture';

//model 
import { PhyNetListModel, PhyNetCreateModel, PhyNetEditModel } from '../model/phy-net.model';

import { PhyNetListModel_mock } from '../model/phy-net.mock';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PhyNetDetailsService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,        
        private dict: SystemDictionaryService,
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getPhyNetInfo(pn_id: string): Promise<any> { 
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
        const api = this.restApiCfg.getRestApi("phy-mng.phy-net-mng.network.info.get");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => PhyNetListModel_mock);
    }
}
