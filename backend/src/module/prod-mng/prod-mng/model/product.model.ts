/**
 * Created by wangyao on 2016/10/19.
 */
//新建产品model
class plateform {
    "id": "string";
    "name": "string";
    "zones": [
        {
            "name": "string",
            "skuId": "string"
        }
    ]
}
class enterprise {
    "id": "string";
    "name": "string"
}

export class Product {
    "basicCyclePrice": 0;
    "billingCycle": "string";
    "billingType": "numb而";
    "extendCyclePrice": 0;
    "name": "string";
    "oneTimePrice": 0;
    "productEnterpiseReqs": Array<enterprise>;
    "productPlatformReqs": Array<plateform>;
    "serviceId": "string";
    "unitPrice": 0;
    isSelected: boolean;
    constructor() {
        this.productEnterpiseReqs = new Array<enterprise>();
        this.productPlatformReqs=Array<plateform>();
    }
}
