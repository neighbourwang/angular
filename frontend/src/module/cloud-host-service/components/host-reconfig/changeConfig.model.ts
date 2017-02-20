class SerivceConfigChangeResp {
	platformId : string; //, optional),
	productId : string; //, optional),
	serivceConfigChangeDiskItem : SerivceConfigChangeDiskItem; //, optional),
	serivceConfigChangeVMitem : SerivceConfigChangeVMitem; //, optional),
	serviceId : string; //, optional),
	serviceSkuId : string; //, optional),
	serviceType : string; //, optional),
	zoneId : string; //, optional)
}
class SerivceConfigChangeDiskItem {
	billingInfo : ProductBillingItem; //, optional): 产品价格信息 ,
	oldStorageCapacity : number; //, optional)
}
class SerivceConfigChangeVMitem {
	attrList : ServiceRespAttributePair[]; //[ServiceRespAttributePair], optional): 产品的各个属性，及属性的关联关系 ,
	bootSize : number; //, optional),
	oldcpu : number; //, optional),
	oldmem : number; //, optional),
	proMap : Object; //, optional): attibute(cpu+mem)-->product+billingInfo
}
class ProductBillingItem {
	basePrice : number; //, optional): 一次性价格 ,
	basicPrice : number; //, optional): 周期计费-基础周期价格 ,
	billingId : string; //, optional): 产品计费ID ,
	billingMode : string; //, optional): 计费类型，需要检索数据字典 ,
	cyclePrice : number; //, optional): 周期计费-增量周期价格 ,
	periodType : string; //, optional): 周期计费-周期类型，需要检索数据字典 ,
	unitPrice : number; //, optional): 流量计费-流量单价 ,
	unitType : number; //, optional): 流量计费-流量计费类型，需要查询数据字典
}
class ServiceRespAttributePair {
	attrCode : string; //, optional),
	attrDisplayName : string; //, optional),
	attrId : string; //, optional),
	mandatory : string; //, optional),
	mapValueList : ProductAttributeValueItem[]; //, optional): 属性依赖 ,
	relyAttrId : string; //, optional),
	relyType : string; //, optional),
	skuFlag : boolean; //, optional),
	valueList : ProductAttributeValueItem[]; //[ProductAttributeValueItem], optional),
	valueType : string; //, optional): 0: Single Value -- 单值回传; 1: Multi Type --多值回传
}
class ProductAttributeValueItem {
	attrDisplayValue : string; //, optional),
	attrValue : string; //, optional),
	attrValueCode : string; //, optional),
	attrValueId : string; //, optional)
}

export {
	SerivceConfigChangeResp,
	SerivceConfigChangeDiskItem,
	SerivceConfigChangeVMitem,
	ProductBillingItem,
	ServiceRespAttributePair,
	ProductAttributeValueItem
}