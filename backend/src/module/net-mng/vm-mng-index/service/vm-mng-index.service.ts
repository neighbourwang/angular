import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi , SystemDictionaryService} from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

//Mock
import { RegionInfo_mock, NetworkInfo_mock, NsxInfo_mock } from '../model/vmware-net.mock';

//Model
import { RegionModel, VmwareNetModel } from '../model/vmware-net.model';

@Injectable()
export class VmwareMngIndexService{
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

    //数据字典
    typeDic = this.dict.get({
        owner: "NETWORK", 
        field: "TYPE"
    });

    getRegionInfo():Promise<any>{        
        const api = this.restApiCfg.getRestApi("net-mng.vmware-index.regionlist.get");
        //return this.restApi.request(api.method, api.url, null, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return RegionInfo_mock });
    }

    getNsxInfo(platformId:string):Promise<any>{
        const pathParams = [
            {
                key: "platform_id",
                value: platformId
            }
        ];
        const api = this.restApiCfg.getRestApi("net-mng.vmware-index.nsxinfo.get");
        //return this.restApi.request(api.method, api.url, null, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return NsxInfo_mock });
    }

    getNetworkList(platformId:string):Promise<any>{
        const pathParams = [
            {
                key: "platform_id",
                value: platformId
            }
        ];
        /*
        const body = {
                "subnetCIDR": subn.subnetCIDR,
                "subnetMask": subn.subnetMask,
                "gateway": subn.gateway,
                "dnsPre": subn.dnsPre,
                "dnsAlt": subn.dnsAlt
            };
            */
        const api = this.restApiCfg.getRestApi("net-mng.vmware-index.clusterlist.get");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => { return NetworkInfo_mock });
    }
    
}



/*
{
        "desc": "区域联动列表",
        "id": "net-mng.vmware-index.regionlist.get",
        "method": "GET",
        "url": "adminboe/authsec/vmware/network/main/regionlist"
    },
    {
        "desc": "集群列表",
        "id": "net-mng.vmware-index.clusterlist.get",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/main/clusterlist"
    },
    {
        "desc": "NSX管理信息",
        "id": "net-mng.vmware-index.nsxinfo.get",
        "method": "GET",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/main/nsxinfo/get"
    },
    {
        "desc": "保存NSX管理信息",
        "id": "net-mng.vmware-index.nsxinfo.save",
        "method": "PUT",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/main/nsxinfo/save"
    },
    {
        "desc": "测试NSX管理信息",
        "id": "net-mng.vmware-index.nsxinfo.test",
        "method": "POST",
        "url": "adminboe/authsec/platform/{platform_id}/vmware/network/main/nsxinfo/test"
    },
    {
        "desc": "更改网络类型",
        "id": "net-mng.vmware-index.network.changetype",
        "method": "PUT",
        "url": "adminboe/authsec/vmware/network/main/changetype/clusterid/{cluster_id}"
    },
*/