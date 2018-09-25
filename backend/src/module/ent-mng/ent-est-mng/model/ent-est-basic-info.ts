import {CertMethod } from './';

export class EntEstBasicInfo{
	code: string = null;
	contactorPhone: string = null;
	currencyType: string = null;
	email: string = null;
	id: string = null;//id:
	name: string = null;//企业名称:
	certMethod: CertMethod = CertMethod.Local;//认证方式
	certUrl: string = null;//url地址
	contactorName: string = null;//用户名
	password: string = null;//密码
	description: string = null;//描述
	logo: string = null;//logo
	//isSSL: boolean = null;// 是否进行ssl加密
	platformIds:Array<string> = [];

	adname:string = null; //AD 名称
	adDescription:string = null;//ad description
	loginProp:string = null;//登录账户名属性

	reset(){
		this.code = null;
		this.contactorPhone = null;
		this.currencyType = null;
		this.email = null;
		this.id = null;
		this.name = null;
		this.certMethod = CertMethod.Local;
		this.certUrl = null;
		this.contactorName = null;
		this.password = null;
		this.description = null;
		this.logo = null;
		//this.isSSL = null;
		this.platformIds = [];
		this.adname = null;
		this.adDescription = null;
		this.loginProp = null;
	}
}


/*
GET /authsec/enterprise/{_enterpriseId}/simple

GeneralContentResultOfEnterpriseGeneralItem {
detailDescription (string, optional),
resultCode (string, optional),
resultContent (EnterpriseGeneralItem, optional)
}
EnterpriseGeneralItem {
	adUserName (string, optional): 企业认证模式为AD 时输入 ,
	authMode (string, optional),
	code (string, optional),
	description (string, optional),
	id (string, optional),
	loginName (string, optional),
	name (string, optional),
	passWord (string, optional): 企业认证模式为AD 时输入 ,
	status (string, optional): 类型是数字，不要传入string 类型 ,
	url (string, optional)
}

{
	
	"detailDescription": "string",
  "resultCode": "string",
  "resultContent": {
    "adUserName": "string",
    "authMode": "string",
    "code": "string",
    "description": "string",
    "id": "string",
    "loginName": "string",
    "name": "string",
    "passWord": "string",
    "status": "string",
    "url": "string"
  }
}
*/