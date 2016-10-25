import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from '../../../../architecture';
import { cloudHostServiceOrder } from '../service/cloud-host-order.service'

import { AttrList, PayLoad } from '../model/attr-list.model';
import { OrderList, OrderService, VlueList } from '../model/services.model';

@Component({
	selector: 'cloud-host-order',
	templateUrl: '../template/cloud-host-order.component.html',
	styleUrls: ['../style/cloud-host-order.less'],
})
export class cloudHostComponentOrder implements OnInit {

	configs : OrderList;
	payLoad : PayLoad;
	sendModule : any = {};

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private service : cloudHostServiceOrder
	) {}

	ngOnInit() {
		this.configs = new OrderList();
		this.payLoad = new PayLoad();
		this.setConfigList();
	}

	setConfigList() : void {
		this.service.getHostConfigList().then( configList => {
			configList.forEach(config => {
				// 设置配置列表
				this.configs[config.attrCode.toLowerCase()] = config;
			});
			configList.forEach(config => {
				//设置module
				this.setSenModule(config);
			})
			
		});
		console.log(this.sendModule)
	}

	setSenModule(config: OrderService) : void {

		const isValueLength = config.valueList && config.valueList.length;
		const attrName = config.attrCode.toLowerCase();

		//设置创建云主机的属性列表
		this.sendModule[attrName] = isValueLength ? config.valueList[1] : null;

		if(attrName === "cpu") this.setMemConfig();
	}

	setMemConfig(cpu : VlueList = this.configs.cpu.valueList[0]) : void {
		this.configs.mem.valueList = this.configs.mem.mapValueList[cpu.id];
	}

	con(value) {
		console.log(value)
	}
}

//  "attrId":"898b8bc7-0385-4b8e-9e62-c7c05398590c",
//             "attrCode": "REGION",
//             "attrName": "区域",
//             "attrValueId":"041d3be5-b268-41c9-bf15-d7eb79cc2e8b",
//             "attrValue": "d