class attrList {
    attrCode: string = "";
    attrDisplayName: string = "";
    attrDisplayValue: string = "";
    attrOrderSeq: number = 0;
    attrValueCode: string = "";
    description: string = "";
    valueUnit: string = "";
}
class billingInfo {
    basePrice: number = 0;
    basicPrice: number = 0;
    billingId: string = "";
    billingMode: string = "";
    cyclePrice: number = 0;
    unitPrice: number = 0;
    unitType: number = 0;
}

class CartList {
    id: string;
    itemNo: string;
    groupNo: string;
    serviceType: number;
    billingMode: string;
    billingPeriod: string;
    quantity: number;
    billingInfo: billingInfo;
    attrList : attrList[];
}

export {
    CartList
}
