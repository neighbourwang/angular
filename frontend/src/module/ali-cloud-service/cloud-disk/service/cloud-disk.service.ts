import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

import { regionModel, keysecretModel } from '../model/cloud-disk.model';

@Injectable()
export class AliCloudDiskService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    getKeySecret():Promise<any> {
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-disk.key-secret.get");
        return this.restApi.request(api.method, api.url, null, null, null);
    }

    getAllRegions(keysecret: keysecretModel):Promise<any> {
        /*
        const pathParams = [
            {
                key: "page",
                value: pageIndex
            },
            {
                key: "size",
                value: pageSize
            },
            {
                key: "status",
                value: status
            }
        ];
        */
        const body = {
            "accessId": keysecret.accessId,
            "accessSecret": keysecret.accessSecret
        }
        console.log(body, "body")
        const api = this.restApiCfg.getRestApi("al-cloud.cloud-disk.regions.get");
        return this.restApi.request(api.method, api.url, null, null, body);
    }
       
}