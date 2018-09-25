//订单管理查询参数
export class OrderMngParam{

  queryParam: string = null;//搜索框参数
  buyerId:string = null;//订购人
  createDate: string = null; // 创建时间 "2016-11-16T08:31:23.720Z",
  enterpriseId: string = null; // 企业ID
  expireDate: string = null; // 到期时间"2016-11-16T08:31:23.720Z",
  organization: string = null; // 机构ID"string",
  platformId: string = null; // 区域id"string",
  serviceType: string = null; // 产品类型"string",
  status: string = null; // 状态"string",
  zoneId: string = null; // 可用区"string"
  scope:SearchScope = SearchScope.all; //搜索范围
  searchText:string = null;//快速搜索

  reset(){
    this.queryParam = null;
    this.createDate = null;
    this.enterpriseId = null;
    this.expireDate = null;
    this.organization = null;
    this.platformId = null;
    this.serviceType = null;
    this.status = null;
    this.zoneId = null;
    this.searchText = null;//快速搜索
    this.buyerId = null;
  }
}

export enum SearchScope{
  all = 0,
  department = 1
}
/*
createDate (string, optional): 创建时间 ,
enterpriseId (string, optional): ADM中的所属企业，MKP从当前登录用户中获取 ,
expireDate (string, optional): 过期时间 ,
organization (string, optional): 所在部门, 只回传ID即可, 为空则代表所有 ,
pageParameter (PageParameter, optional): 分页信息 ,
platformId (string, optional): UI中的区域，回传ID即可, 为空则代表所有平台 ,
searchText (string, optional): 搜索内容，目前仅支持订购实例单号查询 ,
serviceType (string, optional): 产品类型，只回传value即可, 为空则代表所有状态 ,
status (string, optional): 状态值，只回传value即可, 为空则代表所有状态 ,
zoneId (string, optional): UI中的可用区，回传ID即可, 为空则代表所有可用区

{
  "createDate": "2016-12-15T02:43:54.588Z",
  "enterpriseId": "string",
  "expireDate": "2016-12-15T02:43:54.588Z",
  "organization": "string",
  "pageParameter": {
    "currentPage": 0,
    "offset": 0,
    "size": 0,
    "sort": {},
    "totalPage": 0
  },
  "platformId": "string",
  "searchText": "string",
  "serviceType": "string",
  "status": "string",
  "zoneId": "string"
}
*/