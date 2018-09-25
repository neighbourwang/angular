import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import { Regions, ResoucePolls } from "./region-resourcepoll.model"

@Injectable()
export class RegionResourcepollServiceList {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private restApi:RestApi) {
    }

    fetchRegion(): Promise<Regions[]> {
        const api = this.restApiCfg.getRestApi("basis.regions");

        const request = this.restApi.request(api.method, api.url, undefined, undefined)
            .then(res => {
                if (res.resultCode !== "100") {
                    throw "";
                }
                return res.resultContent;
            });
        return request;
    }

    fetchResourcePoll(regionId: string): Promise<ResoucePolls[]> {
        const api = this.restApiCfg.getRestApi("region.pmpool.list");

        let pathParams = [
            {
                key: 'regionId',
                value: regionId
            }
        ];

        const request = this.restApi.request(api.method, api.url, pathParams, undefined)
            .then(res => {
                if (res.resultCode !== "100") {
                    throw "";
                }
                return res.resultContent;
            });
        return request;
    }

}