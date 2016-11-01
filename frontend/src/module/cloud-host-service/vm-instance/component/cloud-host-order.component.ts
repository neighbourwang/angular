import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from '../../../../architecture';
import { cloudHostServiceOrder } from '../service/cloud-host-order.service'

import { AttrList, PayLoad } from '../model/attr-list.model';
import { OrderList, OrderService, SendModule,TimeLineData, VlueList } from '../model/services.model';

@Component({
	selector: 'cloud-host-order',
	templateUrl: '../template/cloud-host-order.component.html',
	styleUrls: ['../style/cloud-host-order.less'],
})
export class cloudHostComponentOrder implements OnInit {

	configs : OrderList;
	payLoad : PayLoad;
	sendModule : SendModule;
	setPassword : boolean = true;
	// timeForever : boolean = false;

	// rightFixed : boolean = false;   //让右侧配置起飞

	passwordShadow : string;

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private service : cloudHostServiceOrder
	) {
		this.configs = new OrderList();
		this.sendModule = new SendModule();
		this.payLoad = new PayLoad();
	};

	ngOnInit() {
		this.layoutService.show();
		this.setConfigList();
		// $("[data-toggle=popover]").popover();
	}

	//把payLoad转换成提交的post对象
	private payLoadFormat() : PayLoad {
		//特殊处理
		this.sendModule.timeline.value = parseInt(this.sendModule.timeline.value);

		//临时处理 演示用
		this.sendModule.storagesize.value = "20";
		this.sendModule.bootsize.value = "20";

		for(let v in this.sendModule){
			this.payLoad.attrList.push({
				attrId	     : this.configs[v].attrId,   	//服务属性ID
				attrCode	 : this.configs[v].attrCode,  	//服务属性CODE
				attrName	 : this.configs[v].attrDisplayName, 	//服务属性Name
				attrValueId  : this.sendModule[v].id,     	//服务属性值ID
				attrValue	 : this.sendModule[v].value 	//服务属性值
			});
		};

		return this.payLoad;
	}

	setConfigList() : void {
		this.service.getHostConfigList().then( configList => {
			configList.forEach(config => {
				// 设置配置列表
				const attrName = config.attrCode.toLowerCase();

				this.configs[config.attrCode.toLowerCase()] = config;
				this.setSenModule(config);
			});
			this.sendModule.username.value = "root";
		}).then( res => {
			this.setTimeLineType();
			this.layoutService.hide();
		})
	}

	setSenModule(config: OrderService) : void {

		const isValueLength = config.valueList && config.valueList.length;
		const attrName = config.attrCode.toLowerCase();

		//设置创建云主机的属性列表
		isValueLength ? this.sendModule[attrName] = config.valueList[0] : 0;   //默认第一个
	}

	setTimeLineType() : void {   //设置购买时长
		this.service.getTimeLineType().then(datas => {  //从数据词典里获取
			datas.map(data => {
				this.configs.timelineunit.valueList.push({
					value : data.code,
					displayName : data.displayValue
				})
			});
		});
		this.setSenModule(this.configs.timelineunit);  //设置默认选择
	}

	con(value) {
		console.log(value)
	}
	parseInt (value) {
		return parseInt(value);
	}

	checkInput() {

	}

	buyNow(){
   		this.layoutService.show();
   		this.checkInput();
		let payLoad = this.payLoadFormat();   //获取最新的的payload的对象
		// console.log(JSON.stringify(payLoad))
		this.service.saveOrder(payLoad).then( res => {
   			this.layoutService.hide();
			this.router.navigateByUrl("cloud-host-service/cloud-host-list");
		}).catch(res => {
   			this.layoutService.hide();
		})
	}
}
