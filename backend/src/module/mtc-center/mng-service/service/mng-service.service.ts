import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

//model
import { ServiceList_mock } from "../model/mng-service-list.mock.model";

import 'rxjs/add/operator/toPromise';


@Injectable()
export class MngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    typeDic= this.dict.get({
        owner: "SUPERVISE_SERVICE",
        field: "TYPE"
    });

    searchDic= this.dict.get({
        owner: "SUPERVISE_SERVICE",
        field: "SEARCH"
    });

    statusDic= this.dict.get({
        owner: "SUPERVISE_SERVICE",
        field: "STATUS"
    });

    serviceTypeDic= this.dict.get({
        owner: "SUPERVISE_SERVICE",
        field: "PERIOD"
    });

    //获取企业下拉列表
    getEnterprises(): Promise<any>{
        const api = this.restApiCfg.getRestApi("mtc-center.mng-service.enterprise");
        return this.restApi.request(api.method, api.url, null, null,null  );
    }

    getServiceNameList(): Promise<any>{
        const api = this.restApiCfg.getRestApi("mtc-center.mng-service.servicename");
        return this.restApi.request(api.method, api.url, null, null,null  );
    }

    getData(pageIndex: number, pageSize: number, state: string, tenantId: string, name: string, instanceName: string,
            serviceNo: string, serviceObjectType: string): Promise<any>{

        const api= this.restApiCfg.getRestApi("mtc-center.mng-service.list");
        return this.restApi.request(api.method, api.url, null, null,
            {
                "state": state,
                "tenantId":tenantId,
                "name": name,
                "instanceName": instanceName,
                "serviceNo": serviceNo,
                "serviceObjectType": serviceObjectType,
                "pageParameter":{
                    "currentPage":pageIndex,
                    "size":pageSize
                }

            });
       // return new Promise(resovle => setTimeout(resovle, 200)).then(() => ServiceList_mock);

    }

    serviceFollow(itemId: string, Info: string): Promise<any>{
        const pathParams=[
            {
                key:"itemId",
                value: itemId
            }
        ];
        const api = this.restApiCfg.getRestApi("mtc-center.mng-service.followservice");
        return this.restApi.request(api.method, api.url, pathParams, null,
            {
                "msg": Info
            });
    }

    serviceUpdate(itemId: string, Info: string): Promise<any>{
        const pathParams=[
            {
                key:"itemId",
                value: itemId
            }
        ];
        const api = this.restApiCfg.getRestApi("mtc-center.mng-service.updateservice");
        return this.restApi.request(api.method, api.url, pathParams, null,
            {
                "message": Info
            });
    }
}
