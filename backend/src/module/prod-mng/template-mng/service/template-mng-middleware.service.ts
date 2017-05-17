import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel, SystemDictionaryService } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class MiddlewareService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict: SystemDictionaryService
    ) { }
    //获取中间件选项基础信息
    getMiddlewareOptionInitInfo() {
        let api = this.restApiCfg.getRestApi("template-mng-middleware.initInfo.get");

        return this.restApi.request(api.method, api.url, [], undefined);
    }
    //创建中间件模板
    postMiddlewareTemplate(data:any) {
        let api = this.restApiCfg.getRestApi("template-mng-middleware.cre.post");

        return this.restApi.request(api.method, api.url, [], undefined, data);
    }
    //更新产品状态
    changProdstatus(data: any) {
        let api = this.restApiCfg.getRestApi("prod-mng.prod-mng.updateStatus");

        return this.restApi.request(api.method, api.url, [], undefined, data);
    }
    
}
