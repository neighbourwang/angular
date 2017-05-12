import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel ,SystemDictionaryService} from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class DatabaseService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }

    // 条件查询所有产品列表
    getTemplateList(page: number, size: number,data:any) {
        let api = this.restApiCfg.getRestApi("prod-mng.prod-mng.list.get");

        return this.restApi.request(api.method, api.url, [{ key: "page", value: page }, { key: "size", value: size }], undefined,data);
    }
    //获取数据库选项基础信息
    getDatabaseOptionInitInfo(){
       let api = this.restApiCfg.getRestApi("template-mng-database.initInfo.get");

        return this.restApi.request(api.method, api.url, [], undefined);  
    }
    //更新产品状态
    changProdstatus(data:any){
        let api = this.restApiCfg.getRestApi("prod-mng.prod-mng.updateStatus");

        return this.restApi.request(api.method, api.url,[], undefined,data);
    }
    productTypeDic=this.dict.get({      //这里的调用的方法为promise 所以dictProductType是一个promise
      owner : "GLOBAL",
      field : "SERVICE_TYPE"    
   })
}
