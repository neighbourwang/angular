class DatabaseMiddlewareServiceModel {
    "desc": string;
    "platformSimpleItemResp": Array<PlatformSimpleItem>;
    "resourcPoolsProfiles": Array<ResourcPool>;
    "serverType": string;
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
}
export { DatabaseMiddlewareServiceModel, ResourcPool, PlatformSimpleItem }