export class CheckCenterParam{
	quickSearchStr:string = null;//输入订单号快速查询 ？
	entIdStr: string = null;//订单归属企业 enterpriseId
	departmentIdNum: number = null;//订单归属部门 organization？
	userIdStr: string = null;//订单归属用户
	orderTypeNum: number = null;//订单类型 orderType
	serviceTypeNum: number = null;//产品类型 serviceId
	startDateStr: string = null;//开始时间  createTime
	endDateStr: string = null;//结束时间  expireTime
	checkUserIdStr: string = null;//审批人 approverId
	submitUserId :string = null;//提交者 ？
	status:number = null;//0:未审批通过；1：审批通过


	reset(){
		this.quickSearchStr = null;//输入订单号快速查询
		this.entIdStr = null;//订单归属企业
		this.departmentIdNum = null;//订单归属部门
		this.userIdStr = null;//订单归属用户
		this.orderTypeNum = null;//订单类型
		this.serviceTypeNum = null;//产品类型
		this.startDateStr = null;//开始时间
		this.endDateStr = null;//结束时间
		this.checkUserIdStr = null; //审批人
		this.submitUserId = null; //提交者
	}
}


// OrderSearchCondtion {
// approverId (string, optional): 审批人,在审批查询已审批订单时使用 ,
// createTime (string, optional): 创建时间 ,
// enterpriseId (string, optional): 企业ID ,
// expireTime (string, optional): 到期时间 ,
// orderCode (string, optional): 订单Code ,
// orderType (string, optional): 订单类型,在审批查询订单时使用 ,
// organization (string, optional): 机构ID ,
// pageParameter (PageParameter, optional),
// serviceId (string, optional): 产品类型ID-后端叫产品目录 ,
// status (string, optional): 订单状态，注意是数字，不是字符,使用相应的状态值查询不同状态的订单0，未审批，1， 已审批（注意，这个1 和后台字典表里的订单状态不是一个语义，其包含了后台所有做过了审批操作的状态，比如，已同意，已拒绝等多个状态 ,
// userId (string, optional): 用户ID,在审批查询订单时使用
// }