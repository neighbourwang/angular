import { Component,ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from '../../../../architecture';
import { cloudHostServiceOrder } from '../service/cloud-host-order.service';

import { AttrList, PayLoad } from '../model/attr-list.model';
import { OrderList, OrderService, SendModule, TimeLineData, VlueList } from '../model/services.model';

@Component({
	selector: 'cloud-host-order',
	templateUrl: '../template/cloud-host-order.component.html',
	styleUrls: ['../style/cloud-host-order.less'],
})
export class cloudHostComponentOrder implements OnInit {

	configs: OrderList;
	payLoad: PayLoad;
	payLoadArr : PayLoad[];  //最后提交的是个PayLoad数组
	sendModule: SendModule;
	setPassword: boolean = true;


	@ViewChild('cartButton') cartButton;
	@ViewChild('storage') storage;
	// timeForever : boolean = false;

	// rightFixed : boolean = false;   //让右侧配置起飞

	passwordShadow: string;
	skuMap: any;  //skuMap

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private service: cloudHostServiceOrder
	) {
		this.configs = new OrderList();
		this.sendModule = new SendModule();
		this.payLoad = new PayLoad();
	};

	ngOnInit() {
		this.setConfigList();
		// $("[data-toggle=popover]").popover();
	}

	private getSkuId(payLoadList: string[]): { skuId: string, productId: string } {   //获取skuID和productId
		const trim = val => val.replace("[", "").replace("]", ""),
			  totalId = payLoadList.join(",");
console.log(payLoadList,222)
		let nub = 0, 	//验证sku成功的个数
			skuValue = {};

		for (let sku in this.skuMap) {
			sku.split(", ").forEach(skuString => {
				if(totalId.indexOf(trim(skuString)) > -1 ) nub++;
			});
			if(nub === payLoadList.length) {
				return this.skuMap[sku]
			}
			nub = 0;
		}
	}

	private itemNum:number = 0;
	private makeItemNum():string {
		return new Date().getTime() + "" + (this.itemNum++);
	}

	//把payLoad转换成提交的post对象
	/**
	 * [payLoadFormat 把页面数据转换为发送给后端的数据 本页面的核心函数]
	 *
	 * 业务简介
	 *** 总共有一个云主机订单
	 *** 和三个可选的云硬盘订单（页面显示为云硬盘）
	 *** PayLoad是一个数组，需要把上面的四个订单加入进去
	 *** 需要取
	 * 业务逻辑
	 * 1. 
	 * @return {PayLoad[]} [description]
	 */
	private payLoadFormat(): PayLoad[] {
		//特殊处理
		this.sendModule.timeline.attrValue = parseInt(this.sendModule.timeline.value);

		//临时处理 演示用
		this.sendModule.bootsize.attrValue = "20";

		let payloadList = [],
			skuVmPayload = [],  //例外的sku
			skuDistPayload = [];  //例外的sku
		for (let v in this.sendModule) {
			payloadList.push({
				attrId: this.configs[v].attrId,   	//服务属性ID
				attrCode: this.configs[v].attrCode,  	//服务属性CODE
				attrDisplayValue: this.sendModule[v].attrDisplayValue, 	//服务属性Name
				attrDisplayName: this.configs[v].attrDisplayName, 	//服务属性Name
				attrValueId: this.sendModule[v].attrValueId,     	//服务属性值ID
				attrValue: this.sendModule[v].attrValue, 	//服务属性值
				attrValueCode: this.sendModule[v].attrValueCode, 	//服务属性值
			});

			if(["zone", "platform", "cpu", "mem"].indexOf(v) > -1)    //vm主机订单的sku匹配的选项 需要匹配可用区 平台 cpu 内存
				skuVmPayload.push(this.sendModule[v].attrValueId); 
			if(["zone", "platform"].indexOf(v) > -1)    //云硬盘订单的sku匹配的选项 需要匹配 平台 可用区 （还有一个硬盘类型 由下面添加）
				skuDistPayload.push(this.sendModule[v].attrValueId); 
		};

		const sku = this.getSkuId(skuVmPayload);   //获取sku

		this.payLoad.skuId = sku.skuId;
		this.payLoad.productId = sku.productId;
		this.payLoad.attrList = payloadList;
		this.payLoad.itemNo = this.makeItemNum();

		this.payLoadArr = [];
		this.payLoadArr.push(this.payLoad);

		/****下面开始处理数据盘的逻辑****/
		const storage = this.storage.getData();   //获取数据盘

		if(storage.length) {   //如果有数据盘的数据

		}


		return this.payLoadArr;
	}


	setConfigList(): void {
		this.layoutService.show();
		this.service.getHostConfigList().then(configList => {
			configList.attrList.forEach(config => {
				// 设置配置列表
				const attrName = config.attrCode.toLowerCase();

				this.configs[config.attrCode.toLowerCase()] = config;
				this.setSenModule(config);
			});
			this.sendModule.username.attrValue = "root";
			console.log(this.sendModule, this.configs)

			this.skuMap = configList.skuMap;
		}).then(res => {
			// this.setTimeLineType();
			this.layoutService.hide();
		}).catch(e => {
			this.layoutService.hide();
		})
	}

	setSenModule(config: OrderService): void {

		const isValueLength = config.valueList && config.valueList.length;
		const attrName = config.attrCode.toLowerCase();

		//设置创建云主机的属性列表
		isValueLength ? this.sendModule[attrName] = config.valueList[0] : 0;   //默认第一个
	}

	setTimeLineType(): void {   //设置购买时长
		this.service.getTimeLineType().then(datas => {  //从数据词典里获取
			datas.map(data => {
				this.configs.timelineunit.valueList.push({
					attrValue: data.code,
					attrDisplayValue: data.displayValue
				})
			});
		});
		this.setSenModule(this.configs.timelineunit);  //设置默认选择
	}

	getRelyName(relyAttrId): string {
		for (let config in this.configs) {
			if (this.configs[config].attrId === relyAttrId) {
				return config;
			}
		}
	}
	rely(attrName:string):VlueList[] {
		if(!this.configs[attrName].relyAttrId) return [];

		//根据他的依赖的id获取它自身的list
		const list = this.configs[attrName].mapValueList[this.sendModule[this.getRelyName(this.configs[attrName].relyAttrId)].attrValueId];
		 //设置sendmodule使它选择第一个
		if(list.length && this.sendModule[attrName]) this.sendModule[attrName] = list[0];  
		return list;
	}

	addCart() {   //加入购物车
		let payLoadArr = this.payLoadFormat();   //获取最新的的payload的对象
		console.log(payLoadArr, JSON.stringify(payLoadArr))
		// console.log(JSON.stringify(payLoad))
		this.layoutService.show();
		this.service.addCart(payLoadArr).then(res => {
			this.layoutService.hide();
			alert("加入购物车成功！");
			this.cartButton.setCartList();
			// this.router.navigateByUrl("cloud-host-service/cloud-host-list");
		}).catch(res => {
			this.layoutService.hide();
		})
	}


	con(value) {
		console.log(value)

	}
	parseInt(value) {
		return parseInt(value);
	}


	checkInput() {

	}

	goTo(url: string) {
		this.router.navigateByUrl(url);
	}
	buyNow() {
		// this.layoutService.show();
		this.checkInput();
		let payLoadArr = this.payLoadFormat();   //获取最新的的payload的对象
		// this.service.saveOrder(payLoadArr).then(res => {
		// 	this.layoutService.hide();
		// 	this.router.navigateByUrl("cloud-host-service/cart-order");
		// }).catch(res => {
		// 	this.layoutService.hide();
		// })
	}
}
