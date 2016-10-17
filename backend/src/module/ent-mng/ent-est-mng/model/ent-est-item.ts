export class EntEstItem{
	// 企业（租户）名称
	enterpriseName:string = "";

	// 云主机数量
	vmNum: number = null;

	// 云主机配额（个）
	vmQuota: number = null;

	// 云主机配额使用率
	vmQuotaUsageRate: number = null;	

	// 存储配额（GB）
	storageQuota: number = null;

	// 存储配额使用率
	storageQuotaUsageRate : number = null;

	// 快照配额（个）
	snapQuota: number = null;

	// 产品数量
	productNum : number = null;

	// 订单数量
	orderNum : number = null;

	// 状态
	status: string = "";

	// 描述
	description: string = "";

	//ui operation
	checked: boolean = false;

}
