import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import { CartList } from '../model/cart-list.model';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class cartListService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private restApi:RestApi) {
    }

    getOrderList() : Promise<CartList[]>{
        const api = this.restApiCfg.getRestApi("shopping.cart.items");

        const request = this.restApi.request(api.method, api.url, undefined, undefined)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
    }

}