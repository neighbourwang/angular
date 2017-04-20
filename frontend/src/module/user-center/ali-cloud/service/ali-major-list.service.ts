import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel, SystemDictionaryService } from '../../../../architecture';

//model
import {MajorList_mock, MajorInfo_mock, Test_mock, Success_mock, DepartList_mock} from "../model/major-list.mock.model";
import { AliMajorList } from '../model/ali-major-list.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AliMajorService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getData(): Promise<any>{
        const api= this.restApiCfg.getRestApi("user-center.ali-cloud.list");
        return this.restApi.request(api.method, api.url, null, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => MajorList_mock);
    }

    getDetail(id: string): Promise<any>{
        const pathParams=[
            {
                key:"id",
                value: id
            }
        ];
        const api= this.restApiCfg.getRestApi("user-center.ali-cloud.majorinfo");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => MajorInfo_mock);
    }

    testMajor(majorInfo: AliMajorList): Promise<any>{
        const api= this.restApiCfg.getRestApi("user-center.ali-cloud.majortest");
        return this.restApi.request(api.method, api.url, null, null,
            {
                "id": majorInfo.id,
                "accessKey": majorInfo.accessKey,
                "accessSecret": majorInfo.accessSecret,
                "loginName": majorInfo.loginName
            });
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => Test_mock);
    }

    edit(id: string, majorInfo: AliMajorList): Promise<any>{
        const pathParams=[
            {
                key:"id",
                value: id
            }
        ];
         const api= this.restApiCfg.getRestApi("user-center.ali-cloud.edit");
         return this.restApi.request(api.method, api.url, pathParams, null, {
             "accessKey": majorInfo.accessKey,
             "accessSecret": majorInfo.accessSecret
         });
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => Success_mock);
    }
    editDepart(id: string, departId: string): Promise<any>{
        const pathParams=[
            {
                key:"id",
                value: id
            }
        ];
         const api= this.restApiCfg.getRestApi("user-center.ali-cloud.editdepart");
         return this.restApi.post(api.url, pathParams, null, departId, true);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => Success_mock);
    }

    departMajor(): Promise<any>{
         const api= this.restApiCfg.getRestApi("user-center.ali-cloud.departmajorlist");
         return this.restApi.request(api.method, api.url, null, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => DepartList_mock);
    }

}
