import {OrderItem, OrderProductItem} from './'

//订单详情
export class OrderDetail{
	orderItem:OrderItem = new OrderItem();
	productDetail:Array<OrderProductItem> = [];
	relatedOrder:Array<OrderItem> = [];
}

/*
GeneralContentResultOfOrderItem {
detailDescription (string, optional),
resultCode (string, optional),
resultContent (OrderItem, optional)
}
OrderItem {
backendApprover (string, optional): 后台审批人 ,
billingCycle (string, optional): 购买时长 ,
billingPerson (string, optional): 订购人 ,
createDate (string, optional): 创建时间 ,
createTime (string, optional): 创建时间 ,
enterpirse (string, optional): 企业 ,
exireDate (string, optional): 过期时间 ,
id (string, optional): 订单ID ,
orgApprover (string, optional): 部门审批人 ,
organization (string, optional): 部门 ,
productDetail (Array[OrderProductItem], optional): 产品记录 ,
quantity (string, optional): 订购数量 ,
relatedOrder (Array[OrderItem], optional): 关联订单号 ,
status (string, optional): 订单状态
}
OrderProductItem {
number (integer, optional): 产品个数 ,
productItem (ProductItem, optional): 产品详情
}
ProductItem {
basicPrice (number, optional): 基础价格 ,
billingCycle (string, optional): 计费周期，类型是数字，不要传入string 类型 ,
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

{"detailDescription": "string",
  "resultCode": "string",
  "resultContent": {
    "backendApprover": "string",
    "billingCycle": "string",
    "billingPerson": "string",
    "createDate": "2016-11-01T03:46:21.187Z",
    "createTime": "2016-11-01T03:46:21.187Z",
    "enterpirse": "string",
    "exireDate": "2016-11-01T03:46:21.187Z",
    "id": "string",
    "orgApprover": "string",
    "organization": "string",
    "productDetail": [
      {
        "number": 0,
        "productItem": {
          "basicPrice": 0,
          "billingCycle": "string",
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
      }
    ],
    "quantity": "string",
    "relatedOrder": [
      {}
    ],
    "status": "string"
  }
}

Response Content Type 
*/