
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';
import { orgs } from "../model/mock";

@Injectable()
export class AccountMngCreAdService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }


    // 获取组织管理 所有机构
    getOrg(page: number, size: number) {

        let api = this.restApiCfg.getRestApi("user-center.org-mng.list");

        //return this.restApi.request(api.method, api.url, [{ key: "page", value: page }, { key: "size", value: size }], undefined)
        //.then(
        //    res => {
        //        if (res && 100 == res["resultCode"]) {
        //            return res.resultContent;
        //        } else {
        //            throw "error";
        //        }
        //    }
        //);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => orgs).then(
            res => {
                if (res && 100 == res["resultCode"]) {
                    return res.resultContent;
                } else {
                    throw "error";
                }
            }
        );
    }

    //获取 所有角色
    getRole(): Promise<any> {
        let api = this.restApiCfg.getDataRestApi("user-center.role-mng.list");
        return this.restApi.request(api.method, api.url, [{ key: "page", value: 0 }, { key: "size", value: 9999 }], undefined).then(
            res => {
                if (res && 100 == res["resultCode"]) {
                    return res.resultContent;
                } else {
                    throw "error";
                }
            }
        );
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

        const api = this.restApiCfg.getRestApi("user-center.attest-mng.ldap.attest.simple.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => attests);
    }

    //创建 帐号
    createAccount(account) {
        let api = this.restApiCfg.getDataRestApi("user-center.account-mng.ad.create");

        return this.restApi.request(api.method, api.url, undefined, undefined, account);
    }

    //获取单个帐号
    getAccountById(id: string) {
        let api = this.restApiCfg.getDataRestApi("user-center.account-mng.ad.get");
        return this.restApi.request(api.method, api.url, [{ key: "id", value: id }], undefined).then(
            res => {
                if (res && 100 == res["resultCode"]) {
                    return res.resultContent;
                } else {
                    throw "error";
                }
            }
        );
    }

    //编辑帐号
    editAccount(id: string, account) {
        let api = this.restApiCfg.getDataRestApi("user-center.account-mng.local.edit");

        return this.restApi.request(api.method, api.url, [{ key: "id", value: id }], undefined, account);
    }

    //获取AD用户表
    getAdUser(ldapid: string, pageIndex: number, pageSize: number, filterStr: string) {
        let api = this.restApiCfg.getDataRestApi("user-center.account-mng.aduser.get");
        let opt = {
            "filter": filterStr
        }
        return this.restApi.request(api.method, api.url, [{ key: "ldapid", value: ldapid }, { key: "page", value: pageIndex }, { key: "size", value: pageSize }], undefined, opt);
    }

}
