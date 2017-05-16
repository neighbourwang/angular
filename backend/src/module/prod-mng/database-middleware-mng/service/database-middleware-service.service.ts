import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel,SystemDictionaryService } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';
//model 
import { DatabaseMiddlewareServiceModel, ResourcPool, PlatformSimpleItem } from '../model/database-middleware-service.model'



@Injectable()
export class DatabaseMiddlewareService {
     constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }
    //获取数据库服务模板列表
    getDatabaseServeTemplateList(){
        let api = this.restApiCfg.getRestApi("database-serve-template.get");

        return this.restApi.request(api.method, api.url, [], undefined);
    }
    //获取中间件服务模板列表
    getMiddleWareServeTemplateList(){
        let api = this.restApiCfg.getRestApi("middleware-serve-template.get");

        return this.restApi.request(api.method, api.url, [], undefined);
    }
    //获取可用资源池列表
    getResourcePoolList() {
        let api = this.restApiCfg.getRestApi("physical-service-resourcepool.get");

        return this.restApi.request(api.method, api.url, [], undefined);
    }
    //获取平台信息
    getDiskPlateForms() {
        let api = this.restApiCfg.getRestApi("prod-mng-database-plateforms.get");
        return this.restApi.request(api.method, api.url, undefined, undefined);
    }
    //创建管理服务产品目录    
    postDatabaseMiddlewareService(data:DatabaseMiddlewareServiceModel) {
        let api = this.restApiCfg.getRestApi("database-middleware-service-create.post");

        return this.restApi.request(api.method, api.url, [], undefined,data);
    }
    //获取数据库中间件服务器类型列表
   serverTypeDic=this.dict.get({      //这里的调用的方法为promise 所以dictProductType是一个promise
      owner : "GLOBAL",
      field : "SERVER_TYPE"    
   })
}
  