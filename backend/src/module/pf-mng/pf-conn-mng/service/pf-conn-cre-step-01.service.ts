import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import { Platform } from '../model/platform.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PfConnCreStep01Service {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 创建平台
    postPlatform(paltform: Platform) {
        let api = this.restApiCfg.getRestApi("pf.cre.step.01.paltform.post");

        return this.restApi.request(api.method, api.url, undefined, undefined, paltform);
    }
}