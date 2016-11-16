import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

@Injectable()
export class RoleMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }


    // editAccount(id:string , account){
    //     let api = this.restApiCfg.getDataRestApi("user-center.account-mng.local.edit");

    //     return this.restApi.request(api.method,api.url,[{key : "id" , value : id}],undefined, account);
    // }

    getRoleList ( page:number , size : number){
        let api = this.restApiCfg.getDataRestApi("user-center.org-mng.role.list");

        return this.restApi.request(api.method , api.url , [{key : "page" , value : page},{key : "size" , value : size}],undefined);
    }


}
