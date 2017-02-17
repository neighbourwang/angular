import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MenuService {
	constructor(private http: Http,
		private restApiCfg: RestApiCfg,
		private dict: SystemDictionaryService,
		private router: Router,
		private restApi: RestApi) {
	}

	userInfo = this.restApi.getLoginInfo().userInfo;

	getMenuList(): Promise<any> {
		const isRoot: boolean = this.userInfo.isRoot;   //临时判断如果是管理员就不隐藏了
		const isOrgin: boolean = this.userInfo.roles.map(role => JSON.stringify(role)).join(",").indexOf('"LEVEL1M"') > -1;   //临时判断如果是机构管理员就显示审批设置

		return new Promise(resolve => {
			resolve([
				{
					"label": "PF_MNG2.PF_MNG",
					"isOpen": true,
					"isShow": !isRoot,
					"icon": "icon-platform-manage",
					"top2_menu": [
						{
							"label": "COMMON.CLOUD_PLATFORM",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "pf-mng2/cl-mng/cl-mng"
						},
					]
				},
				{
					"label": "PROD_MNG.PRODUCT_MANAGEMENT",
					"isOpen": false,
					"isShow": !isRoot,
					"icon": "icon-product-and-service",
					"top2_menu": [
						{
							"label": "PROD_MNG.PRODUCT_CAT_MANAGEMENT",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							// "routing": "pf-mng2/cl-mng/cl-mng"
							"routing": "prod-mng/prod-dir-mng/prod-dir-mng"
						}, {
							"label": "PROD_MNG.PRODUCT_MANAGEMENT",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "prod-mng/prod-mng/prod-mng"
						},
					]
				},
				// {
				// 	"label": "平台管理中心",
				// 	"isOpen": true,
				// 	"isShow": !isRoot,
				// 	"icon": "icon-platform-manage",
				// 	"top2_menu": [
				// 		{
				// 			"label": "平台接入管理",
				// 			"isOpen": false,
				// 			"isActive": false,
				// 			"isShow": !isRoot,
				// 			"routing": "pf-mng/pf-conn-mng/pf-conn-mng"
				// 		},
				// 		{
				// 			"label": "平台系统",
				// 			"isOpen": false,
				// 			"isActive": false,
				// 			"isShow": !isRoot,
				// 			"routing": ""
				// 		},
				// 		{
				// 			"label": "服务目录管理",
				// 			"isOpen": true,
				// 			"isActive": false,
				// 			"routing": "",
				// 			"isShow": !isRoot,
				// 			"top3_menu": [
				// 				{
				// 					"label": "概览",
				// 					"isShow": !isRoot,
				// 					"routing": "pf-mng/svc-dir-mng/svc-dir-mng",
				// 					"isActive": false
				// 				},
				// 				{
				// 					"label": "创建",
				// 					"routing": "pf-mng/svc-dir-mng/svc-dir-cre-step-01",
				// 					"isShow": !isRoot,
				// 					"isActive": false
				// 				}
				// 			]
				// 		}
				// 	]
				// },
                {
					"label": "运维中心",
					"isOpen": false,
					"isShow": !isRoot,
					"icon": "icon-operation-center ",
					"top2_menu": [
						{
							"label": "容量管理",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,							
							"routing": ""
						}, {
							"label": "超分管理",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": ""
                        },
                        {
							"label": "工单管理",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "mtc-center/case-mng/case-list"
						},
					]
				},
				{
					"label": "ENT_MNG.ENTERPRISE_MNG",
					"isOpen": false,
					"isShow": !isRoot,
					"icon": "icon-enterprise-manage",
					"top2_menu": [
						{
							"label": "ENT_MNG.ENTERPRISE_MNG",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "ent-mng/ent-est-mng/ent-est-mng"
						}
						// {
						// 	"label": "企业资源配额管理",
						// 	"isOpen": false,
						// 	"isActive": false,
						// 	"isShow": !isRoot,
						// 	"routing": "ent-mng/ent-res-quota-mng/ent-res-quota-mng"
						// },
						// {
						// 	"label": "企业产品管理",
						// 	"isOpen": false,
						// 	"isActive": false,
						// 	"isShow": !isRoot,
						// 	"routing": "ent-mng/ent-prod-mng/ent-prod-mng"
						// },
						// {
						// 	"label": "企业管理员",
						// 	"isOpen": false,
						// 	"isActive": false,
						// 	"isShow": !isRoot,
						// 	"routing": "ent-mng/ent-admin-mng/ent-admin-mng/ac25dfeb-d727-40a3-842f-dca8ab0409c0"
						// }
					]
				},
                {
                    "label": "USER_CENTER.PHY_MNG",
                    "isOpen": false,
                    "isShow": !isRoot,
                    "icon": "icon-physical-mng",
                    "top2_menu": [
                        {
                            "label": "USER_CENTER.PHY_INSTANCE",
                            "isOpen": false,
                            "isActive": false,
                            "isShow": !isRoot,
                            "routing": "phy-mng/phy-pool/phy-pool-mng"
                        }
                    ]
                },
				{
					"label": "USER_CENTER.CLOUD_HOST_MNG",
					"isOpen": false,
					"isShow": !isRoot,
					"icon": "icon-content-header-purchasingWhite",
					"top2_menu": [
						{
							"label": "USER_CENTER.IMAGE_MNG",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "host-mng/img-mng/img-index"
						}
					]
				},
				{
					"label": "USER_CENTER.CLOUD_NETWORK_MNG",
					"isOpen": false,
					"isShow": !isRoot,
					"icon": "icon-cloud-network-mng",
					"top2_menu": [
						{
							"label": "USER_CENTER.OPENSTACK_NEWWORK",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "net-mng/openstack/openstack-net-mng"
						},
						{
							"label": "NET_VM_NSX_INDEX.VMWARE_NET",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "net-mng/vm-mng-index/vmware-net-index"
						}
						// {
						// 	"label": "USER_CENTER.VMware_NETWORK",
						// 	"isOpen": false,
						// 	"isActive": false,
						// 	"isShow": !isRoot,
						// 	"routing": "net-mng/vm-mng/88"
						// },
						// {
						// 	"label": "USER_CENTER.VMware_E_NETWORK",
						// 	"isOpen": false,
						// 	"isActive": false,
						// 	"isShow": !isRoot,
						// 	"routing": "net-mng/vm-mng-dbt/index/88"
      //                   }
					]
				},
				{
					"label": "USER_CENTER.OP_CENTER",
					"isOpen": false,
					"isShow": !isRoot,
					"icon": "icon-operator",
					"top2_menu": [
						{
							"label": "ORDER_MNG.PURCHASED_SERVICE_MNG",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "op-center/order-mng/order-mng"
						},
						{
							"label": "USER_CENTER.ORDER_QUERY",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "op-center/order-mng/order-mng-search"
						},
						{
							"label": "费用管理",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "op-center/order-mng/cost-pandect"
						},
						{
							"label": "费用设置",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "op-center/cost-set/cost-set-list"
						}
					]
				},
				{
					"label": "USER_CENTER.AP_CENTER",
					"isOpen": false,
					"isShow": !isRoot,
					"icon": "icon-order-manage",
					"top2_menu": [
						{
							"label": "USER_CENTER.PENDING",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "check-center/check-mng-list"
						}, {
							"label": "USER_CENTER.Approved_APPROVED",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "check-center/check-mng-hascheck"
						}, {
							"label": "USER_CENTER.APPROVEL_SETTING",
							"isOpen": false,
							"isActive": false,
							"isShow": isOrgin,
							"routing": "check-center/check-mng-set"
						}
					]
				},

				{
					"label": "USER_CENTER.USER_CENTER",
					"isOpen": isRoot,
					"isShow": true,
					"icon": "icon-content-header-userCenterWhite",
					"top2_menu": [
						{
							"label": "USER_CENTER.ACCOUNT_MNG",
							"isOpen": false,
							"isActive": false,
							"isShow": isRoot,
							"routing": "user-center/account-mng/account-mng-list"
						},
						{
							"label": "USER_CENTER.ORG_MNG",
							"isOpen": false,
							"isActive": false,
							"isShow": isRoot,
							"routing": "user-center/org-mng/org-mng-list"
						},
						{
							"label": "USER_CENTER.ROLE_MNG",
							"isOpen": false,
							"isActive": false,
							"isShow": isRoot,
							"routing": "user-center/role-mng/role-mng-list"
						},
						{
							"label": "USER_CENTER.AD_MNG",
							"isOpen": false,
							"isActive": false,
							"isShow": isRoot,
							"routing": "user-center/attest-mng/attest-mng"
						},
						{
							"label": "USER_CENTER.PERSONAL_MNG",
							"isOpen": false,
							"isActive": false,
							"isShow": true,
							"routing": "user-center/person-acc-mng/person-acc-mng"
						},
					]
				}

			])
		})
	}
}
