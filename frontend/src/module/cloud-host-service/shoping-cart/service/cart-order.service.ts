import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import { CartOrder } from '../model/cart-order.model';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class cartOrderService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }

    getOrderList() : Promise<CartOrder[]>{
        const api = this.restApiCfg.getRestApi("shopping.orders.completion");

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