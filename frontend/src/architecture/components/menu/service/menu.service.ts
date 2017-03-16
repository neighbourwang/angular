import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MenuService {
	constructor(private http: Http,
		private restApiCfg: RestApiCfg,
		private dict: SystemDictionaryService,
		private restApi: RestApi) {
	}

	userInfo = this.restApi.getLoginInfo().userInfo;

	getMenuList(): Promise<any> {
		const isOrgin: boolean = this.userInfo.roles.map(role => JSON.stringify(role)).join(",").indexOf('"ENTERPRISE_ADMIN"') > -1; ;   //临时判断如果是机构管理员就显示审批设置
// NORMAL_USER
		return new Promise(resolve => {
			resolve([
				{
					"label": "MENU.CLOUD_HOSTING_SERVICES",
					"isOpen": true,
					"isShow": true,
					"icon": "icon-cloudhost",
					"top2_menu": [
						// {
						// 	"label": "MENU.VIRTUAL_MACHINE_INSTANCE",
						// 	"isOpen": true,
						// 	"isShow": true,
						// 	"routing": "cloud-host-service/cloud-host-detail"
						// },
						{
							"label": "MENU.CLOUD_HOSTING_INSTANCE",
							"isOpen": true,
							"isShow": true,
							"routing": "cloud-host-service/cloud-host-list"
						},
						{
							"label": "MENU.CLOUD_HARD_DISK",
							"isOpen": true,
							"isShow": true,
							"routing": "cloud-host-service/cloud-drive-list"
						},
						// {
						// 	"label": "MENU.MIRROR",
						// 	"isOpen": true,
						// 	"isShow": true,
						// 	"routing": "image-mng/image-mng"
						// }
					]
				},
				// {
				// 	"label": "MENU.PHYSICAL_SERVERS",
				// 	"isOpen": false,
				// 	"isShow": true,
				// 	"icon": "icon-machine",
				// 	"top2_menu": [
				// 		{
				// 			"label": "MENU.ACCOUNT_MANAGEMENT",
				// 			"isOpen": false,
				// 			"isShow": true,
				// 			"routing": ""
				// 		},
				// 		{
				// 			"label": "MENU.EXPENSE_CENTER",
				// 			"isOpen": false,
				// 			"isShow": true,
				// 			"routing": ""
				// 		}
				// 	]
				// },
				// {
				// 	"label": "MENU.LOAD_BALANCER",
				// 	"isOpen": false,
				// 	"isShow": true,
				// 	"icon": "icon-loadbalance",
				// 	"top2_menu": [
				// 		{
				// 			"label": "MENU.ACCOUNT_MANAGEMENT",
				// 			"isOpen": false,
				// 			"isShow": true,
				// 			"routing": ""
				// 		},
				// 		{
				// 			"label": "MENU.DEPARTMENT_MANAGENMENT",
				// 			"isOpen": false,
				// 			"isShow": true,
				// 			"routing": ""
				// 		},
				// 		{
				// 			"label": "MENU.AUTHORITY_MANAGEMENT",
				// 			"isOpen": false,
				// 			"isShow": true,
				// 			"routing": ""
				// 		},
				// 		{
				// 			"label": "MENU.PRICE_SET",
				// 			"isOpen": false,
				// 			"isShow": true,
				// 			"routing": ""
				// 		},
				// 		{
				// 			"label": "MENU.QUOTA_MANAGEMENT",
				// 			"isOpen": false,
				// 			"isShow": true,
				// 			"routing": ""
				// 		},
				// 		{
				// 			"label": "MENU.EXPENSE_CENTER",
				// 			"isOpen": false,
				// 			"isShow": true,
				// 			"routing": ""
				// 		}
				// 	]
				// },
				{
					"label": "MENU.APPROVAL_CENTER",
					"isOpen": false,
					"isShow": isOrgin,
					"icon": "icon-check",
					"top2_menu": [
						{
							"label": "MENU.NOT_APPROVED",
							"isOpen": false,
							"isShow": isOrgin,
							"routing": "check-center/check-mng-list"
						},
						{
							"label": "MENU.APPROVED",
							"isOpen": false,
							"isShow": isOrgin,
							"routing": "check-center/check-mng-hascheck"
						},
						{
							"label": "CHECK_CENTER.APPROVAL_SETTINGS",
							"isOpen": false,
							"isShow": isOrgin,
							"routing": "check-center/check-mng-set"
						}
					]
				},
				{
					"label": "MENU.EXPENSE_CENTER",
					"isOpen": false,
					"isShow": true,
					"icon": "icon-cost",
					"top2_menu": [
						// {
						//     "label": "MENU.ACCOUNT_MANAGEMENT",
						//     "isOpen": false,
						// "isShow": true,
						//     "routing": ""
						// },
						{
							"label": "MENU.PURCHASED_SERVICE_MANAGEMENT",
							"isOpen": false,
							"isShow": true,
							"routing": "op-center/order-mng/order-mng"
						}, {
							"label": "MENU.ORDER_INQUIRY",
							"isOpen": false,
							"isShow": true,
							"routing": "op-center/order-mng/order-mng-search"
						}, {
							"label": "企业消费总览",
							"isOpen": false,
							"isShow": true,
							"routing": "op-center/order-mng/cost-pandect"
						}, {
							"label": "部门消费总览",
							"isOpen": false,
							"isShow": true,
							"routing": "op-center/order-mng/cost-pandect-department"
						}
					]
				},
				{
					"label": "MENU.ACCOUNT_CENTER",
					"isOpen": false,
					"isShow": true,
					"icon": "icon-user",
					"top2_menu": [
						{
							"label": "MENU.ACCOUNT_MANAGEMENT",
							"isOpen": false,
							"isShow": isOrgin,
							"routing": "user-center/account-mng/account-mng-list"
						},
						{
							"label": "MENU.ORGANIZATION_MANAGEMENT",
							"isOpen": false,
							"isShow": isOrgin,
							"routing": "user-center/org-mng/org-mng-list"
						},
						{
							"label": "MENU.PERSONAL_ACCOUNT_MANAGEMENT",
							"isOpen": false,
							"isShow": true,
							"routing": "user-center/person-acc-mng/person-acc-mng"
						},
                        {
                            "label": "MENU.CASE_MNY",
                            "isOpen": false,
                            "isShow": isOrgin,
                            "routing": "user-center/case-mng/case-mng-list"
                        }

					]
				}
				// {
				//     "label": "MENU.PRODUCTS_SERVICES",
				//     "isOpen": true,
				// "isShow": true,
				//     "icon": "icon-product-and-service",
				//     "top2_menu": [
				//         {
				//             "label": "MENU.CLOUD_HOSTING",
				//             "isOpen": true,
				//             "routing": "",
				//             "top3_menu": [
				//                 {
				//                     "label": "MENU.OVERVIEW",
				//                     "routing": "prod-and-svc/cloud-host/cloud-host-general-view"
				//                 },
				//                 {
				//                     "label": "MENU.ORDER",
				//                     "routing": "prod-and-svc/cloud-host/cloud-host-order"
				//                 },
				//                 {
				//                     "label": "MENU.INSTANCE_LIST",
				//                     "routing": "prod-and-svc/cloud-host/cloud-host-ins-list"
				//                 },
				//             ]
				//         },
				//         {
				//             "label": "MENU.CLOUD_HARD_DISK",
				//             "isOpen": false,
				//             "routing": ""
				//         }
				//     ]
				// },
			])
		})
	}

}
