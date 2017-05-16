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

class PageInfo {
	currentPage: number;//, optional),
	pageSize: number;//, optional),
	totalPage: number;//, optional),
	totalRecords: number;//, optional)
}
class SuperviseItem {
	billingInfo: ProductBillingItem = new ProductBillingItem;//, optional): 产品计费详细信息 ,
	createDate: Timestamp = new Timestamp;//, optional),
	description: string;//, optional): 管理服务描述 ,
	expiryDate: Timestamp = new Timestamp;//, optional),
	instanceName: string;//, optional): 管理服务实例名称 ,
	itemId: string;//, optional): 管理服务实例Id ,
	paymentType: string;//, optional): 管理服务支付类型 ,
	regionZone: string;//, optional): 管理服务所属可用区 ,
	releaseDate: Timestamp = new Timestamp;//, optional),
	serviceHisItems: SuperviseHisItem[] = [];//[SuperviseHisItem], optional): 服务跟进信息 ,
	serviceLevel: string;//, optional): 服务级别，如：关键，高，中，低。见数据字典field=SERVICE_LEVEL ,
	serviceType: string;//, optional): 服务类型，如持续性服务 ,
	subInstanceId: string;//, optional): 订购实例ID ,
	subinstanceNo: string;//, optional): subinstance编号 ,
	superitemState: string;//, optional): 管理服务状态
}
class ProductBillingItem {
	basePrice: number;//, optional): 一次性价格 ,
	basicPrice: number;//, optional): 周期计费-基础周期价格 ,
	billingId: string;//, optional): 产品计费ID ,
	billingMode: string;//, optional): 计费类型，需要检索数据字典 ,
	cyclePrice: number;//, optional): 周期计费-增量周期价格 ,
	periodType: string;//, optional): 周期计费-周期类型，需要检索数据字典 ,
	unitPrice: number;//, optional): 流量计费-流量单价 ,
	unitType: number;//, optional): 流量计费-流量计费类型，需要查询数据字典
}
class Timestamp {
	date: number;//, optional),
	day: number;//, optional),
	hours: number;//, optional),
	minutes: number;//, optional),
	month: number;//, optional),
	nanos: number;//, optional),
	seconds: number;//, optional),
	time: number;//, optional),
	timezoneOffset: number;//, optional),
	year: number;//, optional)
}
class SuperviseHisItem {

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
	ServiceResAttributePair,
	SuperviseItem,
	ProductBillingItem
}