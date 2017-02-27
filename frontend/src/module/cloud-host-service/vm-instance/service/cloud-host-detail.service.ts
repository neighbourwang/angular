import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';



import 'rxjs/add/operator/toPromise';

@Injectable()
export class cloudHostDetailService {
    constructor(private http: Http,
        private restApiCfg: RestApiCfg,
        private dict: SystemDictionaryService,
        private restApi: RestApi) {
    }

    getHostInfo(itemId:string) : Promise<any>{
        const api = this.restApiCfg.getRestApi("vm.instance.detail");

        let pathParams = [
            {
                key: 'itemId',
                value: itemId
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
    
    computeStatus = this.dict.get({    //获取状态列表
        owner : "COMPUTE",
        field : "STATUS"
    });
}