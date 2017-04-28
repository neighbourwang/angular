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

export {
    PostAttrList,
    PayLoad
}