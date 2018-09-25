import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RestApiCfg, RestApi } from "../../../../architecture";

import { Attest } from "../model/attest.model"
import { AdUser } from "../model/aduser.model"
import { adusers, attestDetail, attests } from "../model/attest-mock";
import "rxjs/add/operator/toPromise";

@Injectable()
export class AttMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
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

        const api = this.restApiCfg.getRestApi("user-center.attest-mng.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => attests);
    }
    //删除认证源
    deleteAttest(attest: Attest): Promise<any> {
        const pathParams = [
            {
                key: "id",
                value: attest.id
            }
        ];
        const api = this.restApiCfg.getRestApi("user-center.attest-mng.ldap.delete");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => attestDetail);
    }

    //启用/禁用认证源
    upateStatus(attest: Attest, status: string): Promise<any> {
        const pathParams = [
            {
                key: "id",
                value: attest.id
            },
            {
                key: "status",
                value: status
            }
        ];
        const api = this.restApiCfg.getRestApi("user-center.attest-mng.ldap.edit.status");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => attestDetail);
    }
}