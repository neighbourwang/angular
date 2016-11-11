
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

@Injectable()
export class AccountMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }


    // 获取组织管理 所有机构
    getOrg(page: number, size: number) {

        let api = this.restApiCfg.getRestApi("user-center.org-mng.list");

        return this.restApi.request(api.method, api.url,[{ key: "page", value: page }, { key: "size", value: size }], undefined);
    }

    // 获取所有账户
    getAccount (page : number , size : number){
        let api = this.restApiCfg.getDataRestApi("user-center.account-mng.list");

        return this.restApi.request(api.method , api.url , undefined , [{key : "page" , value : page},{key : "size" , value : size}])
    }

    //获取 所有角色
    getRole () : Promise<any>{
        let api = this.restApiCfg.getDataRestApi("user-center.role-mng.list");

        return this.restApi.request(api.method , api.url , [{key : "page" , value : 0},{key : "size" , value : 999999}],undefined).then(
            res => {
                return Promise.resolve(res);
            }
        )
    }

    



}
