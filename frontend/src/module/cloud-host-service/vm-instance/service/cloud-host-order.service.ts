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
        // return new Promise(next => {
        //     next({"attrList":[{"attrId":"de229135-a0f7-11e6-a18b-0050568a49fd","attrCode":"INSTANCENAME","attrDisplayName":"实例名称","skuFlag":null,"valueType":2,"mandatory":0,"relyType":0,"relyAttrId":null,"valueList":null,"mapValueList":null},{"attrId":"de22a1e3-a0f7-11e6-a18b-0050568a49fd","attrCode":"MEM","attrDisplayName":"内存","skuFlag":null,"valueType":0,"mandatory":0,"relyType":1,"relyAttrId":"de22a07b-a0f7-11e6-a18b-0050568a49fd","valueList":null,"mapValueList":{"1ce8307b-e100-45ed-a2f0-4234d617614f":[{"attrValueId":"dfe60f2c-8e1e-4e43-a338-b9df7c204d75","attrValueCode":"2GB","attrDisplayValue":"2GB","attrValue":"2048","status":false}]}},{"attrId":"de227c2e-a0f7-11e6-a18b-0050568a49fd","attrCode":"IMAGETYPE","attrDisplayName":"镜像类型","skuFlag":null,"valueType":1,"mandatory":0,"relyType":1,"relyAttrId":"de22951e-a0f7-11e6-a18b-0050568a49fd","valueList":null,"mapValueList":{"946a6340-a1b6-11e6-a18b-0050568a49fd":[{"attrValueId":"cbe7ad93-a1b6-11e6-a18b-0050568a49fd","attrValueCode":null,"attrDisplayValue":"标准镜像","attrValue":"0","status":false}]}},{"attrId":"de2285b7-a0f7-11e6-a18b-0050568a49fd","attrCode":"NETWORKTYPE","attrDisplayName":"网络类型","skuFlag":null,"valueType":1,"mandatory":0,"relyType":1,"relyAttrId":"de226d17-a0f7-11e6-a18b-0050568a49fd","valueList":null,"mapValueList":null},{"attrId":"ab2cd7ee-a1ba-11e6-a18b-0050568a49fd","attrCode":"BILLINGMODE","attrDisplayName":"计费模式","skuFlag":null,"valueType":1,"mandatory":0,"relyType":0,"relyAttrId":null,"valueList":[{"attrValueId":"27e38973-a1bb-11e6-a18b-0050568a49fd","attrValueCode":null,"attrDisplayValue":"流量计费","attrValue":"1","status":false},{"attrValueId":"2478ab7f-a1bb-11e6-a18b-0050568a49fd","attrValueCode":null,"attrDisplayValue":"周期计费","attrValue":"0","status":false}],"mapValueList":null},{"attrId":"de22951e-a0f7-11e6-a18b-0050568a49fd","attrCode":"STARTUPSOURCE","attrDisplayName":"启动源","skuFlag":null,"valueType":0,"mandatory":0,"relyType":1,"relyAttrId":"de226d17-a0f7-11e6-a18b-0050568a49fd","valueList":null,"mapValueList":{"dbd80427-4da1-4627-83d7-155539b8b245":[{"attrValueId":"946a6340-a1b6-11e6-a18b-0050568a49fd","attrValueCode":null,"attrDisplayValue":"镜像","attrValue":"0","status":false}]}},{"attrId":"de22a07b-a0f7-11e6-a18b-0050568a49fd","attrCode":"CPU","attrDisplayName":"CPU","skuFlag":null,"valueType":0,"mandatory":0,"relyType":1,"relyAttrId":"de226d17-a0f7-11e6-a18b-0050568a49fd","valueList":null,"mapValueList":{"dbd80427-4da1-4627-83d7-155539b8b245":[{"attrValueId":"1ce8307b-e100-45ed-a2f0-4234d617614f","attrValueCode":"1core","attrDisplayValue":"1核","attrValue":"1","status":false}]}},{"attrId":"de227a98-a0f7-11e6-a18b-0050568a49fd","attrCode":"TIMELINE","attrDisplayName":"购买时长","skuFlag":null,"valueType":0,"mandatory":0,"relyType":0,"relyAttrId":null,"valueList":null,"mapValueList":null},{"attrId":"de2296a2-a0f7-11e6-a18b-0050568a49fd","attrCode":"STORAGESIZE","attrDisplayName":"数据盘容量","skuFlag":null,"valueType":1,"mandatory":0,"relyType":0,"relyAttrId":null,"valueList":null,"mapValueList":null},{"attrId":"de228e4d-a0f7-11e6-a18b-0050568a49fd","attrCode":"USERNAME","attrDisplayName":"用户名","skuFlag":null,"valueType":2,"mandatory":0,"relyType":0,"relyAttrId":null,"valueList":null,"mapValueList":null},{"attrId":"de228b51-a0f7-11e6-a18b-0050568a49fd","attrCode":"SETTINGTYPE","attrDisplayName":"设置方式","skuFlag":null,"valueType":2,"mandatory":0,"relyType":0,"relyAttrId":null,"valueList":[{"attrValueId":"d45738f1-a1b8-11e6-a18b-0050568a49fd","attrValueCode":null,"attrDisplayValue":"模板自带密码","attrValue":"1","status":false},{"attrValueId":"d1217664-a1b8-11e6-a18b-0050568a49fd","attrValueCode":null,"attrDisplayValue":"立即设置","attrValue":"0","status":false}],"mapValueList":null},{"attrId":"de229b8e-a0f7-11e6-a18b-0050568a49fd","attrCode":"ZONE","attrDisplayName":"可用区","skuFlag":null,"valueType":1,"mandatory":0,"relyType":1,"relyAttrId":"de226d17-a0f7-11e6-a18b-0050568a49fd","valueList":null,"mapValueList":{"dbd80427-4da1-4627-83d7-155539b8b245":[{"attrValueId":"f002f8c8-b59c-48a2-ae94-bba16af27e8b","attrValueCode":"Op_Cluster","attrDisplayValue":"Op_Cluster","attrValue":"0187de3b-bc0b-465f-8b40-903ed836e877","status":false},{"attrValueId":"f91ed3c8-a10a-4746-b740-dee3549e04f8","attrValueCode":"Dev_Cluster","attrDisplayValue":"Dev_Cluster","attrValue":"0ce8e22e-6e90-474d-adb0-d8e8562342d1","status":false}]}},{"attrId":"8df90e09-a74a-11e6-a18b-0050568a49fd","attrCode":"STORAGE","attrDisplayName":"云硬盘类型","skuFlag":null,"valueType":1,"mandatory":0,"relyType":1,"relyAttrId":"de229b8e-a0f7-11e6-a18b-0050568a49fd","valueList":null,"mapValueList":{"f91ed3c8-a10a-4746-b740-dee3549e04f8":[{"attrValueId":"91228f85-ad09-4de9-832f-384e28e0482e","attrValueCode":"SharedVMFS","attrDisplayValue":"SharedVMFS","attrValue":"3f57feff-43d8-4ada-b86b-f5c86383088e","status":false}],"f002f8c8-b59c-48a2-ae94-bba16af27e8b":[{"attrValueId":"203383a1-cca6-45ab-912e-f322e3350ddb","attrValueCode":"SharedVMFS","attrDisplayValue":"SharedVMFS","attrValue":"85c36ae4-6cfc-4e1b-855b-49131024f34c","status":false}]}},{"attrId":"de229d22-a0f7-11e6-a18b-0050568a49fd","attrCode":"BOOTSTORAGE","attrDisplayName":"启动盘","skuFlag":null,"valueType":0,"mandatory":0,"relyType":1,"relyAttrId":"de229b8e-a0f7-11e6-a18b-0050568a49fd","valueList":null,"mapValueList":null},{"attrId":"de228fbe-a0f7-11e6-a18b-0050568a49fd","attrCode":"PASSWORD","attrDisplayName":"登录密码","skuFlag":null,"valueType":2,"mandatory":0,"relyType":1,"relyAttrId":"de228b51-a0f7-11e6-a18b-0050568a49fd","valueList":null,"mapValueList":null},{"attrId":"de226d17-a0f7-11e6-a18b-0050568a49fd","attrCode":"PLATFORM","attrDisplayName":"云平台","skuFlag":null,"valueType":1,"mandatory":0,"relyType":0,"relyAttrId":null,"valueList":[{"attrValueId":"dbd80427-4da1-4627-83d7-155539b8b245","attrValueCode":"vmst","attrDisplayValue":"vmstGHLTest","attrValue":"82643470-4b6f-4341-a98e-622ef968aeec","status":false}],"mapValueList":null},{"attrId":"de229efb-a0f7-11e6-a18b-0050568a49fd","attrCode":"BOOTSIZE","attrDisplayName":"启动盘容量","skuFlag":null,"valueType":0,"mandatory":0,"relyType":1,"relyAttrId":"de22a1e3-a0f7-11e6-a18b-0050568a49fd","valueList":null,"mapValueList":{"dfe60f2c-8e1e-4e43-a338-b9df7c204d75":[{"attrValueId":"45f204cc-a54e-44e3-8a0a-2052887c31e1","attrValueCode":"20GB","attrDisplayValue":"20GB","attrValue":"20","status":false},{"attrValueId":"45f204cc-a54e-44e3-8a0a-2052887c31e1","attrValueCode":"3GB","attrDisplayValue":"3GB","attrValue":"3","status":false},{"attrValueId":"45f204cc-a54e-44e3-8a0a-2052887c31e1","attrValueCode":"300GB","attrDisplayValue":"300GB","attrValue":"300","status":false},{"attrValueId":"45f204cc-a54e-44e3-8a0a-2052887c31e1","attrValueCode":"40GB","attrDisplayValue":"40GB","attrValue":"40","status":false}]}},{"attrId":"de229819-a0f7-11e6-a18b-0050568a49fd","attrCode":"TIMELINEUNIT","attrDisplayName":"时长单位","skuFlag":null,"valueType":1,"mandatory":0,"relyType":2,"relyAttrId":null,"valueList":null,"mapValueList":{"ff44be74-eac4-4a6c-a209-9cf8a2cde840":[{"attrValueId":"b8fe32a7-a1bb-11e6-a18b-0050568a49fd","attrValueCode":"29d17e75-8c80-4501-8bf5-520db2eb1414","attrDisplayValue":"按月","attrValue":"3","status":false}],"307a5634-f7ae-4892-8e58-f49421661d02":[{"attrValueId":"b8fe32a7-a1bb-11e6-a18b-0050568a49fd","attrValueCode":"29d17e75-8c80-4501-8bf5-520db2eb1414","attrDisplayValue":"按月","attrValue":"3","status":false}]}},{"attrId":"de22938f-a0f7-11e6-a18b-0050568a49fd","attrCode":"SECURITYGROUP","attrDisplayName":"安全组","skuFlag":null,"valueType":0,"mandatory":0,"relyType":0,"relyAttrId":null,"valueList":[{"attrValueId":"64aa7bb2-a1b6-11e6-a18b-0050568a49fd","attrValueCode":null,"attrDisplayValue":"default","attrValue":"default","status":false}],"mapValueList":null},{"attrId":"de227f1f-a0f7-11e6-a18b-0050568a49fd","attrCode":"OS","attrDisplayName":"镜像列表","skuFlag":null,"valueType":1,"mandatory":0,"relyType":1,"relyAttrId":"de227c2e-a0f7-11e6-a18b-0050568a49fd","valueList":null,"mapValueList":{"cbe7ad93-a1b6-11e6-a18b-0050568a49fd":[{"attrValueId":"570c643d-5b11-4d97-a8d2-96f6270c6830","attrValueCode":"500a6339-cfe6-4925-9b4b-5454d66f97ac","attrDisplayValue":"boe-silvercloud-template","attrValue":"ededd604-dde8-445c-9f62-5b450780d728","status":false},{"attrValueId":"cb173fef-50e4-4a35-b1fc-a3ee16af7e15","attrValueCode":"500a5e67-88fb-3d8a-9d50-d9512dca3ca7","attrDisplayValue":"win2008R2_template_dhcp","attrValue":"f75ea6e9-39b4-4de4-b776-de1c846d5288","status":false},{"attrValueId":"4fc14939-6548-4fb3-9b51-ff2e8e82f564","attrValueCode":"50150220-dfeb-cae0-e838-83546bc96ed4","attrDisplayValue":"win2008R2_template","attrValue":"666718e9-c09f-4f18-8291-8e0572fbc8e5","status":false},{"attrValueId":"d60beaa9-8c3c-4313-aa58-2928739f8f24","attrValueCode":"500af9a6-b275-4db9-6eab-279d2b81dd86","attrDisplayValue":"rhel6.5","attrValue":"0545dede-4ce2-4455-b2dd-f22d0209473f","status":false},{"attrValueId":"3aa250f5-2048-4bb0-aead-5eaa5b004ef9","attrValueCode":"52cd7b51-e63c-605c-6f8a-ada1f1485d92","attrDisplayValue":"ubuntu server_pwm","attrValue":"51a66595-f4fe-49da-9c50-7d6a04c7fcd3","status":false},{"attrValueId":"5ad01653-7c1e-439e-908b-2117f90441a2","attrValueCode":"501531f4-e99b-6814-b81e-522c8d6cd60e","attrDisplayValue":"VPNClient","attrValue":"d1054333-3436-45ae-8cb1-6ad42a6c0cea","status":false},{"attrValueId":"9ff5b95d-04a4-40fb-8cb1-1729130dba59","attrValueCode":"526cb33b-6ade-e3e5-237d-5953ef6de4a1","attrDisplayValue":"VM02-SA-DMA_v14.12","attrValue":"51e47048-f38b-4768-9f07-ef0f70198a4a","status":false},{"attrValueId":"4523779a-496e-4021-832f-3f9dfef5b80a","attrValueCode":"500a0658-de3a-2476-d581-435b78f740ae","attrDisplayValue":"vPV2.2","attrValue":"1e405c8b-2ece-4835-a1a2-abafefe0aff0","status":false}]}}],"skuMap":{"[f002f8c8-b59c-48a2-ae94-bba16af27e8b, 45f204cc-a54e-44e3-8a0a-2052887c31e1, dfe60f2c-8e1e-4e43-a338-b9df7c204d75, dbd80427-4da1-4627-83d7-155539b8b245, 1ce8307b-e100-45ed-a2f0-4234d617614f]":{"productId":null,"skuId":"307a5634-f7ae-4892-8e58-f49421661d02","serviceType":0,"serviceName":null,"commonServiceAttrValue":null},"[45f204cc-a54e-44e3-8a0a-2052887c31e1, 1ce8307b-e100-45ed-a2f0-4234d617614f, dfe60f2c-8e1e-4e43-a338-b9df7c204d75, f91ed3c8-a10a-4746-b740-dee3549e04f8, dbd80427-4da1-4627-83d7-155539b8b245]":{"productId":null,"skuId":"307a5634-f7ae-4892-8e58-f49421661d02","serviceType":0,"serviceName":null,"commonServiceAttrValue":null}},"proMap":{"[ff44be74-eac4-4a6c-a209-9cf8a2cde840, 29d17e75-8c80-4501-8bf5-520db2eb1414]":{"productId":"94e1d2ac-c130-475d-aefd-c5ec5a48cb3a","productName":"QAtest002Pro","serviceId":"2954938c-8c5f-49ae-b68d-44f27292222b","serviceType":0,"billingInfo":{"billingId":"29d17e75-8c80-4501-8bf5-520db2eb1414","billingMode":1,"basePrice":30,"periodType":3,"basicPrice":10,"cyclePrice":20,"unitPrice":null,"unitType":null},"commonServiceAttrValue":null},"[307a5634-f7ae-4892-8e58-f49421661d02, 29d17e75-8c80-4501-8bf5-520db2eb1414]":{"productId":"94e1d2ac-c130-475d-aefd-c5ec5a48cb3a","productName":"QAtest002Pro","serviceId":"2954938c-8c5f-49ae-b68d-44f27292222b","serviceType":0,"billingInfo":{"billingId":"29d17e75-8c80-4501-8bf5-520db2eb1414","billingMode":1,"basePrice":30,"periodType":3,"basicPrice":10,"cyclePrice":20,"unitPrice":null,"unitType":null},"commonServiceAttrValue":null}}})
        // })
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
        
        // return this.restApi.request(api.method, api.url, undefined, undefined, pathParams)
        //             .then(res => {
        //                     if(res.resultCode !== "100"){
        //                         throw "CLOUD_HOST.GET_IMAGE_FAILURE";
        //                     }
        //                     return res.resultContent.imageItems;
        //                 });

        return Promise.resolve({"resultCode":"100","detailDescription":null,"resultContent":{"enterpriseId":"5b2967d4-5d18-482c-95c6-b4aeab40bde9","platformId":"eb3f4908-873c-4e68-b759-8303491ea502","platformType":null,"imageItems":[{"imageId":"9f196ebc-8fbf-48ab-8b23-ec8254f95a21","imageType":0,"osType":1,"imageName":"Centos-6.5","imageCode":null,"imageDisplayName":"Centos-6.5_new","capacity":13287936},{"imageId":"3bd9ec0b-9a75-4e7b-a648-6e030f6dcbc1","imageType":0,"osType":0,"imageName":"windows-server-2008","imageCode":null,"imageDisplayName":"windows-server-2008_new","capacity":13287936},{"imageId":"c57e2eaf-bb49-4049-ac7e-787223308951","imageType":0,"osType":0,"imageName":"cirros","imageCode":null,"imageDisplayName":"cirros","capacity":13287936}]}}.resultContent.imageItems)

    }

    unitType = this.dict.get({ 
        owner : "PACKAGE_BILLING",
        field : "PERIOD_TYPE"
    });
}
