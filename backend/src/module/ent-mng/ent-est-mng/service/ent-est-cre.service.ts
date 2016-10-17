import { Injectable } from '@angular/core';
import { RestApiCfg, RestApi } from '../../../../architecture';
import { RestApiModel } from '../../../../architecture/core/model/rest';
import { ResourceQuotaPaging, EntEstItem, CurrencyType, EntEst, EntEstResourceQuota, ResourceQuota, EntEstBasicInfo } from '../model';
import { LayoutService, ValidationService, SystemDictionaryService, SystemDictionary } from '../../../../architecture';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EntEstCreService{
	private static entEst : EntEst;
	private static statusCache : SystemDictionary[];
	private static cachedCurrencyTypes : CurrencyType[] = null;

	constructor(
		private restApiCfg:RestApiCfg,
		private restApi:RestApi,
		private validation: ValidationService,
		private layoutService : LayoutService,
		private dicService : SystemDictionaryService
		){}

	initCache(){
		EntEstCreService.entEst = new EntEst();
		
		EntEstCreService.cachedCurrencyTypes = null;
	}

	getEntEst(){
		EntEstCreService.entEst = EntEstCreService.entEst || new EntEst();
		return EntEstCreService.entEst;
	}

	setArray<T>(source:T[], target: T[])
	{
		if(target && source)
		{
			target.splice(0, target.length);

			for(let item of source)
			{
				target.push(item);
			}
		}
	}

	loadResourceQuotas(resourceQuotaPaging: ResourceQuotaPaging, errorHandler: Function, comp:any)
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

		this.layoutService.show();

		this.restApi.request(api.method, api.url, params, undefined, undefined)
		.then(ret=>{
			this.layoutService.hide();
			if(!ret)
			{
				if(errorHandler)
				{
					errorHandler.call(comp, {"title":"资源配额", "desc":"资源配额数据获取失败"});
				}
			}
			else{
				if(ret.resultContent)
				{
					this.setArray(ret.resultContent, resourceQuotaPaging.items);
					resourceQuotaPaging.items.map(n=>{
						n.added = false;
						n.checked = false;
					});

					console.log("资源配额分页信息", ret.pageInfo);

					resourceQuotaPaging.totalPages = ret.pageInfo.totalPage;

				}
			}
		})
		.catch(err=>{
			this.layoutService.hide();

			console.log('资源配额加载错误', err);
			if(errorHandler)
			{
				errorHandler.call(comp, {"title":"资源配额", "desc":"服务器上资源配额数据获取失败"})
			}
		});
	}

	loadEntEstItems(entEstMng: Paging<EntEstItem>
		, errorHandler: Function
		, comp:any)
	{
		let api = this.restApiCfg.getRestApi("ent-mng.ent-est-mng.enterprise.get");


		let params = [
			{
				key:"_page"
				,value: entEstMng.currentPage == 0 ? 1 : entEstMng.currentPage
			}
			,{
				key:"_size"
				,value:10
			}
		];

		this.loadItems(entEstMng
			, errorHandler
			, comp
			, api
			, params
			, "企业管理"
			, (items:EntEstItem[])=>{
			items.map(n=>{n.checked = false;});
		});
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

	//创建企业基本信息
	createEnterpise():Promise<any>{
		let api = this.restApiCfg.getRestApi("ent-mng.ent-est-mng.enterprise.create");

		return this.restApi.request(api.method, api.url, [], [], EntEstCreService.entEst.BasicInfo);
	}

	//提交企业配额信息
	createEntResourceQuota(enterpriseId: string):Promise<any>{
		let api = this.restApiCfg.getRestApi("ent-mng.ent-est-mng.resourcequota.create");

		let params = [
			{
				key:"_enterpriseId"
				,value:enterpriseId
			}
		];

		EntEstCreService.entEst.ResourceQuotas.map(n=>{n.enterpriseId = enterpriseId;});

		return this.restApi.request(api.method, api.url, params, undefined, EntEstCreService.entEst.ResourceQuotas);
	}


	

	loadItems<T>(items: Paging<T>
		,errorHandler: Function
		,caller:any
		,api:RestApiModel
		,params:Array<any>
		,errorTitle:string
		,trait: Function)
	{
		

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
					this.setArray(ret.resultContent, items.items);

					if(trait && typeof trait === 'function')
					{
						trait(items.items);
					}

					console.log(errorTitle + "分页信息", ret.pageInfo);

					items.totalPages = ret.pageInfo.totalPage;

				}
			}
		})
		.catch(err=>{
			this.layoutService.hide();

			console.log('资源配额加载错误', err);
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
