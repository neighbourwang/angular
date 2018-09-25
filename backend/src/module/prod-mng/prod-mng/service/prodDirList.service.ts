import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProdDirListService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 所有产品目录列表
    getProdDirList() {
        let api = this.restApiCfg.getRestApi("prod-mng.prod-dir.list");
        return this.restApi.request(api.method, api.url, [], undefined);
    }
    
    //获得企业列表
    getEnterpriseList() {
        let api = this.restApiCfg.getRestApi("prod-mng.prod-enterprise.list");
        return this.restApi.request(api.method, api.url,[], undefined);
    }
}
