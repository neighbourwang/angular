//产品信息
export class EntProdItem{
	id:string = "";//id
	entId: string = "";// 企业id
	name: string = "";//产品名称
	category: string = "";//产品目录
	type: string = ""; //产品类别
	spec: string = ""; //产品规格
	countCycle: string = "";//计费周期
	cyclePrice: number = null; //周期价格
	oneTimePrice: number = null; //一次性价格
	status: string = ""; //状态
	statusName: string = ""; //显示状态
	description: string = "";//描述
}