//获取已激活平台
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlatformsActiveService {
     constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 取得所有产品目录
    getPlatformsActive() {
        let api = this.restApiCfg.getRestApi("platforms.activation.get");

        return this.restApi.request(api.method, api.url, [], undefined);
    }
}