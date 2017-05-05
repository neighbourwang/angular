class DatabaseMiddlewareServiceModel {
    "desc": string;
    "platformSimpleItemResp": Array<PlatformSimpleItem>;
    "resourcPoolsProfiles": Array<ResourcPool>;
    "serverType": string;
    "serviceType":string;
    "serviceName": string;
    "serviceTemplateId": string;
    "serviceTemplateName": string;
    constructor(){
        this.serverType='';
        this.platformSimpleItemResp=new Array<PlatformSimpleItem>();
        this.resourcPoolsProfiles=new Array<ResourcPool>();
    }
}
class PlatformSimpleItem {
    "code": string;
    "displayName": string;
    "id": string;
    "name": string;
    "selected": boolean;
    "skuID": string;
}
class ResourcPool {
    "pmPoolId": string;
    "poolName": string;
    "resourcePoolDisplayName": string;
    "selected": boolean;
    "skuid": string;
    "region":string;
    "regionId":string;
}
class ServiceTemplat{
      "serviceTemplatCode": string;
      "serviceTemplatDesc": string;
      "serviceTemplatType": string;
      "serviceTemplatTypeName": string;
      "serviceTemplateId": string;
      "serviceTemplateName": string;
      "status":string;
    }
 class Platform{
    "code": string;
    "displayName": string;
    "platformId": string;
    "platformName": string;
    "selected": boolean;
    "skuID": string;
}   
export { DatabaseMiddlewareServiceModel, ResourcPool, PlatformSimpleItem ,ServiceTemplat,Platform}