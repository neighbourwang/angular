import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel,SystemDictionaryService } from '../../../../architecture';

//model
import{subAccountList_mock,EnterpriseList_mock} from '../model/mock';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AliCloudSubAccountMngService {
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
    //获取主账号信息
    getMainAccount(id:string):Promise<any>{   
        const pathParams = [
            {
                key: "id",
                value: id
            },             
        ]
        const api = this.restApiCfg.getRestApi("ali-mainAccount-view.get");
        return this.restApi.request(api.method, api.url, pathParams, null,null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => mainAccountList_mock);
    }
    //获取子账号列表
    getSubAccounts(id:string):Promise<any>{
         const pathParams = [
            {
                key: "id",
                value: id
            },             
        ]
        const api = this.restApiCfg.getRestApi("ali-subAccount-list.get");
       return this.restApi.request(api.method, api.url,pathParams, null,null);
       // return new Promise(resovle => setTimeout(resovle, 200)).then(() => subAccountList_mock);
    }

    //获取子账号
    getAccount(id:string):Promise<any>{   
        const pathParams = [
            {
                key: "id",
                value: id
            },             
        ]
        const api = this.restApiCfg.getRestApi("ali-subAccount-view.get");
        //return this.restApi.request(api.method, api.url, pathParams, null, { });
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => subAccountList_mock);
    }

    //删除子账号
    deleteAccount(accountId:string):Promise<any>{
        const pathParams = [
            {
                key: "id",
                value: accountId
            }
        ]
        const api = this.restApiCfg.getRestApi("ali-subAccount-delete.post");
        return this.restApi.request(api.method, api.url, pathParams, null,null);
    }

    //启用子账号
    enableAccount(accountId:string):Promise<any>{
        const pathParams = [
            {
                key: "id",
                value: accountId
            }
        ]
        const api = this.restApiCfg.getRestApi("ali-subAccount-status-enable.post");
        return this.restApi.request(api.method, api.url, pathParams, null,null);
    }

    //禁用子账号
    disableAccount(accountId:string):Promise<any>{
        const pathParams = [
            {
                key: "id",
                value: accountId
            }
        ]
        const api = this.restApiCfg.getRestApi("ali-subAccount-status-disable.post");
        return this.restApi.request(api.method, api.url, pathParams, null,null);
    }

    

}
