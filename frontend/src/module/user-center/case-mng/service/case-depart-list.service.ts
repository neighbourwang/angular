import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel, SystemDictionaryService } from '../../../../architecture';

//model
import { CaseMngList } from '../model/case-mng-list.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CaseDepartService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    typeDic = this.dict.get({
        owner: "WORKSHEET",
        field: "TYPE"
    });
    statusDic = this.dict.get({
        owner: "WORKSHEET",
        field: "STATUS"
    });
    emergencyDic = this.dict.get({
        owner: "WORKSHEET",
        field: "EMERGENCY"
    });
    userInfo = this.restApi.getLoginInfo().userInfo;


    getData(pageIndex: number, pageSize: number, creatorId: string,  subject: string, type: string, status: string, emergency: string): Promise<any>{
        const pathParams=[
            {
                key:"page",
                value: pageIndex
            },
            {
                key:"size",
                value: pageSize
            }
        ];
        const api= this.restApiCfg.getRestApi("user-center.case-depart.list");
        return this.restApi.request(api.method, api.url, pathParams, null,
            {
                "creatorId": creatorId,
                "emergency": emergency,
                "status":status,
                "type": type,
                "subject": subject

            });
    }

    getUserList(): Promise<any>{
        const pathParams=[
            {
                key:"organizationId",
                value: this.userInfo.organizationId
            }
        ];
        const api= this.restApiCfg.getRestApi("user-center.case-depart.user");
        console.log("userInfo",this.userInfo);
        return this.restApi.request(api.method, api.url, pathParams, null, null);
    }

}
