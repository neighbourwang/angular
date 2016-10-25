export class EntEstBasicInfo{
	code: string = null;
	contactorPhone: string = null;
	currencyType: string = null;
	email: string = null;
	id: string = null;//id:
	name: string = null;//企业名称:
	certMethod: number = 0;//认证方式
	certUrl: string = null;//url地址
	contactorName: string = null;//用户名
	password: string = null;//密码
	description: string = null;//描述
	logo: string = null;//logo

	reset(){
		this.code = null;
		this.contactorPhone = null;
		this.currencyType = null;
		this.email = null;
		this.id = null;
		this.name = null;
		this.certMethod = null;
		this.certUrl = null;
		this.contactorName = null;
		this.password = null;
		this.description = null;
		this.logo = null;

	}
}