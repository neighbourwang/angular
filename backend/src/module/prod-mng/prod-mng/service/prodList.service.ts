import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProdListService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
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
}
