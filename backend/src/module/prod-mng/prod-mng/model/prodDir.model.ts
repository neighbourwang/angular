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
  disable:boolean;  
}
class Platform {
  "flavorId": string;
  "platformId": string;
  "platformName": string;
  "platformType": string;
  "zoneList": Array<zone>;
}

class ProductDir {
  "description": string;
  platformInfo: Array<Platform>;
  platformList: Array<Platform>;
  "serviceId": string;
  "serviceName": string;
  "specification" = new specification();
  serviceType:string;
  constructor(){
      // this.platformInfo= new Array<plateform>();
      this.serviceName="";
      this.description="";
  }
} 
export {
  ProductDir,
  Platform,
}