import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import { SerivceConfigChangeResp } from '../host-reconfig/changeConfig.model';

@Injectable()
export class DiskReconfigService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private restApi:RestApi) {
    }

	getZoneList(instanceId: string, serviceType: string) : Promise<SerivceConfigChangeResp>{
        const api = this.restApiCfg.getRestApi("change.vm.disk.config");

        let pathParams = [
            {
                key: 'instanceId',
                value: instanceId
            },
            {
            	key: 'serviceType',
            	value: serviceType
            }
        ];
        const request = this.restApi.request(api.method, api.url, pathParams, undefined, undefined)
                             .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                             });
                           
        return request;
    }

}