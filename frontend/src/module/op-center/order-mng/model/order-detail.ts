import {SubInstanceItemResp,SubInstanceAttrPair} from "./";


//订单详情
export class OrderDetailItem {
  instanceId:string = null;//订单Id
  instanceCode:string = null;//订单编号
  type:number = null;//订单类型
  typeName:string = null;//订单类型
  status:number = null;//订单状态
  statusName:string = null;//订单状态
  buyer:string = null;//提交人，操作者
  productType:number = null;//产品类型
  productTypeName:string = null;//产品类型
  department:string = null; //部门
  createDate:string = null;//提交时间
  enterprise:string = null;//企业名称
  expireDate:string = null;//完成时间
  platform:string = null;//平台
  zone:string = null;//可用区
  itemList:SubInstanceItemResp[] = [];
  specification:string = null;//配置
  instanceName:string = null;//实例名称
  description:string;//说明
  billingModeName:string = null;//计费模式
  extendType:string;//自动续订方式
  period: number = null;//, optional): 购买周期 ,
  quantity: number = null;//, optional): 订购数量 ,
  specList: Array<SubInstanceAttrPair> = null;
  isChecked:boolean = false;

  get isExtend():string{
    if(this.extendType=='0')
      return '否';
    return '是';
  }
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
        return this.productBillingItem.basicPrice;//周期费用
        // return this.productBillingItem.basicPrice + this.productBillingItem.cyclePrice;//周期费用+增量费用
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

   //按次计费不显示费用
    get showPrice(){
      if(this.productBillingItem){
          return this.productBillingItem.billingMode==3 ? false : true;
      }
      return   true;
    }
  get periodType():number{//单位
    return this.productBillingItem ? this.productBillingItem.periodType : null;
  }
  relatedSubInstanceList:Array<OrderDetailItem> = [];

  hisOrderList:Array<OrderDetailItem> = [];
}
