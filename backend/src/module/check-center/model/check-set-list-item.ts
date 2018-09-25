export class CheckSetListItem{
	adUserName: string = null;// (string, optional): 企业认证模式为AD 时输入 ,
	authMode: string = null;// (string, optional),
	backAuditEnable: boolean = null;// (string, optional),
	backAutoApprovalTime: number = null;// (integer, optional),
	code: string = null;// (string, optional),
	description: string = null;// (string, optional),
	frontAuditEnable: boolean = null;// (string, optional),
	frontAutoApprovalTime: number = null;// (integer, optional),
	id: string = null;// (string, optional),
	loginName: string = null;// (string, optional),
	name: string = null;// (string, optional),
	passWord: string = null;// (string, optional): 企业认证模式为AD 时输入 ,
	status: string = null;// (string, optional): 类型是数字，不要传入string 类型 ,
	url: string = null;// (string, optional)
}