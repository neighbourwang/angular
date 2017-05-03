class DatabaseMiddlewareServiceModel {
    "description": string;
    "platformList": Array<Platform>
    "pmPoolList": Array<PmPool>;
    "serviceId": string;
    "serviceName": string;
    "serviceObjectCode": string
    constructor(){
        this.description='';
        this.serviceName='';
        this.platformList=[];
        this.pmPoolList=[];
    }
}
class PmPool {
    "dataCenter": string;
    "description": string;
    "pmPoolId": string;
    "poolName": string;
    "region": string;
    "regionId": string;
    selected:boolean;    
}
class Platform {
    "code": string;
    "id": string;
    "name": string;
}
class PlatformObj {
    "platformId": "string";
    "platformName": "string";
    "zoneId": string;
    "zoneName": string;
    selected:boolean;
}
export { DatabaseMiddlewareServiceModel,PmPool,Platform,PlatformObj}