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
    "basicCyclePrice": 0;
    "billingCycle": string;
    "billingType": string;
    "extendCyclePrice": 0;
    "name": "string";
    "oneTimePrice": 0;
    "productEnterpiseReqs": Array<enterprise>;
    "productPlatformReqs": Array<plateform>;
    "serviceId": string;
    "unitPrice": 0;
    "isSelected": boolean;
    "desc":string;
    constructor() {
        this.productEnterpiseReqs = Array<enterprise>();
        this.productPlatformReqs=Array<plateform>();
    }
}
