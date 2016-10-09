import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RestApiCfg, RestApi } from "../../../../architecture";

import { adminList } from "../model/enterprise-mock.model";

import { Admin } from "../model/admin.model";

import "rxjs/add/operator/toPromise";

@Injectable()
export class EntAdminMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }


    getAdmins(pageIndex: number, pageSize: number): Promise<any> {
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


        const api = this.restApiCfg.getRestApi("ent-mng.admin.all.get");
        return this.restApi.request(api.method, api.url,pathParams,null,null);


        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => adminList);
    }

    getEnterpriseAdmins(enterpriseId: string, pageIndex: number, pageSize: number): Promise<any> {
        const pathParams = [
            {
                key: "enterpriseId",
                value: enterpriseId
            },
            {
                key: "page",
                value: pageIndex
            },
            {
                key: "size",
                value: pageSize
            }
        ];
        const api = this.restApiCfg.getRestApi("ent-mng.enterprise.admin.get");
        return this.restApi.request(api.method, api.url,pathParams,null,null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => adminList);
    }

    updateAdminStatus(admins: Admin[], status: number): Promise<any> {

        const pathParams = [
            {
                key: "status",
                value: status
            }
        ];

        const api = this.restApiCfg.getRestApi("ent-mng.admin.updateStatus.put");
        return this.restApi.request(api.method, api.url,pathParams,null,admins);


        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => adminList);
    }

    deleteAdmins(admins: Admin[]): Promise<any> {


        const api = this.restApiCfg.getRestApi("ent-mng.admin.del.delete");
        return this.restApi.request(api.method, api.url,null,null,admins);

        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => adminList);
    }

    deleteAdmin(id:string): Promise<any> {
        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];
        const api = this.restApiCfg.getRestApi("ent-mng.admin.delOne.delete");
        return this.restApi.request(api.method, api.url, pathParams,null,null);

        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => adminList);
    }

   
}