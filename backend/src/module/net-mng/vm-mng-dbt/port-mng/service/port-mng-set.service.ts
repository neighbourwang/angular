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
    getData(id:string): Promise<any> {
        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];
        const api = this.restApiCfg.getRestApi("net-mng.vmware.port.enterprise.list");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => port_net_mock);
    }

    saveEnterpirseGroup(enterpirses:Array<Enterprise>,id:string): Promise<any> {
        const obj = {
            id: id,
            "enterpriseSelectedList": enterpirses
        };
        const api = this.restApiCfg.getRestApi("net-mng.vmware.port.enterprise.save");
        //return this.restApi.request(api.method, api.url, null, null, obj);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => port_net_mock);
    }
}
