import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../../architecture';

import 'rxjs/add/operator/toPromise';

import { port_mock, dclist_mock, port_mock_changed } from '../model/port.mock.model';
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

    //获取数据中心联动列表
    getDCList(platform_Id:string): Promise<any> {
        const pathParams = [
            {
                key: "platform_id",
                value: platform_Id
            }
        ];
        const api = this.restApiCfg.getRestApi("net-mng.vm-mng-dbt.index.dclist");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => dclist_mock);
    }

    //获取分布式端口列表
    getData(platform_Id:string): Promise<any> {
        const pathParams = [
            {
                key: "platform_id",
                value: platform_Id
            }
        ];
        const api = this.restApiCfg.getRestApi("net-mng.vm-mng-dbt.index.portlist");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => port_mock);
    }

    //保存分布式端口组显示名称
    saveEdit(Port: port): Promise<any> {
        const pathParams = [
            {
                key: "id",
                value: Port.id
            }
        ];
        const api = this.restApiCfg.getRestApi("net-mng.vm-mng-dbt.index.setportname");
        return this.restApi.request(api.method, api.url, pathParams, null,[Port.distPortGroupDisplayName]);
        
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return port_mock });
    }

    //启用
    portEnable(id:string):Promise<any>{
        
        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];

         const api = this.restApiCfg.getRestApi("net-mng.vm-mng-dbt.index.enable");
         return this.restApi.request(api.method, api.url, pathParams, null, null);
       //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return port_mock });
    }

    //禁用
    portDisable(id: string): Promise<any>{
        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];

         const api = this.restApiCfg.getRestApi("net-mng.vm-mng-dbt.index.disable");
         return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return port_mock });
    }
    //获取分布式同步网络信息
    getSynInfolist(platform_id:string):Promise<any>{
         const pathParams = [
            {
                key:"platform_id",
                value: platform_id
            }
        ];
        //const api = this.restApiCfg.getRestApi("net-mng.vm-mng-dbt.index.syn.getinfolist");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return port_mock });
    }
    
    doSyn(id:string, platform_id:string):Promise<any>{
        const pathParams = [
            {
                key: "vds_id",
                value: id
            },
            {
                key:"platform_id",
                value: platform_id
            }
        ];

        //const api = this.restApiCfg.getRestApi("net-mng.vm-mng-dbt.index.syn.dosyn");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return port_mock_changed });

    }
}