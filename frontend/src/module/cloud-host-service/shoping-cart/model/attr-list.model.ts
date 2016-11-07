class AttrList {
    attrId	:string; 	//服务属性ID
    attrCode	:string; 	//服务属性CODE
    attrName	:string; 	//服务属性Name
    attrValueId? :string; 	//服务属性值ID
    attrValue	:any; 	//服务属性值
    description?	:string; 	//服务属性描述
}

class PayLoad {
    attrList : AttrList[] =  [];
    enterpriseIds = {
        enterpriseId : "88",
        platformId : "88"
    };
    quality : number = 1;
    serviceId : string = "6b138c29-0ff8-4cb9-bb9f-3dbbcebb6f90";
    serviceName : string = "88Service";
    totalPrice : number = 246.88;
}

export {
    AttrList,
    PayLoad
}