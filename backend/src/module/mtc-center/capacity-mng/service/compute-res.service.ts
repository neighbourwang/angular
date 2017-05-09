import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import {ComputeRes_mock} from'../model/compute-res-list.mock';
import {Zone_mock} from '../model/zone-list.mock';
import {HostList_mock}from '../model/host-list.mock';
@Injectable()
export class ComputeResService {
    constructor(
        private http: Http,
        private restApiCfg: RestApiCfg,
        private restApi: RestApi,
        private dict:SystemDictionaryService
    ) { }

    pfDic = this.dict.get({
        owner: "PLATFORM",
        field: "TYPE"
    });
    zoneStatusDic = this.dict.get({
        owner: "MAINTAIN",
        field: "ZONESTATUS"
    });
    runningDic = this.dict.get({
        owner: "MAINTAIN",
        field: "RUNNING"
    });
    statusDic = this.dict.get({
        owner: "MAINTAIN",
        field: "STATUS"
    });
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
        const api = this.restApiCfg.getRestApi("compute-res.platform.info");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => ComputeRes_mock);
    }

    //获取可用区资源信息
    getZoneResInfo(zone_Id:string): Promise<any> {
        const pathParams = [
            {
                key: "zoneId",
                value: zone_Id
            }
           
        ];
        const api = this.restApiCfg.getRestApi("compute-res.zone.info");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => Zone_mock);
    }

    getHostList(zone_Id:string): Promise<any> {
        const pathParams = [
            {
                key: "zoneId",
                value: zone_Id
            }
           
        ];
        const api = this.restApiCfg.getRestApi("compute-res.host.list");
        return this.restApi.request(api.method, api.url, pathParams, null, null);
        //return new Promise(resovle => setTimeout(resovle, 200)).then(() => HostList_mock);
    }

}