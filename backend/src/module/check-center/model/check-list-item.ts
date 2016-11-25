export class CheckListItem{
	orderCodeStr: string  = null;//订单编号
	serviceTypeIdStr: string = null;//产品类型
	serviceTypeName: string = null;//产品类型名称
	platformStr: string = null;//所在区域
	zoneStr: string = null;//可用区域
	get platformAndZoneStr():string{ //所在区域及可用区域
		return `${this.platformStr}<br/>${this.zoneStr}`;
	}
	orderTypeNum: number = null;//订单类型
	orderTypeName: string = null;//订单类型名称
	userStr: string = null;//用户
	departmentStr: string = null;//部门
	entStr: string = null;//企业

	get userDepartEntStr():string{//用户，部门，企业
		return `${this.userStr}<br/>${this.departmentStr}<br/>${this.entStr}`;
	}

	billingModeNum: number = null;//计费模式
	billingModeName: string = null;//计费模式名称
	billingDurationStr: string = null;//订单周期
	oneTimePriceNum: number = null;//一次性费用
	priceNum: number = null;//费用

	get priceStr(): string{
		return `计费模式：${this.billingModeName}
		<br/>订单周期：${this.billingDurationStr}
		<br/>一次性费用：${this.oneTimePriceNum}
		<br/>费用：${this.priceNum}
		`;
	}

	createTimeStr: string = null;//创建时间
	checkResultId: number = null;//审批结果
	checkResultName: string = null;//审批结果名称
	
}

/*
GeneralPagingResultOfListOfOrderItem {
detailDescription (string, optional),
pageInfo (PageInfo, optional),
resultCode (string, optional),
resultContent (Array[OrderItem], optional)
}
PageInfo {
currentPage (integer, optional),
pageSize (integer, optional),
totalPage (integer, optional),
totalRecords (integer, optional)
}
OrderItem {
id (string, optional): 订单ID ,
orderCode (string, optional): 订单编号 ,
orderInstanceItems (Array[OrderInstanceItem], optional): 订单中的产品信息 ,
relatedOrder (Array[OrderItem], optional): 关联订单
}
OrderInstanceItem {
billingCycle (string, optional): 购买时长 ,
billingMode (string, optional): 计费模式 ,
createDate (string, optional): 创建时间 ,
exireDate (string, optional): 过期时间 ,
instanceName (string, optional): 实例名称 ,
isSetPassword (string, optional): 密码设置与否，0 未设置，1 已设置 ,
oneTimePrice (integer, optional): 一次性费用 ,
price (integer, optional): 费用 ,
productType (string, optional): 产品类型 ,
quantity (string, optional): 订购数量 ,
specificationItem (Array[SpecificationItem 每个实例为 可用区名称，平台名称（region）,CPU核数,内存大小,硬盘类型,硬盘大小,启动盘容量，操作系统，内部IP，外部IP 中的一项], optional): 产品规格 ,
status (string, optional): 订单状态 ,
subscriptTime (integer, optional): 购买周期
}
SpecificationItem 每个实例为 可用区名称，平台名称（region）,CPU核数,内存大小,硬盘类型,硬盘大小,启动盘容量，操作系统，内部IP，外部IP 中的一项 {
attrCode (string, optional): 服务属性Code ,
attrDisplayName (string, optional): 服务属性页面显示的名称 ,
attrDisplayValue (string, optional): 服务属性值显示值 ,
attrOrderSeq (integer, optional): 属性显示顺序, 如果为空，则忽略 ,
attrValueCode (string, optional): 服务属性值Code ,
description (string, optional): 其他描述性内容，非不要 ,
valueUnit (string, optional): 服务属性值的单位
}
*/