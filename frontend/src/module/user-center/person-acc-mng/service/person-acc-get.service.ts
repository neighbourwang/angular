
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

// //model
// import { PersonAcc } from '../model/person-acc.model';

@Injectable()
export class GetPersonAccService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    // 获取当前登录账户信息
    getPersonAcc() {
        let api = this.restApiCfg.getRestApi("user-center.person-acc.mng");

        return this.restApi.request(api.method, api.url, undefined, undefined);
    }
    //用户信息
    userInfo = this.restApi.getLoginInfo().userInfo
}