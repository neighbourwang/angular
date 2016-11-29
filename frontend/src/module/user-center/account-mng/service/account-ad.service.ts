import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import { Account, Organization, Role } from "../model/account.model";
import { Attest } from "../model/attest.model";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AccountMngAdService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    roles: Array<Role> = [];
    orgs: Array<Organization> = [];
    attests: Array<Attest> = [];
    //获取账号详情
    getLocalAcc(id: string) {
        let api = this.restApiCfg.getRestApi("user-center.account-mng.detail");

        return this.restApi.request(api.method, api.url, [{ key: "id", value: id }], undefined);
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
    getOrgList(index,size) {
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
            }
        ];

        if (this.attests.length == 0) {
            const api = this.restApiCfg.getRestApi("user-center.attest-mng.ldap.attest.simple.list");
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
    //创建账户
    createAccount(data: any) {
        let api = this.restApiCfg.getRestApi("user-center.account-mng.create.post");

        return this.restApi.request(api.method, api.url, [], undefined, data);
    }

    //编辑帐号
    editAccount(id: string, account) {
        let api = this.restApiCfg.getRestApi("user-center.account-mng.local.edit");

        return this.restApi.request(api.method, api.url, [{ key: "id", value: id }], undefined, account);
    }
}