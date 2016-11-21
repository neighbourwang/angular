export class CheckCenterParam{
	quickSearchStr:string = null;//输入订单号快速查询
	entIdStr: string = null;//订单归属企业
	departmentIdStr: string = null;//订单归属部门
	userIdStr: string = null;//订单归属用户
	orderTypeNum: number = null;//订单类型
	serviceTypeNum: number = null;//产品类型
	startDateStr: string = null;//开始时间
	endDateStr: string = null;//结束时间
	checkUserIdStr: string = null;//审批人

	reset(){
		this.quickSearchStr = null;//输入订单号快速查询
		this.entIdStr = null;//订单归属企业
		this.departmentIdStr = null;//订单归属部门
		this.userIdStr = null;//订单归属用户
		this.orderTypeNum = null;//订单类型
		this.serviceTypeNum = null;//产品类型
		this.startDateStr = null;//开始时间
		this.endDateStr = null;//结束时间
		this.checkUserIdStr = null;
	}
}
