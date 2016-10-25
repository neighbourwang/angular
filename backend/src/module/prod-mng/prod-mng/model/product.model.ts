/**
 * Created by wangyao on 2016/10/19.
 */
//新建产品model
export class Product {
    "basicCyclePrice": 0;
    "billingCycle": "string";
    "billingType": "string";
    "extendCyclePrice": 0;
    "name": "string";
    "oneTimePrice": 0;
    "productEnterpiseReqs": [
        {
            "id": "string",
            "name": "string"
        }
    ];
    "productPlatformReqs": [
        {
            "id": "string",
            "name": "string",
            "zones": [
                {
                    "name": "string",
                    "skuId": "string"
                }
            ]
        }
    ];
    "serviceId": "string";
    "unitPrice": 0;
    isSelected:boolean;
}
