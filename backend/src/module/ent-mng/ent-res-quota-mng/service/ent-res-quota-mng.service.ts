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

    // 取得所有企业信息
    enterprises() {
        let api = this.restApiCfg.getRestApi("ent.res.quota.mng.enterprises.get");

        return this.restApi.request(api.method, api.url, [{ key: "page", value: 1 }, { key: "size", value: 1000 }], undefined);
    }

    // 取得企业配额信息
    getEntResQuota(page: number, size: number, entId?: String) {
        let api = null;

        if (!entId) {
            api = this.restApiCfg.getRestApi("ent.res.quota.mng.resouces.quotas.get");
        } else {
            api = this.restApiCfg.getRestApi("ent.res.quota.mng.resouces.ent.quotas.get");
        }

        return this.restApi.request(api.method, api.url, [{ key: "ent-id", value: entId}, { key: "page", value: page }, { key: "size", value: size }], undefined);
    }

    // 删除企业资源配额信息
    deleteEntResQuota(id: String) {
    }

    // 激活企业资源配额信息
    activeEntResQuota(id: String) {
    }

    // 取消激活企业资源配额信息
    deactiveEntResQuota(id: String) {
    }
}