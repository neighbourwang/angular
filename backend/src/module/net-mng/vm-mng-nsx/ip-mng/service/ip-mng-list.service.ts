import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../../architecture';

//model 
import { IpMngModel, subnetIpModel } from '../model/ip-mng.model';
import { IpMngModel_mock, net_dlr_list_mock, subnetInfoModel_mock } from '../model/ip-mng.mock';
import { Success_mock } from '../model/success.mock';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class IpMngListService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    getIpMngList(platform_id: any): Promise<any> {
        const pathParams = [
            {
                key: "platform_id",
                value: platform_id
            }
        ];
        console.log(pathParams, "pathParams in getIpMngList!");
        const api = this.restApiCfg.getRestApi("net-mng.vmware.nsx.ipmng.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return IpMngModel_mock });
    }
    
    getDLRList(platform_id: any): Promise<any> {
        const pathParams = [
            {
                key: "platform_id",
                value: platform_id
            }
        ];
        const api = this.restApiCfg.getRestApi("net-mng.vmware.nsx.dclist.get");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => net_dlr_list_mock);
    }

    getSubnetInfoIps(portGroup: any): Promise<any> {
        const pathParams = [
            {
                key: "port_id",
                value: portGroup
            }
        ];
        console.log(pathParams, "pathParams in getSubnetInfoIps!");
        const api = this.restApiCfg.getRestApi("net-mng.vmware.nsx.subnetinfo.ips.get");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return subnetInfoModel_mock });
    }

	updateSubnetIPs(portGroup:any, ippool: subnetIpModel): Promise <any> {
        console.log('updateSubnetIPs');
        const pathParams = [
            {
                key: "id",
                value: portGroup
            }
        ];
        ippool.ips = ippool.ipstr.replace(/\s+/g, "").replace(/\n\r/g, "").split(';');
        let ips: Array<String> = ippool.ips.filter(item => {return item != ""});
        console.log(ips, "(((((((((((((((ips)))))))))))))))");
        const body = {
            "dnsAlt": ippool.dnsAlt || "",
            "dnsPre": ippool.dnsPre || "",
            "subnetRange": ips
        }
        console.log(pathParams, body, "pathParams and body");
        const api = this.restApiCfg.getRestApi("net-mng.vmware.nsx.subnetips.setup");
        return this.restApi.request(api.method, api.url, pathParams, null, body);
		//return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Success_mock });
	}
}
