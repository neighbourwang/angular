
import { Component, ViewChild, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, ValidationRegs, Validation } from '../../../../architecture';
import { DatabaseServiceOrder } from '../service/database-order.service';

import { DispatchEvent } from "../../components/dispatch-event"

import { cloudVmComponentOrder } from "../../vm-instance/component/cloud-host-order.component"
import { cloudHostServiceOrder } from '../../vm-instance/service/cloud-host-order.service';

@Component({
	selector: 'cloud-vm-order',
	templateUrl: '../template/database-order.component.html',
	styleUrls: ['../style/database-order.less'],
})
export class DatabaseComponentOrder extends cloudVmComponentOrder implements OnInit {


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
		this.fetchConfig()
	}

}
