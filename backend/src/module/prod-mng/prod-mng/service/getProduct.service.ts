import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class GetProductService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 查看产品
    getProduct(id:string) {
        let api = this.restApiCfg.getRestApi("prod-mng.prod-mng.detail");

        return this.restApi.request(api.method, api.url, [{key:'id',value:id}], undefined);
    }
    //获取vm产品目录详情
    getVmServiceDetail(id:string){
        let api = this.restApiCfg.getRestApi("prod-mng.prod-edit-vm.detail");

        return this.restApi.request(api.method, api.url, [{key:'id',value:id}], undefined);
    }
    //获取Disk产品目录详情
    getDiskServiceDetail(id:string){
        let api = this.restApiCfg.getRestApi("prod-mng.prod-edit-disk.detail");

        return this.restApi.request(api.method, api.url, [{key:'id',value:id}], undefined);
    }
    //获取物理机产品目录详情
    getPhysicalService(id:string){
        let api = this.restApiCfg.getRestApi("physical-service-detail.get");
        
        return this.restApi.request(api.method, api.url, [{key:'id',value:id}], undefined)
    }
}