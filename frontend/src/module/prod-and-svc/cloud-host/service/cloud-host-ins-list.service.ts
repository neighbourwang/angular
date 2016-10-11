import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Instance, InstanceAction } from '../model/instance';
import { RestApiCfg, RestApi } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class InstanceListService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    getInstances(page: number, size: number): Promise<any> {
        let api = this.restApiCfg.getRestApi('hosts.instance.get');

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

        return this.restApi.request(api.method, api.url, pathParams, undefined, undefined);
    }

    updateInstanceStatus(action: InstanceAction): Promise<any> {
        let api = this.restApiCfg.getRestApi('hosts.instance.action');

        return this.restApi.request(api.method, api.url, undefined, undefined, action);
    }

}