import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel, SystemDictionaryService } from '../../../../architecture';

//model
import { CaseMngList } from '../model/case-mng-list.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CaseMngService {
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

    getData(pageIndex: number, pageSize: number, subject: string, type: string, status: string, emergency: string): Promise<any>{
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
        const api= this.restApiCfg.getRestApi("user-center.case-mng.list");
        return this.restApi.request(api.method, api.url, pathParams, null,
            {
                "emergency": emergency,
                "status":status,
                "type": type,
                "subject": subject

            });
    }

    creat(criteria: CaseMngList): Promise<any>{
        const api= this.restApiCfg.getRestApi("user-center.case-mng.create");
        return this.restApi.request(api.method, api.url, null, null,
            {
                "contact": criteria.contact,
                "contactNo": criteria.contactNo,
                "details": criteria.details,
                "emergency": criteria.emergency,
                "subject": criteria.subject,
                "type": criteria.type
            });
    }
    edit(id: string, criteria: CaseMngList): Promise<any>{
        const pathParams=[
            {
                key:"id",
                value: id
            }
        ];
        const api= this.restApiCfg.getRestApi("user-center.case-mng.edit");
        return this.restApi.request(api.method, api.url, pathParams, null,
            {
                "contact": criteria.contact,
                "contactNo": criteria.contactNo,
                "details": criteria.details,
                "emergency": criteria.emergency,
                "subject": criteria.subject,
                "type": criteria.type
        });
    }

    delete(id: string): Promise<any>{
        const pathParams=[
            {
                key:"id",
                value: id
            }
        ];
        const api= this.restApiCfg.getRestApi("user-center.case-mng.delete");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
    }

    getBasicInfo(id: string): Promise<any>{
        const pathParams=[
            {
                key:"id",
                value: id
            }
        ];
        const api= this.restApiCfg.getRestApi("user-center.case-mng.basicInfo");
        return this.restApi.request(api.method, api.url, pathParams, null, null).then(
            res =>{
                if (res && 100 == res["resultCode"]) {
                    return res.resultContent;
                } else {
                    throw "error";
                }
            }
        );
    }

    getHandelInfo(id: string): Promise<any>{
        const pathParams=[
            {
                key:"id",
                value: id
            }
        ];
        const api= this.restApiCfg.getRestApi("user-center.case-mng.handleInfo");
        return this.restApi.request(api.method, api.url, pathParams, null, null).then(
            res =>{
                if (res && 100 == res["resultCode"]) {
                    return res.resultContent;
                } else {
                    throw "error";
                }
            }
        );
    }

    getClosedInfo(id: string): Promise<any>{
        const pathParams=[
            {
                key:"id",
                value: id
            }
        ];
        const api= this.restApiCfg.getRestApi("user-center.case-mng.closedInfo");
        return this.restApi.request(api.method, api.url, pathParams, null, null).then(
            res =>{
                if (res && 100 == res["resultCode"]) {
                    return res.resultContent;
                } else {
                    throw "error";
                }
            }
        );
    }



}
