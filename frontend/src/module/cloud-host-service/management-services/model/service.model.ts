class ProductSimpleItem {
	id: string; //, optional): 产品id ,
	name: string; //, optional): 产品name
}

class SuperviseProductItem {
	billingCycleType: string; //, optional): 付费周期，0---小时，1---天，2---周，3---月，5---年 ,
	billingId: string; //, optional),
	billingType: string; //, optional): 付费方式类型为数字，0为包年包月、3为按次 ,
	cyclePrice: number; //, optional): 周期价格 ,
	desc: string; //, optional): 产品描述 ,
	oneTimePrice: number; //, optional),
	phyMachineAreaPoolsProfile: PhyMachineAreaPoolsProfile[]; //[PhyMachineAreaPoolsProfile], optional): 资源池信息（没有区域信息） ,
	productId: string; //, optional),
	productName: string; //, optional),
	productPlatformReqs: ProductPlatformReq[]; //[ProductPlatformReq], optional): 选中的平台（没有区域信息） ,
	serviceId: string; //, optional): 服务目录ID ,
	serviceObjectCode: string; //, optional): 服务对象code ,
	serviceSkuId: string; //, optional)
}
class PhyMachineAreaPoolsProfile {
	areaDisplayName: string; //, optional): 资源池区域显示名 ,
	phyMachineResourcPoolsProfile: PhyMachineResourcPoolsProfile[]; //[PhyMachineResourcPoolsProfile], optional): 资源池 ,
	pmPoolId: string; //, optional): 资源池区域ID ,
	poolName: string; //, optional): 资源池区域名称 ,
	region: string; //, optional): 资源池区域名称 ,
	regionId: string; //, optional): 资源池区域ID ,
	resourcePoolDisplayName: string; //, optional): 资源池区域显示名 ,
	selected: boolean; //, optional): 资源池是否被选中 ,
	skuid: string; //, optional): SkuId
}
class ProductPlatformReq {
	platformId: string; //, optional): 平台id ,
	platformName: string; //, optional): 平台名称 ,
	zoneList: ProductServiceZoneReq[]; //[ProductServiceZoneReq], optional): 选中的可用区
}
class PhyMachineResourcPoolsProfile {
	pmPoolId: string; //, optional): 资源池区域ID ,
	poolName: string; //, optional): 资源池区域名称 ,
	resourcePoolDisplayName: string; //, optional): 资源池区域显示名 ,
	selected: boolean; //, optional): 资源池是否被选中 ,
	skuid: string; //, optional): SkuId
}
class ProductServiceZoneReq {
	selected: boolean; //, optional): 是否选取了zone ,
	skuId: string; //, optional): 可用区所属SKU 的ID ,
	storageList: PlatformDiskZoneStorageItem[]; //[PlatformDiskZoneStorageItem], optional),
	zoneId: string; //, optional): 可用区ID ,
	zoneName: string; //, optional): 可用区名称
}
class PlatformDiskZoneStorageItem {
	displayName: string; //, optional),
	selected: boolean; //, optional),
	skuId: string; //, optional): kuId:创建产品时需要回传 ,
	storageId: string; //, optional),
	storageName: string; //, optional)
}

class ShoppingCartProfile {
	attrList: ServiceResAttributePair[];  //[], optional): 订单属性列表 ,
	itemNo: string;  //, optional): UI为每个服务产生UUID ,
	productId: string;  //, optional): 产品ID，UI必回传字段 ,
	quality: number = 1;  //, optional): 订购产品的数量 ,
	relyItemNo: string;  //, optional): 当前服务所依赖的服务ItemNo，单次提交多个服务的时候会用到 ,
	relyType: string;  //, optional): 当前服务所依赖的服务的类型，单次提交多个服务的时候会用到 ,
	serviceType: string;  //, optional): 服务/产品类型，需要去检索数据字典表 ,
	skuId: string;  //, optional): 产品SKUID，UI必回传字段 ,
	totalPrice: number;  //, optional): 订单总价
}
class ServiceResAttributePair {
	attrCode: string;  //, optional): 服务属性Code ,
	attrDisplayName: string;  //, optional): 服务属性页面显示的名称 ,
	attrDisplayValue: string;  //, optional): 服务属性值显示值 ,
	attrId: string;  //, optional): 服务属性ID ,
	attrValue: string;  //, optional): 服务属性实际值 ,
	attrValueCode: string;  //, optional): 服务属性值Code ,
	attrValueId: string;  //, optional): 服务属性值ID ,
	description: string;  //, optional): 其他描述性内容，非不要 ,
	valueType: string;  //, optional): 0: Single Value -- 单值回传; 1: Multi Type --多值回传 ,
	valueUnit: string;  //, optional): 服务属性值的单位
}

export {
	ProductSimpleItem,
	SuperviseProductItem,
	PhyMachineAreaPoolsProfile,
	ProductPlatformReq,
	PhyMachineResourcPoolsProfile,
	ProductServiceZoneReq,
	PlatformDiskZoneStorageItem,
	ShoppingCartProfile,
	ServiceResAttributePair
}