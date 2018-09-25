import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import { InstanceVMProfile } from '../model/vm.model'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MiddlewareDetailService {
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

    postVmInfo(instanceId:string, postData:InstanceVMProfile) : Promise<any> {
        const api = this.restApiCfg.getRestApi("vm.instance.detail.updata");

        let pathParams = [
            {
                key: 'instanceId',
                value: instanceId
            }
        ];

        const request = this.restApi.request(api.method, api.url, pathParams, undefined, postData)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
    }

    getVmCpuMemGraph(vmid:string) : Promise<any>{
        const api = this.restApiCfg.getRestApi("hosts.hyper.graph");

        let pathParams = [
            {
                key: 'vmid',
                value: vmid
            },
            {
                key: 'period',
                value: "1"
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

    useType = this.dict.get({
        owner: "GLOBAL",
        field: "USE_TYPE",
    });

    serviceLevel = this.dict.get({
        owner: "GLOBAL",
        field: "SERVICE_LEVEL",
    });
}