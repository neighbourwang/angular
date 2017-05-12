
import { Component, ViewChild, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, ValidationRegs, Validation } from '../../../../architecture';
import { DatabaseServiceOrder } from '../service/database-order.service';

import { DispatchEvent } from "../../components/dispatch-event"

import { cloudVmComponentOrder } from "../../vm-instance/component/cloud-host-order.component"
import { cloudHostServiceOrder } from '../../vm-instance/service/cloud-host-order.service';

import { DbTemplateInfo, MDproductReq } from "../model/post.model"

@Component({
	selector: 'cloud-vm-order',
	templateUrl: '../template/database-order.component.html',
	styleUrls: ['../style/database-order.less'],
})
export class DatabaseComponentOrder extends cloudVmComponentOrder implements OnInit {

	dbInits = [];
	dbInit;

	databases = [];   //数据库列表
	database;   //选中的数据库

	fetchTmIdsPost: DbTemplateInfo = new DbTemplateInfo;   //获取模板id的post
	fetchDBProductPost: MDproductReq = new MDproductReq;

	constructor(
		public layoutService: LayoutService,
		public router: Router,
		public v: Validation,
		public dux: DispatchEvent,
		public service: cloudHostServiceOrder,
		private dbservice: DatabaseServiceOrder
	) {
		super(layoutService, router, v, dux, service)
	
		this.v.result = {};
		this.dux.reset();

		this.fetchDBProductPost.serviceType = "3"   //数据库的serviceType = 3
	};

	ngOnInit() {
		this.makeSubscriber()
		this.makeDbSubScriber()
		this.fetchConfig()
		this.fetchDatabaseInit()
	}

	makeDbSubScriber() {
		this.dux.subscribe("DB_TYPE_CHANGE", () => { this.fetchDatabaseSearch() })   //数据库选项有变化时候
		this.dux.subscribe("DB_PRODUCT_CHANGE", () => { this.fetchShoppingMDproducts() })   //数据库产品有变化时候 （模板id，云平台）
		this.dux.subscribe("PLATFORM", () => { this.fetchShoppingMDproducts() })   //云平台有变化时
	}

	private fetchDatabaseInit() {
		this.dbservice.fetchDatabaseInit().then(res => {
			if(!res.items.length) return

			this.dbInits = res.items.concat([{
				"db":{"code":null,"label":"mysql","value":1},
				"middleware":null,"version":["5.5","5.6"],
				"mode":[{"code":null,"label":"多节点部署","value":0}]
			}])
			this.dbtypeChange(res.items[0])
		})
	}

	private dbtypeChange(value) {
		this.dbInit = value; 
		this.fetchTmIdsPost.dbType = value.db.value; 

		let { version, mode } = this.dbInit
		this.fetchTmIdsPost.version = version.length ? version[0] : ""
		this.fetchTmIdsPost.deploymentMode = mode.length ? mode[0].value : ""

		this.dux.dispatch("DB_TYPE_CHANGE")
	}

	private fetchDatabaseSearch() {
		this.dbservice.fetchDatabaseSearch(this.fetchTmIdsPost).then(res => {
			this.databases = res;
			this.fetchDBProductPost.templateIds = res.map(r => r.id)

			this.dux.dispatch("DB_PRODUCT_CHANGE")
		})
	}

	private fetchShoppingMDproducts() {   //获取数据库产品
		if( !this.values.PLATFORM.attrValue || !this.fetchDBProductPost.templateIds.length) return;  //当没有id或者云平台时

		this.fetchDBProductPost.platformId = this.values.PLATFORM.attrValue;
		this.dbservice.fetchShoppingMDproducts(this.fetchDBProductPost)
			.then(res => {
				console.log(res, 112323);
			})
	}
}
