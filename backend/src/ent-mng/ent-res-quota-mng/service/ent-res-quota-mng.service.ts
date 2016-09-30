import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg } from '../../../core/service/restapicfg.service';
import { RestApi } from '../../../core/service/restapi.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EntResQuotaMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): Promise<any> {
        return this.restApiCfg.loadCfgData();
    }

    getEntResQuota(page: number, size: number) {
        let url = this.restApiCfg.getRestApiUrl("ent.res.quota.get");

        return this.restApi.get(url, [{ key: "page", value: page }, { key: "size", value: size }], undefined);
    }
}