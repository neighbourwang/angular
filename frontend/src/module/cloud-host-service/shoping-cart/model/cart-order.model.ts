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
    basePrice: number = 0;   //一次性费用 周期计费+， 流量计费+
    basicPrice: number = 0;   //基础周期费用 周期计费+
    billingId: string = "";   //
    billingMode: string = "";  //计费模式
    cyclePrice: number = 0;   //增量周期费用
    unitPrice: number = 0;    //单价费用 
    unitType: number = 0;     //流量单位
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
