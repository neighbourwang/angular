import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class GetProduct {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 查看产品
    getProduct(id:string) {
        let api = this.restApiCfg.getRestApi("prod-mng.prod-mng.detail");

        return this.restApi.request(api.method, api.url, [{key:'id',value:id}], undefined);
    }
}