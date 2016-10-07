import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { EntEstBasicInfo } from '../model/ent-est-basic-info';
import { ResourceQuota } from '../model/resourcequota';
// import { RestApiCfg, RestApi } from '../../../../architecture';
import { CurrencyType } from "../model/currency";
import { RestApiCfg, RestApi } from '../../../../architecture';

const apiIp: string = '15.114.100.54';
const apiPort: string = '9105';

@Injectable()
export class EntEstCreService{
	private cachedEntEstBasicInfo: EntEstBasicInfo;
	private cachedCurrencyTypes : CurrencyType[];
	private cachedResourceQuotas : ResourceQuota[];

	constructor(
		private restApiCfg:RestApiCfg,
		private restApi:RestApi
		){}

	clearCache(){
		this.cachedEntEstBasicInfo = new EntEstBasicInfo();
	}

	loadEntEstBasicInfo(entEstBasicInfo: EntEstBasicInfo)
	{
		entEstBasicInfo.name = "hello";
	}

	loadCurrencyTypes(currencyTypes : CurrencyType[], errorHandler : Function)
	{
		if(this.cachedCurrencyTypes)
		{
			this.setArray(this.cachedCurrencyTypes, currencyTypes);
			return;
		}


		let url = "http://15.114.100.58:9000/marketplace/authsec/sysdic/ACCOUNT/CURRENCY";
		// let url = this.restApiCfg.getRestApiUrl('pf-mng.ent-est-mng.currencytypes.get', apiIp, apiPort);

		this.restApi.get(url, [], undefined, undefined)
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

		let url = "http://15.114.100.58:9000/marketplace/authsec/sysdic/ACCOUNT/CURRENCY";
		// let url = this.restApiCfg.getRestApiUrl('pf-mng.ent-est-mng.currencytypes.get', apiIp, apiPort);

		this.restApi.get(url, [], undefined, undefined)
		.then(ret=>{
			if(!ret)
			{
				if(errorHandler)
				{
					errorHandler({"title":"资源配额", "desc":"资源配额数据获取失败"});
				}
			}
			else{
				if(ret.resultContent)
				{
					this.cachedResourceQuotas = ret.resultContent;
					this.setArray(this.cachedResourceQuotas, resourceQuotas);
				}
			}
		})
		.catch(err=>{
			console.log('资源配额加载错误', err);
			if(errorHandler)
			{
				errorHandler({"title":"资源配额", "desc":"服务器上资源配额数据获取失败"})
			}
		});
	}
}