import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import { PayLoad } from '../model/attr-list.model';
import { TimeLineData, Network, Image } from '../model/services.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PhysicalMachineOrderService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }

    userInfo = this.restApi.getLoginInfo().userInfo;
    getHostConfigList() : Promise<any>{
        const api = this.restApiCfg.getRestApi("hosts.services.get");

        let pathParams = [
            {
                key: 'id',
                value: "0"
            }
        ];
        const request = this.restApi.request(api.method, api.url, pathParams, undefined)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                console.log(JSON.stringify(res.resultContent))
                                return res.resultContent;
                            });
        return request;
    }

    saveOrder(payload: PayLoad[]): Promise<any> {
        let api = this.restApiCfg.getRestApi('hosts.order.add');
        return this.restApi.request(api.method, api.url, undefined, undefined, payload);
    }
    addCart(payload: PayLoad[]): Promise<any> {
        let api = this.restApiCfg.getRestApi('shopping.cart.add');
        return this.restApi.request(api.method, api.url, undefined, undefined, payload);
    }
    
    getNetwork(platformId:string, zoneId:string) : Promise<Network[]> {
        const api = this.restApiCfg.getRestApi("enterprise.network.get");

        let pathParams = [
            {
                key: 'platformId',
                value: platformId
            },
            {
                key: 'zoneId',
                value: zoneId
            },
            {
                key : 'enterPriseId',
                // value: "868a8d22-0976-48c3-b080-e03481ca1c43"
                value: this.userInfo.enterpriseId
            }
        ];
        const request = this.restApi.request(api.method, api.url, pathParams, undefined, undefined)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "CLOUD_HOST.GET_NETWORK_FAILURE";
                                }
                                return res.resultContent.networkItems;
                            });
        return request;
    }

    getImage(platformId:string,imageType:string,startupResouce:string): Promise<Image[]> {

        const api = this.restApiCfg.getRestApi("platform.image.post");

        let pathParams = {
            imageType: imageType,
            enterPriseId: this.userInfo.enterpriseId,
            platformId: platformId,
            startupResouce: startupResouce,
        }
        
        return this.restApi.request(api.method, api.url, undefined, undefined, pathParams)
                    .then(res => {
                            if(res.resultCode !== "100"){
                                throw "CLOUD_HOST.GET_IMAGE_FAILURE";
                            }
                            return res.resultContent.imageItems;
                        });
    }

    unitType = this.dict.get({ 
        owner : "PACKAGE_BILLING",
        field : "PERIOD_TYPE"
    });

    cpuList = [
        {
            displayName: "1",
            value: "1"
        },
        {
            displayName: "2",
            value: "2"
        },
        {
            displayName: "3",
            value: "3"
        },
        {
            displayName: "所有",
            value: "0"
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
            value: "512"
        },
        {
            displayName: "所有",
            value: "0"
        },
    ]

    diskRequirements = [
        {
            displayName: "SSD",
            value: "SSD",
            isSelected: true
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
            displayName: "X86",
            value: "X86",
            isSelected: true
        },
    ]

    networkRequirements = [
        {
            displayName: "千兆",
            value: "千兆",
            isSelected: true
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
            isSelected: true
        },
        {
            displayName: "不需要",
            value: "不需要",
            isSelected: false
        },
    ]
}
