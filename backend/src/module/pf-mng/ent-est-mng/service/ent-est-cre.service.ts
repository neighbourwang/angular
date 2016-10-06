import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { EntEstBasicInfo } from '../model/ent-est-basic-info';
// import { RestApiCfg, RestApi } from '../../../../architecture';
import { CurrencyType } from "../model/currency";


@Injectable()
export class EntEstCreService{
	private cachedEntEstBasicInfo: EntEstBasicInfo;

	constructor(){}

	clearCache(){
		this.cachedEntEstBasicInfo = new EntEstBasicInfo();
	}

	loadEntEstBasicInfo(entEstBasicInfo: EntEstBasicInfo)
	{
		entEstBasicInfo.name = "hello";
	}

	loadCurrencyTypes(currencyTypes : CurrencyType[])
	{

	}
}