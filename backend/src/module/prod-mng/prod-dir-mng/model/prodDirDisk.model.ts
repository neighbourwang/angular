
class storageItem {
    "storageId": string;
    "storageName": string;
    "displayName": string;
    "selected": true;
    "serviceSKUId": string;
}
class platformInfo {
    "storageId": string;
    "zoneId": string;
    "storageItem": Array<storageItem>;
    "selected": boolean;
    "displayName": string
}
class platform {
    "platformId": "string";
    "platformInfo": Array<platformInfo>;
    "platformName": "string";
    "storageId": [string];
    "zoneId": string;
    "zoneName": string;
}
class specification {
    "initialSize": number = 0;
    "maxSize": number = 0;
    "stepSize": number = 0;
}
class ProdDirDisk {
    "description": string;
    "platformList": Array<platform>;
    "serviceName": string;
    "serviceId": string;
    "specification" = {
        "initialSize": 0,
        "maxSize": 0,
        "stepSize": 0,
    };
    constructor() {
        this.description = "";
        this.platformList = new Array<platform>();
        this.specification.initialSize = 0;
        this.specification.maxSize = 0;
        this.specification.stepSize = 0;
    }
}
export {
    ProdDirDisk,
    platform
}
