import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi,SystemDictionaryService } from '../../../../../architecture';

import 'rxjs/add/operator/toPromise';

import { port_mock,dlr_mock} from '../model/port.mock.model';
import { port } from '../model/port.model';

@Injectable()
export class VmNSXIndexService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict: SystemDictionaryService
    ) {
    }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    //获取dlr
    getDlrList(platform_Id:string): Promise<any> {
        const pathParams = [
            {
                key: "platform_id",
                value: platform_Id
            }
        ];
        const api = this.restApiCfg.getRestApi("net-mng.vm-mng-nsx.index.dlrlist");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => dlr_mock);
    }

    //获取NSX端口列表
    getData(platform_Id:string): Promise<any> {
        const pathParams = [
            {
                key: "platform_id",
                value: platform_Id
            }
        ];
        const api = this.restApiCfg.getRestApi("net-mng.vm-mng-nsx.index.portlist");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => port_mock);
    }

    //保存分布式端口组显示名称
    saveEdit(Port: port): Promise<any> {
        const pathParams = [
            {
                key: "port_id",
                value: Port.dlrPortId
            }
        ];
        const api = this.restApiCfg.getRestApi("net-mng.vm-mng-nsx.index.setdlrname");
        return this.restApi.request(api.method, api.url, pathParams, null,[Port.drlSubnetDisplayName]);
        
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return port_mock });
    }
    getTransportZone(id:string): Promise<any> {
        const pathParams = [
            {
                key: "port_id",
                value: id
            }
        ];
        const api = this.restApiCfg.getRestApi("net-mng.vm-mng-nsx.index.getzone");
        return this.restApi.request(api.method, api.url, pathParams, null,null);
        
    }
    //启用
    portEnable(id:string):Promise<any>{
        
        const pathParams = [
            {
                key: "port_id",
                value: id
            }
        ];

         const api = this.restApiCfg.getRestApi("net-mng.vm-mng-nsx.index.enable");
         return this.restApi.request(api.method, api.url, pathParams, null, null);
       //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return port_mock });
    }

    //禁用
    portDisable(id: string): Promise<any>{
        const pathParams = [
            {
                key: "port_id",
                value: id
            }
        ];

         const api = this.restApiCfg.getRestApi("net-mng.vm-mng-nsx.index.disable");
         return this.restApi.request(api.method, api.url, pathParams, null, null);
       // return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return port_mock });
    }

    //获取分布式同步网络信息
    getSynInfolist(platform_id:string):Promise<any>{
         const pathParams = [
            {
                key:"platform_id",
                value: platform_id
            }
        ];
        const api = this.restApiCfg.getRestApi("net-mng.vm-mng-nsx.index.synclist");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return port_mock });
    }
    
    doSyn(id:string, platform_id:string):Promise<any>{
        const pathParams = [
            {
                key: "dlr_id",
                value: id
            },
            {
                key:"platform_id",
                value: platform_id
            }
        ];

        const api = this.restApiCfg.getRestApi("net-mng.vm-mng-nsx.index.dosync");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return port_mock_changed });

    }

    statusDic = this.dict.get({
        owner: "PORTGROUP",
        field: "STATUS"
    });
    synDic = this.dict.get({
        owner: "VMDIST",
        field: "SYNC"
    });
}