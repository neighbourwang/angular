

//订单详情
export class OrderDetailItem {
  instanceCode:string = null;//订单编号
  type:number = null;//订单类型
  typeName:string = null;//订单类型
  status:number = null;//订单状态
  statusName:string = null;//订单状态
  buyer:string = null;//提交人
  productType:number = null;//产品类型
  productTypeName:string = null;//产品类型
  department:string = null; //部门
  createDate:string = null;//提交时间
  enterprise:string = null;//企业名称
  expireDate:string = null;//完成时间
  platform:string = null;//平台
  zone:string = null;//可用区
  specification:string = null;//配置
  instanceName:string = null;//实例名称
  description:string;//说明
  operator:string;//操作者
  billingModeName:string = null;//计费模式

  get billingMode():number{
    if(this.productBillingItem)
    {
      return this.productBillingItem.billingMode;
    }
    else
      return null;
  }

  productBillingItem:{
    billingId:string;
    billingMode:number;
    basePrice:number;//一次性费用
    periodType:number;
    basicPrice:number;
    cyclePrice:number;
    unitPrice:number;
    unitType:number;
  };

  //一次性费用
  get oneTimePrice():number{
    if(this.productBillingItem)
    {
      return this.productBillingItem.basePrice
    }
    else
      return null;
  }

  //费用
  get price():number{
    if(this.productBillingItem)
    {
      if(this.productBillingItem.billingMode == 0)//包年包月
      {
        return this.productBillingItem.basicPrice + this.productBillingItem.cyclePrice;
      }
      else if(this.productBillingItem.billingMode == 1)//一次性费用
      {
        return this.productBillingItem.unitPrice;
      }
      else
        return null;
    }
    else
      return null;
  }

  relatedSubInstanceList:Array<OrderDetailItem> = [];

  relatedOrderList:Array<OrderDetailItem> = [];
}
