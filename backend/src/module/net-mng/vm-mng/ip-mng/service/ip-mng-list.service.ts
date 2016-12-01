import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../../architecture';

//model 
import { IpMngModel } from '../model/ip-mng.model';
import { IpMngModel_mock } from '../model/ip-mng.mock';
import { Success_mock } from '../model/success.mock';
import { NetWork_mock, net_dc_list_mock } from '../model/dccluster.mock';
import { subnetModel } from '../model/subnet.model';
import { subnetIpModel } from '../model/subnet-ip.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class IpMngListService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    getIpMngList(): Promise<any> {
        /*
        const pathParams = [
            {
                key: "page",
                value: pageIndex
            },
            {
                key: "size",
                value: pageSize
            }
        ];
        const api = this.restApiCfg.getRestApi("net-mng.openstack.net.list");
        return this.restApi.request(api.method, api.url, pathParams, null,
            {
                "dataCenter": criteriaQuery.dataCenter,
                "platformId": criteriaQuery.platformId,
                "region": criteriaQuery.region,
                "tenantName": criteriaQuery.tenantName
            }
        );
        */
        const api = this.restApiCfg.getRestApi("net-mng.vmware.ipmng.list");
        return this.restApi.request(api.method, api.url, null, null, null);

        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return IpMngModel_mock });
    }

	updateSubnetIPs(portGroup: any, ippool: subnetIpModel): Promise <any> {
        const pathParams = [
            {
                key: "portGroup_id",
                value: portGroup
            }
        ];

        console.log(ippool.ips, "ippool.ips");
        console.log(ippool.ips[0], "ippool.ips[0]");
        console.log(ippool.ips.length, "ippool.ips.length");
        let ips: string = ippool.ips.replace(/\s+/g, "").replace(/\r\n/g, "");
        const body = ips.split(';');
        console.log('updateSubnetIPs');
        console.log(pathParams, body, "pathParams and body")
        const api = this.restApiCfg.getRestApi("net-mng.vmware.subnetips.setup");
        return this.restApi.request(api.method, api.url, pathParams, null, body);

		//return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Success_mock });
	}

    updateSubnet(portGroup: any, subn: subnetModel): Promise<any> {
        const pathParams = [
            {
                key: "portGroup_id",
                value: portGroup
            }
        ];
        const body = {
                "subnetCIDR": subn.subnetCIDR,
                "subnetMask": subn.subnetMask,
                "gateway": subn.gateway,
                "dnsPre": subn.dnsPre,
                "dnsAlt": subn.dnsAlt
            };
        console.log('updateSubnet');
        console.log(pathParams, body, "pathParams and body")
        const api = this.restApiCfg.getRestApi("net-mng.vmware.subnet.setup");
        return this.restApi.request(api.method, api.url, pathParams, null, body);

        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Success_mock });
    }

    getDCList(): Promise<any> {
        const api = this.restApiCfg.getRestApi("net-mng.vmware.querycondition.get");
        return this.restApi.request(api.method, api.url, null, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => net_dc_list_mock);
    }

    getSubnetInfoIps(portGroup: any): Promise<any> {
        console.log(portGroup, "portGroup")
        const pathParams = [
            {
                key: "portGroup_id",
                value: portGroup
            }
        ];
        console.log('getSubnetInfoIps');
        console.log(pathParams, "pathParams")
        const api = this.restApiCfg.getRestApi("net-mng.vmware.subnetinfo-ips.get");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return Success_mock });
    }

}
