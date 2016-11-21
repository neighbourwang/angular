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