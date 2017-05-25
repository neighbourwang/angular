class HistoryPrice {
    "basicCyclePrice": number;
    "bibillingModeReq": {
        "code": string;
        "name": string;
        "type": string;
    };
    "billingCycle": string;
    "billingId": string;
    "billingType": string;
    "createDate": string;
    "extendCyclePrice": number;
    "oneTimePrice": number;
    "serviceSkuId": string;
    "unitPrice": number;
    "unitType": number
}
class DiskSpec {
    "diskInitalSize": string;
    "diskMaxSize": string;
    "diskStepSize": string;
}
class VmSpec {
    "bootSize": string;
    "cpu": string;
    "mem": string;
}
export class HistoryPriceList {
    "desc": string;
    "productHistoryBillingProfileDiskItem": DiskSpec;
    "productHistoryBillingProfileList": Array<HistoryPrice>;
    "productHistoryBillingProfileVmItem": VmSpec;
    "productId": string;
    "productName": string;
    "serviceId": string;
    "serviceName": string;
    "serviceType": string;
    constructor(){
        this.serviceName="";
    }
}