import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import { Storage } from '../model';

@Injectable()
export class PfConnCreStep04Service {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 取得存储资源配置信息
    putStorageQuota(platFormId: String, payload: Array<Storage>) {
        let api = this.restApiCfg.getRestApi("pf.cre.step.04.storage.put");

        return this.restApi.request(api.method, api.url, [{ key: "pf-id", value: platFormId }], undefined, payload);
    }
}