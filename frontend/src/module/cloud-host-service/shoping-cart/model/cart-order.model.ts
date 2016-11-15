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

class itemList {
    attrList:attrList[] = [];
    billingInfo:billingInfo = new billingInfo();
    billingMode: string;
    billingPeriod: string;
    createDate: string;
    expireDate: string;
    id: string;
    quantity: 0;
    serviceType: string;
    status: string;
}


class CartOrder {
    createDate: string = "";
    groupNo: string = "";
    id: string = "";
    itemList : itemList[] = [];
    itemNo: string = "";
}

export {
    CartOrder
}
