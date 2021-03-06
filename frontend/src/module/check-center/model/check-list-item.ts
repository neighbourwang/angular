import {ApproveItem} from './';


export class CheckListItem{
	orderId:string = null;//订单id
	orderCodeStr: string  = null;//订单编号
	serviceTypeIdStr: string = null;//产品类型
	serviceTypeName: string = null;//产品类型名称
	platformName: string = null;//所在区域
	zoneName: string = null;//可用区域

	orderType: number = null;//订单类型
	userStr: string = null;//用户
	departmentStr: string = null;//部门
	entStr: string = null;//企业

	 basePrice:string;
  	basicPrice:string;

	get userDepartEntStr():string{//用户，部门，企业
		return `${this.userStr}<br/>${this.departmentStr}<br/>${this.entStr}`;
	}

	billingMode: number = null;//计费模式
	billingDurationStr: string = null;//订单周期
	oneTimePriceNum: number = null;//一次性费用
	priceNum: number = null;//费用
	periodType:number = null;
	showPrice:boolean = true;//按次不显示费用

	createTimeStr: string = null;//创建时间
	checkResultId: number = null;//审批结果
	checkResultName: string = null;//审批结果名称	
	description: string = null; //描述
	specList:Array<{attrDisplayName:string;attrDisplayValue:string}> = null;//产品详细信息
    showSpecList:boolean = true;

	checkResult:Promise<ApproveItem> = null;//审批结果
	relyOrderNo:string = null;//关联的父级订单编号
}

/*
GeneralPagingResultOfListOf审批列表记录项 {
detailDescription (string, optional),
pageInfo (PageInfo, optional),
resultCode (string, optional),
resultContent (Array[审批列表记录项], optional)
}
PageInfo {
currentPage (integer, optional),
pageSize (integer, optional),
totalPage (integer, optional),
totalRecords (integer, optional)
}
审批列表记录项 {
billingInfo (ProductBillingItem, optional): 产品计费详细信息 ,
createDate (string, optional): 创建时间 ,
departmentName (string, optional): 部门 ,
enterpriseName (string, optional): 企业 ,
expireDate (string, optional): 过期时间 ,
instanceName (string, optional): 实例名称 ,
orderDesc (string, optional): 订单描述 ,
orderId (string, optional): 订单ID，不做显示，操作回传 ,
orderNo (string, optional): 对应UI界面中的订单编号 ,
orderType (string, optional): 订单类型 ,
period (integer, optional): 购买周期 ,
quantity (integer, optional): 订购数量 ,
serviceType (string, optional): 产品类型 ,
specList (Array[SubInstanceAttrPair], optional): 产品规格 ,
status (string, optional): UI订单状态，需要查询数据字典 ,
submiter (string, optional): 提交者
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
*/