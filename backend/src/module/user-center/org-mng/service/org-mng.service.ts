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

        return this.restApi.request(api.method, api.url,[{ key: "page", value: page }, { key: "size", value: size }], undefined);
    }

    //删除 机构
    deleteOrg (id : string){
        let api = this.restApiCfg.getRestApi("user-center.org-mng.delete");

        return this.restApi.request(api.method,api.url,[{key : "id" , value : id}],undefined);
    }

    //启用 机构
    enableOrg (id : string){
        let api = this.restApiCfg.getRestApi("user-center.org-mng.enable");

        return this.restApi.request(api.method,api.url,[{key : "id" , value : id}],undefined);
    }

    //禁用机构
    disableOrg (id : string){
        let api = this.restApiCfg.getDataRestApi("user-center.org-mng.disable");

        return this.restApi.request(api.method , api.url , [{ key : "id" , value : id}],undefined);
    }  

    //获取 未管理的机构成员列表
    getNoMngUser (page:number,size:number){
        let api = this.restApiCfg.getDataRestApi("user-center.org-mng.nomnguser.list");

        return this.restApi.request(api.method , api.url , [{ key : "page" , value : page},{ key : "size" , value : size}],undefined);
    }

    //获取未管理的云平台列表
    getNoMngPlatForm(){
        let api = this.restApiCfg.getDataRestApi("user-center.org-mng.nomngplatform.list");

        return this.restApi.request(api.method , api.url ,undefined,undefined);
    }




}
