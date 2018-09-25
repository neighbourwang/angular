import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

//model
import {Criteria} from "../model/criteria.model";
import { Region_mock } from '../model/phy-list.mock.model';

import 'rxjs/add/operator/toPromise';

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
                "region": phyC.region,
                "pmPoolId": phyC.pmPoolId,
                "regionId": phyC.regionId

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
                "description": phyP.description,
                "pmPoolId": phyP.pmPoolId,
                "regionId": phyP.regionId

            });
    }

    getRegionList(){
        const api= this.restApiCfg.getRestApi("phy-mng.phy-pool.phylist.region");
        return this.restApi.request(api.method, api.url, null, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => Region_mock);
    }

    getData(pmpoolId: string){
        const pathParams=[
            {
                key:"pmpool_id",
                value: pmpoolId
            }
        ];
        const api= this.restApiCfg.getRestApi("phy-mng.phy-pool.phylist.view");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
    }

}
