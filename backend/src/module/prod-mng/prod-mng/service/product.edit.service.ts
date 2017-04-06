
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductEditService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }    
  
    //更新产品价格
    changProdPrice(data:any){
        let api = this.restApiCfg.getRestApi("ent-mng.prod-mng/price-edit");
        return this.restApi.request(api.method, api.url,[], undefined,data);
    }
    //获取产品历史价格
    getHistoryPrice(id:string){
        let api = this.restApiCfg.getRestApi("prod-mng.prod-mng.historyPrice");
        return this.restApi.request(api.method, api.url,[{key:'id',value:id}], undefined);
    }
    //编辑产品基本信息
    editProductbasic(data:any){
        let api = this.restApiCfg.getRestApi("prod-mng.prod-mng.editBasic");
        return this.restApi.request(api.method, api.url,[], undefined,data);
    }
    //编辑产品平台信息
    editProductPlatform(data:any){
        let api = this.restApiCfg.getRestApi("prod-mng.prod-mng.editPlatform");
        return this.restApi.request(api.method, api.url,[], undefined,data);
    }
    //编辑产品企业信息
    editProductEnterPrise(data:any){
        let api = this.restApiCfg.getRestApi("prod-mng.prod-mng.editEnterprise");
        return this.restApi.request(api.method, api.url,[], undefined,data);
    }
    
}
