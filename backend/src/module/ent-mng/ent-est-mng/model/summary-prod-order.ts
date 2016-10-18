export class SummaryProdOrder{
	onGoingAmount: number = 0;//进行中的订单数
	onCheckAmount: number = 0;//待审批订单
	onExpireAmount: number = 0; //即将过期(1个月内)的订单数
}