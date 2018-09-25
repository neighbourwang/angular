import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg } from '../../../../architecture/core/service/restapicfg.service';
import { RestApi } from '../../../../architecture/core/service/restapi.service';
import 'rxjs/add/operator/toPromise';

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
    }

    setMsgRead(ids: Array<string>):Promise<any> {
        const body = ids;
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("user-center.msg-mng.message.setread");
        return this.restApi.request(api.method, api.url, null, null, body);
    }

    deleteMsgList(ids: Array<string>):Promise<any> {
        const body = ids;
        console.log(body, "body");
        const api = this.restApiCfg.getRestApi("user-center.msg-mng.message.delete");
        return this.restApi.request(api.method, api.url, null, null, body);
    }
       
}