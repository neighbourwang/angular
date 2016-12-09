import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';
import { Account, Organization, Role } from "../model/account.model";
import { Attest } from "../model/attest.model";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AccountMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    roles: Array<Role> = [];
    orgs: Array<Organization> = [];
    attests: Array<Attest> = [];

    // 获取帐号列表
    getAccountList(page: number, size: number) {
        let api = this.restApiCfg.getRestApi("user-center.account-mng.list");

        return this.restApi.request(api.method, api.url, [{ key: "page", value: page }, { key: "size", value: size }], undefined);
    }
    //账号搜索
    searchAccountByName(page: number, size: number,kw:string){
        let api = this.restApiCfg.getRestApi("user-center.search-account.list");

        return this.restApi.request(api.method, api.url, [{ key: "page", value: page }, { key: "size", value: size }], [{key: "userName", value: kw }]);
    }
    //获取账号详情
    getLocalAcc(id: string) {
        let api = this.restApiCfg.getRestApi("user-center.account-mng.detail");

        return this.restApi.request(api.method, api.url, [{ key: "id", value: id }], undefined);
    }
    // 启用帐号 user-center.account-mng.enableAcc
    enableAcc(id: string) {
        let api = this.restApiCfg.getRestApi("user-center.account-mng.enableAcc");

        return this.restApi.request(api.method, api.url, [{ key: "id", value: id }], undefined);
    }

    // 禁用帐号 user-center.account-mng.disableAcc
    disableAcc(id: string) {
        let api = this.restApiCfg.getRestApi("user-center.account-mng.disableAcc");

        return this.restApi.request(api.method, api.url, [{ key: "id", value: id }], undefined);
    }

    //删除帐号 user-center.account-mng.deleteAcc
    deleteAcc(id: string) {
        let api = this.restApiCfg.getRestApi("user-center.account-mng.deleteAcc");

        return this.restApi.request(api.method, api.url, [{ key: "id", value: id }], undefined);
    }


    //创建账户
    createAccount(data: any) {
        let api = this.restApiCfg.getRestApi("user-center.account-mng.create.post");

        return this.restApi.request(api.method, api.url, [], undefined, data);
    }
    //编辑本地账户
    editAccount(id: string, data: any) {
        let api = this.restApiCfg.getRestApi("user-center.account-mng.editLocal");

        return this.restApi.request(api.method, api.url, [{ key: 'id', value: id }], undefined, data);
    }

    // 获取所有角色列表
    getRoleList() {
        if (this.roles.length == 0) {
            let api = this.restApiCfg.getRestApi("user-center.account-mng.create.roleList");
            return this.restApi.request(api.method,
                api.url,
                [{ key: "page", value: 0 }, { key: "size", value: 99999 }],
                undefined)
                .then(
                res => {
                    if (res && 100 == res["resultCode"]) {
                        this.roles = res.resultContent;
                        return this.roles;
                    } else {
                        throw "error";
                    }
                });
        } else {
            return new Promise(resovle => setTimeout(resovle, 10)).then(() => this.roles);
        }
    }
    //获取部门列表
    getOrgList(index, size) {
        if (this.orgs.length == 0) {
            let api = this.restApiCfg.getRestApi("user-center.account-mng.create.orgList");

            return this.restApi.request(api.method,
                api.url,
                [{ key: "page", value: index }, { key: "size", value: size }],
                undefined)
                .then(res => {
                    if (res && 100 == res["resultCode"]) {
                        this.orgs = res.resultContent;
                        return this.orgs;
                    } else {
                        throw "error";
                    }
                });
        } else {
            return new Promise(resovle => setTimeout(resovle, 10)).then(() => this.orgs);
        }
    }

    //获取认证源列表
    getAttests(pageIndex: number, pageSize: number): Promise<any> {
        const pathParams = [
            {
                key: "page",
                value: pageIndex
            },
            {
                key: "size",
                value: pageSize
            },
            {
                key: "enterpriseId",
                value: "100"
            }
        ];

        if (this.attests.length == 0) {
            const api = this.restApiCfg.getRestApi("ent-mng.enterprise.ldap.simple.list");
            return this.restApi.request(api.method, api.url, pathParams, null, null)
                .then(res => {
                    if (res && 100 == res["resultCode"]) {
                        this.attests = res.resultContent;
                        return this.attests;
                    } else {
                        throw "error";
                    }
                });
        } else {
            return new Promise(resovle => setTimeout(resovle, 200)).then(() => this.attests);
        }
    }

    //获取AD用户表
    getAdUser(ldapid: string, pageIndex: number, pageSize: number, filterStr: string) {
        let api = this.restApiCfg.getRestApi("user-center.account-mng.aduser.get");
        let opt = {
            "filter": filterStr
        }
        return this.restApi.request(api.method, api.url, [{ key: "ldapid", value: ldapid }, { key: "page", value: pageIndex }, { key: "size", value: pageSize }], undefined, opt);
    }
    //创建 帐号
    createAdAccount(account) {
        let api = this.restApiCfg.getRestApi("user-center.account-mng.ad.create");

        return this.restApi.request(api.method, api.url, undefined, undefined, account);
    }

    ////获取单个帐号
    //getAdAccountById(id: string) {
    //    let api = this.restApiCfg.getRestApi("user-center.account-mng.ad.get");
    //    return this.restApi.request(api.method, api.url, [{ key: "id", value: id }], undefined).then(
    //        res => {
    //            if (res && 100 == res["resultCode"]) {
    //                return res.resultContent;
    //            } else {
    //                throw "error";
    //            }
    //        }
    //    );
    //}


    //编辑帐号
    editAdAccount(account) {
        let api = this.restApiCfg.getRestApi("user-center.account-mng.local.edit");
        return this.restApi.request(api.method, api.url, [{ key: "id", value: account.id }], undefined, account);
    }
}