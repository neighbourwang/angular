import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, RestApiModel } from '../../../../architecture';

import {ComputeRes_mock} from'../model/compute-res-list.mock';
import {Zone_mock} from '../model/zone-list.mock';
import {HostList_mock}from '../model/host-list.mock';
@Injectable()
export class ComputeResService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi
    ) { }

    init(): void {
        this.restApiCfg.loadCfgData();
    }

    getComputeRes(PlatformId:string): Promise<any> {
        const pathParams = [
            {
                key: "platformId",
                value: PlatformId
            }
           
        ];
        //const api = this.restApiCfg.getRestApi("net-img.vm-mng.network.list");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => ComputeRes_mock);
    }

    //获取可用区资源信息
    getZoneResInfo(zone_Id:string) {
        const pathParams = [
            {
                key: "zoneId",
                value: zone_Id
            }
           
        ];
        //const api = this.restApiCfg.getRestApi("net-img.vm-mng.network.list");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => Zone_mock);
    }

    getHostList(zone_Id:string) {
        const pathParams = [
            {
                key: "zoneId",
                value: zone_Id
            }
           
        ];
        //const api = this.restApiCfg.getRestApi("net-img.vm-mng.network.list");
        //return this.restApi.request(api.method, api.url, pathParams, null, null);
        return new Promise(resovle => setTimeout(resovle, 200)).then(() => HostList_mock);
    }

}