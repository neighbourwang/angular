
import { Component, ViewChild, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, ValidationRegs, Validation } from '../../../../architecture';
import { DatabaseServiceOrder } from '../service/database-order.service';

import { DispatchEvent } from "../../components/dispatch-event"

import { cloudVmComponentOrder } from "../../vm-instance/component/cloud-host-order.component"
import { cloudHostServiceOrder } from '../../vm-instance/service/cloud-host-order.service';

import { DbTemplateInfo } from "../model/post.model"

@Component({
	selector: 'cloud-vm-order',
	templateUrl: '../template/database-order.component.html',
	styleUrls: ['../style/database-order.less'],
})
export class DatabaseComponentOrder extends cloudVmComponentOrder implements OnInit {

	dbInits = [];
	dbInit;
	fetchTmIdsPost: DbTemplateInfo = new DbTemplateInfo   //获取模板id的post

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
	};

	ngOnInit() {
		this.makeSubscriber()
		this.makeDbSubScriber()
		this.fetchConfig()
		this.fetchDatabaseInit()
	}

	makeDbSubScriber() {
		this.dux.subscribe("DB_TYPE_CHANGE", () => { this.fetchDatabaseSearch() })   //数据库选项有变化时候
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
			console.log(res, 123)
		})
	}
}
