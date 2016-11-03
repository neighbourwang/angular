import {OrderItem, OrderInstanceItem} from './'

//订单详情
export class OrderDetailItem {
  backendApprover: string = null;//, optional): 后台审批人 ,
  backendApproverId: string = null;//, optional): 后台审批人ID ,
  billingMode: string = null;//, optional): 计费模式 ,
  billingPerson: string = null;//, optional): 订购人 ,
  billingPersonId: string = null;//, optional): 订购人ID ,
  createDate: string = null;//, optional): 创建时间 ,
  department: string = null;//, optional): 部门 ,
  departmentApprover: string = null;//, optional): 部门审批人 ,
  departmentApproverId: string = null;//, optional): 部门审批人ID ,
  departmentId: string = null;//, optional): 部门ID ,
  enterpirse: string = null;//, optional): 企业 ,
  enterpirseId: string = null;//, optional): 企业ID ,
  exireDate: string = null;//, optional): 过期时间 ,
  id: string = null;//, optional): 订单ID ,
  orderCode: string = null;//, optional): 订单编号 ,
  orderInstanceItems: Array<OrderInstanceItem> = null;//[OrderInstanceItem], optional): 订单中的产品信息 ,
  relatedOrders: Array<OrderItem> = null;//[OrderItem], optional): 关联订单 ,
  status: string = null;//, optional): 订单状态 ,
  subscriptTime: number = null;//, optional): 购买周期

  get amount():number{
    return this.orderInstanceItems ? this.orderInstanceItems.length: 0;
  }
  statusName: string = null;//status的翻译字段
}

/*

GeneralContentResultOfOrderDetailItem {
detailDescription (string, optional),
resultCode (string, optional),
resultContent (OrderDetailItem, optional)
}
OrderDetailItem {
backendApprover (string, optional): 后台审批人 ,
backendApproverId (string, optional): 后台审批人ID ,
billingMode (string, optional): 计费模式 ,
billingPerson (string, optional): 订购人 ,
billingPersonId (string, optional): 订购人ID ,
createDate (string, optional): 创建时间 ,
department (string, optional): 部门 ,
departmentApprover (string, optional): 部门审批人 ,
departmentApproverId (string, optional): 部门审批人ID ,
departmentId (string, optional): 部门ID ,
enterpirse (string, optional): 企业 ,
enterpirseId (string, optional): 企业ID ,
exireDate (string, optional): 过期时间 ,
id (string, optional): 订单ID ,
orderCode (string, optional): 订单编号 ,
orderInstanceItems (Array[OrderInstanceItem], optional): 订单中的产品信息 ,
relatedOrders (Array[OrderItem], optional): 关联订单 ,
status (string, optional): 订单状态 ,
subscriptTime (integer, optional): 购买周期
}
OrderInstanceItem {
billingCycle (string, optional): 购买时长 ,
billingMode (string, optional): 计费模式 ,
createDate (string, optional): 创建时间 ,
exireDate (string, optional): 过期时间 ,
extIp (string, optional): 外部ip ,
instanceName (string, optional): 实例名称 ,
ip (string, optional): 内部ip ,
isSetPassword (string, optional): 密码设置与否，0 未设置，1 已设置 ,
oneTimePrice (integer, optional): 一次性费用 ,
operationSystem (string, optional): 操作系统 ,
platformId (string, optional): 平台ID ,
platformName (string, optional): 平台名称 ,
price (integer, optional): 费用 ,
productType (string, optional): 产品类型 ,
quantity (string, optional): 订购数量 ,
specificationItem (SpecificationItem, optional): 产品规格 ,
status (string, optional): 订单状态 ,
subscriptTime (integer, optional): 购买周期 ,
zoneId (string, optional): 可用区ID ,
zoneName (string, optional): 可用区名称
}
OrderItem {
id (string, optional): 订单ID ,
orderCode (string, optional): 订单编号 ,
orderInstanceItems (Array[OrderInstanceItem], optional): 订单中的产品信息 ,
relatedOrder (Array[OrderItem], optional): 关联订单
}
SpecificationItem {
bootDisk (integer, optional): 启动盘容量 ,
cpu (integer, optional): CPU核数 ,
diskSize (integer, optional): 硬盘大小 ,
diskType (integer, optional): 硬盘类型 ,
memory (integer, optional): 内存大小
}


{
  
  "detailDescription": "string",
  "resultCode": "string",
  "resultContent": {
    "backendApprover": "string",
    "backendApproverId": "string",
    "billingMode": "string",
    "billingPerson": "string",
    "billingPersonId": "string",
    "createDate": "2016-11-03T04:33:01.907Z",
    "department": "string",
    "departmentApprover": "string",
    "departmentApproverId": "string",
    "departmentId": "string",
    "enterpirse": "string",
    "enterpirseId": "string",
    "exireDate": "2016-11-03T04:33:01.908Z",
    "id": "string",
    "orderCode": "string",
    "orderInstanceItems": [
      {
        "billingCycle": "string",
        "billingMode": "string",
        "createDate": "2016-11-03T04:33:01.908Z",
        "exireDate": "2016-11-03T04:33:01.908Z",
        "extIp": "string",
        "instanceName": "string",
        "ip": "string",
        "isSetPassword": "string",
        "oneTimePrice": 0,
        "operationSystem": "string",
        "platformId": "string",
        "platformName": "string",
        "price": 0,
        "productType": "string",
        "quantity": "string",
        "specificationItem": {
          "bootDisk": 0,
          "cpu": 0,
          "diskSize": 0,
          "diskType": 0,
          "memory": 0
        },
        "status": "string",
        "subscriptTime": 0,
        "zoneId": "string",
        "zoneName": "string"
      }
    ],
    "relatedOrders": [
      {
        "id": "string",
        "orderCode": "string",
        "orderInstanceItems": [
          {
            "billingCycle": "string",
            "billingMode": "string",
            "createDate": "2016-11-03T04:33:01.911Z",
            "exireDate": "2016-11-03T04:33:01.911Z",
            "extIp": "string",
            "instanceName": "string",
            "ip": "string",
            "isSetPassword": "string",
            "oneTimePrice": 0,
            "operationSystem": "string",
            "platformId": "string",
            "platformName": "string",
            "price": 0,
            "productType": "string",
            "quantity": "string",
            "specificationItem": {
              "bootDisk": 0,
              "cpu": 0,
              "diskSize": 0,
              "diskType": 0,
              "memory": 0
            },
            "status": "string",
            "subscriptTime": 0,
            "zoneId": "string",
            "zoneName": "string"
          }
        ],
        "relatedOrder": [
          {}
        ]
      }
    ],
    "status": "string",
    "subscriptTime": 0
  }
}
*/