import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Instance } from '../model/instance';
import { RestApiCfg, RestApi } from '../../../../../architecture';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class InstanceListService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    getInstances(page: number, size: number): Promise<any> {
        let url = this.restApiCfg.getRestApiUrl('hosts.instance.get');

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

        return this.restApi.get(url, pathParams, undefined, undefined);
    }

}