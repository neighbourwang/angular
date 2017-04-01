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
  "disable":boolean;
  "displayName":string;
}
class platform {
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
class Product {
    "productId":string;
    "billingId":string;
    "basicCyclePrice": number;
    "billingCycle": string;
    "billingCycleClick":boolean;
    "billingType": string;
    "extendCyclePrice": number;
    "name": string;
    "oneTimePrice": number;
    "productEnterpiseReqs": Array<enterprise>;
    "productPlatformReqs": Array<platform>;
    "enterpriseListForSelect":Array<any>;
    "serviceId": string;
    "unitPrice": number;
    "isSelected": boolean;
    "desc":string;
    constructor() {
        this.productEnterpiseReqs = Array<enterprise>();
        this.productPlatformReqs=Array<platform>();
        this.billingCycleClick=false;
        this.name="";
        this.desc="";
    }
}
export {
    Product,
    platform
}
