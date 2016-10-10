import { Injectable } from '@angular/core';
import { EntEstBasicInfo } from '../model/ent-est-basic-info';
import { ResourceQuota } from '../model/resourcequota';
import { EntEstResourceQuota } from "../model/ent-est-resourcequota";
import { EntEst } from '../model/ent-est';
import { CurrencyType } from "../model/currency";
import { RestApiCfg, RestApi } from '../../../../architecture';
import { EntEstItem } from '../model/ent-est-item';
import { EntEstMng } from '../model/ent-est-mng';
import { ResourceQuotaPaging } from '../model/resourcequota-paging';
import { LayoutService, ValidationService } from '../../../../architecture';
import 'rxjs/add/operator/toPromise';

const apiIp: string = '15.114.100.54';
const apiPort: string = '9105';

@Injectable()
export class EntEstCreService{
	private static entEst : EntEst;
	private static cachedCurrencyTypes : CurrencyType[];

	constructor(
		private restApiCfg:RestApiCfg,
		private restApi:RestApi,
		private validation: ValidationService,
		private layoutService : LayoutService
		){}

	initCache(){
		EntEstCreService.entEst = new EntEst();
		
		EntEstCreService.cachedCurrencyTypes = null;
	}

	getEntEst(){
		EntEstCreService.entEst = EntEstCreService.entEst || new EntEst();
		return EntEstCreService.entEst;
	}

	loadCurrencyTypes(currencyTypes : CurrencyType[], errorHandler : Function, comp:any)
	{
		if(EntEstCreService.cachedCurrencyTypes)
		{
			this.setArray(EntEstCreService.cachedCurrencyTypes, currencyTypes);
			return;
		}


		let url = "http://15.114.100.58:9000/marketplace/authsec/sysdic/ACCOUNT/CURRENCY_TYPE";
		// let url = this.restApiCfg.getRestApiUrl('pf-mng.ent-est-mng.currencytypes.get', apiIp, apiPort);
		this.layoutService.show();
		this.restApi.request('get', url, [], undefined, undefined)
		.then(ret=>{
			this.layoutService.hide();

			if(!ret)
			{
				if(errorHandler)
				{
					errorHandler.call(comp, {"title":"货币类型", "desc":"货币类型数据获取失败"});
				}
			}
			else{
				if(ret.resultContent)
				{
					EntEstCreService.cachedCurrencyTypes = ret.resultContent;
					this.setArray(EntEstCreService.cachedCurrencyTypes, currencyTypes);
				}
			}
		})
		.catch(err=>{
			this.layoutService.hide();
			console.log('货币类型加载错误', err);
			if(errorHandler)
			{
				errorHandler.call(comp, {"title":"货币类型", "desc":"服务器上货币类型数据获取失败"})
			}
		});
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
		let api = this.restApiCfg.getRestApi("ent-mng.ent-est-mng.resourcequota.get", apiIp, apiPort);

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

	loadEntEstItems(entEstMng: EntEstMng, errorHandler: Function, comp:any)
	{
		let api = this.restApiCfg.getRestApi("ent-mng.ent-est-mng.enterprise.get", apiIp, apiPort);


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
		
		this.layoutService.show();

		this.restApi.request(api.method, api.url, params, undefined, undefined)
		.then(ret=>{
			this.layoutService.hide();

			if(!ret)
			{
				if(errorHandler)
				{
					errorHandler.call(comp, {"title":"企业开通信息", "desc":"企业开通信息数据获取失败"});
				}
			}
			else{
				if(ret.resultContent)
				{
					console.log('ret.resultContent is', ret.resultContent, 'ret is', ret);
					this.setArray(ret.resultContent, entEstMng.items);
					entEstMng.items.map(n=>{n.checked = false;});

					entEstMng.totalPages = ret.pageInfo.totalPage;
					console.log('企业开通信息概览分页数据', ret.pageInfo);
				}
			}
		})
		.catch(err=>{
			this.layoutService.hide();

			console.log('企业开通信息加载错误', err);
			if(errorHandler)
			{
				errorHandler.call(comp, {"title":"企业开通信息", "desc":"服务器上企业开通信息数据获取失败"});
			}
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
		let api = this.restApiCfg.getRestApi("ent-mng.ent-est-mng.enterprise.open", apiIp, apiPort);

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
		let api = this.restApiCfg.getRestApi("ent-mng.ent-est-mng.enterprise.create", apiIp, apiPort);

		return this.restApi.request(api.method, api.url, [], [], EntEstCreService.entEst.BasicInfo);
	}

	//提交企业配额信息
	createEntResourceQuota(enterpriseId: string):Promise<any>{
		let api = this.restApiCfg.getRestApi("ent-mng.ent-est-mng.resourcequota.create", apiIp, apiPort);

		let params = [
			{
				key:"_enterpriseId"
				,value:enterpriseId
			}
		];

		EntEstCreService.entEst.ResourceQuotas.map(n=>{n.enterpriseId = enterpriseId;});

		return this.restApi.request(api.method, api.url, params, undefined, EntEstCreService.entEst.ResourceQuotas);
	}


}