import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { EntEstBasicInfo } from '../model/ent-est-basic-info';
import { ResourceQuota } from '../model/resourcequota';
import { EntEstResourceQuota } from "../model/ent-est-resourcequota";
import { EntEst } from '../model/ent-est';
// import { RestApiCfg, RestApi } from '../../../../architecture';
import { CurrencyType } from "../model/currency";
import { RestApiCfg, RestApi } from '../../../../architecture';
import { EntEstItem } from '../model/ent-est-item';

const apiIp: string = '15.114.100.54';
const apiPort: string = '9105';

@Injectable()
export class EntEstCreService{
	private static entEst : EntEst;
	private cachedCurrencyTypes : CurrencyType[];
	private cachedResourceQuotas : ResourceQuota[];

	constructor(
		private restApiCfg:RestApiCfg,
		private restApi:RestApi
		){}

	clearCache(){
		EntEstCreService.entEst = new EntEst();
	}

	getEntEst(){
		EntEstCreService.entEst = EntEstCreService.entEst || new EntEst();
		return EntEstCreService.entEst;
	}

	loadCurrencyTypes(currencyTypes : CurrencyType[], errorHandler : Function)
	{
		if(this.cachedCurrencyTypes)
		{
			this.setArray(this.cachedCurrencyTypes, currencyTypes);
			return;
		}


		let url = "http://15.114.100.58:9000/marketplace/authsec/sysdic/ACCOUNT/CURRENCY_TYPE";
		// let url = this.restApiCfg.getRestApiUrl('pf-mng.ent-est-mng.currencytypes.get', apiIp, apiPort);

		this.restApi.request('get', url, [], undefined, undefined)
		.then(ret=>{
			if(!ret)
			{
				if(errorHandler)
				{
					errorHandler({"title":"货币类型", "desc":"货币类型数据获取失败"});
				}
			}
			else{
				if(ret.resultContent)
				{
					this.cachedCurrencyTypes = ret.resultContent;
					this.setArray(this.cachedCurrencyTypes, currencyTypes);
				}
			}
		})
		.catch(err=>{
			console.log('货币类型加载错误', err);
			if(errorHandler)
			{
				errorHandler({"title":"货币类型", "desc":"服务器上货币类型数据获取失败"})
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

	loadResourceQuotas(resourceQuotas: ResourceQuota[], errorHandler: Function)
	{
		if(this.cachedResourceQuotas)
		{
			this.setArray(this.cachedResourceQuotas, resourceQuotas);
			return;
		}

		let quota = new ResourceQuota();
		quota.description = "测试数据";
		quota.id = "1";
		quota.regionName = "重庆";

		resourceQuotas.splice(0, resourceQuotas.length);
		resourceQuotas.push(quota);

		return;

		// let url = "http://15.114.100.58:9000/adminui/authsec/platform/page/1/size/10";
		// let url = this.restApiCfg.getRestApiUrl('pf-mng.ent-est-mng.currencytypes.get', apiIp, apiPort);

		// this.restApi.request('get', url, [], undefined, undefined)
		// .then(ret=>{
		// 	if(!ret)
		// 	{
		// 		if(errorHandler)
		// 		{
		// 			errorHandler({"title":"资源配额", "desc":"资源配额数据获取失败"});
		// 		}
		// 	}
		// 	else{
		// 		if(ret.resultContent)
		// 		{
		// 			this.cachedResourceQuotas = ret.resultContent;
		// 			this.setArray(this.cachedResourceQuotas, resourceQuotas);
		// 		}
		// 	}
		// })
		// .catch(err=>{
		// 	console.log('资源配额加载错误', err);
		// 	if(errorHandler)
		// 	{
		// 		errorHandler({"title":"资源配额", "desc":"服务器上资源配额数据获取失败"})
		// 	}
		// });
	}

	loadEntEstItems(entEstItems: EntEstItem[], errorHandler: Function)
	{
		let url = "http://15.114.100.58:9000/adminui/authsec/platform/page/1/size/10";

		this.restApi.request('get', url, [], undefined, undefined)
		.then(ret=>{
			if(!ret)
			{
				if(errorHandler)
				{
					errorHandler({"title":"企业开通信息", "desc":"企业开通信息数据获取失败"});
				}
			}
			else{
				if(ret.resultContent)
				{
					this.setArray(ret.resultContent, entEstItems);
				}
			}
		})
		.catch(err=>{
			console.log('企业开通信息加载错误', err);
			if(errorHandler)
			{
				errorHandler({"title":"企业开通信息", "desc":"服务器上企业开通信息数据获取失败"})
			}
		});




	}
}