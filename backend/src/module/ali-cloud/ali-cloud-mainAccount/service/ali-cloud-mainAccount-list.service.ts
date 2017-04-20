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
        owner : "PORTGROUP",
        field : "STATUS"             //状态
    }             
    );
    dictType = this.dict.get(
        {      
        owner : "ALICLOUD",
        field : "MAIN_ACCOUNT_TYPE"      //账号类型
    }             
    );

    //获取主账号列表
    getMainAccounts():Promise<any>{    
         const api = this.restApiCfg.getRestApi("ali-mainAccount-list.get");
        return this.restApi.request(api.method, api.url,null, null,null);
       // return new Promise(resovle => setTimeout(resovle, 200)).then(() => mainAccountList_mock);
    }

    //删除主账号
    deleteAccount(accountId:string):Promise<any>{
        const pathParams = [
            {
                key: "id",
                value: accountId
            }
        ]
        const api = this.restApiCfg.getRestApi("ali-mainAccount-delete.post");
        return this.restApi.request(api.method, api.url, pathParams, null,null);
    }

    //启用主账号
    enableAccount(accountId:string):Promise<any>{
        const pathParams = [
            {
                key: "id",
                value: accountId
            }
        ]
        const api = this.restApiCfg.getRestApi("ali-mainAccount-status-enable.post");
        return this.restApi.request(api.method, api.url, pathParams, null,null);
    }

    //禁用主账号
    disableAccount(accountId:string):Promise<any>{
        const pathParams = [
            {
                key: "id",
                value: accountId
            }
        ]
        const api = this.restApiCfg.getRestApi("ali-mainAccount-status-disable.post");
        return this.restApi.request(api.method, api.url, pathParams, null,null);
    }
    
    // //修改主账号状态
    //  updateStatusAndDelete(accountId:string,status:string):Promise<any>{
    //      const pathParams = [
    //         {
    //             key: "id",
    //             value: accountId
    //         },
    //         {
    //             key: "status",
    //             value: status
    //         }
    //     ];
    //     const api = this.restApiCfg.getRestApi("ali-mainAccount-statusChange.post");
    //     return this.restApi.request(api.method, api.url, pathParams, null,null);
    // }

    //修改账号类型
    editAccountType(accountId:string,type:string):Promise<any>{
        const pathParams = [
            {
                key: "id",
                value: accountId
            },
        ];
        const api = this.restApiCfg.getRestApi("ali-mainAccount-type-edit.post");
        return this.restApi.request(api.method, api.url, pathParams, null,type);
    }
}
