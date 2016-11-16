export enum PurchaseUnit{
	hour,
	day,
	month
}
export class RenewSetting{
	unit:PurchaseUnit = PurchaseUnit.hour;//单位
	value:number = null;//时长
	isPermanent:boolean = null;//永久
	renewDate:string = null; //续订后日期
	onetimePrice:number = null;//一次性费用
	price:number = null; //费用
	completed:boolean = false;//续订完成
}