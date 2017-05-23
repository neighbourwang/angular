
import { Component, ViewChild, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, ValidationRegs, Validation } from '../../../../architecture';
import { MiddlewareServiceOrder } from '../service/middleware-order.service';

import { DispatchEvent } from "../../components/dispatch-event"

import { DatabaseComponentOrder } from "../../database/component/database-order.component"
import { cloudHostServiceOrder } from '../../vm-instance/service/cloud-host-order.service';
import { DatabaseServiceOrder } from '../../database/service/database-order.service';

import { DbTemplateInfo, MDproductReq } from "../model/post.model"
import { MiddlewareValue, DiskValue, VlueList } from "../model/other.model"

@Component({
	selector: 'cloud-vm-order',
	templateUrl: '../template/middleware-order.component.html',
	styleUrls: ['../style/middleware-order.less'],
})
export class MiddlewareComponentOrder extends DatabaseComponentOrder implements OnInit {

	@ViewChild('confirm')
	public confirmDialog: ConfirmComponent;

	@ViewChild('notice')
	public noticeDialog: NoticeComponent;

	dbInits = [];
	dbInit;

	middlewares = [];   //中间件模板列表
	middleware;   //选中的中间件模板

	dbProductList = [];  //中间件产品列表
	dbProduct;  //中间件产品

	diskProducts = [];   //硬盘产品列表
	diskSkuList = [];   //硬盘sku列表
	vmItemNo: string //云主机的itemno

	oneTimeTotalPrice:number = 0;
	totalBilling:number = 0;
	totalAnnual:number = 0;

	middlewareValue: MiddlewareValue = new MiddlewareValue;
	diskValue: DiskValue = new DiskValue;

	asmpasswordShadow:string = ""
	syspasswordShadow:string = ""

	storageTypes = [{
		value: "FS",
		name: "文件系统(File System)"
	}, {
		value: "ASM",
		name: "自动化存储管理(ASM)"
	}];

	fetchTmIdsPost: DbTemplateInfo = new DbTemplateInfo;   //获取模板id的post
	fetchDBProductPost: MDproductReq = new MDproductReq;

	constructor(
		public layoutService: LayoutService,
		public router: Router,
		public v: Validation,
		public dbv: Validation,
		public dux: DispatchEvent,
		public service: cloudHostServiceOrder,
		public dbservice: DatabaseServiceOrder,
		private mwservice: MiddlewareServiceOrder
	) {
		super(layoutService, router, v, dbv, dux, service, dbservice)
	
		this.v.result = {};
		this.dbv.result = {};
		this.dux.reset();

		this.fetchDBProductPost.serviceType = "3"   //中间件的serviceType = 3
	};

	ngOnInit() {
		this.makeSubscriber()
		this.makeDbSubScriber()
		this.fetchConfig()
		this.fetchMiddlewareInit()
	}

	private fetchMiddlewareInit() {
		this.layoutService.show()
		this.mwservice.fetchMiddlewareInit().then(res => {
			this.layoutService.hide()
			if(!res.items.length) return

			this.dbInits = res.items
			this.dbtypeChange(res.items[0])
		})
		.catch(e => this.layoutService.hide())
	}

	private dbtypeChange(value) {
		this.dbInit = value; 
		this.fetchTmIdsPost.dbType = value.db.value; 

		let { version, mode } = this.dbInit
		this.fetchTmIdsPost.version = version.length ? version[0] : ""
		this.fetchTmIdsPost.deploymentMode = mode.length ? mode[0].value : ""

		this.dux.dispatch("DB_TYPE_CHANGE")
	}


}
