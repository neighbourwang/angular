import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel,SystemDictionaryService } from '../../../../architecture';
import{mainAccountList_mock,EnterpriseList_mock} from '../model/mock';
//model
import{AccountListModel} from '../model/account-list.model';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AliCloudMainAccountEditService {
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

    //获取主账号
    getAccount(id:string):Promise<any>{   
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

    //编辑主账号
    editAccount(account:AccountListModel):Promise<any>{       
        const api = this.restApiCfg.getRestApi("ali-mainAccount-update.post");
        return this.restApi.request(api.method, api.url,null, null,account);
        // return new Promise(resovle => setTimeout(resovle, 200)).then(() => mainAccountList_mock);
    }

    //添加账号
    createAccount(account:AccountListModel):Promise<any>{
        const api = this.restApiCfg.getRestApi("ali-mainAccount-create.post");
        return this.restApi.request(api.method, api.url,null, null,{
            "accessSecret": account.accessSecret,
            "accessUrl": account.accessUrl,
            "accesskey": account.accessKey,
            "description": account.description,
            "loginName": account.loginName,
            "mainAccountType": account.mainAccountType
        });
        // return new Promise(resovle => setTimeout(resovle, 200)).then(() => mainAccountList_mock);
    }

    //测试access信息
    testAccessInfo(account:AccountListModel):Promise<any>{
        const api = this.restApiCfg.getRestApi("ali-Account-accessInfo-test.post");
        return this.restApi.request(api.method, api.url,null, null,{
            "loginName":account.loginName,
            "accessUrl":account.accessUrl,
            "accesskey":account.accessKey,
            "accessSecret":account.accessSecret,
            "description": account.description,
            "mainAccountType": account.mainAccountType
        });
    }

    //获取企业列表
    getEnterpriseList():Promise<any>{
        const api = this.restApiCfg.getRestApi("ali-mainAccount-enterprise-list.get");
       return this.restApi.request(api.method, api.url,null, null,null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => EnterpriseList_mock);
    }

    //保存企业设置
    saveSetEnt(account:AccountListModel,entId):Promise<any>{
         const pathParams = [
            {
                key: "id",
                value:account.id
            },             
        ]
        const api = this.restApiCfg.getRestApi("ali-mainAccount-enterprise-set.post");
        return this.restApi.request(api.method, api.url,pathParams, null,{
            "accessKey": account.accessKey,
            "accessSecret": account.accessSecret,
            "accessUrl": account.accessUrl,
            "description": account.description,
            "id": account.id,
            "isEditable":account.isEditable ,
            "lastUpdate": account.lastUpdate,
            "loginName": account.loginName,
            "mainAccountType": account.mainAccountType,
            "operator": account.operator,
            "status": account.status,
            "tenantCross": account.tenantCross,
            "tenantId": entId
            });
      //  return new Promise(resovle => setTimeout(resovle, 200)).then(() => EnterpriseList_mock);
    }
 }


