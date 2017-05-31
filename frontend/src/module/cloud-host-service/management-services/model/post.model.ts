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
    instanceName :string=""; //, optional): 实例名称 ,
    name :string=""; //, optional): 管理服务名称 ,
    pageParameter :PageParameter = new PageParameter; //, optional): 分页信息 ,
    serviceNo :string=""; //, optional): 管理服务编号 ,
    serviceObjectType :string=""; //, optional): 服务对象 ,
    state :string="0"; //, optional): 服务状态:所有， 已完成，进行中 ,
    tenantId :string=""; //, optional): 所属企业
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