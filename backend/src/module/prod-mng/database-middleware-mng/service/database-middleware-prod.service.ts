import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel ,SystemDictionaryService} from '../../../../architecture';

import 'rxjs/add/operator/toPromise';
//model 
import { DatabaseMiddlewareProductModel, Platform, Enterprise } from '../model/database-middleware-product.model'
import { DatabaseMiddlewareServiceModel, ResourcPool, PlatformSimpleItem } from '../model/database-middleware-service.model'



@Injectable()
export class DatabaseMiddlewareProdService {
     constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }

    databaseMiddlewareProduct:DatabaseMiddlewareProductModel;
    databaseMiddlewareService:DatabaseMiddlewareServiceModel;
    enterpriseListForSelect:Array<Enterprise>=new Array<Enterprise>();
    //获取数据库中间件服务目录详情
    getDatabaseMiddlewareServiceDetail(id:string) {
        let api = this.restApiCfg.getRestApi("database-middleware-service-detail.get");
        return this.restApi.request(api.method, api.url, [{key:'id',value:id}], undefined)
    }
    //根据平台获取企业列表    
    getEnterpriseListById(list) {
        this.enterpriseListForSelect=new Array<Enterprise>();
        let api = this.restApiCfg.getRestApi("prod-mng.prod-enterprise.post");
        return this.restApi.request(api.method, api.url, [], undefined,list).then(res=>{
            console.log(res);
            if(res.resultContent){
                this.enterpriseListForSelect=res.resultContent;                
            }
            // this.managerServeProduct.platformSimpleItems=this.managerServeService.platformList;
        }).catch(err=>{
            console.error(err);
        });;
    }
    //获取企业列表    
    getEnterPriseList() {
        this.enterpriseListForSelect=new Array<Enterprise>();        
        let api = this.restApiCfg.getRestApi("prod-mng.prod-enterprise.list");
        return this.restApi.request(api.method, api.url, [], undefined).then(res=>{
            if(res.resultContent){
                this.enterpriseListForSelect=res.resultContent;                
            }
        }).catch(err=>{
            console.error(err);
        });
    }
   //创建数据库中间件产品   
   postDatabaseMiddlewareProduct(data:DatabaseMiddlewareProductModel) {
        let api = this.restApiCfg.getRestApi("database-middleware-product-create.post");

        return this.restApi.request(api.method, api.url, [], undefined,data);
    }
}
  