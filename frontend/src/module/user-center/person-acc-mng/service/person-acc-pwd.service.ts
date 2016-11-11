
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class EditPersonAccPwdService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 获取当前登录账户信息
    putPersonAccPwd(data:any) {
        let api = this.restApiCfg.getRestApi("user-center.account-mng-pwd.edit");

        return this.restApi.request(api.method, api.url, undefined, undefined,data);
    }
}