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
    "productEnterpiseReqs": Array<ProductEnterpiseReqs>;
    "productId": string;
    "serviceId": string;
    "serviceSkuId": string;
    constructor(){
        this.phyMachineAreaPoolsProfile=new Array<PhyMachineAreaPoolsProfile>();
        this.pmPartsBaseprises=new Array<PmPartsBaseprises>();
        this.productEnterpiseReqs=new Array<ProductEnterpiseReqs>();
    }
}
class PhyMachineAreaPoolsProfile {
    "areaDisplayName": string;
    "phyMachineResourcPoolsProfile": Array<PhyMachineResourcPoolsProfile>;
    "region": string;
    "regionId": string;
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
class ProductEnterpiseReqs {
    "id": string;
    "name": string;
    "selected":boolean;
}
export{ PhysicalProductModel,ProductEnterpiseReqs}