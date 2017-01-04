import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../../architecture';

//model 
import { Enterprise } from'../model/enterprise.model';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DlrMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    //获取dlr列表
    getDlrList(id:string): Promise<any> {
         const pathParams = [
            {
                key: "platform_id",
                value: id
            }
        ];
        const api = this.restApiCfg.getRestApi("net-mng.vm-mng-nsx.port.dlrlist");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => net_dc_list_mock);
    }

    //获取NSXDLR网络列表
    getData(id:string): Promise<any>{
         const pathParams = [
            {
                key: "platform_id",
                value: id
            }
        ];
        const api = this.restApiCfg.getRestApi("net-mng.vm-mng-nsx.port.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => net_dc_list_mock);
        
    }


    /////////////////////
      //获取初始化数据
    getDrlDetailData(id:string): Promise<any> {
        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];
        const api = this.restApiCfg.getRestApi("net-mng.vm-mng-nsx.dlr.dlr-detail");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => port_net_mock);
    }

    saveEnterpirseGroup(enterpirses:Array<Enterprise>,id:string): Promise<any> {
        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];
        const obj = {
            
            "enterpriseSelectedList": enterpirses
        };
        const api = this.restApiCfg.getRestApi("net-mng.vm-mng-nsx.dlr.ent-save");
        return this.restApi.request(api.method, api.url, pathParams, null, obj);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => port_net_mock);
    }
}
