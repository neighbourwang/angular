import { Injectable } from '@angular/core';
import { RestApiCfg, RestApi } from '../../../../architecture';
import { RestApiModel } from '../../../../architecture/core/model/rest';
import { EntEstItem, EntProdItem, EntEst, EntEstResourceQuota, ResourceQuota, EntEstBasicInfo } from '../model';
import { LayoutService, ValidationService, SystemDictionaryService, SystemDictionary } from '../../../../architecture';
import 'rxjs/add/operator/toPromise';

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

	loadResourceQuotas(resourceQuotaPaging: Paging<ResourceQuota>, errorHandler: Function, comp:any)
	{
		let api = this.restApiCfg.getRestApi("ent-mng.ent-est-mng.resourcequota.get");

		let params = [
			{
				key:"_page"
				,value: resourceQuotaPaging.currentPage == 0 ? 1 : resourceQuotaPaging.currentPage
			}
			,{
				key:"_size"
				,value:10
			}
		];

		this.loadItems(
			resourceQuotaPaging
			,errorHandler
			,comp
			,api
			,params
			,"资源列表"
			,(items:ResourceQuota[])=>{
				let item = new ResourceQuota();
				item.regionName = "测试区域";
				items.push(item);
			});

	
	}

	//企业信息列表
	loadEntEstItems(entEstMng: Paging<EntEstItem>
		, errorHandler: Function
		, caller:any
		, criteria: string = ""
		, successHanlder: Function)
	{

		let localParams:Array<any> = [
				{
					key:"_page"
					,value: entEstMng.currentPage == 0 ? 1 : entEstMng.currentPage
				}
				,{
					key:"_size"
					,value:10
				}
			];

		if(criteria.length > 0)
		{
			localParams.push({
				key:"name"
				,value:criteria
			});
		}

		this.loadItems(entEstMng
			, errorHandler
			, caller
			, this.restApiCfg.getRestApi("ent-mng.ent-est-mng.enterprise.get")
			, localParams
			, "企业管理"
			, null
			, (source, target:EntEstItem[])=>{
				for(let item of source)
				{
					let obj = new EntEstItem();
					target.push(obj);

					obj.id = item.enterpriseId as string; 
					obj.enterpriseName = item.enterpriseName as string; 
					obj.vmNum = 0; //api 未提供
					obj.vmQuota = 0; //api 未提供
					obj.vmQuotaUsageRate = 0; //api 未提供
					obj.storageQuota = item.storageQuota as number; 
					obj.storageQuotaUsageRate = item.storageQuota != 0 ? item.usedStorageNumber/item.storageQuota:0;
					obj.snapQuota = item.snapshotQuota as number; 
					obj.productNum = item.productNumber as number; 
					obj.orderNum = item.orderNumber as number; 
					obj.status = item.status as string; 
					obj.description = ""; //api 未提供

				}
			}
			, (items:EntEstItem[])=>{
			items.map(n=>{n.checked = false;});
		},
		successHanlder);
	}

	//加载企业配额信息
	loadEntResourceQuota(
		entResourceQuota: EntEstResourceQuota
		, errorHandler: Function
		, successHandler: Function
		, caller: any
		, entId:string){

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

		let entResourceQuotas: Paging<EntEstResourceQuota> = new Paging<EntEstResourceQuota>();

		this.loadItems(entResourceQuotas
			, errorHandler
			, caller
			, this.restApiCfg.getRestApi("ent-mng.ent-est-mng.enterprise.resourcequota.get")
			, localParams
			, "加载企业配额数据"
			, null
			, (source, target:EntEstResourceQuota[])=>{
				for(let item of source)
				{
					let obj = new EntEstResourceQuota();
					target.push(obj);

					obj.id = item.id as string;
					obj.enterpriseId = item.enterpriseId as string;
					obj.platformVMQuota = 0; //api上面暂时无数据
					obj.physicalMachineQuota = 0; //api上面暂时无数据
					obj.storageQuota = item.storageQuota as number;
					obj.snapQuota = item.snapshotQuota as number;
					obj.imageQuota = item.vmQuota as number;
				}
			}
			, (items:EntEstResourceQuota[])=>{
				let item = items[0];
				if(item)
				{
					entResourceQuota.enterpriseId = item.enterpriseId;
					entResourceQuota.platformVMQuota = item.platformVMQuota;
					entResourceQuota.physicalMachineQuota = item.physicalMachineQuota;
					entResourceQuota.storageQuota = item.storageQuota;
					entResourceQuota.snapQuota = item.snapQuota;
					entResourceQuota.imageQuota = item.imageQuota;
				}
			},
			successHandler);

	}

	//获取企业基本信息
	loadEntInfo(entInfo:EntEstBasicInfo
		,errorHandler:Function
		,successHandler:Function
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
				obj.description = source.description;
			}
			, null,
			successHandler);
		
	}

	//加载企业产品信息
	loadEntProdItems(entProdItems: Paging<EntProdItem>
		,errorHandler:Function
		,caller: any
		,entId: string):void
	{

	}

	//加载可用产品信息
	loadAvailProdItems(prodItems: Paging<EntProdItem>
		,errorHandler: Function
		,caller: any):void
	{

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
			"userName": entEst.BasicInfo.contactorName,
		},
		"quotaList": {
			"enterpriseId": null,
			"id": null,
			"imageQuota": entEst.ResourceQuota.imageQuota,
			"networkQuota": 0, //界面没有提供这个数据
			"physicalQuota": entEst.ResourceQuota.physicalMachineQuota,
			"snapShotQuota": entEst.ResourceQuota.snapQuota,
			"storageQuota": entEst.ResourceQuota.storageQuota,
			"vmQuota": entEst.ResourceQuota.platformVMQuota
		}
	};

		return this.restApi.request(api.method, api.url, [], [], target);
	}

	//修改企业配额
	updateEntQuota(entQuota:EntEstResourceQuota)
	{
		let api = this.restApiCfg.getRestApi("ent-mng.ent-est-mng.enterprise.updatequota");

		let localParams = [
		{
			key:"_enterpriseId"
			,value:entQuota.enterpriseId
		}
		]
		let target:any = {
			enterpriseId: entQuota.enterpriseId,
			id: entQuota.id,
			imageQuota: entQuota.imageQuota,
			networkQuota: 0, //界面上没有提供这个数据
			physicalQuota: entQuota.physicalMachineQuota,
			snapShotQuota: entQuota.snapQuota,
			storageQuota: entQuota.storageQuota,
			vmQuota: entQuota.platformVMQuota
		};

		return this.restApi.request(api.method, api.url, localParams, [], target);
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

	//更新企业认证信息
	updateEntCert(entBasicInfo:EntEstBasicInfo){
		let api = this.restApiCfg.getRestApi("ent-mng.ent-est-mng.enterprise.updateauth");

		let localParams = [
		{
			key:"_enterpriseId"
			,value:entBasicInfo.id
		}
		]
		let target:any = {
			"authMode": null,//前台未提供
			"id": entBasicInfo.id,
			"password": entBasicInfo.password,
			"url": entBasicInfo.certUrl,
			"userName": entBasicInfo.contactorName
		};

		return this.restApi.request(api.method, api.url, localParams, [], target);

	}

	//更新企业状态：启用，禁用，删除
	//0: Initial; 1: Active; 2: Suspend; 3: Cancelled, 4: Deleted.

	updateEntStatus(entId:string, status:number){
		let api = this.restApiCfg.getRestApi("ent-mng.ent-est-mng.enterprise.updatestatus");

		let localParams = [
		{
			key:"_enterpriseId"
			,value:entId
		}
		,{
			key:"_status"
			,value:status
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
		,successHandler?:Function)
	{
		items.items.splice(0, items.items.length);

		if(fakeData && typeof fakeData === 'function')		
		{
			fakeData(items.items);
			return;
		}

		this.layoutService.show();

		this.restApi.request(api.method, api.url, params, undefined, undefined)
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
}

export class Paging<T>{
	private pagingItems: T[] = []
	currentPage: number = 0;
	totalPages: number = 0;

	get items():T[]{
		return this.pagingItems;
	}
}
