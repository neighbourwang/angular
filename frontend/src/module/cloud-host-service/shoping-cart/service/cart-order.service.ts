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

    //数据字典所用到的值
    dictProductType = this.dict.get({  //获取产品type
        owner : "GLOBAL",
        field : "SERVICE_TYPE"
    })
    dictPriceModel = this.dict.get({  //获取产品type
        owner : "PACKAGE_BILLING",
        field : "PERIOD_TYPE"
    })
    orderStatus = this.dict.get({  //获取订单状态
        owner : "ORDER",
        field : "STATUS"
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