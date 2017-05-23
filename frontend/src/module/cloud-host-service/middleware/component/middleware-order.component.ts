
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
			this.mdtypeChange(res.items[0])
		})
		.catch(e => this.layoutService.hide())
	}

	private mdtypeChange(value) {
		this.dbInit = value; 
		this.fetchTmIdsPost.dbType = value.db.value; 

		let { version, mode } = this.dbInit
		this.fetchTmIdsPost.version = version.length ? version[0] : ""
		this.fetchTmIdsPost.deploymentMode = mode.length ? mode[0].value : ""

		this.dux.dispatch("DB_TYPE_CHANGE")
	}


}
