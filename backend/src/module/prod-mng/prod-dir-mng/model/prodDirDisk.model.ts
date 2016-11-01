
// class storage{
//     "storageId": string;
//     "storageName": string;
//     "displayName": string;
//     "selected": string;
// }
// class zone {
//     "storageId": string;
//     "zoneId": string;
//     storageList:Array<storage>;
//     selected:boolean;
// }
class platform {
    "storageId": [ string ];
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
    "specification" ={
    "initialSize" : 0,
    "maxSize":  0,
    "stepSize":  0,
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
