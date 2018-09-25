class PostAttrList {
    attrCode: string;
    attrDisplayName?: string;
    attrDisplayValue: string;
    attrId: string;
    attrValue: string;
    attrValueCode: string;
    attrValueId?: string;
    description?: string;
    valueType?: string;
    valueUnit?: string;
}

class PayLoad {
    attrList : PostAttrList[] =  [];
    itemNo: string = "";
    productId: string = "";
    quality: number = 1;
    relyItemNo: string = "";
    relyType: string = "0";
    serviceType: string = "4";
    skuId: string = "";
    totalPrice: number = 120;
}

class PMServiceQuery {
    appendService :string = ""; //, optional),
    department :string = ""; //, optional),
    pmName :string = ""; //, optional),
    privateIP :string = ""; //, optional),
    publicIP :string = ""; //, optional),
    regionId :string = ""; //, optional),
    serviceLevel :string = ""; //, optional),
    serviceType :string = ""; //, optional),
    status :string = ""; //, optional)
}

export {
    PostAttrList,
    PMServiceQuery,
    PayLoad
}