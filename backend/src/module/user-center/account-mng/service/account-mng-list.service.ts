
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

        return this.restApi.request(api.method , api.url , [{key : "page" , value : page},{key : "size" , value : size}],undefined)
    }
     //账号搜索
    searchAccountByName(page: number, size: number,kw:string){
        let api = this.restApiCfg.getRestApi("user-center.search-account.list");

        return this.restApi.request(api.method, api.url, [{ key: "page", value: page }, { key: "size", value: size }], [{key: "userName", value: kw }]);
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

    //创建 帐号
    createAccount(account){
        let api = this.restApiCfg.getDataRestApi("user-center.account-mng.local.create");

        return this.restApi.request(api.method,api.url,undefined,undefined,account);
    }

    //获取单个帐号
    getAccountById(id : string){
        let api = this.restApiCfg.getDataRestApi("user-center.account-mng.local.get");

        return this.restApi.request(api.method , api.url,[{key : "id" , value : id}],undefined);
    }

    //编辑帐号
    editAccount(id:string , account){
        let api = this.restApiCfg.getDataRestApi("user-center.account-mng.local.edit");

        return this.restApi.request(api.method,api.url,[{key : "id" , value : id}],undefined, account);
    }

    //禁用帐号
    disableAccount(id : string){
        let api = this.restApiCfg.getDataRestApi("user-center.org-mng.user.disable");

        return this.restApi.request(api.method , api.url ,[{key : "id" , value : id}],undefined);
    }

    //启用帐号
    enableAccount(id : string){
        let api = this.restApiCfg.getDataRestApi("user-center.org-mng.user.enable");

        return this.restApi.request(api.method , api.url,[{key : "id" , value : id}],undefined);
    }

    //修改密码
    resetPasswordAccount(id : string){
        let api = this.restApiCfg.getDataRestApi("user-center.account-mng.resetPassword");

        return this.restApi.request(api.method , api.url ,[{key : "id" , value : id}],undefined);
    }

    //删除帐号

    deleteAccount (id : string ){
        let api = this.restApiCfg.getDataRestApi("user-center.account-mng.deleteAccount");

        return this.restApi.request(api.method , api.url , [{key : "id" ,value : id}],undefined);
    }



    



}
