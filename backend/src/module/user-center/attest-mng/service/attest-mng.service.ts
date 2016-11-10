import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RestApiCfg, RestApi } from "../../../../architecture";

import "rxjs/add/operator/toPromise";

@Injectable()
export class EntLdapMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }


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


        const api = this.restApiCfg.getRestApi("ent-mng.admin.all.get");
        return this.restApi.request(api.method, api.url, pathParams, null, null);


        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => adminList);
    }

   
}