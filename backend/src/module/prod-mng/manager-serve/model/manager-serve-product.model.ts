class ManagerServeProductModel {
    "basicCyclePrice": number;
    "billingCycle": string;
    "billingType": string;
    "description": string;
    "extendCyclePrice": number;
    "name": string;
    "oneTimePrice": number;
    "platformSimpleItems": Array<Platform>;
    "productEnterpiseReqs": Array<Enterprise>
    "productId": string;
    "serviceId": string;
    "unitPrice": number;
    constructor(){
        this.productEnterpiseReqs=new Array<Enterprise>();
        this.platformSimpleItems=new Array<Platform>();
    }
}
class Platform {
    "code": string;
    "id": string;
    "name": string
}
class Enterprise {
    "id": string;
    "name": string;
    selected:boolean;
}
export { ManagerServeProductModel,Platform,Enterprise}