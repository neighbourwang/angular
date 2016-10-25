//发布产品目录
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProdDirPublishService {
     constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 取得所有产品目录
    publishProdDir(id:string) {
        let api = this.restApiCfg.getRestApi("prod-dir-publish");

        return this.restApi.request(api.method, api.url, [{key:'id',value:id}], undefined);
    }
}