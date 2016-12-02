import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../../architecture';

import 'rxjs/add/operator/toPromise';

import { port_mock, dclist_mock } from '../model/port.mock.model';
import { port } from '../model/port.model';

@Injectable()
export class VmDisIndexService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    //获取初始化列表数据
    getDCList(): Promise<any> {
        //const api = this.restApiCfg.getRestApi("net-mng.vm-mng-dbt.index.dclist");
        //return this.restApi.request(api.method, api.url, null, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => dclist_mock);
    }

     getData(): Promise<any> {
        //const api = this.restApiCfg.getRestApi("net-mng.vm-mng-dbt.index.portlist");
        //return this.restApi.request(api.method, api.url, null, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => port_mock);
    }

    
    saveEdit(port: port): Promise<any> {
        
        //const api = this.restApiCfg.getRestApi("net-mng.vm-mng-dbt.index.setportname");
        //return this.restApi.request(api.method, api.url, null, null,port);
        
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return port_mock });
    }
    
    portEnable(id:string):Promise<any>{
        //如果运行状态不是运行中的，则不能启用此网络
        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];

         //const api = this.restApiCfg.getRestApi("net-mng.vm-mng-dbt.index.enable");
         //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return port_mock });
    }

     portDisable(id:string):Promise<any>{
        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];

         //const api = this.restApiCfg.getRestApi("net-mng.vm-mng-dbt.index.disable");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return port_mock });
    }

    
}