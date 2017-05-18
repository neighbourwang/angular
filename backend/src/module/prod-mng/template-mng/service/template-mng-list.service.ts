import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel, SystemDictionaryService } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class TemplateListService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict: SystemDictionaryService
    ) { }

    // 条件查询模板列表
    getDatabaseTemplateList( data: any) {
        let api = this.restApiCfg.getRestApi("template-mng-database-list.post");

        return this.restApi.request(api.method, api.url, [], undefined, data);
    }
    //获取数据库模板详情
    getTemplatedetail( data: any) {
        let api = this.restApiCfg.getRestApi("prod-mng.template-mng.detail.search");

        return this.restApi.request(api.method, api.url, [], undefined, data);
    }
    //更新数据库模板
    putDatabaseTemplate(data: any) {
        let api = this.restApiCfg.getRestApi("template-mng-database.update.put");

        return this.restApi.request(api.method, api.url, [], undefined, data);
    }
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