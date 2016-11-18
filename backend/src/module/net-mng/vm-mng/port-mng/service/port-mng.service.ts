import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../../architecture';

//model 
import { Enterprise } from '../model/enterprise.model';
import { port_net_mock, portlist_mock, net_dc_list_mock} from "../model/port-list.mock";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PortMngService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }


    //获取初始化列表数据
    getData(): Promise<any> {
        //const api = this.restApiCfg.getRestApi("net-mng.vmware.port.list");
        //return this.restApi.request(api.method, api.url, null, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => portlist_mock);
    }

    //获取初始化列表数据
    getDCList(): Promise<any> {
        //const api = this.restApiCfg.getRestApi("net-mng.vmware.dc.list");
        //return this.restApi.request(api.method, api.url, null, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => net_dc_list_mock);
    }

}
