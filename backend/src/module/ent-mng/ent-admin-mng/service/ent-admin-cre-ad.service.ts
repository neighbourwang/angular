import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RestApiCfg, RestApi } from "../../../../architecture";

import { Admin } from "../model/admin.model";

import { enterprises, createAdminRes, updateAdminRes, getAdminByIdRes } from "../model/enterprise-mock.model";

import "rxjs/add/operator/toPromise";

@Injectable()
export class EntAdminCreADService {
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

    getEnterprise(): Promise<any> {

        const pathParams = [
            {
                key: "page",
                value: 1
            },
            {
                key: "size",
                value: 999
            }

        ];

        const api = this.restApiCfg.getRestApi("ent-mng.admin.cre.enterprise.get");
        return this.restApi.request(api.method, api.url, pathParams,null,null);

       // return new Promise(resovle => setTimeout(resovle, 200)).then(() => enterprises);
    }

    createAdmin(admin: Admin): Promise<any> {

        const pathParams = [
            {
                key: "enterprise",
                value: admin.enterpriseId
            }
        ];

        const api = this.restApiCfg.getRestApi("ent-mng.admin.cre.post");
        return this.restApi.request(api.method, api.url, pathParams, null, admin);


        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => createAdminRes);
    }

    updateAdmin(admin: Admin): Promise<any>

    updateAdmin(admin: Admin): Promise<any> {
        const pathParams = [
            {
                key: "id",
                value: admin.id
            }
        ];


        const api = this.restApiCfg.getRestApi("ent-mng.admin.update.put");
        return this.restApi.request(api.method, api.url, pathParams, null, admin);

        // return new Promise(resovle => setTimeout(resovle, 200)).then(() => updateAdminRes);
    }
}

