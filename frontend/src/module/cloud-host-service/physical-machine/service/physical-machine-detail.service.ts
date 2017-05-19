import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';



import 'rxjs/add/operator/toPromise';

@Injectable()
export class PhysicalMachineDetailService {
    constructor(private http: Http,
        private restApiCfg: RestApiCfg,
        private dict: SystemDictionaryService,
        private restApi: RestApi) {
    }

    
    getPmInfo(pmId:string) : Promise<any>{
        const api = this.restApiCfg.getRestApi("phymachine.detail");

        let pathParams = [
            {
                key: 'pmId',
                value: pmId
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
        owner : "PM",
        field : "SUB_STATUS"
    });
}