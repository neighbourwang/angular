/**
 * Created by junjie on 16/10/17.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class ClMngListService {
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

    // 删除特定平台信息
    deletePlatform(pid: String) {
        let api = this.restApiCfg.getRestApi("pf.cre.paltform.delete");

        return this.restApi.request(api.method, api.url, [{ key: "pf-id", value: pid }], undefined, undefined);
    }

    // 启用特定平台
    activePlatform(pid: String) {
        let api = this.restApiCfg.getRestApi("pf.cre.paltform.active.get");

        return this.restApi.request(api.method, api.url, [{ key: "pf-id", value: pid }], undefined);
    }

    //禁用平台
    disable(pid:String){
        let api = this.restApiCfg.getRestApi("pf.cre.platform.disable.put");

        return this.restApi.request(api.method , api.url , [{key : "_id",value : pid}],undefined)
    }
}
