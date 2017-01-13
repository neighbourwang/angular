import { Injectable } from '@angular/core';
import { RestApiCfg, RestApi } from '../../../../architecture';
import { RestApiModel } from '../../../../architecture/core/model/rest';
import { Status, EntEstItem, EntProdItem, EntEst
	, ResourceQuota
	, EntEstBasicInfo
	, EntEstCreResourceQuota } from '../model';
import { LayoutService, ValidationService, SystemDictionaryService, SystemDictionary } from '../../../../architecture';
import 'rxjs/add/operator/toPromise';
import * as _ from 'underscore';

@Injectable()
export class EntEstCreService{
	private static entEst : EntEst;
	private static statusCache : SystemDictionary[];

	constructor(
		private restApiCfg:RestApiCfg,
		private restApi:RestApi,
		private validation: ValidationService,
		private layoutService : LayoutService,
		private dicService : SystemDictionaryService
		){}

	initCache(){
		EntEstCreService.entEst = new EntEst();
	}

	getEntEst(){
		EntEstCreService.entEst = EntEstCreService.entEst || new EntEst();
		return EntEstCreService.entEst;
	}

	setArray<T>(source:any, target: T[])
	{
		if(target && source)
		{
			target.splice(0, target.length);

			if(typeof source === 'array')
			{
				for(let item of source)
				{
					target.push(item);
				}
			}
			else
			{
				target.push(source);
			}
		}
	}

	//获取所有平台配额参考
	loadResourceQuotas(resourceQuotaPaging: Paging<ResourceQuota>, errorHandler: Function, comp:any)
	{
		let api = this.restApiCfg.getRestApi("ent-mng.ent-est-mng.platforms.quotas.get");

		let params = [
			{
				key:"_page"
				,value: 1
			}
			,{
				key:"_size"
				,value:2000
			}
		];

		this.loadItems(
			resourceQuotaPaging
			,errorHandler
			,comp
			,api
			,params
			,"资源列表"
			, null
			, (source, target:ResourceQuota[])=>{
				for(let item of source)
				{

					let obj = new ResourceQuota();
					target.push(_.extendOwn(new ResourceQuota(), item));
				}
			});


	
	}

//加载企业认证信息
   	loadEntCertInfo(entCertInfo:EntEstBasicInfo
	   ,errorHandler:Function
	   ,successHandler:()=>void
	   ,caller:any
	   ,entId:string){
           let localParams:Array<any> = [
		{
			key:"_enterpriseId"
			,value:entId
		},
		{
			key:"_page"
			,value:1
		}
		,{
			key:"_size"
			,value:10
		}
		];

		let entCertInfos: Paging<EntEstBasicInfo> = new Paging<EntEstBasicInfo>();

		this.loadItems(entCertInfos
			, errorHandler
			, caller
			, this.restApiCfg.getRestApi("ent-mng.ent-est-mng.enterprise.resourcequota.get")
			, localParams
			, "加载企业认证"
			, null
			, (source, target:EntEstBasicInfo[])=>{
				for(let item of source)
				{
					let obj = new EntEstBasicInfo();
					target.push(obj);

					obj.id = item.id as string;
					obj.contactorName = item.contactorName;
					obj.certUrl = item.certUrl;
					obj.password = item.password;
				}
			}
			, (items:EntEstBasicInfo[])=>{
				let item = items[0];
				if(item)
				{
					entCertInfo.contactorName = item.contactorName;
					entCertInfo.certUrl = item.certUrl;
					entCertInfo.password = item.password;
				}
			},
			successHandler);
	   }

	//获取企业基本信息
	loadEntInfo(entInfo:EntEstBasicInfo
		,errorHandler:Function
		,successHandler:()=>void
		,caller: any
		,entId:string)
	{
		let pageItem:Paging<EntEstBasicInfo> = new Paging<EntEstBasicInfo>();

		this.loadItems(pageItem
			, errorHandler
			, caller
			, this.restApiCfg.getRestApi("ent-mng.ent-est-mng.enterprise.simple.get")
			, [{
				key:"_enterpriseId"
				,value:entId
			}]
			, "企业基本信息"
			, null
			, (source, target:EntEstBasicInfo[])=>{
				let obj = new EntEstBasicInfo();

				target.push(obj);

				obj.code = source.code;
				obj.id = source.id;
				obj.name = source.name;
				obj.contactorName = source.loginName;
				obj.description = source.description;
				obj.certMethod = parseInt(source.authMode);
				console.log("赋值前"+source.authMode+"赋值后："+obj.certMethod);
			}
			, (items:EntEstBasicInfo[])=>{
				let item = items[0];
				if(item)
				{
					entInfo.name = item.name;
					entInfo.description = item.description;
					entInfo.id = item.id;
					entInfo.certMethod = item.certMethod;
				}
			},
			successHandler);
		console.log("方法最后"+entInfo.certMethod);
	}

	//加载已选中企业产品信息
	loadEntProdItems(entProdItems: Paging<EntProdItem>
		,errorHandler:Function
		,caller: any
		,entId: string
		,successHandler:()=>void):void
	{
		let localParams:Array<any> = [{
			key:"enterpriseId"
			,value: entId
		}];

		let pageParameter = {
		  "currentPage": entProdItems.currentPage == 0? 0: entProdItems.currentPage,
		  "offset": 0,
		  "size": 5,
		  "sort": {},
		  "totalPage": 0
		};


		this.loadItems(entProdItems
			, errorHandler
			, caller
			, this.restApiCfg.getRestApi("ent-mng.ent-est-mng.enterprise.products.get")
			, localParams
			, "加载企业产品"
			, null
			, (source, target:EntProdItem[])=>{
				for(let item of source)
				{
					let obj = new EntProdItem();
					target.push(obj);

					//这里要做转换
					//界面上绑定的是EntProdItem模型，对应obj
					//从服务器上获取的数据是item
					//将item上的值映射到obj上面
					obj.id = item.id as string;
					obj.entId = item.enterpriseId as string;
					obj.name = item.name as string;
					obj.category = item.serviceName as string;
					obj.type = item.serviceType as string;
					obj.spec = item.serviceSpedification;
					obj.countCycle = item.billingCycle as string;
					obj.cyclePrice = item.recurringPrice as number;
					obj.oneTimePrice = item.basicPrice as number;
					obj.status = item.status;
					obj.description = item.description;
				}
			}
			,null
			,successHandler
			,pageParameter
			);
	}

	//加载未选中产品信息
	loadAvailProdItems(prodItems: Paging<EntProdItem>
		,errorHandler: Function
		,caller: any
		,entId: string
		,successHandler:()=>void):void
	{
		let localParams:Array<any> = [{
			key:"enterpriseId"
			,value: entId
		}];

		let pageParameter = {
		  "currentPage": prodItems.currentPage == 0? 1: prodItems.currentPage,
		  "offset": 0,
		  "size": 5,
		  "sort": {},
		  "totalPage": 0
		};

		this.loadItems(prodItems
			, errorHandler
			, caller
			, this.restApiCfg.getRestApi("ent-mng.ent-est-mng.enterprise.avail.products.get")
			, localParams
			, "加载产品"
			, null
			, (source, target:EntProdItem[])=>{
				for(let item of source)
				{
					let obj = new EntProdItem();
					target.push(obj);

					//这里要做转换
					//界面上绑定的是EntProdItem模型，对应obj
					//从服务器上获取的数据是item
					//将item上的值映射到obj上面		
					obj.id = item.id;		
					obj.name = item.name as string;
					obj.category = item.serviceName as string;
					obj.type = item.serviceType as string;
					obj.spec = item.serviceSpedification;
					obj.countCycle = item.billingCycle as string;
					obj.cyclePrice = item.recurringPrice as number;
					obj.oneTimePrice = item.onetimePrice as number;
					obj.status = item.status;
					obj.description = item.description;
				}
			}
			,null
			,successHandler
			,pageParameter
			);
	}





	//保存企业产品信息变更
	updateEntProducts(entProdItems: EntProdItem[], entId:string)
	{
		let api = this.restApiCfg.getRestApi("ent-mng.ent-est-mng.enterprise.products.update");

		let localParams = [{
			key:"enterpriseId"
			,value:entId
		}];
		let target:any = entProdItems.map(n=>n.id);

		return this.restApi.request(api.method, api.url, localParams, [], target);

	}
	

	validate(name:string, val:any, op:string)
	{
		let map:any = {
			"*":{
					"func":this.validation.isBlank
					,"msg":"不能为空"
				}
			,"email":{ 
				"func": val=>!this.validation.isEmail(val)
				,"msg": "邮箱地址无效"
			},"integer":{ 
				"func": val=>!this.validation.isInteger(val)
				,"msg": "不正确"
			}
		}

		if(map[op].func(val))
		{
			return name + map[op].msg;
		}
		else
			return undefined;
	}

	//企业开通
	enterpriseOpen(enterpriseId: string):Promise<any>{
		let api = this.restApiCfg.getRestApi("ent-mng.ent-est-mng.enterprise.open");

		let params = [
			{
				key:"_enterpriseId"
				,value:enterpriseId
			}
			,{
				key:"_status"
				,value:"1"
			}
		];

		return this.restApi.request(api.method, api.url, params, undefined, undefined);
	}

	//创建企业
	createEnterpise(entEst: EntEst):Promise<any>{
		let api = this.restApiCfg.getRestApi("ent-mng.ent-est-mng.enterprise.create");


    	let target:any = {
		"profile": {
			"authenticationMode": entEst.BasicInfo.certMethod,
			"code": "", //没有这个数据
			"description": entEst.BasicInfo.description,
			"id": null,
			"imageId": null,//图片功能放到sprint3处理
			"name": entEst.BasicInfo.name,
			"password": entEst.BasicInfo.password,
			"url": entEst.BasicInfo.certUrl,
			"userName": entEst.BasicInfo.contactorName
			//"isSSL": entEst.BasicInfo.isSSL, //是否进行SSL加密
			,"platformIdList": entEst.BasicInfo.platformIds
			,"adname": entEst.BasicInfo.adname
			,"adDescription": entEst.BasicInfo.adDescription
			,"loginProp": entEst.BasicInfo.loginProp//登录账户属性名称
		},
		"quotaList": {
			"enterpriseId":entEst.ResourceQuota.enterpriseId,
			"physicalMachineQuota":entEst.ResourceQuota.physicalQuota,
			"memQuota":entEst.ResourceQuota.memroyQuota * 1024,
			"floatIpQuota":entEst.ResourceQuota.floatIpQuota,
			"imageQuota":entEst.ResourceQuota.imageQuota,
			"snapShotQuota":entEst.ResourceQuota.snapShotQuota,
			"vcpuQuota":entEst.ResourceQuota.vcpuQuota,
			"storageQuota":entEst.ResourceQuota.storageQuota
		}
	};

		return this.restApi.request(api.method, api.url, [], [], target);
	}

	//修改企业配额
	updateEntQuota(entQuota:EntEstCreResourceQuota)
	{
		let api = this.restApiCfg.getRestApi("ent-mng.ent-est-mng.enterprise.updatequota");

		let localParams = [
		{
			key:"_enterpriseId"
			,value:entQuota.enterpriseId
		}
		];
		let params = {
			physicalMachineQuota:entQuota.physicalQuota,
			memQuota:entQuota.memroyQuota,
			floatIpQuota:entQuota.floatIpQuota,
			imageQuota:entQuota.imageQuota,
			snapShotQuota:entQuota.snapShotQuota,
			vcpuQuota:entQuota.vcpuQuota,
			storageQuota:entQuota.storageQuota
		}; 
 

		return this.restApi.request(api.method, api.url, localParams, [], params);
	}


	//更新企业信息
	updateEntInfo(entBasicInfo:EntEstBasicInfo)
	{
		let api = this.restApiCfg.getRestApi("ent-mng.ent-est-mng.enterprise.updatename");

		let localParams = [
		{
			key:"_enterpriseId"
			,value:entBasicInfo.id
		}
		]
		let target:any = {
			description: entBasicInfo.description,
			name: entBasicInfo.name
		};

		return this.restApi.request(api.method, api.url, localParams, [], target);
	}


	//更新企业状态：启用，禁用，删除
	//0: Initial; 1: Active; 2: Suspend; 3: Cancelled, 4: Deleted.

	updateEntStatus(entId:string, status:Status){
		let api = this.restApiCfg.getRestApi("ent-mng.ent-est-mng.enterprise.updatestatus");

		let localParams = [
		{
			key:"_enterpriseId"
			,value:entId
		}
		,{
			key:"_status"
			,value:status as number
		}
		]
		

		return this.restApi.request(api.method, api.url, localParams, [], null);

	}
	

	loadItems<T>(items: Paging<T>
		,errorHandler: Function
		,caller:any
		,api:RestApiModel
		,params:Array<any>
		,errorTitle:string = ""
		,fakeData?: Function
		,map?:Function
		,trait?: Function
		,successHandler?:()=>void
		,postParams?:any)
	{
		items.items.splice(0, items.items.length);

		if(fakeData && typeof fakeData === 'function')		
		{
			fakeData(items.items);
			return;
		}

		this.layoutService.show();

		this.restApi.request(api.method, api.url, params, undefined, postParams)
		.then(ret=>{
			this.layoutService.hide();
			if(!ret)
			{
				if(errorHandler)
				{
					errorHandler.call(caller, {"title":errorTitle, "desc":errorTitle + "数据获取失败"});
				}
			}
			else{
				if(ret.resultContent)
				{
					//设置数据
					if(map && typeof map === 'function')
					{
						map(ret.resultContent, items.items);
					}
					else
					{
						this.setArray(ret.resultContent, items.items);
					}

					if(trait && typeof trait === 'function')
					{
						trait(items.items);
					}

					console.log(errorTitle + "分页信息", ret.pageInfo);

					if(ret.pageInfo)
					{
						items.totalPages = ret.pageInfo.totalPage;
					}
					else
					{
						items.totalPages = 1;
					}

					if(successHandler)
					{
						successHandler.call(caller);
					}
				}
			}
		})
		.catch(err=>{
			this.layoutService.hide();

			console.log(errorTitle + '加载错误', err);
			if(errorHandler)
			{
				errorHandler.call(caller, {"title":errorTitle, "desc":"服务器上" + errorTitle + "数据获取失败"});
			}

		});
	}

	//测试AD信息
	testAD(entEst:EntEst): Promise<any> {
		let api = this.restApiCfg.getRestApi("user-center.attest-mng.ldap.test");
		const body = {
			"password": entEst.BasicInfo.password,
			"url": entEst.BasicInfo.certUrl,
			"userName": entEst.BasicInfo.contactorName
		};

		return this.restApi.request(api.method, api.url, null, null, body);
	}
}

export class Paging<T>{
	private pagingItems: T[] = []
	currentPage: number = 0;
	totalPages: number = 0;

	get items():T[]{
		return this.pagingItems;
	}
}
