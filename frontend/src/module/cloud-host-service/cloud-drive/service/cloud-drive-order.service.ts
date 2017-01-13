import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import { PayLoad } from '../model/attr-list.model';
import { TimeLineData } from '../model/services.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class cloudDriveServiceOrder {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }

    getHostConfigList() : Promise<any>{
  
        const api = this.restApiCfg.getRestApi("hosts.services.get");

        let pathParams = [
            {
                key: 'id',
                value: "1"
            }
        ];

        const request = this.restApi.request(api.method, api.url, pathParams, undefined)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                console.log(JSON.stringify(res.resultContent))
                                return res.resultContent;
                            });
        return request;
    }

    saveOrder(payload: PayLoad[]): Promise<any> {
        let api = this.restApiCfg.getRestApi('hosts.order.add');
        return this.restApi.request(api.method, api.url, undefined, undefined, payload);
    }
    addCart(payload: PayLoad[]): Promise<any> {
        let api = this.restApiCfg.getRestApi('shopping.cart.add');
        return this.restApi.request(api.method, api.url, undefined, undefined, payload);
    }

    dictRelyType = this.dict.get({    //rely_type
        owner : "GLOBAL",
        field : "RELY_TYPE"
    });
}