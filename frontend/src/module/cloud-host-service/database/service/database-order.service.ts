import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class DatabaseServiceOrder {
	constructor(private http: Http,
		private restApiCfg: RestApiCfg,
		private dict: SystemDictionaryService,
		private restApi: RestApi) {
	}


	fetchDatabaseInit(): Promise<any> {
		const api = this.restApiCfg.getRestApi("database.template.init");

		const request = this.restApi.request(api.method, api.url, undefined, undefined, undefined)
			.then(res => {
				if (res.resultCode !== "100") {
					throw "";
				}
				return res.resultContent;
			});
		return request;
	}

	fetchShoppingMDproducts(postData): Promise<any> {
		const api = this.restApiCfg.getRestApi("shopping.MDproducts");

		const request = this.restApi.request(api.method, api.url, undefined, undefined, postData)
			.then(res => {
				if (res.resultCode !== "100") {
					throw "";
				}
				return res.resultContent;
			});
		return request;
	}

	fetchDatabaseSearch(postData): Promise<any> {
		const api = this.restApiCfg.getRestApi("database.template.search");

		const request = this.restApi.request(api.method, api.url, undefined, undefined, postData)
			.then(res => {
				if (res.resultCode !== "100") {
					throw "";
				}
				return res.resultContent;
			});
		return request;
		// return Promise.resolve([
		//	{
		//		"id": "8325A84F-3A8A-47CE-B288-7A5037604B8B",
		//		"name": "db1",
		//		"version": "12C-12R2",
		//		"os": "linux",
		//		"bit": "64 bit",
		//		"cpu": 2,
		//		"memory": 36,
		//		"bootStorageSize": 50,
		//		"storageType": "1",
		//		"createTime": 1493852013000,
		//		"updateTime": 1494493232000,
		//		"dbType": 0,
		//		"desc": null,
		//		"status": 1,
		//		"templateType": "ASM",
		//		"deploymentMode": 0,
		//		"diskInfoList": [
		//			{
		//				copyLevel: 0, //(integer, optional): 冗余级别 0 高，1 正常， 2 外部 ,
		//				diskGroup: "DB", //(string, optional): 磁盘组名称 ,
		//				id: "1sdadw", //(string, optional): ID ,
		//				minDiskSize: 50, //(integer, optional): 最小磁盘 ,
		//				mountPath: "/etc/sasd", //(string, optional): 挂载目录 ,
		//				usageType: 0, //(integer, optional): 云硬盘用途 0 主目录，1 数据文件， 2 日志，归档文件
		//			},
		//			{
		//				copyLevel: 1, //(integer, optional): 冗余级别 0 高，1 正常， 2 外部 ,
		//				diskGroup: "DATA", //(string, optional): 磁盘组名称 ,
		//				id: "sdfdsf", //(string, optional): ID ,
		//				minDiskSize: 30, //(integer, optional): 最小磁盘 ,
		//				mountPath: "/etc/wef", //(string, optional): 挂载目录 ,
		//				usageType: 2, //(integer, optional): 云硬盘用途 0 主目录，1 数据文件， 2 日志，归档文件
		//			},
		//			{
		//				copyLevel: 2, //(integer, optional): 冗余级别 0 高，1 正常， 2 外部 ,
		//				diskGroup: "ARCH", //(string, optional): 磁盘组名称 ,
		//				id: "sdfdsf", //(string, optional): ID ,
		//				minDiskSize: 30, //(integer, optional): 最小磁盘 ,
		//				mountPath: "/etc/reg", //(string, optional): 挂载目录 ,
		//				usageType: 3, //(integer, optional): 云硬盘用途 0 主目录，1 数据文件， 2 日志，归档文件
		//			},
		//			{
		//				copyLevel: 1, //(integer, optional): 冗余级别 0 高，1 正常， 2 外部 ,
		//				diskGroup: "ARCH", //(string, optional): 磁盘组名称 ,
		//				id: "sdfdsf", //(string, optional): ID ,
		//				minDiskSize: 30, //(integer, optional): 最小磁盘 ,
		//				mountPath: "/etc/nnm", //(string, optional): 挂载目录 ,
		//				usageType: 3, //(integer, optional): 云硬盘用途 0 主目录，1 数据文件， 2 日志，归档文件
		//			},
		//		],
		//		"attrList": [
		//			{
		//				"attrId": null,
		//				"attrCode": "STORAGETYPE",
		//				"attrDisplayName": "存储类型",
		//				"attrValueId": null,
		//				"attrValueCode": null,
		//				"attrDisplayValue": null,
		//				"attrValue": null,
		//				"valueType": 0,
		//				"valueUnit": null,
		//				"description": null
		//			},
		//			{
		//				"attrId": null,
		//				"attrCode": "ARCHMODE",
		//				"attrDisplayName": "归档模式",
		//				"attrValueId": null,
		//				"attrValueCode": null,
		//				"attrDisplayValue": null,
		//				"attrValue": null,
		//				"valueType": 0,
		//				"valueUnit": null,
		//				"description": null
		//			},
		//			{
		//				"attrId": null,
		//				"attrCode": "LISTENPOST",
		//				"attrDisplayName": "监听端口",
		//				"attrValueId": null,
		//				"attrValueCode": null,
		//				"attrDisplayValue": null,
		//				"attrValue": null,
		//				"valueType": 0,
		//				"valueUnit": null,
		//				"description": null
		//			},
		//			{
		//				"attrId": null,
		//				"attrCode": "DBCHARSET",
		//				"attrDisplayName": "数据库字符集",
		//				"attrValueId": null,
		//				"attrValueCode": null,
		//				"attrDisplayValue": null,
		//				"attrValue": null,
		//				"valueType": 0,
		//				"valueUnit": null,
		//				"description": null
		//			},
		//			{
		//				"attrId": null,
		//				"attrCode": "MAXCONNECTION",
		//				"attrDisplayName": "允许最大连接数",
		//				"attrValueId": null,
		//				"attrValueCode": null,
		//				"attrDisplayValue": null,
		//				"attrValue": null,
		//				"valueType": 0,
		//				"valueUnit": null,
		//				"description": null
		//			},
		//			{
		//				"attrId": null,
		//				"attrCode": "SYSPASSWORD",
		//				"attrDisplayName": "数据库系统用户（Sys、System）密码",
		//				"attrValueId": null,
		//				"attrValueCode": null,
		//				"attrDisplayValue": null,
		//				"attrValue": null,
		//				"valueType": 0,
		//				"valueUnit": null,
		//				"description": null
		//			},
		//			{
		//				"attrId": null,
		//				"attrCode": "ASMPASSWORD",
		//				"attrDisplayName": "ASM管理密码",
		//				"attrValueId": null,
		//				"attrValueCode": null,
		//				"attrDisplayValue": null,
		//				"attrValue": null,
		//				"valueType": 0,
		//				"valueUnit": null,
		//				"description": null
		//			},
		//			{
		//				"attrId": null,
		//				"attrCode": "MOUNTPATH",
		//				"attrDisplayName": "挂载目录",
		//				"attrValueId": null,
		//				"attrValueCode": null,
		//				"attrDisplayValue": null,
		//				"attrValue": null,
		//				"valueType": 0,
		//				"valueUnit": null,
		//				"description": null
		//			},
		//			{
		//				"attrId": null,
		//				"attrCode": "COPYLEVEL",
		//				"attrDisplayName": "冗余级别",
		//				"attrValueId": null,
		//				"attrValueCode": null,
		//				"attrDisplayValue": null,
		//				"attrValue": null,
		//				"valueType": 0,
		//				"valueUnit": null,
		//				"description": null
		//			},
		//			{
		//				"attrId": null,
		//				"attrCode": "USAGETYPE",
		//				"attrDisplayName": "磁盘组名称",
		//				"attrValueId": null,
		//				"attrValueCode": null,
		//				"attrDisplayValue": null,
		//				"attrValue": null,
		//				"valueType": 0,
		//				"valueUnit": null,
		//				"description": null
		//			},
		//			{
		//				"attrId": null,
		//				"attrCode": "COPYLEVEL",
		//				"attrDisplayName": "云硬盘用途",
		//				"attrValueId": null,
		//				"attrValueCode": null,
		//				"attrDisplayValue": null,
		//				"attrValue": null,
		//				"valueType": 0,
		//				"valueUnit": null,
		//				"description": null
		//			}
		//		]
		//	}
		// ])
	}


	archmode = this.dict.get({    //归档模式
		owner: "DB",
		field: "ARCHMODE"
	});

	dbcharset = this.dict.get({    //实例归属
		owner: "DB",
		field: "DBCHARSET"
	});

	diskusage = this.dict.get({    //数据库云硬盘用途
		owner: "DB",
		field: "DISKUSAGE"
	});

	copylevel = this.dict.get({    //数据库冗余级别
		owner: "DB",
		field: "COPYLEVEL"
	});

}
