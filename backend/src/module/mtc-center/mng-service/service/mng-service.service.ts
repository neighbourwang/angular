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

    //获取企业下拉列表
    getEnterprises(): Promise<any>{
        const api = this.restApiCfg.getRestApi("mtc-center.mng-service.enterprise");
        console.log("searchDic",this.searchDic);
        return this.restApi.request(api.method, api.url, null, null,null  );
    }

    getData(pageIndex: number, pageSize: number, serviceStatus: string, enterpriseId: string, serviceName: string, serviceObjectCode: string,
            searchTypeCode: string, keyWords: string): Promise<any>{
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
/*        const api= this.restApiCfg.getRestApi("user-center.case-mng.list");
        return this.restApi.request(api.method, api.url, pathParams, null,
            {
                "serviceStatus": serviceStatus,
                "enterpriseId":enterpriseId,
                "serviceName": serviceName,
                "serviceObjectCode": serviceObjectCode,
                "searchTypeCode": searchTypeCode,
                "keyWords": keyWords

            });*/
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => ServiceList_mock);

    }

    serviceFollow(serviceId: string, followInfo: string): Promise<any>{
        const pathParams=[
            {
                key:"serviceId",
                value: serviceId
            }
        ];
        const api = this.restApiCfg.getRestApi("mtc-center.mng-service.followservice");
        return this.restApi.request(api.method, api.url, pathParams, null,
            {
                "followInfo": followInfo
            });
    }
}
