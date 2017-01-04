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
					"label": "平台管理",
					"isOpen": true,
					"isShow": !isRoot,
					"icon": "icon-platform-manage",
					"top2_menu": [
						{
							"label": "云平台",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "pf-mng2/cl-mng/cl-mng"
						},
					]
				},
				{
					"label": "产品管理",
					"isOpen": false,
					"isShow": !isRoot,
					"icon": "icon-product-and-service",
					"top2_menu": [
						{
							"label": "产品目录管理",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							// "routing": "pf-mng2/cl-mng/cl-mng"
							"routing": "prod-mng/prod-dir-mng/prod-dir-mng"
						}, {
							"label": "产品管理",
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
					"label": "企业管理",
					"isOpen": false,
					"isShow": !isRoot,
					"icon": "icon-enterprise-manage",
					"top2_menu": [
						{
							"label": "企业管理",
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
                    "label": "物理机管理",
                    "isOpen": false,
                    "isShow": !isRoot,
                    "icon": "icon-physical-mng",
                    "top2_menu": [
                        {
                            "label": "物理机实例",
                            "isOpen": false,
                            "isActive": false,
                            "isShow": !isRoot,
                            "routing": "phy-mng/phy-pool/phy-pool-mng"
                        }
                    ]
                },
				{
					"label": "云主机管理",
					"isOpen": false,
					"isShow": !isRoot,
					"icon": "icon-content-header-purchasingWhite",
					"top2_menu": [
						{
							"label": "镜像管理",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "host-mng/img-mng/img-index"
						}
					]
				},
				{
					"label": "云网络管理",
					"isOpen": false,
					"isShow": !isRoot,
					"icon": "icon-cloud-network-mng",
					"top2_menu": [
						{
							"label": "OpenStack网络",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "net-mng/openstack/openstack-net-mng"
						},
						{
							"label": "VMware网络",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "net-mng/vm-mng-index/vmware-net-index"
						},
						{
							"label": "VMware标准网络",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "net-mng/vm-mng/88"
						},
						{
							"label": "VMware分布式网络",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "net-mng/vm-mng-dbt/index/88"
                        },
                        {
							"label": "VMware NSX网络",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "net-mng/vm-mng-nsx/index/88"
						}
					]
				},
				{
					"label": "运营中心",
					"isOpen": false,
					"isShow": !isRoot,
					"icon": "icon-operator",
					"top2_menu": [
						{
							"label": "已购服务管理",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "op-center/order-mng/order-mng"
						},
						{
							"label": "订单查询",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "op-center/order-mng/order-mng-search"
						}
					]
				},
				{
					"label": "审批中心",
					"isOpen": false,
					"isShow": !isRoot,
					"icon": "icon-order-manage",
					"top2_menu": [
						{
							"label": "待审批",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "check-center/check-mng-list"
						}, {
							"label": "已审批",
							"isOpen": false,
							"isActive": false,
							"isShow": !isRoot,
							"routing": "check-center/check-mng-hascheck"
						}, {
							"label": "审批设置",
							"isOpen": false,
							"isActive": false,
							"isShow": isOrgin,
							"routing": "check-center/check-mng-set"
						}
					]
				},

				{
					"label": "用户中心",
					"isOpen": isRoot,
					"isShow": true,
					"icon": "icon-content-header-userCenterWhite",
					"top2_menu": [
						{
							"label": "账号管理",
							"isOpen": false,
							"isActive": false,
							"isShow": isRoot,
							"routing": "user-center/account-mng/account-mng-list"
						},
						{
							"label": "机构管理",
							"isOpen": false,
							"isActive": false,
							"isShow": isRoot,
							"routing": "user-center/org-mng/org-mng-list"
						},
						{
							"label": "角色管理",
							"isOpen": false,
							"isActive": false,
							"isShow": isRoot,
							"routing": "user-center/role-mng/role-mng-list"
						},
						{
							"label": "认证管理",
							"isOpen": false,
							"isActive": false,
							"isShow": isRoot,
							"routing": "user-center/attest-mng/attest-mng"
						},
						{
							"label": "个人账户管理",
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
