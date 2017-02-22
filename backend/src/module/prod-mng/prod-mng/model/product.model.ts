/**
 * Created by wangyao on 2016/10/19.
 */
//新建产品model
class zone{
    "skuId": string;
  "storageId": string;
  "storageName": string;
  "zoneId": string;
  "zoneName": string;
  "selected": boolean;
  "displayName":string;
}
class plateform {
     "platformId": string;
      "platformName": string;
      "zoneList": Array<zone>
}
class enterprise {
    "id": string;
    "name": string;
    "selected" : boolean;
    "code" :string;
}
export class Product {
    "id":string;
    "billingId":string;
    "basicCyclePrice": number;
    "billingCycle": string;
    "billingType": string;
    "extendCyclePrice": number;
    "name": string;
    "oneTimePrice": number;
    "productEnterpiseReqs": Array<enterprise>;
    "productPlatformReqs": Array<plateform>;
    "serviceId": string;
    "unitPrice": number;
    "isSelected": boolean;
    "desc":string;
    constructor() {
        this.productEnterpiseReqs = Array<enterprise>();
        this.productPlatformReqs=Array<plateform>();
    }
}
