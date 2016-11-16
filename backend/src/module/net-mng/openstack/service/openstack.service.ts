import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

import { Network_mock } from '../model/network.mock.model';
import { CriteriaQuery } from '../model/criteria-query.model';
import { OptionInfo_mock } from '../model/optionInfo.mock.model';
import { Enable_mock } from '../model/enable.mock.model';
@Injectable()
export class OpenstackService{
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getNetworks( criteriaQuery: CriteriaQuery, pageIndex: number, pageSize: number): Promise<any>{
        const pathParams = [
            {
                key: "page",
                value: pageIndex
            },
            {
                key: "size",
                value: pageSize
            }
        ];

        const api = this.restApiCfg.getRestApi("net-mng.openstack.net.list");
        return this.restApi.request(api.method, api.url, pathParams, null, {"criteriaQuery":criteriaQuery});

        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Network_mock });
    }

    getOptionInfo():Promise<any>{
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return OptionInfo_mock });
    }

    //启用
    networkStart(id:string):Promise<any>{
        //如果运行状态不是运行中的，则不能启用此网络
        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];

        // const api = this.restApiCfg.getRestApi("");
        // return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Enable_mock });
    }
    //禁用
    networkStop(id:string):Promise<any>{
        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];

        // const api = this.restApiCfg.getRestApi("");
        // return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Enable_mock });
    }

    //获取同步网络列表
    getSynNetworks(platform_id: string):Promise<any>{
        const pathParams = [
            {
                key: "platform_id",
                value: platform_id
            }
         ];
        const api = this.restApiCfg.getRestApi("net-mng.openstack.net.syn.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return 
    }
}