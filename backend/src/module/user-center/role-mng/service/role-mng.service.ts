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


    //获得所有权限管理列表
    getRoleList ( page:number , size : number){
        let api = this.restApiCfg.getDataRestApi("user-center.org-mng.role.list");

        return this.restApi.request(api.method , api.url , [{key : "page" , value : page},{key : "size" , value : size}],undefined);
    }

    //


}
