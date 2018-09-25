import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel ,SystemDictionaryService} from '../../../../architecture';

//model
// import {Criteria} from "../model/criteria.model";
// import { Region_mock } from '../model/phy-list.mock.model';

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
    
    //字典
    dictStatus = this.dict.get(
             {      
                owner : "WORKSHEET",
                field : "STATUS"             //状态
            }             
    );
    dictType = this.dict.get(
             {      
                owner : "WORKSHEET",
                field : "TYPE"             //类别
            }             
    );
     dictEmergency = this.dict.get(
             {      
                owner : "WORKSHEET",
                field : "EMERGENCY"             //紧急程度
            }             
    );

    //获取所有工单   
    //  getCases(pageIndex: number, pageSize:number,subject:string,tenantId:string,type:string,status:string,emergency:string): Promise<any> {
    //     const pathParams = [
    //         {
    //             key: "page",
    //             value: pageIndex
    //         },
    //         {
    //             key: "size",
    //             value: pageSize
    //         },  
    //         {
    //             key: "subject",
    //             value: subject
    //         },  
    //         {
    //             key: "tenantId",
    //             value: tenantId
    //         },  
    //         {
    //             key: "type",
    //             value: type
    //         },  
    //         {
    //             key: "status",
    //             value: status
    //         }, 
    //         {
    //             key: "emergency",
    //             value: emergency
    //         },          
    //     ];
    //     const api = this.restApiCfg.getRestApi("case-mng.case.search");
    //     return this.restApi.request(api.method, api.url, pathParams, null, null);
    //    // return new Promise(resovle => setTimeout(resovle, 200)).then(() => PhysicalList_mock);
    // }

    getCases(pageIndex: number, pageSize:number,subject:string,tenantId:string,type:string,status:string,emergency:string): Promise<any> {
        const pathParams = [
            {
                key: "page",
                value: pageIndex
            },
            {
                key: "size",
                value: pageSize
            },          
        ]
        const api = this.restApiCfg.getRestApi("case-mng.case.search");
        return this.restApi.request(api.method, api.url, pathParams, null, {
            
            "subject": subject,
            "tenantId": tenantId,
            "type": type,
            "status": status,
            "emergency": emergency

        });
    }

    //获取企业下拉列表
    getEnterprises(): Promise<any>{
         const api = this.restApiCfg.getRestApi("case-mng.case.enterprise.get");
        return this.restApi.request(api.method, api.url, null, null,null  );
    }

    

}
