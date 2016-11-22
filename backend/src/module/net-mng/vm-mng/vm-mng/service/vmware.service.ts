import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../../architecture';

import 'rxjs/add/operator/toPromise';

import { StdNet_mock, net_dc_list_mock } from '../model/std-net.mock.model';
import { StdNet } from '../model/std-net.model';

@Injectable()
export class VmwareService {
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
        const api = this.restApiCfg.getRestApi("net-img.vm-mng.network.dclist");
        return this.restApi.request(api.method, api.url, null, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => net_dc_list_mock);
    }

     getData(): Promise<any> {
        const api = this.restApiCfg.getRestApi("net-img.vm-mng.network.list");
        return this.restApi.request(api.method, api.url, null, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => StdNet_mock);
}

    

    saveEditNet(stdnet: StdNet): Promise<any> {
        
        const api = this.restApiCfg.getRestApi("net-img.vm-mng.network.update");
        return this.restApi.request(api.method, api.url, null, null, stdnet);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return StdNet_mock });
    }

    netEnable(id:string):Promise<any>{
        //如果运行状态不是运行中的，则不能启用此网络
        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];

         const api = this.restApiCfg.getRestApi("net-img.vm-mng.network.enable");
         return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return StdNet_mock });
    }

     netDisable(id:string):Promise<any>{
        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];

         const api = this.restApiCfg.getRestApi("net-img.vm-mng.network.disable");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return StdNet_mock });
    }

    netRemove(id:string):Promise<any>{
        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];

         const api = this.restApiCfg.getRestApi("net-img.vm-mng.network.remove");
         return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return StdNet_mock });
    }
}