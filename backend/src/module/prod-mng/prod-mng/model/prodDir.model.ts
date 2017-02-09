class specification {
  "mem": number;
  "startupDisk": number;
  "vcpu": number
}
class zone {
  "skuId": string;
  "storageId": string;
  "storageName": string;
  "zoneId": string;
  "zoneName": string;
  "selected": boolean
}
class vmPlateform {
  "flavorId": string;
  "platformId": string;
  "platformName": string;
  "platformType": string;
  "zoneList": Array<zone>;
}
//for DISK plateform details 
class storages {
  "displayName": string;
  "selected": boolean;
  "serviceSKUId": string;
  "storageId": string;
  "storageName": string;
}
class diskPlateform {
  "platformId": string;
  "platformName": string;
  "storages": Array<storages>;
  "zoneId": "all";
  "zoneName": string;
}
export class ProductDir {
  "description": string;
  platformInfo: Array<vmPlateform>;
  platformList: Array<diskPlateform>;
  "serviceId": string;
  "serviceName": string;
  "specification" = new specification();
  serviceType:string;
  // constructor(){
  //     this.platformInfo= new Array<plateform>();
  // }
} 