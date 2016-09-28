import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg } from '../../../core/service/restapicfg.service';
import { RestApi } from '../../../core/service/restapi.service';

import { Platform } from '../model/platform.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PfCreStep01Service {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): Promise<any> {
        return this.restApiCfg.loadCfgData();
    }

    postPlatform(paltform: Platform) {
        let url = this.restApiCfg.getRestApiUrl("pf.cre.step.01.paltform.post");

        return this.restApi.post(url, undefined, undefined, paltform);
    }
}