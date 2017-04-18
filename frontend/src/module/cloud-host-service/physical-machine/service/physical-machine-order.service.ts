import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import { Regions, PMOrderResponse, PMPartsEntity, PMNetworkVO, ResoucePolls, PMImageBaseVO } from '../model/service.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PhysicalMachineOrderService {
    constructor(private http: Http,
        private restApiCfg: RestApiCfg,
        private dict: SystemDictionaryService,
        private restApi: RestApi) {
    }

    userInfo = this.restApi.getLoginInfo().userInfo;

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

    fetchImageList(pmPoolId: string): Promise<PMImageBaseVO[]> {
        const api = this.restApiCfg.getRestApi("pmPoolId.image.list");

        let pathParams = [
            {
                key: 'pmPoolId',
                value: pmPoolId
            },
            {
                key: 'enterpriseId',
                value: this.userInfo.enterpriseId
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

    fetchPhysicalDetail( cpuCount:number, memorySize:string, diskTypeList:string[], serverTypeList:string[], netTypeList:string[]): Promise<PMOrderResponse[]> {
        const api = this.restApiCfg.getRestApi("post.pmlist.detail");

        const request = this.restApi.request(api.method, api.url, undefined, undefined, { cpuCount, diskTypeList, memorySize, netTypeList, serverTypeList })
            .then(res => {
                if (res.resultCode !== "100") {
                    throw "";
                }
                return res.resultContent;
            });
        return request;
    }


    unitType = this.dict.get({
        owner: "PACKAGE_BILLING",
        field: "PERIOD_TYPE"
    });

    cpuList = [
        {
            displayName: "1",
            value: 1
        },
        {
            displayName: "2",
            value: 2
        },
        {
            displayName: "3",
            value: 3
        },
        {
            displayName: "所有",
            value: -1
        }
    ];

    memList = [
        {
            displayName: "0-16GB",
            value: "0-16"
        },
        {
            displayName: "16-32GB",
            value: "16-32"
        },
        {
            displayName: "32-64GB",
            value: "32-64"
        },
        {
            displayName: "64-128GB",
            value: "64-128"
        },
        {
            displayName: "128-256GB",
            value: "128-256"
        },
        {
            displayName: "256-512GB",
            value: "256-512"
        },
        {
            displayName: "512GB以上",
            value: "512+"
        },
        {
            displayName: "所有",
            value: "-1"
        },
    ]

    diskRequirements = [
        {
            displayName: "SSD",
            value: "SSD",
            isSelected: false
        },
        {
            displayName: "SATA",
            value: "SATA",
            isSelected: false
        },
        {
            displayName: "SAS",
            value: "SAS",
            isSelected: false
        },
    ]

    diskType = [
        {
            displayName: "X64",
            value: "X64",
            isSelected: false
        },
        {
            displayName: "X86",
            value: "X86",
            isSelected: false
        }
    ]

    networkRequirements = [
        {
            displayName: "千兆",
            value: "千兆",
            isSelected: false
        },
        {
            displayName: "万兆",
            value: "万兆",
            isSelected: false
        },
    ]

    needHBA = [
        {
            displayName: "需要",
            value: "需要",
            isSelected: false
        },
        {
            displayName: "不需要",
            value: "不需要",
            isSelected: false
        },
    ]
}
