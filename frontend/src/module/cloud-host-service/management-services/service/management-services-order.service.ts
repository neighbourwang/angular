import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import { SuperviseProductItem, ProductSimpleItem, ShoppingCartProfile } from '../model/service.model';
import { PostAttrList, PayLoad } from '../model/post.model';

import { QuiryDistList, HandleDist } from '../../cloud-drive/model/dist-list.model';
import { QuiryVmList } from '../../vm-instance/model/vm-list.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ManagementServicesOrderService {
    constructor(private http: Http,
        private restApiCfg: RestApiCfg,
        private dict: SystemDictionaryService,
        private restApi: RestApi) {
    }

    userInfo = this.restApi.getLoginInfo().userInfo;

    fetchServicesList(): Promise<ProductSimpleItem[]> {
        const api = this.restApiCfg.getRestApi("mgmt-product-simple");

        const request = this.restApi.request(api.method, api.url, undefined, undefined)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
        // return Promise.resolve({"resultCode":"100","detailDescription":"产品获取成功","resultContent":[{"id":"3bdf72ae-5e16-43dd-b49f-ba2a70a282de","name":"是多大"},{"id":"27aa429d-4ad0-4391-ad36-66e71bfb3007","name":"真-测试物理机"},{"id":"d6f0a3cb-1929-46b9-8346-d54f7c1bcb3d","name":"test"},{"id":"a8ed2ea7-7aa2-4603-b631-87c618991232","name":"真-测试按天"},{"id":"b99a9267-39a2-4e46-899f-589b5c6cc9d4","name":"2-4-7"},{"id":"5167c6a2-4601-4fe0-bc07-14559a783e02","name":"测试物理机"},{"id":"f7225302-1afc-4ab0-a571-a82ecae98b2f","name":"云硬盘1"},{"id":"94ae2098-74db-4d63-a2a9-490918db10e8","name":"1-1-5"},{"id":"3d0408ec-2922-410d-8af5-4fa939578719","name":"1-2-20"},{"id":"c47fe7fa-7a84-437b-886f-b2d5c499687f","name":"1-2-5"},{"id":"3e03dc17-2a7b-4b37-a3d3-95a8d84bbe92","name":"test3"},{"id":"746554b2-03be-455e-8274-e46641616a98","name":"1-2-5"},{"id":"eb9d8b68-0cef-4925-a61b-3a6f258d2a18","name":"2-4-7"},{"id":"d7befb08-c010-42d9-9d1f-c232f67d329d","name":"1-2-5"},{"id":"20efa199-d8ec-4386-bd88-7e1bb43a10e4","name":"云硬盘"},{"id":"f6bf4328-e79a-429d-9758-05f373b6d72b","name":"ttterere"},{"id":"b71a092e-8f58-45bb-b1a3-b42bb8a2f390","name":"在测试"},{"id":"00b380e1-bf4e-4a12-8828-2364e2fb0e5e","name":"test91"},{"id":"e025317f-8df8-4713-ab74-467764311ed0","name":"1-1-5"},{"id":"d33df279-71e5-47e5-8b1a-4470a7458549","name":"pmid"},{"id":"c891289c-7270-4c51-bece-b65d1a06c814","name":"我假装是管理服务"},{"id":"82d1932a-9937-400e-9945-04f797bd4a45","name":"126"},{"id":"ba720a3f-0069-449a-aa72-0758c8a50d9f","name":"test2"},{"id":"f66d534d-a552-489b-ba41-d53077fdf631","name":"test1"},{"id":"0bcbc33c-4abb-40ae-9e28-a88088f2d742","name":"pmid天"},{"id":"bc724880-db38-4f61-b0c4-ca9c358c7f6b","name":"不知叫什么了"},{"id":"37e26e4d-ed8e-4bf6-983c-45fbd269e827","name":"1-1-5"},{"id":"08a0eb40-e870-4760-b6ab-f15abd73cd3a","name":"Test90"},{"id":"337d2e13-a683-4053-b1fa-2f7f936dc907","name":"2-2-6"},{"id":"f67d968f-b141-4d3e-8bb0-4f56dc11a422","name":"新产品48"},{"id":"80a377bb-8555-4897-988c-2bb51f3f08d2","name":"test4"}]}.resultContent)
    }

    fetchAttribute(): Promise<ShoppingCartProfile> {
        const api = this.restApiCfg.getRestApi("mngm-attribute");

        const request = this.restApi.request(api.method, api.url, undefined, undefined)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
    }

    fetchProductInfo(productId: string): Promise<SuperviseProductItem> {
        const api = this.restApiCfg.getRestApi("product-info-via-serviceId");

        let pathParams = [
            {
                key: 'productId',
                value: productId
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
        // return Promise.resolve({"resultCode":"100","detailDescription":"100","resultContent":{"name":"我假装是管理服务","billingType":0,"billingCycle":5,"basicCyclePrice":10.0,"oneTimePrice":23.0,"unitPrice":null,"extendCyclePrice":34.0,"productPlatformReqs":null,"productEnterpiseReqs":[{"id":"f685215a-ff30-4759-b149-b939dbb98e40","name":"前端企业"}],"serviceId":"0d75b240-45e3-4809-a48a-512965842500","desc":"这是我的描述，我其实不是物理机的，我的真实的名字叫做---孙悟空","serviceSkuId":"f29320c2-05a3-416b-8126-665c80b7945d","phyMachineAreaPoolsProfile":null,"pmPartsBaseprises":null,"billingId":"d9c21c86-86e0-444a-9250-15abbb2b9ca7","productId":"c891289c-7270-4c51-bece-b65d1a06c814"}}.resultContent)
    }

    getHostList(quiry:QuiryVmList) : Promise<any>{
        const api = this.restApiCfg.getRestApi("vm.search.page");
        return this.restApi.request(api.method, api.url, undefined, undefined, quiry);
    }

    getDisKList(quiry:QuiryDistList) : Promise<any>{
        const api = this.restApiCfg.getRestApi("disk.search.page");
        return this.restApi.request(api.method, api.url, undefined, undefined, quiry);
    }

    saveOrder(payload: PayLoad[]): Promise<any> {
        let api = this.restApiCfg.getRestApi('hosts.order.add');
        return this.restApi.request(api.method, api.url, undefined, undefined, payload)
            .then(res => {
                if (res.resultCode !== "100") {
                    throw "订购失败";
                }
                return res.resultContent;
            });
    }
    addCart(payload: PayLoad[]): Promise<any> {
        let api = this.restApiCfg.getRestApi('shopping.cart.add');
        return this.restApi.request(api.method, api.url, undefined, undefined, payload)
            .then(res => {
                if (res.resultCode !== "100") {
                    throw "加入购物车失败";
                }
                return res.resultContent;
            });
    }


    unitType = this.dict.get({
        owner: "PACKAGE_BILLING",
        field: "PERIOD_TYPE"
    });

   instanceList = this.dict.get({
       owner: "SUPERVISE_SERVICE",
       field: "TYPE"
   }) 
}
