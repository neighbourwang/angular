import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

//model
import { PhyCreat } from '../model/phy-creat-list.model.ts';
import { PhyPoolList } from '../model/phy-pool-list.model.ts';

import 'rxjs/add/operator/toPromise';
import {Criteria} from "../model/criteria.model";

@Injectable()
export class PhyCreatMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    creat(phyC: Criteria){
        const api= this.restApiCfg.getRestApi("phy-mng.phy-pool.phylist.creat");
        return this.restApi.request(api.method, api.url, null, null,
            {
                "dataCenter": phyC.dataCenter,
                "description": phyC.description,
                "poolName": phyC.poolName,
                "region": phyC.region

            });
    }

    edit(phyP: Criteria, pmpoolId: string){
        const pathParams=[
            {
                key:"pmpool_id",
                value: pmpoolId
            }
        ];
        const api= this.restApiCfg.getRestApi("phy-mng.phy-pool.phylist.edit");
        return this.restApi.request(api.method, api.url, pathParams, null,
            {
                "poolName": phyP.poolName,
                "region": phyP.region,
                "dataCenter": phyP.dataCenter,
                "description": phyP.description

            });
    }

    regionList(){
        const api= this.restApiCfg.getRestApi("phy-mng.phy-pool.phylist.region");
        return this.restApi.request(api.method, api.url, null, null, null);
    }

}
