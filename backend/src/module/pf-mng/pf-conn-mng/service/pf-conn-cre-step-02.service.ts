import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PfConnCreStep02Service {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 各资源项目同步数量取得
    resSyncCount(platFormId: String) {
        let api = this.restApiCfg.getRestApi("pf.cre.step.01.synchronize.count.get");

        return this.restApi.request(api.method, api.url, [{ key: "pf-id", value: platFormId }], undefined);
    }

    // 可用区同步
    syncZones(platFormId: String) {
        let api = this.restApiCfg.getRestApi("pf.cre.step.02.zones.synchronize.get");

        return this.restApi.request(api.method, api.url, [{ key: "pf-id", value: platFormId }], undefined);
    }

    // 存储同步
    syncStorages(platFormId: String) {
        let api = this.restApiCfg.getRestApi("pf.cre.step.02.storages.synchronize.get");

        return this.restApi.request(api.method, api.url, [{ key: "pf-id", value: platFormId }], undefined);
    }

    // 云主机类型同步
    syncFlavors(platFormId: String) {
        let api = this.restApiCfg.getRestApi("pf.cre.step.02.flavors.synchronize.get");

        return this.restApi.request(api.method, api.url, [{ key: "pf-id", value: platFormId }], undefined);
    }

    // 可用域同步
    syncRegions(platFormId: String) {
        let api = this.restApiCfg.getRestApi("pf.cre.step.02.regions.synchronize.get");

        return this.restApi.request(api.method, api.url, [{ key: "pf-id", value: platFormId }], undefined);
    }

    // 镜像同步
    syncImages(platFormId: String) {
        let api = this.restApiCfg.getRestApi("pf.cre.step.02.images.synchronize.get");

        return this.restApi.request(api.method, api.url, [{ key: "pf-id", value: platFormId }], undefined);
    }
}