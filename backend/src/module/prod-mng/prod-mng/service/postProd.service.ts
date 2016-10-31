import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class PostProduct {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 新建产品
    postProduct(data) {
        let api = this.restApiCfg.getRestApi("prod-mng.prod-mng.prod-cre.post");

        return this.restApi.request(api.method, api.url, [], undefined,data);
    }
}