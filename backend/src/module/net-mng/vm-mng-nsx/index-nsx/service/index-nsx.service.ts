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

    //��ȡdlr
    getDlrList(platform_Id:string): Promise<any> {
        const pathParams = [
            {
                key: "platform_id",
                value: platform_Id
            }
        ];
        //const api = this.restApiCfg.getRestApi("net-mng.vm-mng-nsx.index.dlrlist");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => dlr_mock);
    }

    //��ȡNSX�˿��б�
    getData(platform_Id:string): Promise<any> {
        const pathParams = [
            {
                key: "platform_id",
                value: platform_Id
            }
        ];
        //const api = this.restApiCfg.getRestApi("net-mng.vm-mng-nsx.index.portlist");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => port_mock);
    }

    //����ֲ�ʽ�˿�����ʾ����
    saveEdit(Port: port): Promise<any> {
        const pathParams = [
            {
                key: "id",
                value: Port.dlrPortId
            }
        ];
       // const api = this.restApiCfg.getRestApi("net-mng.vm-mng-nsx.index.setdlrname");
       // return this.restApi.request(api.method, api.url, pathParams, null,[Port.drlSubnetDisplayName]);
        
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return port_mock });
    }

    //����
    portEnable(id:string):Promise<any>{
        
        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];

        // const api = this.restApiCfg.getRestApi("net-mng.vm-mng-nsx.index.enable");
       //  return this.restApi.request(api.method, api.url, pathParams, null, null);
       return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return port_mock });
    }

    //����
    portDisable(id: string): Promise<any>{
        const pathParams = [
            {
                key: "id",
                value: id
            }
        ];

        // const api = this.restApiCfg.getRestApi("net-mng.vm-mng-nsx.index.disable");
       //  return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return port_mock });
    }
}