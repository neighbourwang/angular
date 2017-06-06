import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel ,SystemDictionaryService} from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProdListService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }

    // 条件查询所有产品列表
    getProdList(page: number, size: number,data:any) {
        let api = this.restApiCfg.getRestApi("prod-mng.prod-mng.list.get");

        return this.restApi.request(api.method, api.url, [{ key: "page", value: page }, { key: "size", value: size }], undefined,data);
    }
  
    //更新产品状态
    changProdstatus(data:any){
        let api = this.restApiCfg.getRestApi("prod-mng.prod-mng.updateStatus");

        return this.restApi.request(api.method, api.url,[], undefined,data);
    }
    productTypeDic=this.dict.get({      //这里的调用的方法为promise 所以dictProductType是一个promise
      owner : "GLOBAL",
      field : "SERVICE_TYPE"    
   });
   //模板软件类型字典
    databaseTypeDic = this.dict.get({      //这里的调用的方法为promise 所以dictProductType是一个promise
        owner: "DB",
        field: "DB_TYPE"
    })
    //数据库模板部署模式字典
    databaseDeployModeDic=this.dict.get({
        owner:'DB',
        field:'DEPLOYMENT_MODE'
    })
    //中间件模板部署模式字典
    middlewareDeployModeDic=this.dict.get({
        owner:'MIDDLEWARE',
        field:'DEPLOYMENT_MODE'
    })
    //中间件模板类型字典
    middlewareTypeDic = this.dict.get({      //这里的调用的方法为promise 所以dictProductType是一个promise
        owner: "MIDDLEWARE",
        field: "TYPE"
    })
}
