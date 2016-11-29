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

// 	approvalStatus (string, optional): 订单审批状态,在审批查询订单时使用,0 未审批，1已审批
//  ,

// approverId (string, optional): 审批人,在审批查询已审批订单时使用
//  ,

// createTime (string, optional): 创建时间
//  ,

// enterpriseId (string, optional): 企业ID
//  ,

// expireTime (string, optional): 到期时间
//  ,

// orderId (string, optional): 订单ID
//  ,

// orderType (string, optional): 订单类型,在审批查询订单时使用
//  ,

// organization (string, optional): 机构ID
//  ,

// pageParameter (PageParameter, optional),

// serviceId (string, optional): 产品类型ID-后端叫产品目录
//  ,

// status (string, optional): 订单状态，注意是数字，不是字符
//  ,

// userId (string, optional): 用户ID,在审批查询订单时使用
 

	reset(){
		this.quickSearchStr = null;//输入订单号快速查询
		this.entIdStr = null;//订单归属企业
		this.departmentIdNum = null;//订单归属部门
		this.userIdStr = null;//订单归属用户
		this.orderTypeNum = null;//订单类型
		this.serviceTypeNum = null;//产品类型
		this.startDateStr = null;//开始时间
		this.endDateStr = null;//结束时间
		this.checkUserIdStr = null;
	}
}
