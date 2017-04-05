import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UnsubscribeService {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }

    userInfo = this.restApi.getLoginInfo().userInfo;


    orderUnsubscribe(postData : string[]) {
        
        const api = this.restApiCfg.getRestApi("op-center.order-mng.order-cancel.post");

        const request = this.restApi.request(api.method, api.url, undefined, undefined, postData)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
    }

    getOrderList(params) : Promise<any[]>{
        const api = this.restApiCfg.getRestApi("shopping.orders.completion");

        const request = this.restApi.request(api.method, api.url,undefined,undefined, params)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
        // return Promise.resolve({"resultCode":"100","detailDescription":null,"resultContent":[{"id":"004ddcb2-7de8-4bdf-9359-2396ef9422f7","itemNo":"020170401111945251","groupNo":"20170401111944328","createDate":"2017-03-31 19:46:34","extendType":0,"itemList":[{"id":"450e432e-71c5-4bef-8204-40ef3278a46f","serviceType":1,"billingMode":"1","billingPeriod":null,"quantity":1,"billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":0.0,"cyclePrice":0.0,"unitPrice":20.0,"unitType":0.0},"attrList":[{"attrCode":"DISKINSNAME","attrDisplayName":"云硬盘实例名称","attrValueCode":"","attrDisplayValue":"dsf","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"TIMELINEUNIT","attrDisplayName":"时长单位","attrValueCode":"90139f53-7f7f-4c31-81b8-3c27e56ca624","attrDisplayValue":"按天","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"ZONE","attrDisplayName":"可用区","attrValueCode":"Dev_Cluster","attrDisplayValue":"Dev_Cluster","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKINITIALSIZE","attrDisplayName":"初始大小","attrValueCode":null,"attrDisplayValue":"1","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKSTEPSIZE","attrDisplayName":"步长","attrValueCode":null,"attrDisplayValue":"2","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKSIZE","attrDisplayName":"容量","attrValueCode":"","attrDisplayValue":"1GB","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKTYPE","attrDisplayName":"云硬盘","attrValueCode":"EMPTYDISK","attrDisplayValue":"空白盘","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"PLATFORM","attrDisplayName":"云平台","attrValueCode":"前端云平台","attrDisplayValue":"前端云平台","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKMOUNTHOSTNAME","attrDisplayName":"云主机名称","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"STORAGE","attrDisplayName":"云硬盘类型","attrValueCode":"SharedVMFS","attrDisplayValue":"SharedVMFS","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"","attrDisplayName":"","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKMAXSIZE","attrDisplayName":"最大","attrValueCode":null,"attrDisplayValue":"15","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKMOUNTHOSTID","attrDisplayName":"挂载云主机ID","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""}],"status":0,"createDate":"2017-03-31 19:46:34","expireDate":null}]},{"id":"439628c3-3532-4308-98da-7413acfb40b2","itemNo":"020170401111944430","groupNo":"20170401111944328","createDate":"2017-03-31 19:46:34","extendType":0,"itemList":[{"id":"420a4b3d-2445-4a06-bc52-4023a26a518d","serviceType":1,"billingMode":"1","billingPeriod":null,"quantity":1,"billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":0.0,"cyclePrice":0.0,"unitPrice":20.0,"unitType":0.0},"attrList":[{"attrCode":"DISKMOUNTHOSTID","attrDisplayName":"挂载云主机ID","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"STORAGE","attrDisplayName":"云硬盘类型","attrValueCode":"SharedVMFS","attrDisplayValue":"SharedVMFS","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"PLATFORM","attrDisplayName":"云平台","attrValueCode":"前端云平台","attrDisplayValue":"前端云平台","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKINITIALSIZE","attrDisplayName":"初始大小","attrValueCode":null,"attrDisplayValue":"1","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKSIZE","attrDisplayName":"容量","attrValueCode":"","attrDisplayValue":"1GB","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKINSNAME","attrDisplayName":"云硬盘实例名称","attrValueCode":"","attrDisplayValue":"dsf","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKTYPE","attrDisplayName":"云硬盘","attrValueCode":"EMPTYDISK","attrDisplayValue":"空白盘","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKMAXSIZE","attrDisplayName":"最大","attrValueCode":null,"attrDisplayValue":"15","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"","attrDisplayName":"","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKSTEPSIZE","attrDisplayName":"步长","attrValueCode":null,"attrDisplayValue":"2","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"TIMELINEUNIT","attrDisplayName":"时长单位","attrValueCode":"90139f53-7f7f-4c31-81b8-3c27e56ca624","attrDisplayValue":"按天","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"ZONE","attrDisplayName":"可用区","attrValueCode":"Dev_Cluster","attrDisplayValue":"Dev_Cluster","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKMOUNTHOSTNAME","attrDisplayName":"云主机名称","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""}],"status":1,"createDate":"2017-03-31 19:46:34","expireDate":null}]},{"id":"4d6b23e8-efeb-49ce-be64-728bb98fbc46","itemNo":"020170401111944655","groupNo":"20170401111944328","createDate":"2017-03-31 19:46:34","extendType":0,"itemList":[{"id":"cbbf378c-6766-4adc-af73-41ecf7f68eea","serviceType":1,"billingMode":"1","billingPeriod":null,"quantity":1,"billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":0.0,"cyclePrice":0.0,"unitPrice":20.0,"unitType":0.0},"attrList":[{"attrCode":"ZONE","attrDisplayName":"可用区","attrValueCode":"Dev_Cluster","attrDisplayValue":"Dev_Cluster","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKMOUNTHOSTID","attrDisplayName":"挂载云主机ID","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"STORAGE","attrDisplayName":"云硬盘类型","attrValueCode":"SharedVMFS","attrDisplayValue":"SharedVMFS","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"TIMELINEUNIT","attrDisplayName":"时长单位","attrValueCode":"90139f53-7f7f-4c31-81b8-3c27e56ca624","attrDisplayValue":"按天","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKSTEPSIZE","attrDisplayName":"步长","attrValueCode":null,"attrDisplayValue":"2","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKMOUNTHOSTNAME","attrDisplayName":"云主机名称","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKSIZE","attrDisplayName":"容量","attrValueCode":"","attrDisplayValue":"1GB","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKINITIALSIZE","attrDisplayName":"初始大小","attrValueCode":null,"attrDisplayValue":"1","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"PLATFORM","attrDisplayName":"云平台","attrValueCode":"前端云平台","attrDisplayValue":"前端云平台","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKMAXSIZE","attrDisplayName":"最大","attrValueCode":null,"attrDisplayValue":"15","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKTYPE","attrDisplayName":"云硬盘","attrValueCode":"EMPTYDISK","attrDisplayValue":"空白盘","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKINSNAME","attrDisplayName":"云硬盘实例名称","attrValueCode":"","attrDisplayValue":"dsf","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"","attrDisplayName":"","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""}],"status":1,"createDate":"2017-03-31 19:46:34","expireDate":null}]},{"id":"bc1c5912-8953-4c82-a7f0-b9e7d06c86d3","itemNo":"020170401111945049","groupNo":"20170401111944328","createDate":"2017-03-31 19:46:34","extendType":0,"itemList":[{"id":"edce86d3-bc9a-4e23-9a75-3a753886bf27","serviceType":1,"billingMode":"1","billingPeriod":null,"quantity":1,"billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":0.0,"cyclePrice":0.0,"unitPrice":20.0,"unitType":0.0},"attrList":[{"attrCode":"DISKMOUNTHOSTNAME","attrDisplayName":"云主机名称","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKSIZE","attrDisplayName":"容量","attrValueCode":"","attrDisplayValue":"1GB","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"PLATFORM","attrDisplayName":"云平台","attrValueCode":"前端云平台","attrDisplayValue":"前端云平台","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKINITIALSIZE","attrDisplayName":"初始大小","attrValueCode":null,"attrDisplayValue":"1","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"TIMELINEUNIT","attrDisplayName":"时长单位","attrValueCode":"90139f53-7f7f-4c31-81b8-3c27e56ca624","attrDisplayValue":"按天","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKINSNAME","attrDisplayName":"云硬盘实例名称","attrValueCode":"","attrDisplayValue":"dsf","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"","attrDisplayName":"","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"STORAGE","attrDisplayName":"云硬盘类型","attrValueCode":"SharedVMFS","attrDisplayValue":"SharedVMFS","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKTYPE","attrDisplayName":"云硬盘","attrValueCode":"EMPTYDISK","attrDisplayValue":"空白盘","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKSTEPSIZE","attrDisplayName":"步长","attrValueCode":null,"attrDisplayValue":"2","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"ZONE","attrDisplayName":"可用区","attrValueCode":"Dev_Cluster","attrDisplayValue":"Dev_Cluster","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKMAXSIZE","attrDisplayName":"最大","attrValueCode":null,"attrDisplayValue":"15","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKMOUNTHOSTID","attrDisplayName":"挂载云主机ID","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""}],"status":0,"createDate":"2017-03-31 19:46:34","expireDate":null}]},{"id":"d83b2372-2d48-43e5-b523-ef7842961bbd","itemNo":"020170401111944850","groupNo":"20170401111944328","createDate":"2017-03-31 19:46:34","extendType":0,"itemList":[{"id":"41e58c20-7009-441c-92a7-077afdf9a97b","serviceType":1,"billingMode":"1","billingPeriod":null,"quantity":1,"billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":0.0,"cyclePrice":0.0,"unitPrice":20.0,"unitType":0.0},"attrList":[{"attrCode":"DISKSTEPSIZE","attrDisplayName":"步长","attrValueCode":null,"attrDisplayValue":"2","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKINITIALSIZE","attrDisplayName":"初始大小","attrValueCode":null,"attrDisplayValue":"1","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKMOUNTHOSTID","attrDisplayName":"挂载云主机ID","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"ZONE","attrDisplayName":"可用区","attrValueCode":"Dev_Cluster","attrDisplayValue":"Dev_Cluster","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKMAXSIZE","attrDisplayName":"最大","attrValueCode":null,"attrDisplayValue":"15","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKSIZE","attrDisplayName":"容量","attrValueCode":"","attrDisplayValue":"1GB","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"STORAGE","attrDisplayName":"云硬盘类型","attrValueCode":"SharedVMFS","attrDisplayValue":"SharedVMFS","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKTYPE","attrDisplayName":"云硬盘","attrValueCode":"EMPTYDISK","attrDisplayValue":"空白盘","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"TIMELINEUNIT","attrDisplayName":"时长单位","attrValueCode":"90139f53-7f7f-4c31-81b8-3c27e56ca624","attrDisplayValue":"按天","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKINSNAME","attrDisplayName":"云硬盘实例名称","attrValueCode":"","attrDisplayValue":"dsf","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKMOUNTHOSTNAME","attrDisplayName":"云主机名称","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"","attrDisplayName":"","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"PLATFORM","attrDisplayName":"云平台","attrValueCode":"前端云平台","attrDisplayValue":"前端云平台","valueUnit":null,"attrOrderSeq":null,"description":""}],"status":0,"createDate":"2017-03-31 19:46:34","expireDate":null}]}]}.resultContent)
    }

    getOrderDetail(subId): Promise<any> {
        
        const api = this.restApiCfg.getRestApi("op-center.order-mng.order-detail.get");

        let pathParams = [
            {
                key: 'subinstanceCode',
                value: subId
            }
        ];
        const request = this.restApi.request(api.method, api.url, pathParams, undefined)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
        // return Promise.resolve({"resultCode":"100","detailDescription":null,"resultContent":{"instanceId":"229e2277-628c-4bbc-9d2f-1b642bdec495","instanceCode":"20170330174924761","specList":null,"specification":"1核CPU, 2048M内存, 6G启动盘","productBillingItem":{"billingId":"2175a613-ffd1-4304-899e-b1c9fbe1138c","billingMode":0,"basePrice":45,"periodType":1,"basicPrice":3,"cyclePrice":23,"unitPrice":null,"unitType":null},"status":1,"createDate":"2017/03/30 02:15:59","expireDate":null,"buyer":"nobody","department":"管理员部门","enterprise":"前端企业","instanceName":"新家1-2-6-new","platform":"前端云平台","zone":"Dev_Cluster","type":0,"productType":"0","extendType":0,"quantity":1,"period":4,"relatedSubInstanceList":[{"id":"992311e6-bf8b-45ba-878f-87f4894abd85","serviceType":1,"instanceId":"213-628c-4bbc-9d2f-1b642bdec495","billingMode":"1","billingPeriod":null,"quantity":1,"type":1,"productBillingItem":{"billingId":"99649bcc-2265-4a7c-9dea-b6df42195798","billingMode":1,"basePrice":10,"periodType":3,"basicPrice":0,"cyclePrice":0,"unitPrice":10,"unitType":0},"specList":[{"attrCode":"","attrDisplayName":"","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKMAXSIZE","attrDisplayName":"最大","attrValueCode":null,"attrDisplayValue":"4","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKINSNAME","attrDisplayName":"云硬盘实例名称","attrValueCode":"","attrDisplayValue":"上午","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKTYPE","attrDisplayName":"云硬盘","attrValueCode":"EMPTYDISK","attrDisplayValue":"空白盘","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"ZONE","attrDisplayName":"可用区","attrValueCode":"nova_test","attrDisplayValue":"nova_test01","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKSTEPSIZE","attrDisplayName":"步长","attrValueCode":null,"attrDisplayValue":"1","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKMOUNTHOSTID","attrDisplayName":"挂载云主机ID","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"STORAGE","attrDisplayName":"云硬盘类型","attrValueCode":"nfs2","attrDisplayValue":"nfs2","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKMOUNTHOSTNAME","attrDisplayName":"云主机名称","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKINITIALSIZE","attrDisplayName":"初始大小","attrValueCode":null,"attrDisplayValue":"1","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKSIZE","attrDisplayName":"容量","attrValueCode":"","attrDisplayValue":"1GB","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"PLATFORM","attrDisplayName":"云平台","attrValueCode":"wuxin_openstack","attrDisplayValue":"wuxin_openstack","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"TIMELINEUNIT","attrDisplayName":"时长单位","attrValueCode":"99649bcc-2265-4a7c-9dea-b6df42195798","attrDisplayValue":"按月","valueUnit":null,"attrOrderSeq":null,"description":""}],"status":0,"createDate":"2017-03-31 05:37:19","expireDate":null},{"id":"992311e6-bf8b-45ba-878f-87f4894abd85","serviceType":1,"billingMode":"1","billingPeriod":null,"quantity":1,"type":1,"instanceId":"44bbc-9d2f-1b642bdec495","productBillingItem":{"billingId":"99649bcc-2265-4a7c-9dea-b6df42195798","billingMode":1,"basePrice":10,"periodType":3,"basicPrice":0,"cyclePrice":0,"unitPrice":10,"unitType":0},"specList":[{"attrCode":"","attrDisplayName":"","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKMAXSIZE","attrDisplayName":"最大","attrValueCode":null,"attrDisplayValue":"4","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKINSNAME","attrDisplayName":"云硬盘实例名称","attrValueCode":"","attrDisplayValue":"上午","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKTYPE","attrDisplayName":"云硬盘","attrValueCode":"EMPTYDISK","attrDisplayValue":"空白盘","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"ZONE","attrDisplayName":"可用区","attrValueCode":"nova_test","attrDisplayValue":"nova_test01","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKSTEPSIZE","attrDisplayName":"步长","attrValueCode":null,"attrDisplayValue":"1","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKMOUNTHOSTID","attrDisplayName":"挂载云主机ID","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"STORAGE","attrDisplayName":"云硬盘类型","attrValueCode":"nfs2","attrDisplayValue":"nfs2","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKMOUNTHOSTNAME","attrDisplayName":"云主机名称","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKINITIALSIZE","attrDisplayName":"初始大小","attrValueCode":null,"attrDisplayValue":"1","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKSIZE","attrDisplayName":"容量","attrValueCode":"","attrDisplayValue":"1GB","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"PLATFORM","attrDisplayName":"云平台","attrValueCode":"wuxin_openstack","attrDisplayValue":"wuxin_openstack","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"TIMELINEUNIT","attrDisplayName":"时长单位","attrValueCode":"99649bcc-2265-4a7c-9dea-b6df42195798","attrDisplayValue":"按月","valueUnit":null,"attrOrderSeq":null,"description":""}],"status":0,"createDate":"2017-03-31 05:37:19","expireDate":null}],"relatedOrderList":[{"instanceId":"229e2277-628c-4bbc-9d2f-1b642bdec495","instanceCode":"20170330174924761","specList":null,"specification":"1核CPU, 2048M内存, 6G启动盘","productBillingItem":{"billingId":"2175a613-ffd1-4304-899e-b1c9fbe1138c","billingMode":0,"basePrice":45,"periodType":1,"basicPrice":3,"cyclePrice":23,"unitPrice":null,"unitType":null},"status":1,"createDate":"2017/03/30 02:15:59","expireDate":null,"buyer":"nobody","department":"管理员部门","enterprise":"前端企业","instanceName":"新家1-2-6-new","platform":"前端云平台","zone":"Dev_Cluster","type":0,"productType":"0","extendType":null,"quantity":1,"period":4,"relatedSubInstanceList":null,"relatedOrderList":null,"itemList":null}],"itemList":[{"status":1,"quantity":1,"createDate":"2017-03-30 02:15:59","expireDate":null,"period":4,"serviceType":0,"billingInfo":{"billingId":"2175a613-ffd1-4304-899e-b1c9fbe1138c","billingMode":0,"basePrice":45,"periodType":1,"basicPrice":3,"cyclePrice":23,"unitPrice":null,"unitType":null},"specList":[{"attrCode":"PLATFORM","attrDisplayName":"云平台","attrValueCode":"前端云平台","attrDisplayValue":"前端云平台","valueUnit":null,"attrOrderSeq":null,"description":null},{"attrCode":"IMAGETYPE","attrDisplayName":"镜像类型","attrValueCode":null,"attrDisplayValue":"标准镜像","valueUnit":null,"attrOrderSeq":null,"description":null},{"attrCode":"BOOTSIZE","attrDisplayName":"启动盘容量","attrValueCode":"6GB","attrDisplayValue":"6GB","valueUnit":null,"attrOrderSeq":null,"description":null},{"attrCode":"TIMELINEUNIT","attrDisplayName":"时长单位","attrValueCode":"2175a613-ffd1-4304-899e-b1c9fbe1138c","attrDisplayValue":"按天","valueUnit":null,"attrOrderSeq":null,"description":null},{"attrCode":"SECURITYGROUP","attrDisplayName":"安全组","attrValueCode":null,"attrDisplayValue":"default","valueUnit":null,"attrOrderSeq":null,"description":null},{"attrCode":"MEM","attrDisplayName":"内存","attrValueCode":"2GB","attrDisplayValue":"2GB","valueUnit":null,"attrOrderSeq":null,"description":null},{"attrCode":"OS","attrDisplayName":"镜像列表","attrValueCode":"500af9a6-b275-4db9-6eab-279d2b81dd86","attrDisplayValue":"rhel6.5","valueUnit":null,"attrOrderSeq":null,"description":null},{"attrCode":"CPU","attrDisplayName":"CPU","attrValueCode":"1core","attrDisplayValue":"1核","valueUnit":null,"attrOrderSeq":null,"description":null},{"attrCode":"USERNAME","attrDisplayName":"用户名","attrValueCode":"","attrDisplayValue":"root","valueUnit":null,"attrOrderSeq":null,"description":null},{"attrCode":"TIMELINE","attrDisplayName":"购买时长","attrValueCode":"","attrDisplayValue":"4","valueUnit":null,"attrOrderSeq":null,"description":null},{"attrCode":"STARTUPSOURCE","attrDisplayName":"启动源","attrValueCode":null,"attrDisplayValue":"镜像","valueUnit":null,"attrOrderSeq":null,"description":null},{"attrCode":"ZONE","attrDisplayName":"可用区","attrValueCode":"Dev_Cluster","attrDisplayValue":"Dev_Cluster","valueUnit":null,"attrOrderSeq":null,"description":null},{"attrCode":"INSTANCENAME","attrDisplayName":"实例名称","attrValueCode":"","attrDisplayValue":"泪流满面","valueUnit":null,"attrOrderSeq":null,"description":null},{"attrCode":"BOOTSTORAGE","attrDisplayName":"启动盘","attrValueCode":"SharedVMFS","attrDisplayValue":"SharedVMFS","valueUnit":null,"attrOrderSeq":null,"description":null},{"attrCode":"SETTINGTYPE","attrDisplayName":"设置方式","attrValueCode":null,"attrDisplayValue":"立即设置","valueUnit":null,"attrOrderSeq":null,"description":null},{"attrCode":"BILLINGMODE","attrDisplayName":"计费模式","attrValueCode":null,"attrDisplayValue":"周期计费","valueUnit":null,"attrOrderSeq":null,"description":null},{"attrCode":"PASSWORD","attrDisplayName":"登录密码","attrValueCode":"","attrDisplayValue":"!Qaz2wsx","valueUnit":null,"attrOrderSeq":null,"description":null},{"attrCode":"STORAGE","attrDisplayName":"云硬盘类型","attrValueCode":"SharedVMFS","attrDisplayValue":"SharedVMFS","valueUnit":null,"attrOrderSeq":null,"description":null},{"attrCode":"NETWORKTYPE","attrDisplayName":"网络类型","attrValueCode":null,"attrDisplayValue":"Net1","valueUnit":null,"attrOrderSeq":null,"description":null}],"instanceName":"新家1-2-6-new","buyer":"nobody","departmentName":"管理员部门"}]}}.resultContent)
    }

}