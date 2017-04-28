class ProductSimpleItem {
	id: string; //, optional): 产品id ,
	name: string; //, optional): 产品name
}
class ProductNewProfile {
	basicCyclePrice: number; //, optional): 周期价格 ,
	billingCycle: string; //, optional): 付费周期，类型为数字，不要输入成string了 ,
	billingId: string; //, optional),
	billingType: string; //, optional): 付费方式类型为数字，不要输入成string了 ,
	desc: string; //, optional): 产品描述 ,
	extendCyclePrice: number; //, optional): 增量价格 ,
	name: string; //, optional),
	oneTimePrice: number; //, optional),
	phyMachineAreaPoolsProfile: PhyMachineAreaPoolsProfile[]; //, optional): 区域和资源池信息 ,
	pmPartsBaseprises: PMPartsBase[]; //, optional): 附加组件及价格信息 ,
	productEnterpiseReqs: ProductEnterpiseReq[]; //, optional): 选中企业 ,
	productId: string; //, optional),
	productPlatformReqs: ProductPlatformReq[]; //, optional): 选中平台及区域 ,
	serviceId: string; //, optional): 服务目录ID ,
	serviceSkuId: string; //, optional),
	unitPrice: number; //, optional): 单位价格
}
class PhyMachineAreaPoolsProfile {
	areaDisplayName: string; //, optional): 资源池区域显示名 ,
	phyMachineResourcPoolsProfile: PhyMachineResourcPoolsProfile[]; //, optional): 资源池 ,
	pmPoolId: string; //, optional): 资源池区域ID ,
	poolName: string; //, optional): 资源池区域名称 ,
	region: string; //, optional): 资源池区域名称 ,
	regionId: string; //, optional): 资源池区域ID ,
	resourcePoolDisplayName: string; //, optional): 资源池区域显示名 ,
	selected: boolean; //, optional): 资源池是否被选中 ,
	skuid: string; //, optional): SkuId
}
class PMPartsBase {
	ajustmentPrice: number; //, optional),
	id: string; //, optional),
	operationType: string; //, optional),
	partsId: string; //, optional),
	partsName: string; //, optional),
	referencePrice: number; //, optional),
	specId: string; //, optional),
	specName: string; //, optional),
	specValue: string; //, optional)
}
class ProductEnterpiseReq {
	id: string; //, optional): 企业id ,
	name: string; //, optional): 企业名称
}
class ProductPlatformReq {
	platformId: string; //, optional): 平台id ,
	platformName: string; //, optional): 平台名称 ,
	zoneList: ProductServiceZoneReq[]; //, optional): 选中的可用区
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
	storageList: PlatformDiskZoneStorageItem[]; //, optional),
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

class SuperviseServiceDetailInfoItem {
	description: string; //, optional): 服务描述 ,
	platformList: PlatformSimpleItem[]; //, optional): 管理服务目录平台列表 ,
	pmPoolList: PMResourcePool[]; //, optional): 管理服务目录物理机资源池列表 ,
	serviceId: string; //, optional): 服务目录id ,
	serviceName: string; //, optional): 服务目录名字 ,
	serviceObjectCode: string; //, optional): 服务对象code
}
class PlatformSimpleItem {
	code: string; //, optional),
	id: string; //, optional),
	name: string; //, optional)
}
class PMResourcePool {
	dataCenter: string; //, optional),
	description: string; //, optional),
	pmPoolId: string; //, optional),
	poolName: string; //, optional),
	region: string; //, optional),
	regionId: string; //, optional)
}

export {
	ProductSimpleItem,
	ProductNewProfile,
	PhyMachineAreaPoolsProfile,
	PMPartsBase,
	ProductEnterpiseReq,
	ProductPlatformReq,
	PhyMachineResourcPoolsProfile,
	ProductServiceZoneReq,
	PlatformDiskZoneStorageItem,
	SuperviseServiceDetailInfoItem,
	PlatformSimpleItem,
	PMResourcePool
}