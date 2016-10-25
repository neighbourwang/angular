class AttrList {
    attrId	:string 	//服务属性ID
    attrCode	:string 	//服务属性CODE
    attrName	:string 	//服务属性Name
    attrValueId	:string 	//服务属性值ID
    attrValue	:string 	//服务属性值
    description?	:string 	//服务属性描述
}

class PayLoad {
    attrList : AttrList[] =  [];
    enterpriseIds = {
        enterpriseId : "88",
        platformId : "88"
    };
    quality : number = 1;
    serviceId : string = "ff8cccd4-b1d0-47e0-8346-2c2d2c9e21eb";
    serviceName : string = "华南区服务目录";
    totalPrice : number = 0;
}

export {
    AttrList,
    PayLoad
}