import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';
import{mainAccountList_mock} from '../model/mock';
//model
import{AccountListModel} from '../model/account-list.model';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AliCloudMainAccountEditService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    //获取主账号
    getAccount(id:string):Promise<any>{   
        const pathParams = [
            {
                key: "id",
                value: id
            },             
        ]
        const api = this.restApiCfg.getRestApi("ali-mainAccount-view.get");
        //return this.restApi.request(api.method, api.url, pathParams, null, { });
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => mainAccountList_mock);
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
        return this.restApi.request(api.method, api.url,null, null,account);
        // return new Promise(resovle => setTimeout(resovle, 200)).then(() => mainAccountList_mock);
    }
 }


