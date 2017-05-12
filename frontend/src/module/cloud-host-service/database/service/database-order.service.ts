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
		// return request;
		return Promise.resolve([
			{
				"id": "8325A84F-3A8A-47CE-B288-7A5037604B8B",
				"name": "db1",
				"version": "12C-12R2",
				"os": "linux",
				"bit": "64 bit",
				"cpu": 2,
				"memory": 36,
				"bootStorageSize": 50,
				"storageType": "1",
				"createTime": 1493852013000,
				"updateTime": 1494493232000,
				"dbType": 0,
				"desc": null,
				"status": 1,
				"templateTpye": null,
				"deploymentMode": 0,
				"diskInfoList": [
					{
						copyLevel: 0, //(integer, optional): 冗余级别 0 高，1 正常， 2 外部 ,
						diskGroup: "DB", //(string, optional): 磁盘组名称 ,
						id: "1sdadw", //(string, optional): ID ,
						minDiskSize: 50, //(integer, optional): 最小磁盘 ,
						mountPath: "/etc/uc", //(string, optional): 挂载目录 ,
						templateType: "FS",
						usageType: 0, //(integer, optional): 云硬盘用途 0 主目录，1 数据文件， 2 日志，归档文件
					},
					{
						copyLevel: 1, //(integer, optional): 冗余级别 0 高，1 正常， 2 外部 ,
						diskGroup: "DATA", //(string, optional): 磁盘组名称 ,
						id: "sdfdsf", //(string, optional): ID ,
						minDiskSize: 30, //(integer, optional): 最小磁盘 ,
						mountPath: "/etc/nnm", //(string, optional): 挂载目录 ,
						templateType: "FS",
						usageType: 2, //(integer, optional): 云硬盘用途 0 主目录，1 数据文件， 2 日志，归档文件
					},
					{
						copyLevel: 2, //(integer, optional): 冗余级别 0 高，1 正常， 2 外部 ,
						diskGroup: "ARCH", //(string, optional): 磁盘组名称 ,
						id: "sdfdsf", //(string, optional): ID ,
						minDiskSize: 30, //(integer, optional): 最小磁盘 ,
						mountPath: "/etc/nnm", //(string, optional): 挂载目录 ,
						templateType: "FS",
						usageType: 3, //(integer, optional): 云硬盘用途 0 主目录，1 数据文件， 2 日志，归档文件
					},
					{
						copyLevel: 0, //(integer, optional): 冗余级别 0 高，1 正常， 2 外部 ,
						diskGroup: "DB", //(string, optional): 磁盘组名称 ,
						id: "1sdadw", //(string, optional): ID ,
						minDiskSize: 50, //(integer, optional): 最小磁盘 ,
						mountPath: "/etc/uc", //(string, optional): 挂载目录 ,
						templateType: "ASM",
						usageType: 0, //(integer, optional): 云硬盘用途 0 主目录，1 数据文件， 2 日志，归档文件
					},
					{
						copyLevel: 1, //(integer, optional): 冗余级别 0 高，1 正常， 2 外部 ,
						diskGroup: "DATA", //(string, optional): 磁盘组名称 ,
						id: "sdfdsf", //(string, optional): ID ,
						minDiskSize: 30, //(integer, optional): 最小磁盘 ,
						mountPath: "/etc/nnm", //(string, optional): 挂载目录 ,
						templateType: "ASM",
						usageType: 2, //(integer, optional): 云硬盘用途 0 主目录，1 数据文件， 2 日志，归档文件
					},
					{
						copyLevel: 2, //(integer, optional): 冗余级别 0 高，1 正常， 2 外部 ,
						diskGroup: "ARCH", //(string, optional): 磁盘组名称 ,
						id: "sdfdsf", //(string, optional): ID ,
						minDiskSize: 30, //(integer, optional): 最小磁盘 ,
						mountPath: "/etc/nnm", //(string, optional): 挂载目录 ,
						templateType: "ASM",
						usageType: 3, //(integer, optional): 云硬盘用途 0 主目录，1 数据文件， 2 日志，归档文件
					},
					{
						copyLevel: 1, //(integer, optional): 冗余级别 0 高，1 正常， 2 外部 ,
						diskGroup: "ARCH", //(string, optional): 磁盘组名称 ,
						id: "sdfdsf", //(string, optional): ID ,
						minDiskSize: 30, //(integer, optional): 最小磁盘 ,
						mountPath: "/etc/nnm", //(string, optional): 挂载目录 ,
						templateType: "ASM",
						usageType: 3, //(integer, optional): 云硬盘用途 0 主目录，1 数据文件， 2 日志，归档文件
					},
				]
			}
		])
	}
}
