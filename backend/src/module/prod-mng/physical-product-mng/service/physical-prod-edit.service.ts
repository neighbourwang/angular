import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel ,LayoutService} from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

//model 
import { PhysicalProductModel,ProductEnterpriseReqs } from '../model/physical-product.model';
import { PhysicalService, FlatResourcePool, ResourcePoolObj, PartsFlavor, UnitObj, Spec,FlatUnitObj } from '../model/physical-prod-service.model'

@Injectable()
export class PhysicalProductEditService {
     constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private layoutService:LayoutService
    ) { } 
    //获取物理机产品详情
    getPhysicalProd(id:string){
       let api = this.restApiCfg.getRestApi("physical-product-detail.get");
        return this.restApi.request(api.method, api.url,[{key:'id',value:id}], undefined); 
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
    //编辑产品资源池信息
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
  