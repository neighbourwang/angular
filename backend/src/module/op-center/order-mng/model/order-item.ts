import {ProductItem } from './'

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
  billingCycle: string = null;//;, optional): 购买时长 ,
  billingMode: string = null;//;, optional): 计费模式 ,
  createDate: string = null;//;, optional): 创建时间 ,
  exireDate: string = null;//;, optional): 过期时间 ,
  extIp: string = null;//;, optional): 外部ip ,
  instanceName: string = null;//;, optional): 实例名称 ,
  ip: string = null;//;, optional): 内部ip ,
  isSetPassword: string = null;//;, optional): 密码设置与否，0// 未设置，1 已设置 ,
  oneTimePrice: number = null;//;, optional): 一次性费用 ,
  operationSystem: string = null;//;, optional): 操作系统 ,
  platformId: string = null;//;, optional): 平台ID ,
  platformName: string = null;//;, optional): 平台名称 ,
  price: number = null;//;, optional): 费用 ,
  productType: string = null;//;, optional): 产品类型 ,
  quantity: string = null;//;, optional): 订购数量 ,
  specificationItem: SpecificationItem = null;//;, optional): 产品规格 ,
  status: string = null;//;, optional): 订单状态 ,
  subscriptTime: number = null;//;, optional): 购买周期 ,
  zoneId: string = null;//;, optional): 可用区ID ,
  zoneName: string = null;// null;, optional): 可用区名称 

  statusName: string = null;//状态转换显示



  private show1 = Symbol("区域");
  private show2 = Symbol('可用区');
  private show3 = Symbol('实例规格');
  private show4 = Symbol('IP地址');
  private show5 = Symbol('操作系统');
  private show6 = Symbol('密码');
  private show7 = Symbol('实例名称');
  private show8 = Symbol('云硬盘类型');
  private show9 = Symbol('云硬盘容量');
  private show10 = Symbol('数据库类型');
  private show11 = Symbol('数据库版本');


  private _outputOrder:Array<any> = [
  {name:this.show1, value:null}
  ,{name: this.show2, value:null}
  ,{name: this.show3, value:null}
  ,{name: this.show4, value:null}
  ,{name: this.show5, value:null}
  ,{name: this.show6, value:null}
  ,{name: this.show7, value:null}
  ,{name: this.show8, value:null}
  ,{name: this.show9, value:null}
  ,{name: this.show10, value:null}
  ,{name: this.show11, value:null}
  ];

  private setOutputOrder(name:symbol, value:string){
    let obj = this._outputOrder.find(n=>n.name == name);
    if(obj)
    {
      obj.value = value;
    }
  }
  get prodDetailItems():Array<any>{
    this.setOutputOrder(this.show1, this.platformName);
    this.setOutputOrder(this.show2, this.zoneName);
    this.setOutputOrder(this.show3, this.specificationItem != null? this.specificationItem.specName: null);
    this.setOutputOrder(this.show4, (():string=>{
      let output:Array<string>=[];
      if(this.ip)
        output.push(`${this.ip} (内部)`);

      if(this.extIp)
        output.push(`${this.extIp} (外部)`);

      return output.length > 0? output.join('<br/>') : null;
    })());
    this.setOutputOrder(this.show5, this.operationSystem);
    this.setOutputOrder(this.show6, this.isSetPassword == "1"? "已设置":"未设置");
    this.setOutputOrder(this.show7, "api未提供");
    this.setOutputOrder(this.show8, this.specificationItem != null ? this.specificationItem.diskType.toString() : null);
    this.setOutputOrder(this.show9, this.specificationItem != null ? `${this.specificationItem.diskSize} GB`: null);
    this.setOutputOrder(this.show10, "api未提供");
    this.setOutputOrder(this.show11, "api未提供");

    return this._outputOrder.filter(n=>n.value && n.value.length > 0);
  }
}


export class SpecificationItem {
  bootDisk: number = null;//, optional): 启动盘容量 ,
  cpu: number = null;//, optional): CPU核数 ,
  diskSize: number = null;//, optional): 硬盘大小 ,
  diskType: number = null;//, optional): 硬盘类型 ,
  memory: number = null;//, optional): 内存大小

  get specName():string{
    let output:Array<string> = [];
    if(this.cpu)
      output.push(`CPU ${this.cpu}核`);

    if(this.memory)
      output.push(`内存 ${this.memory}GB`);

    if(this.bootDisk)
      output.push(`启动盘 ${this.bootDisk}GB`);

    return output.length > 0? output.join(''): null;
  }

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
SpecificationItem {
bootDisk (integer, optional): 启动盘容量 ,
cpu (integer, optional): CPU核数 ,
diskSize (integer, optional): 硬盘大小 ,
diskType (integer, optional): 硬盘类型 ,
memory (integer, optional): 内存大小
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
          "createDate": "2016-11-03T02:57:02.907Z",
          "exireDate": "2016-11-03T02:57:02.907Z",
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
  ]
}

*/