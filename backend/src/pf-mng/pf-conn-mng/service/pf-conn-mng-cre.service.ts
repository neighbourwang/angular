import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg } from '../../../core/service/restapicfg.service';
import { RestApi } from '../../../core/service/restapi.service';

import 'rxjs/add/operator/toPromise';

import { Platform } from '../model/platform.model';

@Injectable()
export class PfConnMngCreService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): Promise<any> {
        return this.restApiCfg.loadCfgData();
    }

    getPlatforms() {
        let url = this.restApiCfg.getRestApiUrl("pf.conn.mng.cre.platforms.get");

        return this.restApi.get(url);
    }
}