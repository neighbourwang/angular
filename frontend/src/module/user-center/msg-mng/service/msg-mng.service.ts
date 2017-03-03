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

    getMsgListStatus(pageIndex: number, pageSize: number, status: string):Promise<any> {
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
                key: "status",
                value: status
            }
        ];
        //console.log("Service: status=", status, " pageIndex=", pageIndex, " pageSize=", pageSize);
        const api = this.restApiCfg.getRestApi("user-center.msg-mng.message.get");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return MsgModel_mock });
    }

    setMsgRead(ids: string):Promise<any> {
        const body = [
            ids
        ];
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("user-center.msg-mng.message.setread");
        return this.restApi.request(api.method, api.url, null, null, body);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return MsgModel_mock });
    }

    deleteMsgList(ids: string):Promise<any> {
        const body = [
            ids
        ];
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("user-center.msg-mng.message.delete");
        return this.restApi.request(api.method, api.url, null, null, body);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return MsgModel_mock });
    }
       
}