class specification{
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
class plateform {
        "flavorId": string;
        "platformId": string;
        "platformName": string;
        "platformType": string;
        "zoneList": Array<zone>;
}
export class ProductDir{
  "description": string;
    platformInfo:Array<plateform>;
    "serviceId": string;
    "serviceName": string;
    "specification" = new specification()
    // constructor(){
    //     this.platformInfo= new Array<plateform>();
    // }
} 