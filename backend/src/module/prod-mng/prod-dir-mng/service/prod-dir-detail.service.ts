import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProdDirDetailService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 取得VM产品目录详情
    getVmProdDirDetail(id:string) {
        let api = this.restApiCfg.getRestApi("prod-mng.prod-dir-mng.detail");
        return this.restApi.request(api.method, api.url, [{ key: "id", value: id }], undefined);
    }
}