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
  "selected": boolean;
  "displayName":string;  
}
class vmPlatform {
  "flavorId": string;
  "platformId": string;
  "platformName": string;
  "platformType": string;
  "zoneList": Array<zone>;
}
//for DISK plateform details 
// class storages {
//   "displayName": string;
//   "selected": boolean;
//   "serviceSKUId": string;
//   "storageId": string;
//   "storageName": string;
// }
class diskPlatform {
  "platformId": string;
  "platformName": string;
  "zoneList": Array<zone>;
  "zoneId": "all";
  "zoneName": string;
}
class ProductDir {
  "description": string;
  platformInfo: Array<vmPlatform>;
  platformList: Array<diskPlatform>;
  "serviceId": string;
  "serviceName": string;
  "specification" = new specification();
  serviceType:string;
  // constructor(){
  //     this.platformInfo= new Array<plateform>();
  // }
} 
export {
  ProductDir,
  vmPlatform,
  diskPlatform
}