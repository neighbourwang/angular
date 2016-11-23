import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../../architecture';

import 'rxjs/add/operator/toPromise';

import {Image} from '../model/image.model';
import { CriteriaQuery } from '../model/criteria-Query.model'
@Injectable()
export class OpenstackMngService{
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) {
    }

    getImages(criteriaQuery: CriteriaQuery, pageIndex: number, pageSize: number): Promise<any>{
        const pathParams = [
            {
                key: "page",
                value: pageIndex
            },
            {
                key: "size",
                value: pageSize
            }
        ];
        const api = this.restApiCfg.getRestApi('host-mng.openstack-mng.image.list');
        return this.restApi.request(api.method, api.url, pathParams, null, {
            "type": criteriaQuery.type,
            "tenantId": criteriaQuery.tenantId})
    }
}