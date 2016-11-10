import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

@Injectable()
export class OrgMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }


    // 获取组织管理 所有机构
    getOrg(page: number, size: number) {

        let api = this.restApiCfg.getRestApi("user-center.org-mng.list");

        return this.restApi.request(api.method, api.url,undefined, [{ key: "page", value: page }, { key: "size", value: size }], undefined);
    }


}
