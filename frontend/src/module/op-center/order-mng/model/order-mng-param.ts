//订单管理查询参数
export class OrderMngParam{
	approverId: string = null;//, optional): 审批人,在审批查询已审批订单时使用 ,
	createTime: string = null;//, optional): 创建时间 ,
	enterpriseId: string = "0";//, optional): 企业ID ,
	expireTime: string = null;//, optional): 到期时间 ,
	orderId: string = null;//, optional): 订单ID ,
	orderType: string = null;//, optional): 订单类型,在审批查询订单时使用 ,
	organization: string = "0";//, optional): 机构ID ,
	region: string = "0";//, optional): 区域ID ,
	serviceId: string = "0";//, optional): 产品类型ID-后端叫产品目录 ,
	status: string = null;//, optional): 订单状态，注意是数字，不是字符,4已删除的订单，1正常的订单 ,
	userId: string = null;//, optional): 用户ID,在审批查询订单时使用 ,
	zoneId: string = "0";//, optional): 可用区ID

  reset(){
    this.createTime = null;
    this.enterpriseId = "0";
    this.expireTime = null;
    this.organization = "0";
    this.region = "0";
    this.zoneId = "0";
    this.status = "0";

  }
}
/*
OrderSearchCondtion {
approverId (string, optional): 审批人,在审批查询已审批订单时使用 ,
createTime (string, optional): 创建时间 ,
enterpriseId (string, optional): 企业ID ,
expireTime (string, optional): 到期时间 ,
orderId (string, optional): 订单ID ,
orderType (string, optional): 订单类型,在审批查询订单时使用 ,
organization (string, optional): 机构ID ,
pageParameter (PageParameter, optional),
region (string, optional): 区域ID ,
serviceId (string, optional): 产品类型ID-后端叫产品目录 ,
status (string, optional): 订单状态，注意是数字，不是字符,4已删除的订单，1正常的订单 ,
userId (string, optional): 用户ID,在审批查询订单时使用 ,
zoneId (string, optional): 可用区ID
}
PageParameter {
currentPage (integer, optional),
offset (integer, optional),
size (integer, optional),
sort (object, optional),
totalPage (integer, optional)
}

{
  "approverId": "string",
  "createTime": "2016-11-02T01:53:24.140Z",
  "enterpriseId": "string",
  "expireTime": "2016-11-02T01:53:24.140Z",
  "orderId": "string",
  "orderType": "string",
  "organization": "string",
  "region": "string",
  "serviceId": "string",
  "status": "string",
  "userId": "string",
  "zoneId": "string"
  "pageParameter": {
    "currentPage": 0,
    "offset": 0,
    "size": 0,
    "sort": {},
    "totalPage": 0
  },
}
*/