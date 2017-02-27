import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../architecture';

import { EnterpriseQuotaDetailResp, OrganizationExtItem } from '../model/enterpriseQuotaDetailResp';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MngConsoleService {
	constructor(private http: Http,
		private restApiCfg: RestApiCfg,
		private dict: SystemDictionaryService,
		private restApi: RestApi) {
	}

	getUserInfo = this.restApi.getLoginInfo().userInfo;
	
	getQuotaResoure() : Promise<EnterpriseQuotaDetailResp> {
		let api = this.restApiCfg.getRestApi('user-center.org-mng.resource.get');

		let pathParams = [{
			key: 'id',
            value: this.getUserInfo.organizationId
		}];

		const request = this.restApi.request(api.method, api.url, pathParams, undefined, undefined)
							.then(res => {
								if(res.resultCode !== "100"){
									throw "";
								}
								return res.resultContent;
							});

		return request;
	};
	getConsoleInfo() : Promise<OrganizationExtItem> {
		let api = this.restApiCfg.getRestApi('mng-console-info');

		let pathParams = [{
			key: 'organizationId',
            value: this.getUserInfo.organizationId
		}];

		const request = this.restApi.request(api.method, api.url, pathParams, undefined, undefined)
							.then(res => {
								if(res.resultCode !== "100"){
									throw "";
								}
								return res.resultContent;
							});

		return request;
	};

};
