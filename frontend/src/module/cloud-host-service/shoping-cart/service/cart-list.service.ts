import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import { CartList } from '../model/cart-list.model';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class cartListService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }

    getCartList() : Promise<CartList[]>{
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

    deleteCartList(itemId) : Promise<any>{
        const api = this.restApiCfg.getRestApi("delete.shopping.cart");

        let pathParams = [
            {
                key: 'itemId',
                value: itemId
            }
        ];
        const request = this.restApi.request(api.method, api.url, pathParams, undefined, undefined)
                           
        return request;
    }
    
    purchaseCart(senData:string[]) : Promise<any>{
        const api = this.restApiCfg.getRestApi("shopping.purchase.cart");

        const request = this.restApi.request(api.method, api.url, undefined, undefined, senData)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
    }


    //数据字典所用到的值
    dictProductType = this.dict.get({  //获取产品type
        owner : "GLOBAL",
        field : "SERVICE_TYPE"
    })

    dictPriceModel = this.dict.get({  //获取产品type
        owner : "PACKAGE_BILLING",
        field : "PERIOD_TYPE"
    })
    packageBilling = this.dict.get({  //计费周期
        owner : "BILLING_MODE",
        field : "TYPE"
    })
    weekly = this.dict.get({  //计费周期
        owner : "PACKAGE_BILLING",
        field : "PERIOD_TYPE"
    })
    
    
    
    
}