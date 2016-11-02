//产品类型
export class ProductType{
	createrName: string = null;//, optional),
	creatorId: string = null;//, optional),
	description: string = null;//, optional),
	productNum: number = null;//, optional),
	serviceId: string = null;//, optional),
	serviceName: string = null;//, optional),
	serviceTemplateId: string = null;//, optional),
	serviceTemplateName: string = null;//, optional),
	specification: string = null;//, optional),
	status: string = null;//, optional)
}

/*
GET /authsec/services/page/{_page}/size/{_size}
GeneralPagingResultOfListOfServiceItem {
detailDescription (string, optional),
pageInfo (PageInfo, optional),
resultCode (string, optional),
resultContent (Array[ServiceItem], optional)
}
PageInfo {
currentPage (integer, optional),
pageSize (integer, optional),
totalPage (integer, optional),
totalRecords (integer, optional)
}
ServiceItem {
createrName (string, optional),
creatorId (string, optional),
description (string, optional),
productNum (integer, optional),
serviceId (string, optional),
serviceName (string, optional),
serviceTemplateId (string, optional),
serviceTemplateName (string, optional),
specification (string, optional),
status (string, optional)
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
      "createrName": "string",
      "creatorId": "string",
      "description": "string",
      "productNum": 0,
      "serviceId": "string",
      "serviceName": "string",
      "serviceTemplateId": "string",
      "serviceTemplateName": "string",
      "specification": "string",
      "status": "string"
    }
  ]
}


*/