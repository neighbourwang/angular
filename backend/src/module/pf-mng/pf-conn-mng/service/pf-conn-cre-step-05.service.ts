import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import { Flavor } from '../model';

@Injectable()
export class PfConnCreStep05Service {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 取得云主机类型配置信息
    putFlavorQuota(platFormId: String, payload: Array<Flavor>) {
        let api = this.restApiCfg.getRestApi("pf.cre.step.05.flavor.put");

        return this.restApi.request(api.method, api.url, [{ key: "pf-id", value: platFormId }], undefined, payload);
    }
}