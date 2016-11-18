﻿import {ProductItem } from './'

//订单
export class OrderItem{
  id: string = null;//, optional): 订单ID ,
  orderCode: string = null;//, optional): 订单编号 ,
  orderInstanceItems: Array<OrderInstanceItem> = null;//[OrderInstanceItem], optional): 订单中的产品信息 ,
  relatedOrder: Array<OrderItem> = null;//[OrderItem], optional): 关联订单

  get firstOrderInstanceItem():OrderInstanceItem{
    if(this.orderInstanceItems)
      return this.orderInstanceItems[0];
    else
      return null;
  }

  get orderDate():string{
    if(this.firstOrderInstanceItem)
      return this.firstOrderInstanceItem.createDate;
    else
      return "None";
  }
}

export class OrderInstanceItem{
  billingCycle: string = null;//, optional): 购买时长 ,
  billingMode: string = null;//, optional): 计费模式 ,
  createDate: string = null;//, optional): 创建时间 ,
  exireDate: string = null;//, optional): 过期时间 ,
  instanceName: string = null;//, optional): 实例名称 ,
  isSetPassword: string = null;//, optional): 密码设置与否，0 未设置，1 已设置 ,
  oneTimePrice: number = null;//, optional): 一次性费用 ,
  price: number = null;//, optional): 费用 ,
  productType: string = null;//, optional): 产品类型 ,
  quantity: string = null;//, optional): 订购数量 ,
  specificationItems: Array<SpecificationItem> = null;// 每个实例为 可用区名称，平台名称（region）,CPU核数,内存大小,硬盘类型,硬盘大小,启动盘容量，操作系统，内部IP，外部IP 中的一项, optional): 产品规格 ,
  status: string = null;//, optional): 订单状态 ,
  subscriptTime: number = null;//, optional): 购买周期

  statusName: string = null;//状态转换显示
  get oneTimePriceAndPrice():string{
    return `一次性费用:${this.oneTimePrice}
    费用:${this.price}`;
  }

  get SpecItems():Array<SpecificationItem>{
    //todo: 可能需要进行转换
    return this.specificationItems;
  }
}

export class SpecificationItem {
  attrCode: string = null;//, optional): 服务属性Code ,
  attrDisplayName: string = null;//, optional): 服务属性页面显示的名称 ,
  attrDisplayValue: string = null;//, optional): 服务属性值显示值 ,
  attrOrderSeq: number = null;//, optional): 属性显示顺序, 如果为空，则忽略 ,
  attrValueCode: string = null;//, optional): 服务属性值Code ,
  description: string = null;//, optional): 其他描述性内容，非不要 ,
  valueUnit: string = null;//, optional): 服务属性值的单位
}



export class SubInstanceResp {
  itemList: Array<SubInstanceItemResp> = null;//[SubInstanceItemResp], optional): 对应UI界面订单列表里面的详情 ,
  orderId: string = null;//, optional): 订单ID，不做显示，操作回传 ,
  orderNo: string = null;//, optional): 对应UI界面中的订单编号 ,
  purchaseDate: string = null;//, optional): 对应UI界面中的下单时间, 映射到后端的createDate
}

export class SubInstanceItemResp {
  billingInfo: ProductBillingItem = null;//, optional): 产品计费详细信息 ,
  createDate: string = null;//, optional): 创建时间 ,
  expireDate: string = null;//, optional): 过期时间 ,
  instanceName: string = null;//, optional): 实例名称 ,
  period: number = null;//, optional): 购买周期 ,
  quantity: number = null;//, optional): 订购数量 ,
  serviceType: string = null;//, optional): 产品类型 ,
  specList: Array<SubInstanceAttrPair> = null;//[SubInstanceAttrPair], optional): 产品规格 ,
  status: string = null;//, optional): UI订单状态，需要查询数据字典

  get billingMode():string{//包装计费模式
    return this.billingInfo ? this.billingInfo.billingMode : "";
  }

  get oneTimePriceAndPrice():string{//单价费用
    return this.billingInfo ? this.billingInfo.oneTimePriceAndPrice : "";
  }

  statusName: string = null;//用于界面显示
  serviceTypeName: string = null;//产品类型名称
  billingModeName: string = null;//计费模式名称
}


export class ProductBillingItem {
  basePrice: number = null;//, optional): 一次性价格 ,
  basicPrice: number = null;//, optional): 周期计费-基础周期价格 ,
  billingId: string = null;//, optional): 产品计费ID ,
  billingMode: string = null;//, optional): 计费类型，需要检索数据字典 ,
  cyclePrice: number = null;//, optional): 周期计费-增量周期价格 ,
  unitPrice: number = null;//, optional): 流量计费-流量单价 ,
  unitType: number = null;//, optional): 流量计费-流量计费类型，需要查询数据字典

  get oneTimePriceAndPrice():string{ //单价费用
    return `一次性价格:${this.basePrice}
    价格:${this.basicPrice}`;
  }
}



export class SubInstanceAttrPair {
  attrCode: string = null;//, optional): 服务属性Code ,
  attrDisplayName: string = null;//, optional): 服务属性页面显示的名称 ,
  attrDisplayValue: string = null;//, optional): 服务属性值显示值 ,
  attrOrderSeq: number = null;//, optional): 属性显示顺序, 如果为空，则忽略 ,
  attrValueCode: string = null;//, optional): 服务属性值Code ,
  description: string = null;//, optional): 其他描述性内容，非不要 ,
  valueUnit: string = null;//, optional): 服务属性值的单位
}

/*
POST /authsec/backend/order/search/paging
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
  id (string, optional): 订单ID ,
  orderCode (string, optional): 订单编号 ,
  orderInstanceItems (Array[OrderInstanceItem], optional): 订单中的产品信息 ,
  relatedOrder (Array[OrderItem], optional): 关联订单
}
OrderInstanceItem {
  billingCycle (string, optional): 购买时长 ,
  billingMode (string, optional): 计费模式 ,
  createDate (string, optional): 创建时间 ,
  exireDate (string, optional): 过期时间 ,
  instanceName (string, optional): 实例名称 ,
  isSetPassword (string, optional): 密码设置与否，0 未设置，1 已设置 ,
  oneTimePrice (integer, optional): 一次性费用 ,
  price (integer, optional): 费用 ,
  productType (string, optional): 产品类型 ,
  quantity (string, optional): 订购数量 ,
  specificationItem (SpecificationItem 每个实例为 可用区名称，平台名称（region）,CPU核数,内存大小,硬盘类型,硬盘大小,启动盘容量，操作系统，内部IP，外部IP 中的一项, optional): 产品规格 ,
  status (string, optional): 订单状态 ,
  subscriptTime (integer, optional): 购买周期
}
SpecificationItem 每个实例为 可用区名称，平台名称（region）,CPU核数,内存大小,硬盘类型,硬盘大小,启动盘容量，操作系统，内部IP，外部IP 中的一项 {
  attrCode (string, optional): 服务属性Code ,
  attrDisplayName (string, optional): 服务属性页面显示的名称 ,
  attrDisplayValue (string, optional): 服务属性值显示值 ,
  attrOrderSeq (integer, optional): 属性显示顺序, 如果为空，则忽略 ,
  attrValueCode (string, optional): 服务属性值Code ,
  description (string, optional): 其他描述性内容，非不要 ,
  valueUnit (string, optional): 服务属性值的单位
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
      "id": "string",
      "orderCode": "string",
      "orderInstanceItems": [
        {
          "billingCycle": "string",
          "billingMode": "string",
          "createDate": "2016-11-09T02:20:04.521Z",
          "exireDate": "2016-11-09T02:20:04.521Z",
          "instanceName": "string",
          "isSetPassword": "string",
          "oneTimePrice": 0,
          "price": 0,
          "productType": "string",
          "quantity": "string",
          "specificationItem": {
            "attrCode": "string",
            "attrDisplayName": "string",
            "attrDisplayValue": "string",
            "attrOrderSeq": 0,
            "attrValueCode": "string",
            "description": "string",
            "valueUnit": "string"
          },
          "status": "string",
          "subscriptTime": 0
        }
      ],
      "relatedOrder": [
        {}
      ]
    }
  ]
}


------------------------------------------------------------------------------------


GeneralPagingResultOfListOfSubInstanceResp {
detailDescription (string, optional),
pageInfo (PageInfo, optional),
resultCode (string, optional),
resultContent (Array[SubInstanceResp], optional)
}
PageInfo {
currentPage (integer, optional),
pageSize (integer, optional),
totalPage (integer, optional),
totalRecords (integer, optional)
}
SubInstanceResp {
itemList (Array[SubInstanceItemResp], optional): 对应UI界面订单列表里面的详情 ,
orderId (string, optional): 订单ID，不做显示，操作回传 ,
orderNo (string, optional): 对应UI界面中的订单编号 ,
purchaseDate (string, optional): 对应UI界面中的下单时间, 映射到后端的createDate
}
SubInstanceItemResp {
billingInfo (ProductBillingItem, optional): 产品计费详细信息 ,
createDate (string, optional): 创建时间 ,
expireDate (string, optional): 过期时间 ,
instanceName (string, optional): 实例名称 ,
period (integer, optional): 购买周期 ,
quantity (integer, optional): 订购数量 ,
serviceType (string, optional): 产品类型 ,
specList (Array[SubInstanceAttrPair], optional): 产品规格 ,
status (string, optional): UI订单状态，需要查询数据字典
}
ProductBillingItem {
basePrice (number, optional): 一次性价格 ,
basicPrice (number, optional): 周期计费-基础周期价格 ,
billingId (string, optional): 产品计费ID ,
billingMode (string, optional): 计费类型，需要检索数据字典 ,
cyclePrice (number, optional): 周期计费-增量周期价格 ,
unitPrice (number, optional): 流量计费-流量单价 ,
unitType (number, optional): 流量计费-流量计费类型，需要查询数据字典
}
SubInstanceAttrPair {
attrCode (string, optional): 服务属性Code ,
attrDisplayName (string, optional): 服务属性页面显示的名称 ,
attrDisplayValue (string, optional): 服务属性值显示值 ,
attrOrderSeq (integer, optional): 属性显示顺序, 如果为空，则忽略 ,
attrValueCode (string, optional): 服务属性值Code ,
description (string, optional): 其他描述性内容，非不要 ,
valueUnit (string, optional): 服务属性值的单位
}

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
      "itemList": [
        {
          "billingInfo": {
            "basePrice": 0,
            "basicPrice": 0,
            "billingId": "string",
            "billingMode": "string",
            "cyclePrice": 0,
            "unitPrice": 0,
            "unitType": 0
          },
          "createDate": "2016-11-10T02:23:02.483Z",
          "expireDate": "2016-11-10T02:23:02.483Z",
          "instanceName": "string",
          "period": 0,
          "quantity": 0,
          "serviceType": "string",
          "specList": [
            {
              "attrCode": "string",
              "attrDisplayName": "string",
              "attrDisplayValue": "string",
              "attrOrderSeq": 0,
              "attrValueCode": "string",
              "description": "string",
              "valueUnit": "string"
            }
          ],
          "status": "string"
        }
      ],
      "orderId": "string",
      "orderNo": "string",
      "purchaseDate": "string"
    }
  ]
}

查询参数
{
  "approvalStatus": "string",
  "approverId": "string",
  "createTime": "2016-11-09T02:20:04.387Z",
  "enterpriseId": "string",
  "expireTime": "2016-11-09T02:20:04.387Z",
  "orderId": "string",
  "orderType": "string",
  "organization": "string",
  "pageParameter": {
    "currentPage": 0,
    "offset": 0,
    "size": 0,
    "sort": {},
    "totalPage": 0
  },
  "region": "string",
  "serviceId": "string",
  "status": "string",
  "userId": "string",
  "zoneId": "string"
}

*/