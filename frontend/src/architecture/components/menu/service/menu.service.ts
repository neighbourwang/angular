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
		const isAdmin: boolean = this.userInfo.organizationName === "管理员部门";   //临时判断如果是管理员就不隐藏了

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
					"isShow": true,
					"icon": "icon-check",
					"top2_menu": [
						{
							"label": "MENU.NOT_APPROVED",
							"isOpen": false,
							"isShow": true,
							"routing": "check-center/check-mng-list"
						},
						{
							"label": "MENU.APPROVED",
							"isOpen": false,
							"isShow": true,
							"routing": "check-center/check-mng-hascheck"
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
							"isShow": isAdmin,
							"routing": "user-center/account-mng/account-mng-list"
						},
						{
							"label": "MENU.ORGANIZATION_MANAGENMENT",
							"isOpen": false,
							"isShow": isAdmin,
							"routing": "user-center/org-mng/org-mng-list"
						},
						{
							"label": "MENU.PERSONAL_ACCOUNT_MANAGEMENT",
							"isOpen": false,
							"isShow": true,
							"routing": "user-center/person-acc-mng/person-acc-mng"
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