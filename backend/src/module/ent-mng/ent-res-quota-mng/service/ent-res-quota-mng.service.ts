import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

@Injectable()
export class EntResQuotaMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 取得企业配额信息
    getEntResQuota(page: number, size: number) {
        let api = this.restApiCfg.getRestApi("ent.res.quota.mng.resouces.quotas.get");

        return this.restApi.request(api.method, api.url, [{ key: "page", value: page }, { key: "size", value: size }], undefined);
    }
}