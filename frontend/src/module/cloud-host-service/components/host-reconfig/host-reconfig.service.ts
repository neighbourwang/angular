import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import { SerivceConfigChangeResp, ChangeOfferProfile } from './changeConfig.model';


@Injectable()
export class HostReconfigService {
	constructor(private http: Http,
		private restApiCfg: RestApiCfg,
		private dict: SystemDictionaryService,
		private restApi: RestApi) {
	}

	computeStatus = this.dict.get({    //获取状态列表
		owner: "COMPUTE",
		field: "STATUS"
	});

	submitConfig(instanceId: string, profile: ChangeOfferProfile): Promise<SerivceConfigChangeResp> {
		const api = this.restApiCfg.getRestApi("submit.vm.disk.config");

		let pathParams = [
			{
				key: 'instanceId',
				value: instanceId
			}
		];
		const request = this.restApi.request(api.method, api.url, pathParams, undefined, profile)
			.then(res => {
				if(res.resultCode !== "100"){
				    throw "";
				}
				return res.resultContent;
			});
		return request;
	}
	getConfig(instanceId: string, serviceType: string): Promise<SerivceConfigChangeResp> {
		const api = this.restApiCfg.getRestApi("change.vm.disk.config");

		let pathParams = [
			{
				key: 'instanceId',
				value: instanceId
			},
			{
				key: 'serviceType',
				value: serviceType
			}
		];
		const request = this.restApi.request(api.method, api.url, pathParams, undefined, undefined)
			.then(res => {
				if(res.resultCode !== "100"){
				    throw "";
				}
				return res.resultContent;
			});
		

		return request;
	}

	weekly = this.dict.get({  //计费周期
		owner: "PACKAGE_BILLING",
		field: "PERIOD_TYPE"
	});
}