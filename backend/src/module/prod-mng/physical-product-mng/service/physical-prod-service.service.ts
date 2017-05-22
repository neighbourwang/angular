import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

import { PhysicalService, FlatResourcePool, ResourcePoolObj, PartsFlavor, UnitObj } from '../model/physical-prod-service.model'

@Injectable()
export class PhysicalServiceService {
     constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    //获取可用资源池列表
    getResourcePoolList() {
        let api = this.restApiCfg.getRestApi("physical-service-resourcepool.get");

        return this.restApi.request(api.method, api.url, [], undefined);
    }
    //获取物理机新增部件规格信息
    getflavorInfoList() {
        let api = this.restApiCfg.getRestApi("physical-service-flavorInfo.get");

        return this.restApi.request(api.method, api.url, [], undefined);
    }
    //创建物理机服务
    postPhysicalService(data:PhysicalService) {
        let api = this.restApiCfg.getRestApi("physical-service-create.post");

        return this.restApi.request(api.method, api.url, [], undefined,data);
    }
    //获取编辑物理机服务目录详情
    getEditPhysicalService(id:string){
       let api = this.restApiCfg.getRestApi("physical-service-edit.get");

        return this.restApi.request(api.method, api.url, [{key:'id',value:id}], undefined); 
    }
}
  