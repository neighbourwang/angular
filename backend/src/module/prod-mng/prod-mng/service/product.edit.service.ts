
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductEditService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    
  
    //更新产品价格
    changProdPrice(data:any){
        let api = this.restApiCfg.getRestApi("ent-mng.prod-mng/price-edit");

        return this.restApi.request(api.method, api.url,[], undefined,data);
    }
}
