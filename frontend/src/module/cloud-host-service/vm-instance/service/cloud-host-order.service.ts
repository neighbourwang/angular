import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi } from '../../../../architecture';

import { PayLoad } from '../model/attr-list.model';
import { TimeLineData } from '../model/services.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class cloudHostServiceOrder {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private restApi:RestApi) {
    }

    getHostConfigList() : Promise<any>{
        const api = this.restApiCfg.getRestApi("hosts.services.get");
        // const api = this.restApiCfg.getRestApi("oauth.token");
        // this.restApi.request(api.method, api.url, undefined, undefined).then(res => {
        //   console.log(res,2313123)
        // })

// return new Promise((next) => {
//     next(
// {"attrList":[{"attrId":"de229135-a0f7-11e6-a18b-0050568a49fd","attrCode":"INSTANCENAME","attrDisplayName":"实例名称","skuFlag":null,"valueType":2,"mandatory":0,"relyType":0,"relyAttrId":null,"valueList":null,"mapValueList":null},{"attrId":"de22a1e3-a0f7-11e6-a18b-0050568a49fd","attrCode":"MEM","attrDisplayName":"内存","skuFlag":null,"valueType":0,"mandatory":0,"relyType":1,"relyAttrId":"de22a07b-a0f7-11e6-a18b-0050568a49fd","valueList":null,"mapValueList":{"be9731a0-a1b3-11e6-a18b-0050568a49fd":[{"attrValueId":"2ef9b384-a1b4-11e6-a18b-0050568a49fd","attrValueCode":"512MB","attrDisplayValue":"502MB","attrValue":"512"}]}},{"attrId":"de227c2e-a0f7-11e6-a18b-0050568a49fd","attrCode":"IMAGETYPE","attrDisplayName":"镜像类型","skuFlag":null,"valueType":1,"mandatory":0,"relyType":1,"relyAttrId":"de22951e-a0f7-11e6-a18b-0050568a49fd","valueList":null,"mapValueList":{"946a6340-a1b6-11e6-a18b-0050568a49fd":[{"attrValueId":"cbe7ad93-a1b6-11e6-a18b-0050568a49fd","attrValueCode":null,"attrDisplayValue":"标准镜像","attrValue":"0"}]}},{"attrId":"de2285b7-a0f7-11e6-a18b-0050568a49fd","attrCode":"NETWORKTYPE","attrDisplayName":"网络类型","skuFlag":null,"valueType":1,"mandatory":0,"relyType":0,"relyAttrId":null,"valueList":[{"attrValueId":"2a33f9ad-a1b6-11e6-a18b-0050568a49fd","attrValueCode":null,"attrDisplayValue":"自定义网络1: 192.168.101.0","attrValue":"73f6f1ac-5e58-4801-88c3-7e12c6ddfb39"},{"attrValueId":"33a08bec-a1b6-11e6-a18b-0050568a49fd","attrValueCode":null,"attrDisplayValue":"自定义网络1: 172.16.0.0","attrValue":"0d7f94cd-8fd2-42e6-8049-10deeb5a2dbf"}],"mapValueList":null},{"attrId":"ab2cd7ee-a1ba-11e6-a18b-0050568a49fd","attrCode":"BILLINGMODE","attrDisplayName":"计费模式","skuFlag":null,"valueType":1,"mandatory":0,"relyType":0,"relyAttrId":null,"valueList":[{"attrValueId":"2478ab7f-a1bb-11e6-a18b-0050568a49fd","attrValueCode":null,"attrDisplayValue":"周期计费","attrValue":"0"},{"attrValueId":"27e38973-a1bb-11e6-a18b-0050568a49fd","attrValueCode":null,"attrDisplayValue":"流量计费","attrValue":"1"}],"mapValueList":null},{"attrId":"de22a07b-a0f7-11e6-a18b-0050568a49fd","attrCode":"CPU","attrDisplayName":"CPU","skuFlag":null,"valueType":0,"mandatory":0,"relyType":1,"relyAttrId":"de226d17-a0f7-11e6-a18b-0050568a49fd","valueList":null,"mapValueList":{"053595bd-058e-4ca2-b68b-6e8dcd14385b":[{"attrValueId":"be9731a0-a1b3-11e6-a18b-0050568a49fd","attrValueCode":"1core","attrDisplayValue":"2核","attrValue":"1"}],"0a2777bd-54ce-44f1-92f9-768061f64b46":[{"attrValueId":"be9731a0-a1b3-11e6-a18b-0050568a49fd","attrValueCode":null,"attrDisplayValue":"1核","attrValue":"1"}]}},{"attrId":"de22951e-a0f7-11e6-a18b-0050568a49fd","attrCode":"STARTUPSOURCE","attrDisplayName":"启动源","skuFlag":null,"valueType":0,"mandatory":0,"relyType":1,"relyAttrId":"de226d17-a0f7-11e6-a18b-0050568a49fd","valueList":null,"mapValueList":{"053595bd-058e-4ca2-b68b-6e8dcd14385b":[{"attrValueId":"946a6340-a1b6-11e6-a18b-0050568a49fd","attrValueCode":null,"attrDisplayValue":"镜像","attrValue":"0"}],"0a2777bd-54ce-44f1-92f9-768061f64b46":[{"attrValueId":"946a6340-a1b6-11e6-a18b-0050568a49fd","attrValueCode":null,"attrDisplayValue":"镜像","attrValue":"0"}]}},{"attrId":"de227a98-a0f7-11e6-a18b-0050568a49fd","attrCode":"TIMELINE","attrDisplayName":"购买时长","skuFlag":null,"valueType":0,"mandatory":0,"relyType":0,"relyAttrId":null,"valueList":null,"mapValueList":null},{"attrId":"de2296a2-a0f7-11e6-a18b-0050568a49fd","attrCode":"STORAGESIZE","attrDisplayName":"数据盘容量","skuFlag":null,"valueType":1,"mandatory":0,"relyType":0,"relyAttrId":null,"valueList":null,"mapValueList":null},{"attrId":"de228e4d-a0f7-11e6-a18b-0050568a49fd","attrCode":"USERNAME","attrDisplayName":"用户名","skuFlag":null,"valueType":2,"mandatory":0,"relyType":0,"relyAttrId":null,"valueList":null,"mapValueList":null},{"attrId":"de228b51-a0f7-11e6-a18b-0050568a49fd","attrCode":"SETTINGTYPE","attrDisplayName":"设置方式","skuFlag":null,"valueType":2,"mandatory":0,"relyType":0,"relyAttrId":null,"valueList":[{"attrValueId":"d1217664-a1b8-11e6-a18b-0050568a49fd","attrValueCode":null,"attrDisplayValue":"立即设置","attrValue":"0"},{"attrValueId":"d45738f1-a1b8-11e6-a18b-0050568a49fd","attrValueCode":null,"attrDisplayValue":"模板自带密码","attrValue":"1"}],"mapValueList":null},{"attrId":"8df90e09-a74a-11e6-a18b-0050568a49fd","attrCode":"STORAGE","attrDisplayName":"云硬盘类型","skuFlag":null,"valueType":1,"mandatory":0,"relyType":1,"relyAttrId":"de226d17-a0f7-11e6-a18b-0050568a49fd","valueList":null,"mapValueList":{"053595bd-058e-4ca2-b68b-6e8dcd14385b":[{"attrValueId":"32b47c8b-2627-41ee-8104-0c7debb25371","attrValueCode":"ha-volume-manager@lvm-2#LVM2_iSCSI","attrDisplayValue":"高速I/O","attrValue":"f51a8170-27cd-4a81-869c-5984368df71d"}],"0a2777bd-54ce-44f1-92f9-768061f64b46":[{"attrValueId":"4c624f16-83aa-4f86-a388-690feb15bd67","attrValueCode":null,"attrDisplayValue":"高速I/O","attrValue":"1f244ebd-6722-47aa-a010-f2280e4c60c8"}]}},{"attrId":"de229b8e-a0f7-11e6-a18b-0050568a49fd","attrCode":"ZONE","attrDisplayName":"可用区","skuFlag":null,"valueType":1,"mandatory":0,"relyType":1,"relyAttrId":"de226d17-a0f7-11e6-a18b-0050568a49fd","valueList":null,"mapValueList":{"053595bd-058e-4ca2-b68b-6e8dcd14385b":[{"attrValueId":"bd82afc3-4684-45f8-bf3f-096cdad2dfd9","attrValueCode":"nova","attrDisplayValue":"NOVqqA","attrValue":"nova"}],"0a2777bd-54ce-44f1-92f9-768061f64b46":[{"attrValueId":"c5455fa6-01bf-4259-a514-e8016dd3b038","attrValueCode":null,"attrDisplayValue":"NOVA","attrValue":"7bf76a01-a394-4f2f-889b-5a96a75e20e4"}]}},{"attrId":"de229d22-a0f7-11e6-a18b-0050568a49fd","attrCode":"BOOTSTORAGE","attrDisplayName":"启动盘","skuFlag":null,"valueType":0,"mandatory":0,"relyType":1,"relyAttrId":"de229b8e-a0f7-11e6-a18b-0050568a49fd","valueList":null,"mapValueList":{"bd82afc3-4684-45f8-bf3f-096cdad2dfd9":[{"attrValueId":"63145a0e-4e5b-4821-b9ba-fd14035fee59","attrValueCode":"ha-volume-manager@lvm-2#LVM2_iSCSI","attrDisplayValue":"高速I/O","attrValue":"f51a8170-27cd-4a81-869c-5984368df71d"}],"c5455fa6-01bf-4259-a514-e8016dd3b038":[{"attrValueId":"35ea582a-a178-4f7d-93c7-d86ecb6ff68f","attrValueCode":null,"attrDisplayValue":"高速I/O","attrValue":"1f244ebd-6722-47aa-a010-f2280e4c60c8"}]}},{"attrId":"de228fbe-a0f7-11e6-a18b-0050568a49fd","attrCode":"PASSWORD","attrDisplayName":"登录密码","skuFlag":null,"valueType":2,"mandatory":0,"relyType":1,"relyAttrId":"de228b51-a0f7-11e6-a18b-0050568a49fd","valueList":null,"mapValueList":null},{"attrId":"de229efb-a0f7-11e6-a18b-0050568a49fd","attrCode":"BOOTSIZE","attrDisplayName":"启动盘容量","skuFlag":null,"valueType":0,"mandatory":0,"relyType":0,"relyAttrId":null,"valueList":null,"mapValueList":null},{"attrId":"de226d17-a0f7-11e6-a18b-0050568a49fd","attrCode":"PLATFORM","attrDisplayName":"云平台","skuFlag":null,"valueType":1,"mandatory":0,"relyType":0,"relyAttrId":null,"valueList":[{"attrValueId":"053595bd-058e-4ca2-b68b-6e8dcd14385b","attrValueCode":"上海云平台_Jason","attrDisplayValue":"上海云平台_Jason","attrValue":"325c3f98-39a7-4f8e-a9bd-a346abe8cdbe"},{"attrValueId":"0a2777bd-54ce-44f1-92f9-768061f64b46","attrValueCode":null,"attrDisplayValue":"BOE-Michael-SHanghai","attrValue":"0f876450-d9fc-472f-9afc-8132d8524e09"}],"mapValueList":null},{"attrId":"de229819-a0f7-11e6-a18b-0050568a49fd","attrCode":"TIMELINEUNIT","attrDisplayName":"时长单位","skuFlag":null,"valueType":1,"mandatory":0,"relyType":0,"relyAttrId":null,"valueList":[{"attrValueId":"b8fe32a7-a1bb-11e6-a18b-0050568a49fd","attrValueCode":"01074922-6ecf-4f59-af4c-606c6e4fdeb5","attrDisplayValue":"按月","attrValue":"3"},{"attrValueId":"b8fe32a7-a1bb-11e6-a18b-0050568a49fd","attrValueCode":"a7b06098-1b6d-4eb3-871b-605da0fae72c","attrDisplayValue":"按月","attrValue":"3"},{"attrValueId":"bc5d2ca5-a1bb-11e6-a18b-0050568a49fd","attrValueCode":"f1c00fc9-bf00-4f5f-b802-6b614047667f","attrDisplayValue":"按年","attrValue":"5"},{"attrValueId":"b8fe32a7-a1bb-11e6-a18b-0050568a49fd","attrValueCode":"98689f80-9497-4598-8b97-c1c4f696ab5b","attrDisplayValue":"按月","attrValue":"3"},{"attrValueId":"bc5d2ca5-a1bb-11e6-a18b-0050568a49fd","attrValueCode":"67b75514-63ce-416b-ad0d-d61a5ca1bf00","attrDisplayValue":"按年","attrValue":"5"}],"mapValueList":null},{"attrId":"de22938f-a0f7-11e6-a18b-0050568a49fd","attrCode":"SECURITYGROUP","attrDisplayName":"安全组","skuFlag":null,"valueType":0,"mandatory":0,"relyType":0,"relyAttrId":null,"valueList":[{"attrValueId":"64aa7bb2-a1b6-11e6-a18b-0050568a49fd","attrValueCode":null,"attrDisplayValue":"default","attrValue":"default"}],"mapValueList":null},{"attrId":"de227f1f-a0f7-11e6-a18b-0050568a49fd","attrCode":"OS","attrDisplayName":"镜像列表","skuFlag":null,"valueType":1,"mandatory":0,"relyType":1,"relyAttrId":"de227c2e-a0f7-11e6-a18b-0050568a49fd","valueList":null,"mapValueList":{"cbe7ad93-a1b6-11e6-a18b-0050568a49fd":[{"attrValueId":"19cc07c0-c916-4779-8ed5-8d9adc98729c","attrValueCode":"4e016466-a7f9-46b1-b854-04f206194b44","attrDisplayValue":"吴鑫_镜像","attrValue":"45cb5fb3-940b-40e0-b945-130ddaabe711"},{"attrValueId":"958ee9f1-cecb-4bb9-81c3-548a1f084139","attrValueCode":"4e016466-a7f9-46b1-b854-04f206194b44","attrDisplayValue":"Cirros-64位","attrValue":"4ff1662f-d84e-459d-b90b-dd698199a80c"}]}}],"skuMap":{"[be9731a0-a1b3-11e6-a18b-0050568a49fd, 2ef9b384-a1b4-11e6-a18b-0050568a49fd, bd82afc3-4684-45f8-bf3f-096cdad2dfd9, 053595bd-058e-4ca2-b68b-6e8dcd14385b, 67b75514-63ce-416b-ad0d-d61a5ca1bf00]":{"productId":"3ddb2960-eb3c-449c-90de-fd62235c249c","skuId":"1c8628ae-f062-4250-8439-df50f7fe82d8","serviceType":0,"serviceName":"产品_吴鑫"},"[c5455fa6-01bf-4259-a514-e8016dd3b038, be9731a0-a1b3-11e6-a18b-0050568a49fd, 0a2777bd-54ce-44f1-92f9-768061f64b46, 01074922-6ecf-4f59-af4c-606c6e4fdeb5]":{"productId":"af0a1d4f-3f2f-47b3-9993-223b37ad0059","skuId":"dd067cfd-0279-43a4-b9c7-979e31b45408","serviceType":0,"serviceName":"test-boe-9999"},"[c5455fa6-01bf-4259-a514-e8016dd3b038, be9731a0-a1b3-11e6-a18b-0050568a49fd, 0a2777bd-54ce-44f1-92f9-768061f64b46, a7b06098-1b6d-4eb3-871b-605da0fae72c]":{"productId":"8dbfab99-6d51-4ce1-a356-1854802c7e5d","skuId":"dd067cfd-0279-43a4-b9c7-979e31b45408","serviceType":0,"serviceName":"boe-pro-1"},"[2ef9b384-a1b4-11e6-a18b-0050568a49fd, 053595bd-058e-4ca2-b68b-6e8dcd14385b, be9731a0-a1b3-11e6-a18b-0050568a49fd, bd82afc3-4684-45f8-bf3f-096cdad2dfd9, 98689f80-9497-4598-8b97-c1c4f696ab5b]":{"productId":"83ea618c-3bc8-43d0-a60e-30b73f1abb5a","skuId":"1c8628ae-f062-4250-8439-df50f7fe72d8","serviceType":0,"serviceName":"Michael006"},"[c5455fa6-01bf-4259-a514-e8016dd3b038, be9731a0-a1b3-11e6-a18b-0050568a49fd, 0a2777bd-54ce-44f1-92f9-768061f64b46, f1c00fc9-bf00-4f5f-b802-6b614047667f]":{"productId":"823ee1fc-8254-4d48-a883-6890e8b35eb8","skuId":"dd067cfd-0279-43a4-b9c7-979e31b45408","serviceType":0,"serviceName":"test-boe-10000"}}}
//        )
// })

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

    getTimeLineType() : Promise<TimeLineData[]> {
        let api = this.restApiCfg.getRestApi('sysdic.owner.field');

        let pathParams = [
            {
                key: '_owner',
                value: "PACKAGE_BILLING"
            },
            {
                key: '_field',
                value: "PERIOD_TYPE"
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
