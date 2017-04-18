import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

import { PhysicalService, FlatResourcePool, ResourcePoolObj, PartsFlavor, UnitObj } from '../model/physical-prod-service.model'

@Injectable()
export class PhysicalProductService {
     constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 获取部件列表
    getUnitList() {
        let api = this.restApiCfg.getRestApi("physical-service-unitList.get");

        return this.restApi.request(api.method, api.url, [], undefined);
    }
    
}
  