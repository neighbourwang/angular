
class storage{
    "storageId": string;
    "storageName": string;
    "displayName": string;
    "selected": boolean;
    "serviceSKUId":string;
}
class zone {
    "storageId": string;
    "zoneId": string;
    "serviceSKUId":string;
    skuId:string;
    zoneName:string;
    storageName:string;
    storageList:Array<storage>;
    selected:boolean;
}
class platform {
    "flavorId": "string";
    "platformId": "string";
    "zoneList": Array<zone>;
    "selected":boolean;
}
class specification {
    "mem": number = 0;
    "startupDisk": number = 0;
    "vcpu": number = 0;
}

class ProdDir {
    "serviceTemplateId":string;
    "description": string;
    "platformList": Array<platform>;
    platformInfo:Array<platform>;
    "serviceName": string;
    serviceType:string;
    "specification" = {
        "mem": 0,
        "startupDisk": 0,
        "vcpu": 0,
    };
    constructor() {
        this.description = "";
        this.serviceName="";
        this.platformList = new Array<platform>();
        this.specification.mem = 0;
        this.specification.startupDisk = 0;
        this.specification.vcpu = 0;
    }
}
export {
    ProdDir,
    platform,
    specification
}