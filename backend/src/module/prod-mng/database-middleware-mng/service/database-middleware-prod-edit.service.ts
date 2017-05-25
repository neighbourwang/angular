import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel ,LayoutService} from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

//model 

@Injectable()
export class DataBaseMiddlewareProdEditService {
     constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private layoutService:LayoutService
    ) { } 
    //获取中间件数据库产品详情
    getDatabaseMiddlewareProductDetail(id:string) {
        let api = this.restApiCfg.getRestApi("database-middleware-product.get");
        return this.restApi.request(api.method, api.url, [{key:'id',value:id}], undefined)
    }   
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
    getEnterpriseList(list) {
        let api = this.restApiCfg.getRestApi("prod-mng.prod-enterprise.post");

        return this.restApi.request(api.method, api.url, [], undefined,list);
    }
    //编辑产品企业信息
    editProductEnterPrise(data:any){
        let api = this.restApiCfg.getRestApi("prod-mng.prod-mng.editEnterprise");
        return this.restApi.request(api.method, api.url,[], undefined,data);
    }    
    //更新产品价格信息
    updateProdPrice(data:any){
        let api = this.restApiCfg.getRestApi("physical-product-price-update.post");
        return this.restApi.request(api.method, api.url,[], undefined,data);
    }    
}
  