import { Component,ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from '../../../../architecture';
import { cloudHostServiceOrder } from '../service/cloud-host-order.service';

import { AttrList, PayLoad } from '../model/attr-list.model';
import { OrderList, OrderService, SendModule, TimeLineData, VlueList, SkuMap, ProMap, BillingInfo } from '../model/services.model';

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

	totalPrice : number = 0;
	vmSku : SkuMap = new SkuMap;
	diskSku : SkuMap[];

	vmBasePrice : number = 0; //云主机一次性费用
	vmTotalPrice : number = 0; //云主机费用
	diskBasePrice : number = 0; //云硬盘一次性费用
	diskTotalPrice : number = 0; //云硬盘费用
	diskUnitType : number = 0; //云硬盘类型


	@ViewChild('cartButton') cartButton;
	@ViewChild('storage') storage;
	// timeForever : boolean = false;

	// rightFixed : boolean = false;   //让右侧配置起飞

	passwordShadow: string;
	skuMap: SkuMap[];  //skuMap
	proMap: ProMap[];  //skuMap

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
			this.proMap = configList.proMap;
		}).then(res => {
			// this.setTimeLineType();
			this.layoutService.hide();
		}).catch(e => {
			this.layoutService.hide();
		})
	}

	private getSkuId(code:"vm"|"disk"): SkuMap {   //获取skuID和productId

		let list = code === "vm" ? ["zone", "platform", "cpu", "mem"].map(v => this.sendModule[v].attrValueId)   //vm主机订单的sku匹配的选项 需要匹配可用区 平台 cpu 内存
				 : code === "disk" ? ["zone", "platform","storage"].map(v => this.sendModule[v].attrValueId) : [];  //云硬盘订单的sku匹配的选项 需要匹配 平台 可用区 （还有一个硬盘类型 由下面添加）

		const trim = val => val.replace("[", "").replace("]", "");

		for(let v of list) if(!v || !list.length) return new SkuMap;  //如果列表存在空值 直接return出去 不再匹配

		let totalId = list.join(","),
			nub = 0, 	//验证sku成功的个数
			skuValue = {};

		for (let sku in this.skuMap) {
			sku.split(", ").forEach(skuString => {
				if(totalId.indexOf(trim(skuString)) > -1 ) nub++;
			});
			if(nub === list.length) {
				return this.skuMap[sku];
			}
			nub = 0;
		}
		return new SkuMap;
	}

	private itemNum:number = 0;
	private makeItemNum():string {
		return new Date().getTime() + "" + (this.itemNum++);
	}

	private sendModuleToPay():AttrList[] {   //把sendModule转换成数组
		let payloadList = [];
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
		};
		return payloadList;
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
		//临时处理 演示用
		this.sendModule.bootsize.attrValue = "20";

		/****下面开始处云主机订单的逻辑****/
		let payloadList = this.sendModuleToPay(),
			itemNo = this.makeItemNum(),
			payLoad = {
				skuId : this.vmSku.skuId,
				productId : this.vmSku.productId,
				attrList : payloadList,
				itemNo : itemNo,
				totalPrice : this.vmTotalPrice,
				quality : this.payLoad.quality,
				serviceType : "0",
				relyType : "" ,
				relyItemNo : ""
			}

		this.payLoadArr = [];
		this.payLoadArr.push(payLoad);   //加入云主机的订单

		/****下面开始处理数据盘订单的逻辑****/
		const storages = this.storage.getData();   //获取数据盘

		if(storages.length) {   //如果有数据盘的数据
			for( let storage of storages){
				this.sendModule.storage = storage.storage;
				this.sendModule.storagesize = storage.storagesize;

				let sku = this.getSkuId("disk"),
					payloadList = this.sendModuleToPay();
				payLoad = {
					skuId : sku.skuId,
					productId : sku.productId,
					attrList : payloadList,
					itemNo : this.makeItemNum(),
					totalPrice : this.diskTotalPrice,
					quality : this.payLoad.quality,
					serviceType : "1",
					relyType : "" ,
					relyItemNo : itemNo
				}
				this.payLoadArr.push(payLoad);  //加入云硬盘
			}
		}
		console.log("发送的订单数据："+this.payLoadArr)
		return this.payLoadArr;
	}

	setTimeUnit(): void {
		if(!this.vmSku.skuId) return ;

		const timeUnit = this.configs.timelineunit.mapValueList[this.vmSku.skuId];
		if(timeUnit && timeUnit.length && this.sendModule.timelineunit.attrValueCode !== timeUnit[0].attrValueCode) {
			this.sendModule.timelineunit = timeUnit[0];    //设置一下时长为第一位
			this.setVmPrice();   //拿到时长就可以设置主机价格了  
		}
	}

	setVmPrice(): void {   //设置主机的价格
		const sku = this.vmSku.skuId,
			  timeline = +(this.sendModule.timeline.attrValue || "0");
		if(!this.sendModule.timelineunit.attrValueCode || !sku) return;
console.log(`[${sku}, ${this.sendModule.timelineunit.attrValueCode}]`, "云主机")
		const price = this.proMap[`[${sku}, ${this.sendModule.timelineunit.attrValueCode}]`];

		if(!price) return;  //如果没获取到价格
		this.vmBasePrice = price.billingInfo.basePrice * timeline * this.payLoad.quality;  //一次性费用
		this.vmTotalPrice = (price.billingInfo.basicPrice+price.billingInfo.cyclePrice) * timeline * this.payLoad.quality;   //周期费用
	}
	setDiskPrice(): void {  //设置数据盘的价格
		const timeline = +(this.sendModule.timeline.attrValue || "0"),
			  storages = this.storage.getData();   //获取数据盘
																		console.log(storages)
		this.diskSku = [];
		let basePrice = 0, totalPrice = 0;
		for(let data of storages) {   
			let sku = this.getSkuId("disk");

			this.sendModule.storage = data.storage; 
			this.diskSku.push(sku); //获取sku

			let price = this.proMap[`[${sku.skuId}]`];  //计算价格

console.log(`[${sku.skuId}]`, "云硬盘")
			if(!price) return; //如果没获取到价格
			basePrice += price.billingInfo.basePrice * timeline * this.payLoad.quality;  //一次性费用
			totalPrice += price.billingInfo.unitPrice * data.storagesize.attrValue * timeline * this.payLoad.quality;   //周期费用

			this.diskUnitType = price.billingInfo.unitType;
		}

		this.diskBasePrice = basePrice;  //一次性费用
		this.diskTotalPrice = totalPrice;   //周期费用
	}

	storageChange(status) {
		this.setDiskPrice();
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
		const list = (this.configs[attrName].mapValueList && this.configs[attrName].mapValueList[this.sendModule[this.getRelyName(this.configs[attrName].relyAttrId)].attrValueId]) || [];

		const attrid = this.sendModule[attrName].attrValueId;   //获取当前的sendmoudle的attrid
		const isHas = attrid && list && list.length && !!list.filter(l => l.attrValueId === attrid).length;   //列表里面是否有以选择的senModule
		 //设置sendmodule使它选择第一个
		if(list.length && (!attrid || !isHas)) this.sendModule[attrName] = list[0];   //当没有选择sendmoudle的attrid时候，说明该模块还没有选择过，如果list里面没有这个attrid说明，他的父级已经有变动，需要重新选择

		this.changes();
		return list;
	}

	changes() { 
		this.vmSku = this.getSkuId("vm");     //确定sku
		// this.diskSku = this.getSkuId("disk");   //确定sku 

		if(this.vmSku.skuId) {
			this.setTimeUnit();   // 设置购买时长
		}
	}

	addCart() {   //加入购物车
		if(!this.checkInput()) return;
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


	checkInput():boolean {
		const al = value => !!alert(value);

		if(!this.vmSku.skuId) return al("sku不正确")
		if(!this.sendModule.timeline.attrValue) return al("请选择购买时长");
		return true;
	}

	goTo(url: string) {
		this.router.navigateByUrl(url);
	}
	buyNow() {
		if(!this.checkInput()) return;
		this.layoutService.show();
		let payLoadArr = this.payLoadFormat();   //获取最新的的payload的对象
		console.log(payLoadArr, JSON.stringify(payLoadArr))
		this.service.saveOrder(payLoadArr).then(res => {
			this.layoutService.hide();
			this.router.navigateByUrl("cloud-host-service/cart-order");
		}).catch(res => {
			this.layoutService.hide();
		})
	}
}
