//获取产品目录
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProdSeriesService {
     constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 取得所有产品目录类别
    getProdSeries() {
        let api = this.restApiCfg.getRestApi("services.simple.get");

        return this.restApi.request(api.method, api.url, [], undefined);
    }
}