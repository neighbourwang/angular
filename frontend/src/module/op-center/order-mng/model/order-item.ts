import {ProductItem } from './'

//订单
export class SubInstanceResp {
  itemList: Array<SubInstanceItemResp> = [];//[SubInstanceItemResp], optional): 对应UI界面订单列表里面的详情 ,
  orderId: string = null;//, optional): 订单ID，不做显示，操作回传 ,
  orderNo: string = null;//, optional): 对应UI界面中的订单编号 ,
  purchaseDate: string = null;//, optional): 对应UI界面中的下单时间, 映射到后端的createDate
  canRenew:boolean = true;
  canContinueRenew:boolean=true;//是否自动续订
  showInstance : boolean = true;//是否展示实例名称
  relySubinstanceId : number = null; //是否挂载了主机的标识
  extendType: number = null;//, optional): 订单的自动续订状态

  isChecked:boolean= false;

  get isMachine():boolean{//云主机
    return this.itemList && this.itemList[0].serviceType == 0;
  }

  get isDisk():boolean{//云硬盘
    return this.itemList && this.itemList[0].serviceType == 1;
  }

  get isInUse():boolean{//是否处于挂载状态
    if(this.isDisk)
    {
      return this.relySubinstanceId != null;
    }
    else
      return void 0;
  }
}

export class SubInstanceItemResp {
  billingInfo: ProductBillingItem = null;//, optional): 产品计费详细信息 ,
  createDate: string = null;//, optional): 创建时间 ,
  expireDate: string = null;//, optional): 过期时间 ,
  instanceName: string = null;//, optional): 实例名称 ,
  period: number = null;//, optional): 购买周期 ,
  quantity: number = null;//, optional): 订购数量 ,
  serviceType: number = null;//, optional): 产品类型 ,
  specList: Array<SubInstanceAttrPair> = null;//[SubInstanceAttrPair], optional): 产品规格 ,
  status: string = null;//, optional): UI订单状态，需要查询数据字典
platform:string;
privateIp:string;
publicIp:string;
osType:string;
  get billingMode():number{//包装计费模式
    return this.billingInfo ? this.billingInfo.billingMode : null;
  }

  get periodType():number{//单位
    return this.billingInfo ? this.billingInfo.periodType : null;
  }
  
  //basePrice:一次性费用  basicPrice:周期费用  cyclePrice:增量费用
  get oneTimePrice():number{
    return this.billingInfo ? this.billingInfo.basePrice : 0;
  }

  get price():number{
 
    if(this.billingInfo){
      if(this.billingMode == 0)//云主机，包年包月
      {
        return this.billingInfo.basicPrice;//周期费用
        // return this.billingInfo.basicPrice + this.billingInfo.cyclePrice;//周期费用+增量费用
      }
      else if(this.billingMode == 1)//按量计费
      {
        return this.billingInfo.unitPrice;
      }
      else
        return 0;
      }
    } 

  statusName: string = null;//用于界面显示
  serviceTypeName: string = null;//产品类型名称
  billingModeName: string = null;//计费模式名称
  renewPrice:number = null;//续订费用，每次续订时组装。
  renewPeriodType:number ;//续订费用单位
  renewDate:string;//续订后到期时间
  periodTypeName: string = null;//计费时长单位

  buyer:string = null;//订购人
  departmentName:string = null;//部门

}


export class ProductBillingItem {
  basePrice: number = null;//, optional): 一次性价格 ,
  basicPrice: number = null;//, optional): 周期计费-基础周期价格 ,
  billingId: string = null;//, optional): 产品计费ID ,
  billingMode: number = null;//, optional): 计费类型，需要检索数据字典 ,
  cyclePrice: number = null;//, optional): 周期计费-增量周期价格 ,
  unitPrice: number = null;//, optional): 流量计费-流量单价 ,
  unitType: number = null;//, optional): 流量计费-流量计费类型，需要查询数据字典
  periodType: number = null; //周期计费-周期类型，需要检索数据字典
}



export class SubInstanceAttrPair {
  attrCode: string = null;//, optional): 服务属性Code ,
  attrDisplayName: string = null;//, optional): 服务属性页面显示的名称 ,
  attrValueCode: string = null;//, optional): 服务属性值Code ,
  attrDisplayValue: string = null;//, optional): 服务属性值显示值 ,
  valueUnit: string = null;//, optional): 服务属性值的单位
  attrOrderSeq: number = null;//, optional): 属性显示顺序, 如果为空，则忽略 ,
  description: string = null;//, optional): 其他描述性内容，非不要 ,
}

/*
POST /authsec/subscription/instances/search/paging

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
periodType (string, optional): 周期计费-周期类型，需要检索数据字典 ,
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
          "createDate": "2016-11-10T02:24:56.929Z",
          "expireDate": "2016-11-10T02:24:56.929Z",
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

*/