import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import { Platform, Zone } from "./platform-zone.model"

@Injectable()
export class PlatformZoneServiceList {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private restApi:RestApi) {
    }

    getAreaList() : Promise<Platform[]>{
        const api = this.restApiCfg.getRestApi("op-center.order-mng.platform-list.get");

        const request = this.restApi.request(api.method, api.url, undefined, undefined)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
    }

    getZoneList(_id: string) : Promise<Zone[]>{
        const api = this.restApiCfg.getRestApi("op-center.order-mng.region-list.get");

        let pathParams = [
            {
                key: '_id',
                value: _id
            }
        ];
        const request = this.restApi.request(api.method, api.url, pathParams, undefined, undefined)
                             .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                             });
                           
        return request;
    }

}