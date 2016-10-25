import {Status, CertMethod} from './'

export class EntEstItem{
	id:string = "";	// id
	authMode:CertMethod = CertMethod.Local; //认证方式
	enterpriseName:string = "";	// 企业（租户）名称
	vmNum: number = null;	// 云主机数量
	vmQuota: number = null;	// 云主机配额（个）
	vmQuotaUsageRate: number = null;	// 云主机配额使用率
	storageQuota: number = null;	// 存储配额（GB）
	storageQuotaUsageRate : number = null;	// 存储配额使用率
	snapQuota: number = null;	// 快照配额（个）
	productNum : number = null;	// 产品数量
	orderNum : number = null;	// 订单数量
	status: string = "";	// 状态

	description: string = "";	// 描述// 描述
	checked: boolean = false;//ui operation
	statusName: string = ""; //ui operation

}
