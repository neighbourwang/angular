import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import { EntResQuota } from '../model';

@Injectable()
export class EntResQuotaCreService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 取得所有区域信息
    virtualRegions() {
        let api = this.restApiCfg.getRestApi("ent.res.quota.cre.regions.virtual.get");

        return this.restApi.request(api.method, api.url, undefined, undefined);
    }

    // 创建企业资源配额
    postEntResQuota(payload: EntResQuota) {
        let api = this.restApiCfg.getRestApi("ent.res.quota.cre.post");

        return this.restApi.request(api.method, api.url, [{ key: "_enterpriseId", value: payload.enterpriseId }], undefined, [payload]);
    }
}