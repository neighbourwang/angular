export class ProductItem{
	basicPrice: number = null;// 基础价格 ,
	billingCycle: string = null;// 计费周期，类型是数字，不要传入string 类型 ,
	code: string = null;//
	description: string = null;//
	id: string = null;//
	name: string = null;//
	onetimePrice: number = null;// 一次性价格 ,
	recurringPrice: number = null;// 周期价格 ,
	serviceId: string = null;// 产品目录ID ,
	serviceName: string = null;// 产品目录名称 ,
	serviceSpecification: string = null;//
	serviceType: string = null;// 产品目录类型 ,
	status: string = null;// 类型是数字，不要传入string 类型
}