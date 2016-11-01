import { Injectable } from '@angular/core';
import { RestApiCfg, RestApi } from '../../../../architecture';
import { RestApiModel } from '../../../../architecture/core/model/rest';
import { Status, EntEstItem, EntProdItem, EntEst, EntEstResourceQuota, ResourceQuota, EntEstBasicInfo } from '../model';
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

	//获取所有平台配额参考
	loadResourceQuotas(resourceQuotaPaging: Paging<ResourceQuota>, errorHandler: Function, comp:any)
	{
		let api = this.restApiCfg.getRestApi("ent-mng.ent-est-mng.platforms.quotas.get");

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
			, null
			, (source, target:ResourceQuota[])=>{
				for(let item of source)
				{
					let obj = new ResourceQuota();
					target.push(obj);

					obj.regionName = item.regionName;
					obj.platformVMQuota = item.vmQuota;
					obj.storageQuota = item.storageQuota;

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
	//加载企业配额信息
	loadEntResourceQuota(
		entResourceQuota: EntEstResourceQuota
		, errorHandler: Function
		, successHandler: ()=>void
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
			, "加载企业配额"
			, null
			, (source, target:EntEstResourceQuota[])=>{
				for(let item of source)
				{
					let obj = new EntEstResourceQuota();
					target.push(obj);

					obj.id = item.id as string;
					obj.enterpriseId = item.enterpriseId as string;
					obj.platformVMQuota = item.vmQuota; ////可创建云主机数量
					obj.physicalMachineQuota = 0; //可创建物理机数量,api暂不提供
					obj.storageQuota = item.storageQuota as number;//可用存储额度
					obj.snapQuota = item.snapshotQuota as number;//可创建快照数量
					obj.imageQuota = 0;//可创建镜像数量，api暂不提供
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
		,successHandler:()=>void
		,caller: any
		,entId:string)
	{
		console.log('loadEntInfo');
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
			}
			, (items:EntEstBasicInfo[])=>{
				let item = items[0];
				if(item)
				{
					entInfo.name = item.name;
					entInfo.description = item.description;
					entInfo.id = item.id;
				}
			},
			successHandler);
		
	}

	//加载企业产品信息
	loadEntProdItems(entProdItems: Paging<EntProdItem>
		,errorHandler:Function
		,caller: any
		,entId: string
		,successHandler:()=>void):void
	{
		let localParams:Array<any> = [
		{
			key:"_enterpriseId"
			,value:entId
		},
		{
			key:"_page"
			,value:entProdItems.currentPage == 0? 1:entProdItems.currentPage
		}
		,{
			key:"_size"
			,value:10
		}
		];

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
			,{
				"enterpriseId": entId,
				"platformId": null,
				"serviceId": null
			}
			);
	}

	//加载可用产品信息
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
		  "size": 10,
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
			imageQuota: entQuota.imageQuota,//可创建镜像数量
			networkQuota: 0, //界面上没有提供这个数据
			physicalQuota: entQuota.physicalMachineQuota,//可创建物理机数量
			snapShotQuota: entQuota.snapQuota,//可创建快照数量
			storageQuota: entQuota.storageQuota,//可用存储额度
			vmQuota: entQuota.platformVMQuota//可创建云主机数量
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
						items.totalPages = ret.pageInfo.totalPage || 100;
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

@Injectable()
export class ItemLoader<T>{
	private _name:string = "";//对象名称
	PageSize:number = 10;//每一页的数量
	private _items:Array<T> = [];
	TotalPages: number = 1;
	Api:RestApiModel = null;
	QureryParams:Array<any> = null;//query parameter
	PostParam:any = null;//传入PostParameter
	FakeDataFunc:(target:Array<T>)=>void;//传入假数据
	MapFunc:(source:Array<T>, target:Array<T>)=>void;//对服务器上的数据进行转换
	Trait:(target:Array<T>)=>void;//对组装好的数据进行处理
	private _pageName:string = "_page";
	private _sizeName:string = "_size";
	private _hasPaging:boolean = false;

	constructor(hasPaging:boolean
				,name:string
				,private restApiCfg:RestApiCfg
				,private restApi:RestApi)
	{
		this._hasPaging = hasPaging;
		this._name = name;
	}
	get Items():Array<T>{

		return this._items;
	}

	get FirstItem():T{
		return this._items[0];
	}

	loadArray<T>(source:any, target: T[])
	{
		if(target && source)
		{
			target.splice(0, target.length);

			if(typeof source === 'object' && typeof source.length === 'number')
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

	Go(pageNumber?:number, queryParams?:Array<any>, postParam?:any):Promise<any>{
		return new Promise((resolve, reject)=>{
			if(this.FakeDataFunc)
			{
				this.FakeDataFunc(this._items);
				resolve('FakeDataFunc');
				return;
			}


			this.setPageNumber(pageNumber);
			this.setQueryParams(queryParams);
			this.PostParam = postParam;

			this.restApi.request(this.Api.method, this.Api.url, this.QureryParams, undefined, this.PostParam)
			.then(ret=>{
				if(!ret)
				{
					reject("数据获取失败");
				}
				else{
					if(ret.resultContent)
					{
						//设置数据
						if(this.MapFunc)
						{
							if( (typeof ret.resultContent === 'object') && (typeof ret.resultContent.length === 'number'))
							{
								this.MapFunc(ret.resultContent, this._items);
							}
							else if(typeof ret.resultContent === 'object')
							{
								this.MapFunc([ret.resultContent], this._items);
							}
						}
						else
						{
							this.loadArray(ret.resultContent, this._items);
						}

						if(this.Trait)
						{
							this.Trait(this._items);
						}

						console.log(`${this._name}:分页信息`, ret.pageInfo);

						if(ret.pageInfo)
						{
							this.TotalPages = ret.pageInfo.totalPage || 100;
						}
						else
						{
							this.TotalPages = 1;
						}

						resolve(this._items);
					}
				}
			})
			.catch(err=>{

				console.log(`${this._name}加载错误:${this.Api.url}`, err);
				reject(`${this._name}数据加载错误`);
			});


		});
	}

	setQueryParams(queryParams: Array<any>):void
	{
		let self = this;
		let update:(obj:any)=>boolean=function(obj:any){
			let target:any = self.QureryParams.find(n=>n.key === obj.key);

			if(target)
			{
				target.value = obj.value;
				return true;
			}
			else{
				return false;
			}
		};

		if(queryParams)
		{
			this.QureryParams = this.QureryParams || [];
			if(typeof queryParams === 'object' && typeof queryParams.length === 'number')
			{
				for(let i = 0; i < queryParams.length; i++)
				{
					if(!update(queryParams[i]))
					{
						this.QureryParams.push(queryParams[i]);
					}
				}
			}
			else if(typeof queryParams === 'object')
			{
				update(queryParams);
			}
		}
	}

	setPageNumber(pageNumber:number):void
	{

		let localPageNumber: number = pageNumber;
		if(this._hasPaging)
		{
			localPageNumber = localPageNumber || 1;
		}
		if(localPageNumber)
		{
			if(localPageNumber > this.TotalPages)
			{
				localPageNumber = this.TotalPages;
			}
			this.QureryParams = this.QureryParams || [];
			
			//设置当前页
			let page = this.QureryParams.find(n=>n.key === this._pageName);
			if(page)
			{
				page.value = localPageNumber;
			}
			else{
				this.QureryParams.push({
					key:this._pageName
					,value:pageNumber
				});
			}

			//设置pageSize
			let pageSize = this.QureryParams.find(n=>n.key === this._sizeName);
			if(pageSize)
			{
				pageSize.value = this.PageSize;
			}
			else
			{
				this.QureryParams.push({
					key:this._sizeName
					,value:this.PageSize
				});
			}
			
		}
	}
}

export class Dic<T>{
	private _items: ItemLoader<SystemDictionary> = null;
	SourceName:string = "";
	TargetName:string = "";
	constructor(
		private restApiCfg:RestApiCfg
		,private restApi:RestApi
		,private _owner:string
		,private _field:string
		){
		this._items = new ItemLoader<SystemDictionary>(false, "数据字典", restApiCfg, restApi);
		this._items.Api = this.restApiCfg.getRestApi("sysdic.owner.field");
	}

	get Items():Array<SystemDictionary>{
		return this._items.Items;
	}

	Go():Promise<any>{
		return new Promise((resolve, reject)=>{
			this._items.Go(null, [{ key: "_owner", value: this._owner }, { key: "_field", value: this._field }])
			.then(success=>{
				resolve(success);
			},err=>{
				reject(err);
			})
		});
	}

	UpdateWithDic(items:Array<T>)
	{
		let getName =(id:string):string=>{
			let obj = this._items.Items.find(n=>n.value ==id) as SystemDictionary;

			if(obj)
				return obj.displayValue as string;
			else
				return id;
		};
		items.map(n=>{n[this.TargetName] = getName(n[this.SourceName]);});
	}
}