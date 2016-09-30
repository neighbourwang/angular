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

    postPlatform(paltform: Platform) {
        let url = this.restApiCfg.getRestApiUrl("pf.cre.step.01.paltform.post");

        return this.restApi.post(url, undefined, undefined, paltform);
    }
}