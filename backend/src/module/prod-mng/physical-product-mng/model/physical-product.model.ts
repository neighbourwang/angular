class PhysicalProductModel {
    "basicCyclePrice": number;
    "billingCycle": string;
    "billingId": string;
    "billingType": string;
    "billingCycleClick":boolean;
    "desc": string;
    "extendCyclePrice": number;
    "name": string;
    "oneTimePrice": number;
    "phyMachineAreaPoolsProfile": Array<PhyMachineAreaPoolsProfile>;
    "pmPartsBaseprises": Array<PmPartsBaseprises>;
    "productEnterpiseReqs": Array<ProductEnterpriseReqs>;
    "productId": string;
    "serviceId": string;
    "serviceSkuId": string;
    constructor(){
        this.phyMachineAreaPoolsProfile=new Array<PhyMachineAreaPoolsProfile>();
        this.pmPartsBaseprises=new Array<PmPartsBaseprises>();
        this.productEnterpiseReqs=new Array<ProductEnterpriseReqs>();
        this.billingCycleClick=false;
    }
}
class PhyMachineAreaPoolsProfile {
    "areaDisplayName": string;
    "phyMachineResourcPoolsProfile": Array<PhyMachineResourcPoolsProfile>;
    "region": string;
    "regionId": string;
    "pmPoolId": string;//for编辑
    "poolName": string;//for编辑
    "selected": boolean;
    "disabled": boolean;
}
class PhyMachineResourcPoolsProfile {
    "pmPoolId": string;
    "poolName": string;
    "resourcePoolDisplayName": string;
    "selected": boolean;
    "skuid": string;
}
class PmPartsBaseprises {
    "ajustmentPrice": number;
    "id": string;
    "partsId": string;
    "partsName": string;
    "referencePrice": number;
    "specId": string;
    "specName": string;
    "specValue": string;
    constructor(){
        this.ajustmentPrice=0;
    }
}
class ProductEnterpriseReqs {
    "id": string;
    "name": string;
    "selected":boolean;
    "disable":boolean;
}
export{ PhysicalProductModel,ProductEnterpriseReqs,PmPartsBaseprises}