//订单管理查询参数
export class OrderMngParam{

  queryParam: string = null;//搜索框参数
  createDate: string = null; // 创建时间 "2016-11-16T08:31:23.720Z",
  enterpriseId: string = null; // 企业ID
  expireDate: string = null; // 到期时间"2016-11-16T08:31:23.720Z",
  organization: string = null; // 机构ID"string",
  platformId: string = null; // 区域id"string",
  serviceType: string = null; // 产品类型"string",
  status: string = null; // 状态"string",
  zoneId: string = null; // 可用区"string"
  scope:SearchScope = SearchScope.all; //搜索范围
  buyerId: string = null;//订购人

  reset(){
    this.createDate = null;
    this.enterpriseId = null;
    this.expireDate = null;
    this.organization = null;
    this.platformId = null;
    this.serviceType = null;
    this.status = null;
    this.zoneId = null;
  }
}

export enum SearchScope{
  all = 0,
  department = 1
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