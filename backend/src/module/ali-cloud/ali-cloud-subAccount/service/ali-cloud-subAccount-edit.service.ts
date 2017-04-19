import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel,SystemDictionaryService } from '../../../../architecture';

import{subAccountList_mock,EnterpriseList_mock} from '../model/mock';
//model
import{AccountListModel} from '../model/account-list.model';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AliCloudSubAccountEditService {
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

    //编辑主账号
    editAccount(account:AccountListModel):Promise<any>{       
        const api = this.restApiCfg.getRestApi("ali-subAccount-update.post");
        return this.restApi.request(api.method, api.url,null, null,account);
        // return new Promise(resovle => setTimeout(resovle, 200)).then(() => mainAccountList_mock);
    }

    //添加账号
    createAccount(account:AccountListModel):Promise<any>{
        const api = this.restApiCfg.getRestApi("ali-subAccount-create.post");
        return this.restApi.request(api.method, api.url,null, null,account);
        // return new Promise(resovle => setTimeout(resovle, 200)).then(() => mainAccountList_mock);
    }

    //测试access信息
    testAccessInfo(account:AccountListModel):Promise<any>{
         const api = this.restApiCfg.getRestApi("ali-Account-accessInfo-test.post");
        return this.restApi.request(api.method, api.url,null, null,{
            "loginName":account.loginName,
            "accessKey":account.accessKey,
            "accessSecret":account.accessSecret
        });
    }
    //获取子账号企业列表
    getEnterpriseList():Promise<any>{
        const api = this.restApiCfg.getRestApi("ali-mainAccount-enterprise-list.get");
        //return this.restApi.request(api.method, api.url,null, null,null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => EnterpriseList_mock);
    }

      //保存企业设置
    saveSetEnt():Promise<any>{
        const api = this.restApiCfg.getRestApi("ali-mainAccount-enterprise-set.post");
       // return this.restApi.request(api.method, api.url,null, null,null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => EnterpriseList_mock);
    }
}