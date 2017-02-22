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

	submitConfig(instanceId: string, profile: ChangeOfferProfile): Promise<any> {
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

		// const request = new Promise(next => {
		// 	setTimeout(()=>{
		// 		next({"resultCode":"100","detailDescription":null,"resultContent":{"productId":"ad6be768-7cb9-496d-94d1-2d63ab702c5d","instanceId":"23929278-e077-4140-925e-d2c20ccc9466","serviceId":null,"serviceType":0,"serviceSkuId":0,"platformId":"060b3c71-7bbf-479c-a189-bfafa6f9b825","zoneId":"d9639dad-7a8e-41b9-96d5-08a299f81dda","serivceConfigChangeVMitem":{"oldcpu":1,"oldmem":512,"bootSize":20,"attrList":[{"attrId":"de22a1e3-a0f7-11e6-a18b-0050568a49fd","attrCode":"MEM","attrDisplayName":"内存","skuFlag":null,"valueType":0,"mandatory":0,"relyType":1,"relyAttrId":"de22a07b-a0f7-11e6-a18b-0050568a49fd","valueList":null,"mapValueList":{"5fe1665f-3179-4374-b380-e648db3d8d00":[{"attrValueId":"b056ad4c-431a-4aaf-8038-123214902e00","attrValueCode":"512MB","attrDisplayValue":"512MB","attrValue":"512"}]}},{"attrId":"de229b8e-a0f7-11e6-a18b-0050568a49fd","attrCode":"ZONE","attrDisplayName":"可用区","skuFlag":null,"valueType":1,"mandatory":0,"relyType":1,"relyAttrId":"de226d17-a0f7-11e6-a18b-0050568a49fd","valueList":null,"mapValueList":{"26f7a677-9591-4ad4-aff7-a848508e2ae7":[{"attrValueId":"9fba9ebe-1be3-4f99-9bdb-c0682b6c28d4","attrValueCode":"nova","attrDisplayValue":"Demo可用区","attrValue":"d9639dad-7a8e-41b9-96d5-08a299f81dda"}]}},{"attrId":"de226d17-a0f7-11e6-a18b-0050568a49fd","attrCode":"PLATFORM","attrDisplayName":"云平台","skuFlag":null,"valueType":1,"mandatory":0,"relyType":0,"relyAttrId":null,"valueList":[{"attrValueId":"26f7a677-9591-4ad4-aff7-a848508e2ae7","attrValueCode":"Demo-Openstack","attrDisplayValue":"Demo-Openstack","attrValue":"060b3c71-7bbf-479c-a189-bfafa6f9b825"}],"mapValueList":null},{"attrId":"de22a07b-a0f7-11e6-a18b-0050568a49fd","attrCode":"CPU","attrDisplayName":"CPU","skuFlag":null,"valueType":0,"mandatory":0,"relyType":1,"relyAttrId":"de226d17-a0f7-11e6-a18b-0050568a49fd","valueList":null,"mapValueList":{"26f7a677-9591-4ad4-aff7-a848508e2ae7":[{"attrValueId":"5fe1665f-3179-4374-b380-e648db3d8d00","attrValueCode":"1core","attrDisplayValue":"1核","attrValue":"1"}]}}],"proMap":{"[9fba9ebe-1be3-4f99-9bdb-c0682b6c28d4, 26f7a677-9591-4ad4-aff7-a848508e2ae7, 5fe1665f-3179-4374-b380-e648db3d8d00, b056ad4c-431a-4aaf-8038-123214902e00]":{"productId":"ad6be768-7cb9-496d-94d1-2d63ab702c5d","productName":"按年云主机","serviceId":"863fe806-0541-49d7-bec5-0da80790390f","skuId":"6b3297a6-41d8-49f5-9bf0-f72da7c8dbba","serviceType":0,"serviceName":null,"productBillingItem":{"billingId":"79fc665c-a9a7-4348-a1da-10cf74356373","billingMode":1,"basePrice":2313.0,"periodType":5,"basicPrice":223.0,"cyclePrice":443.0,"unitPrice":null,"unitType":null}}}},"serivceConfigChangeDiskItem":null}}.resultContent)

		// 	},500)
		// })
		

		return request;
	}

	weekly = this.dict.get({  //计费周期
		owner: "PACKAGE_BILLING",
		field: "PERIOD_TYPE"
	});
}