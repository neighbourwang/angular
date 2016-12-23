import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RestApiCfg, RestApi } from "../../../../architecture";

import { Admin } from "../model/admin.model";

import { enterprises, createAdminRes, updateAdminRes, getAdminByIdRes, adadminList } from
    "../model/enterprise-mock.model";

import "rxjs/add/operator/toPromise";

@Injectable()
export class EntAdminCreService {
    admin: Admin;

    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getEnterpriseById(id: string): Promise<any> {
        const pathParams = [
            {
                key: "enterpriseId",
                value: id
            }
        ];
        const api = this.restApiCfg.getRestApi("ent-mng.admin.enterprise.simple.get");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        // return new Promise(resovle => setTimeout(resovle, 200)).then(() => enterpriseOne);
    }

    getAdminById(id: String): Promise<any> {

        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];
        const api = this.restApiCfg.getRestApi("ent-mng.admin.get");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => getAdminByIdRes);
    }

    createAdmin(admin: Admin): Promise<any> {

        const pathParams = [
            {
                key: "enterpriseId",
                value: admin.enterpriseId
            }
        ];

        const api = this.restApiCfg.getRestApi("ent-mng.admin.cre.post");
        return this.restApi.request(api.method, api.url, pathParams, null, admin);


        // return new Promise(resovle => setTimeout(resovle, 200)).then(() => createAdminRes);
    }

    updateAdmin(admin: Admin): Promise<any> {
        const pathParams = [
            {
                key: "id",
                value: admin.id
            }
        ];
        const api = this.restApiCfg.getRestApi("ent-mng.admin.update.put");
        return this.restApi.request(api.method, api.url, pathParams, null, admin);

        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => updateAdminRes);
    }

    //获取认证源列表
    getAttests(pageIndex: number, pageSize: number, eid: string): Promise<any> {
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
                value: eid
            }
        ];

        const api = this.restApiCfg.getRestApi("ent-mng.enterprise.ldap.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => attests);
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
            "filter": "cn=" + filterStr
        }
        return this.restApi.request(api.method, api.url, [{ key: "ldapid", value: ldapid }, { key: "page", value: pageIndex }, { key: "size", value: pageSize }], undefined, opt);
    }

}