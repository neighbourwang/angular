import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import { Zone } from '../model';

@Injectable()
export class PfConnCreStep03Service {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 取得可用区资源配置信息
    putZoneQuota(platFormId: String, payload: Array<Zone>) {
        let api = this.restApiCfg.getRestApi("pf.cre.step.03.zone.put");

        return this.restApi.request(api.method, api.url, [{ key: "pf-id", value: platFormId }], undefined, payload);
    }
}