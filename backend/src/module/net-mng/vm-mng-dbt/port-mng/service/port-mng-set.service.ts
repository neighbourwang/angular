import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../../architecture';

//model 
import { Enterprise } from '../model/enterprise.model';
import {port_net_mock,portlist_mock} from "../model/port-list.mock";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PortMngSetService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }


    //获取初始化数据
    getData(id:string,platform_id:string): Promise<any> {
        const pathParams = [
            {
                key: "switch_id",
                value: id
            },
            {
                key:"platform_id",
                value:platform_id
            }
        ];
        const api = this.restApiCfg.getRestApi("net-mng.vm-mng-dbt.port.set-ent");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => port_net_mock);
    }

    saveEnterpirseGroup(enterpirses:Array<Enterprise>,id:string,platform_id:string): Promise<any> {
        const pathParams = [
            {
                key: "switch_id",
                value: id
            },
            {
                key:"platform_id",
                value:platform_id
            }
        ];
        const obj = {
            
            "enterpriseSelectedList": enterpirses
        };
        const api = this.restApiCfg.getRestApi("net-mng.vm-mng-dbt.port.ent-save");
        return this.restApi.request(api.method, api.url, pathParams, null, obj);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => port_net_mock);
    }
}
