/**
 * Created by junjie on 16/10/19.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class ClMngCreStep1Service {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private restApi:RestApi) {
    }

    // 取得全部平台信息
    //getPlatforms(page: number, size: number) {
    //
    //    let api = this.restApiCfg.getRestApi("pf.conn.mng.platforms.get");
    //
    //    return this.restApi.request(api.method, api.url, [{ key: "page", value: page }, { key: "size", value: size }], undefined);
    //}

    // 获取云平台类型的数据字典
    getPlatFormType() {
        let api = this.restApiCfg.getRestApi("sysdic.owner.field");

        return this.restApi.request(api.method, api.url, [
            {
                key: "_owner",
                value: 'PLATFORM'
            }, {
                key: "_field",
                value: "TYPE"
            }],undefined)
    }
}
