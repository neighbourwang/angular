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

class SuperviseQueryCondition {
    instanceName :string = ""; //, optional): 管理服务对象名称 ,
    instanceNo :string = ""; //, optional): 管理服务编号 ,
    name :string = ""; //, optional): 管理服务名称 ,
    pageParameter :PageParameter = new PageParameter; //, optional): 分页信息 ,
    state :string  = ""; //, optional): 管理服务实例状态: 已完成，进行中 ,
}
class PageParameter {
    currentPage :number = 0; //, optional),
    offset :number; //, optional),
    size :number = 20; //, optional),
    totalPage :number; //, optional)
}

export {
    PostAttrList,
    PayLoad,
    SuperviseQueryCondition,
    PageParameter
}