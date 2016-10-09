import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

import {Platform} from '../model/platform.model'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PfConnMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 取得全部平台信息
    getPlatforms(page: number, size: number) {
        let api = this.restApiCfg.getRestApi("pf.conn.mng.platforms.get");

        return this.restApi.request(api.method, api.url, [{ key: "page", value: page }, { key: "size", value: size }], undefined);
    }

    // 取得特定平台信息
    getPlatform(pid: String) {
        let api = this.restApiCfg.getRestApi("pf.cre.paltform.get");

        return this.restApi.request(api.method, api.url, [{ key: "pf-id", value: pid }], undefined);
    }

    // 启用特定平台
    activePlatform(pid: String) {
        let api = this.restApiCfg.getRestApi("pf.cre.paltform.active.get");

        return this.restApi.request(api.method, api.url, [{ key: "pf-id", value: pid }], undefined);
    }

    // 删除特定平台信息
    deletePlatform(pid: String) {
        let api = this.restApiCfg.getRestApi("pf.cre.paltform.delete");

        return this.restApi.request(api.method, api.url, [{ key: "pf-id", value: pid }], undefined, undefined);
    }

    // 取得可用区资源配置信息
    zoneQuota(platFormId: String) {
        let api = this.restApiCfg.getRestApi("pf.cre.zone.get");

        return this.restApi.request(api.method, api.url, [{ key: "pf-id", value: platFormId }], undefined);
    }

    // 取得存储资源配置信息
    storageQuota(platFormId: String) {
        let api = this.restApiCfg.getRestApi("pf.cre.storage.get");

        return this.restApi.request(api.method, api.url, [{ key: "pf-id", value: platFormId }], undefined);
    }

    // 取得云主机类型配置信息
    flavorQuota(platFormId: String) {
        let api = this.restApiCfg.getRestApi("pf.cre.flavor.get");

        return this.restApi.request(api.method, api.url, [{ key: "pf-id", value: platFormId }], undefined);
    }
}