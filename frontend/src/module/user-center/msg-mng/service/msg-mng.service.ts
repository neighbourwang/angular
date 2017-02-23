import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

import { MsgModel_mock } from '../model/msg-alert.mock';

@Injectable()
export class MsgMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    getMsgAlert():Promise<any> {
        //const api = this.restApiCfg.getRestApi("phy-mng.phy-net-mng.network.list");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return MsgModel_mock });
    }

    getMsgListAll(pageIndex: number, pageSize: number):Promise<any> {
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
        //const api = this.restApiCfg.getRestApi("phy-mng.phy-net-mng.network.list");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return MsgModel_mock });
    }

    getMsgListUnRead(pageIndex: number, pageSize: number):Promise<any> {
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
        //const api = this.restApiCfg.getRestApi("phy-mng.phy-net-mng.network.list");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return MsgModel_mock });
    }

    getMsgListRead(pageIndex: number, pageSize: number):Promise<any> {
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
        //const api = this.restApiCfg.getRestApi("phy-mng.phy-net-mng.network.list");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return MsgModel_mock });
    }

   
}