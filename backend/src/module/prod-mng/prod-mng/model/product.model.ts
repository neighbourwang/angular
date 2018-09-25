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
class Enterprise {
    "id": string;
    "name": string;
    "selected" : boolean;
    "code" :string;
    "disable":boolean;
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
    "productEnterpiseReqs": Array<Enterprise>;
    "productPlatformReqs": Array<platform>;
    "enterpriseListForSelect":Array<Enterprise>;
    "serviceId": string;
    "unitPrice": number;
    "isSelected": boolean;
    "desc":string;
    constructor() {
        this.productEnterpiseReqs = Array<Enterprise>();
        this.productPlatformReqs=Array<platform>();
        this.billingCycleClick=false;
        this.name="";
        this.desc="";
    }
}
export {
    Product,
    platform,
    Enterprise
}
