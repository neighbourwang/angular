//产品信息
export class EntProdItem{
	id:string = "";//id
	entId: string = "";// 企业id
	name: string = "";//产品名称
	category: string = "";//产品目录
	type: string = ""; //产品类别
	spec: string = ""; //产品规格
	countCycle: string = "";//计费周期
	cyclePrice: number = null; //周期价格
	oneTimePrice: number = null; //一次性价格
	status: string = ""; //状态
	statusName: string = ""; //显示状态
	description: string = "";//描述
}

/*

POST /authsec/enterprises/products/search/page/{_page}/size/{_size}
GeneralPagingResultOfListOfProductItem {
detailDescription (string, optional),
pageInfo (PageInfo, optional),
resultCode (string, optional),
resultContent (Array[ProductItem], optional)
}
PageInfo {
currentPage (integer, optional),
pageSize (integer, optional),
totalPage (integer, optional),
totalRecords (integer, optional)
}
ProductItem {
	basicPrice (number, optional): 基础价格 ,
	billingCycle (string, optional): 计费周期，类型是数字，不要传入string 类型 ,
	billingType (string, optional): 计费模式，类型是数字，不要传入string 类型 ,
	code (string, optional),
	description (string, optional),
	id (string, optional),
	name (string, optional),
	onetimePrice (number, optional): 一次性价格 ,
	recurringPrice (number, optional): 周期价格 ,
	serviceId (string, optional): 产品目录ID ,
	serviceName (string, optional): 产品目录名称 ,
	serviceSpecification (string, optional),
	serviceType (string, optional): 产品目录类型 ,
	status (string, optional): 类型是数字，不要传入string 类型
}

{
	
	"detailDescription": "string",
  "pageInfo": {
    "currentPage": 0,
    "pageSize": 0,
    "totalPage": 0,
    "totalRecords": 0
  },
  "resultCode": "string",
  "resultContent": [
    {
      "basicPrice": 0,
      "billingCycle": "string",
      "billingType": "string",
      "code": "string",
      "description": "string",
      "id": "string",
      "name": "string",
      "onetimePrice": 0,
      "recurringPrice": 0,
      "serviceId": "string",
      "serviceName": "string",
      "serviceSpecification": "string",
      "serviceType": "string",
      "status": "string"
    }
  ]
}
*/