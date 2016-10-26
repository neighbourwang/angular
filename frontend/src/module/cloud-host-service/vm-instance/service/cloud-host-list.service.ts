import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import { VmList,HandleVm } from '../model/vm-list.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class cloudHostServiceList {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private restApi:RestApi) {
    }

    getHostConfigList() : Promise<any>{
        const api = this.restApiCfg.getRestApi("hosts.services.get");

        const request = this.restApi.request(api.method, api.url, undefined, undefined)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
    }

    getHostList(page: number, size: number) : Promise<any>{
        const api = this.restApiCfg.getRestApi("hosts.instance.get");

        let pathParams = [
            {
                key: 'page',
                value: page
            }, 
            {
                key: 'size',
                value: size
            }
        ];
        const request = this.restApi.request(api.method, api.url, pathParams, undefined, undefined)
                           
        return request;
    }

    handleVm(senData:HandleVm) : Promise<any> { 
        const api = this.restApiCfg.getRestApi("hosts.instance.action");

        const request = this.restApi.request(api.method, api.url, undefined, undefined, senData)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
    }

}