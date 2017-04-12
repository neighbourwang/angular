import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import { PayLoad } from '../model/attr-list.model';
import { TimeLineData, Network, Image } from '../model/services.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class cloudHostServiceOrder {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }

    userInfo = this.restApi.getLoginInfo().userInfo;
    
    getQuotaResoure() : Promise<any> {
        let api = this.restApiCfg.getRestApi('user-center.org-mng.resource.get');

        let pathParams = [{
            key: 'id',
            value: this.userInfo.organizationId
        }];

        const request = this.restApi.request(api.method, api.url, pathParams, undefined, undefined)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });

        return request;
    };

    getPlatformQuota(platformId:string): Promise<any>{
        let api = this.restApiCfg.getRestApi('fetch.platforms.quotas');

        let pathParams = [{
            key: 'platformId',
            value: platformId
        }];

        const request = this.restApi.request(api.method, api.url, pathParams, undefined, undefined)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });

        return request;
        // return new Promise(next => next(
        //     {
        //       "detailDescription": "string",
        //       "resultCode": "string",
        //       "resultContent": {
        //         "cpu": 330,
        //         "memory": 213123,
        //         "platformId": "string",
        //         "platformName": "string",
        //         "pychicalMachine": 0,
        //         "storageQuota": 0,
        //         "vmQuota": 0
        //       }
        //     }.resultContent
        // ));
    }

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
        return this.restApi.request(api.method, api.url, undefined, undefined, payload)
                    .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "订购失败";
                                }
                                return res.resultContent;
                            });
    }
    addCart(payload: PayLoad[]): Promise<any> {
        let api = this.restApiCfg.getRestApi('shopping.cart.add');
        return this.restApi.request(api.method, api.url, undefined, undefined, payload)
                    .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "加入购物车失败";
                                }
                                return res.resultContent;
                            });
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

    getImage(platformId:string,imageType:string,startupResouce:string): Promise<any> {

        const api = this.restApiCfg.getRestApi("platform.image.post");

        let pathParams = {
            imageType: imageType,
            enterpriseId: this.userInfo.enterpriseId,
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

        // return Promise.resolve({"resultCode":"100","detailDescription":null,"resultContent":{"enterpriseId":"5b2967d4-5d18-482c-95c6-b4aeab40bde9","platformId":"eb3f4908-873c-4e68-b759-8303491ea502","platformType":null,"imageItems":[{"imageId":"9f196ebc-8fbf-48ab-8b23-ec8254f95a21","imageType":0,"osType":1,"imageName":"Centos-6.5","imageCode":null,"imageDisplayName":"Centos-6.5_new","capacity":13287936},{"imageId":"3bd9ec0b-9a75-4e7b-a648-6e030f6dcbc1","imageType":0,"osType":0,"imageName":"windows-server-2008","imageCode":null,"imageDisplayName":"windows-server-2008_new","capacity":13287936},{"imageId":"c57e2eaf-bb49-4049-ac7e-787223308951","imageType":0,"osType":0,"imageName":"cirros","imageCode":null,"imageDisplayName":"cirros","capacity":13287936}]}}.resultContent.imageItems)

    }

    unitType = this.dict.get({ 
        owner : "PACKAGE_BILLING",
        field : "PERIOD_TYPE"
    });
}
