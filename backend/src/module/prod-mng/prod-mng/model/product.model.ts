/**
 * Created by wangyao on 2016/10/19.
 */
//新建产品model
class zone{
    "name": string;
    "skuId": string
}
class plateform {
    "id": string;
    "name": string;
    "zones": Array<zone>;
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
    "serviceId": "string";
    "unitPrice": 0;
    isSelected: boolean;
    constructor() {
        this.productEnterpiseReqs = Array<enterprise>();
        this.productPlatformReqs=Array<plateform>();
    }
}
