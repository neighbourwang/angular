import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RestApiCfg, RestApi } from "../../../../architecture";

import { Attest } from "../model/attest.model"
import { AdUser } from "../model/aduser.model"
import { adusers, attestDetail, attests } from "../model/attest-mock";
import "rxjs/add/operator/toPromise";

@Injectable()
export class AttMngCreService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }


    //测试认证源连通性
    testAttest(attest: Attest): Promise<any> {
        const api = this.restApiCfg.getRestApi("user-center.attest-mng.ldap.test");
        return this.restApi.request(api.method, api.url, null, null, attest);
       // return new Promise(resovle => setTimeout(resovle, 200)).then(() => attestDetail);
    }
    //创建认证源
    create(attest: Attest): Promise<any> {
        const api = this.restApiCfg.getRestApi("user-center.attest-mng.ldap.create");
        return this.restApi.request(api.method, api.url, null, null, attest);
      //  return new Promise(resovle => setTimeout(resovle, 200)).then(() => attestDetail);
    }

    //根据id获取认证源详情
    getAttest(id: string): Promise<any> {
        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];
        const api = this.restApiCfg.getRestApi("user-center.attest-mng.ldap.get");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => attestDetail);
    }

    //编辑认证源
    editAttest(attest: Attest): Promise<any> {
        const pathParams = [
            {
                key: "id",
                value: attest.id
            }
        ];
        const api = this.restApiCfg.getRestApi("user-center.attest-mng.ldap.edit");
        return this.restApi.request(api.method, api.url, pathParams, null, attest);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => attestDetail);
    }

    //修改认证帐户
    editAcc(attest: Attest): Promise<any> {
        const pathParams = [
            {
                key: "id",
                value: attest.id
            }
        ];
        const api = this.restApiCfg.getRestApi("user-center.attest-mng.ldap.editacc");
        return this.restApi.request(api.method, api.url, pathParams, null, attest);
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

    //查询AD用户
    getAdusers(attest: Attest, page: number, size: number): Promise<any> {
        const pathParams = [
            {
                key: "id",
                value: attest.id
            },
            {
                key: "page",
                value: page
            },
            {
                key: "size",
                value: size
            }
        ];
        const api = this.restApiCfg.getRestApi("user-center.attest-mng.ldap.adusers.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
      //  return new Promise(resovle => setTimeout(resovle, 200)).then(() => adusers);
    }

    //认证源简单列表（下拉框）
    getSimpleAttestList(attest: Attest, page: number, size: number): Promise<any> {

        const api = this.restApiCfg.getRestApi("user-center.attest-mng.ldap.adusers.list");
        return this.restApi.request(api.method, api.url, null, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => attests);
    }
}