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
	setPassword : boolean = true;
	timeForever : boolean = false;

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private service : cloudHostServiceOrder
	) {
		this.configs = new OrderList();
		this.payLoad = new PayLoad();

		// this.payLoad.totalPrice = 
	};

	ngOnInit() {
		this.setConfigList();
	}

	//把payLoad转换成提交的post对象
	private payLoadFormat() : PayLoad {
		for(let v in this.sendModule){
			this.payLoad.attrList.push({
				attrId	     : this.configs[v].attrId,   	//服务属性ID
				attrCode	 : this.configs[v].attrCode,  	//服务属性CODE
				attrName	 : this.configs[v].attrDisplayName, 	//服务属性Name
				attrValueId  : this.sendModule[v].id,     	//服务属性值ID
				attrValue	 : this.sendModule[v].value 	//服务属性值
			});
			//临时添加
			if(this.configs[v].attrCode === "REGION"){
				this.payLoad.attrList[this.payLoad.attrList.length-1].attrValue = this.configs[v].attrDisplayName;
			}
			if(this.configs[v].attrCode === "ZONE"){
				this.payLoad.attrList[this.payLoad.attrList.length-1].attrValue = "nova";
			}
			if(this.configs[v].attrCode === "CPU"){
				this.payLoad.attrList[this.payLoad.attrList.length-1].attrValue = "1";
			}
			if(this.configs[v].attrCode === "MEM"){
				this.payLoad.attrList[this.payLoad.attrList.length-1].attrValue = "512";
			}
		};

		//临时添加
		this.payLoad.quality = 1;  

		return this.payLoad;
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
	}

	setSenModule(config: OrderService) : void {

		const isValueLength = config.valueList && config.valueList.length;
		const attrName = config.attrCode.toLowerCase();

		//设置创建云主机的属性列表
		this.sendModule[attrName] = isValueLength ? config.valueList[0] : {};

		if(attrName === "cpu") this.setMemConfig();   //选取内存的参数
	}

	setMemConfig(cpu : VlueList = this.configs.cpu.valueList[0]) : void {
		this.configs.mem.valueList = this.configs.mem.mapValueList[cpu.id];
	}

	con(value) {
		console.log(value)
	}
	parseInt (value) {
		return parseInt(value);
	}

	buyNow(){
   		this.layoutService.show();
		let payLoad = this.payLoadFormat();   //获取最新的的payload的对象
		this.service.saveOrder(payLoad).then( res => {
   			this.layoutService.hide();
			this.router.navigateByUrl("cloud-host-service/cloud-host-list");
		}).catch(res => {
   			this.layoutService.hide();
		})
	}
}

//  "attrId":"898b8bc7-0385-4b8e-9e62-c7c05398590c",
//             "attrCode": "REGION",
//             "attrName": "区域",
//             "attrValueId":"041d3be5-b268-41c9-bf15-d7eb79cc2e8b",
//             "attrValue": "d