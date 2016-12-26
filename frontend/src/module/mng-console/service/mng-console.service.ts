import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../architecture';

import { EnterpriseQuotaDetailResp } from '../model/enterpriseQuotaDetailResp';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MngConsoleService {
	constructor(private http: Http,
		private restApiCfg: RestApiCfg,
		private dict: SystemDictionaryService,
		private restApi: RestApi) {
	}

	getUserInfo = this.restApi.getLoginInfo().userInfo;
	
	getEntResoure() : Promise<EnterpriseQuotaDetailResp[]> {
		let api = this.restApiCfg.getRestApi('user-center.org-mng.currEntResoure.get');

		let pathParams = [{
			key: 'id',
            value: this.getUserInfo.enterpriseId
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
	getQuotaResoure() : Promise<EnterpriseQuotaDetailResp[]> {
		let api = this.restApiCfg.getRestApi('user-center.org-mng.currEntResoure.get');

		let pathParams = [{
			key: 'id',
            value: this.getUserInfo.enterpriseId
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

    getHostList(quiry) : Promise<any>{
        const api = this.restApiCfg.getRestApi("vm.search.page");
        return this.restApi.request(api.method, api.url, undefined, undefined, quiry)
        			.then(res => {
								if(res.resultCode !== "100"){
									throw "";
								}
								return res.resultContent;
							});
    }
    getDistList(quiry) : Promise<any>{
        const api = this.restApiCfg.getRestApi("disk.search.page");
        return this.restApi.request(api.method, api.url, undefined, undefined, quiry)
        			.then(res => {
								if(res.resultCode !== "100"){
									throw "";
								}
								return res.resultContent;
							});
    }
};
