class BillingInfo {
    basePrice: number = 0;   //一次性费用 周期计费+， 流量计费+
    basicPrice: number = 0;   //基础周期费用 周期计费+
    billingId: string = "";   //
    billingMode: string = "";  //计费模式
    cyclePrice: number = 0;   //增量周期费用
    periodType: number = 0; 
    unitPrice: number = 0;    //单价费用 
    unitType: number = 0;     //流量单位
}
export {
	BillingInfo
}