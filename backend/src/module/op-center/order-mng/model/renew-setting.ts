export enum PurchaseUnit{
	hour = 0,
	day = 1,
	month = 2
}
export class RenewSetting{
	unit:PurchaseUnit = PurchaseUnit.hour;//单位
	value:number = null;//时长
	isPermanent:boolean = null;//永久
	renewDate:string = null; //续订后日期
	onetimePrice:number = null;//一次性费用
	price:number = null; //费用
	completed:boolean = false;//续订完成
	isForever:boolean = false;//是否永久

	reset(){
		this.unit = PurchaseUnit.hour;//单位
		this.value = null;//时长
		this.isPermanent = null;//永久
		this.renewDate = null; //续订后日期
		this.onetimePrice = null;//一次性费用
		this.price = null; //费用
		this.completed = false;//续订完成
		this.isForever = false;
	}
}