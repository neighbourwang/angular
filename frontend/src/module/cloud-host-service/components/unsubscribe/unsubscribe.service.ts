import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UnsubscribeService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }

    userInfo = this.restApi.getLoginInfo().userInfo;

    deleteVm(subId, cascadeFlag) : Promise<any>{  //退订
        const api = this.restApiCfg.getRestApi("op-center.order-mng.order-cancel.get");

        let pathParams = [
            {
                key: '_subId',
                value: subId
            },
            {
                key: '_cascadeFlag',
                value: cascadeFlag
            }
        ];
        const request = this.restApi.request(api.method, api.url, pathParams, undefined)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
    }

}