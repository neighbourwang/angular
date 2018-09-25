class DatabaseMiddlewareProductModel {
    "basicCyclePrice": number;
    "billingCycle": string;
    "billingCycleValid":boolean;
    "billingType": string;
    "desc": string;
    "extendCyclePrice": number;
    "name": string;
    "oneTimePrice": number;
    "platformSimpleItemResp": Array<Platform>;
    "productEnterpiseReqs": Array<Enterprise>;
    "resourcPoolsProfiles":Array<ResourcPool>;
    "productPlatformReqs":Array<Platform>;//编辑
    "productId": string;
    "serviceId": string;
    "unitPrice": number;
    "serverType":string;
    "serviceSkuId":string;
    "billingId": string;
    "platformType":string;//平台类型、私有云、公有云、物理机    
    constructor(){
        this.productEnterpiseReqs=new Array<Enterprise>();
        this.platformSimpleItemResp=new Array<Platform>();
        this.resourcPoolsProfiles=new Array<ResourcPool>();
        this.name='';
        this.desc="";
        this.billingType='0';
        this.billingCycle='null';
        this.basicCyclePrice=0;
        this.oneTimePrice=0;
    }
}
class Platform {
    "code": string;
    "id": string;
    "name": string;
    "selected": boolean;
    "displayName":string;    
    "skuID": string;
    "platformId":string;
    "platformName":string;
}
class Enterprise {
    "id": string;
    "name": string;
    selected:boolean;
    "disabled":boolean;
}
class ResourcPool{
    "pmPoolId": string;
    "poolName": string;
    "resourcePoolDisplayName": string;
    "selected": boolean;
    "skuid": string;
}
export { DatabaseMiddlewareProductModel,Platform,Enterprise,ResourcPool}