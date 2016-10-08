import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

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
        let url = this.restApiCfg.getRestApiUrl("pf.conn.mng.platforms.get");

        return this.restApi.get(url, [{key: "page", value: page}, {key: "size", value: size}], undefined);
    }

    // 取得特定平台信息
    getPlatform(pid: String) {
        let url = this.restApiCfg.getRestApiUrl("pf.cre.paltform.get");

        return this.restApi.get(url, [{ key: "pf-id", value: pid }], undefined);
    }
    // 删除特定平台信息
    deletePlatform(pid: String) {
        let url = this.restApiCfg.getRestApiUrl("pf.cre.paltform.delete");

        return this.restApi.delete(url, [{ key: "pf-id", value: pid }], undefined, undefined);
    }
}