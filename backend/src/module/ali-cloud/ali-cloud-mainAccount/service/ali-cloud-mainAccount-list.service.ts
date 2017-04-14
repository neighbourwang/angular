import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel,SystemDictionaryService } from '../../../../architecture';

import{mainAccountList_mock} from '../model/mock';
//model

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AliCloudMainAccountMngService {
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
        owner : "PM",
        field : "STATUS"             //状态
    }             
    );
    dictType = this.dict.get(
    //     {      
    //     owner : "GLOBAL ",
    //     field : "SERVICE_TYPE"      //账号类型
    // }             
    );

    //获取主账号列表
    getMainAccounts():Promise<any>{    
         const pathParams = [
        //     {
        //         key: "page",
        //         value: pageIndex
        //     },              
         ]
         const api = this.restApiCfg.getRestApi("ali-mainAccount-list.get");
        //return this.restApi.request(api.method, api.url, pathParams, null, { });
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => mainAccountList_mock);
    }
    
    //修改主账号状态
     updateStatusAndDelete(accountId:string,status:string):Promise<any>{
         const pathParams = [
            {
                key: "id",
                value: accountId
            },
            {
                key: "status",
                value: status
            }
        ];
        const api = this.restApiCfg.getRestApi("ali-mainAccount-statusChange.post");
        return this.restApi.request(api.method, api.url, pathParams, null,null);
    }

    //修改账号类型
    editAccountType(accountId:string,type:string):Promise<any>{
        const pathParams = [
            {
                key: "id",
                value: accountId
            },
            {
                key: "type",
                value: type
            }
        ];
        const api = this.restApiCfg.getRestApi("ali-mainAccount-type-edit.post");
        return this.restApi.request(api.method, api.url, pathParams, null,null);
    }
}
