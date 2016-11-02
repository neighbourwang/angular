import {ProductItem, OrderProductItem } from './'

//订单
export class OrderItem{
  backendApprover:string = null; //后台审批人 ,
  billingCycle:string = null; //购买时长 ,
  billingPerson:string = null; //订购人 ,
  createDate:string = null; //创建时间 ,
  createTime:string = null; //创建时间 ,
  enterpirse:string = null; //企业 ,
  exireDate:string = null; //过期时间 ,
  id:string = null; //订单ID ,
  orderCode: string = null; //订单编号
  orgApprover:string = null; //部门审批人 ,
  organization:string = null; //部门 ,
  productDetail:Array<OrderProductItem> = null; // 产品记录 ,
  products:Array<ProductItem> = null; // 订单关联的产品 ,
  quantity:string = null; //订购数量 ,
  relatedOrder:Array<OrderItem> = null; // 关联订单号 ,
  status:string = null; //订单状态  
  statusName:string = null; //订单状态字面量
}
/*

GeneralPagingResultOfListOfOrderItem {
detailDescription (string, optional),
pageInfo (PageInfo, optional),
resultCode (string, optional),
resultContent (Array[OrderItem], optional)
}
PageInfo {
currentPage (integer, optional),
pageSize (integer, optional),
totalPage (integer, optional),
totalRecords (integer, optional)
}
OrderItem {
backendApprover (string, optional): 后台审批人 ,
billingCycle (string, optional): 购买时长 ,
billingPerson (string, optional): 订购人 ,
createDate (string, optional): 创建时间 ,
enterpirse (string, optional): 企业 ,
exireDate (string, optional): 过期时间 ,
id (string, optional): 订单ID ,
orderCode (string, optional): 订单编号 ,
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
      "backendApprover": "string",
      "billingCycle": "string",
      "billingPerson": "string",
      "createDate": "2016-11-02T04:00:12.508Z",
      "enterpirse": "string",
      "exireDate": "2016-11-02T04:00:12.508Z",
      "id": "string",
      "orderCode": "string",
      "orgApprover": "string",
      "organization": "string",
      "productDetail": [
        {
          "number": 0,
          "productItem": {
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
        }
      ],
      "quantity": "string",
      "relatedOrder": [
        {}
      ],
      "status": "string"
    }
  ]
}

*/