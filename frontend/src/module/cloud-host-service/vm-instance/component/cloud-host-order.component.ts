/**
 * [订购逻辑]
 * 基本介绍：
 * 1. 本页面能提交一个云主机，和三个挂载到该主机上的云硬盘，总共最多四个订单
 * 2. 每个订单最后提交的都是一个 PayLoad， 发给后端的是payLoadArr 是一个PayLoad数组
 * 3. sendModule是和页面绑定的数据，最终是要转换成PayLoad
 *
 * 流程介绍：
 * 1. 每个订单根据所选来确定产品，也就是sku
 * 2. 根据sku的id 来获取时长单位
 * 3. 根据sku id与时长单位获取来获取价格 
 * 4. 提交的时候根据sendModule转换成PayLoad
 */

import { Component, ViewChild, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from '../../../../architecture';
import { cloudHostServiceOrder } from '../service/cloud-host-order.service';

import { AttrList, PayLoad } from '../model/attr-list.model';
import { OrderOptions } from '../model/options.model';
import { OrderList, OrderService, SendModule, TimeLineData, VlueList, SkuMap, ProMap, BillingInfo, Network, Image } from '../model/services.model';

@Component({
	selector: 'cloud-host-order',
	templateUrl: '../template/cloud-host-order.component.html',
	styleUrls: ['../style/cloud-host-order.less'],
})
export class cloudHostComponentOrder implements OnInit {

	configs: OrderList;
	payLoad: PayLoad;
	payLoadArr: PayLoad[];  //最后提交的是个PayLoad数组
	sendModule: SendModule;
	setPassword: boolean = true;

	@Input() options: OrderOptions;

	totalPrice: number = 0;
	vmSku: SkuMap = new SkuMap;
	diskSku: SkuMap[];

	networkList: VlueList[];
	imageList: VlueList[];

	vmBasePrice: number = 0; //云主机一次性费用
	vmTotalPrice: number = 0; //云主机费用
	diskBasePrice: number = 0; //云硬盘一次性费用
	diskTotalPrice: number = 0; //云硬盘费用
	diskUnitType: number = 0; //云硬盘类型

	check = {};


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

	private getSkuId(code: "vm" | "disk"): SkuMap {   //获取skuID和productId

		let list = code === "vm" ? ["zone", "platform", "cpu", "mem"].map(v => this.sendModule[v].attrValueId)   //vm主机订单的sku匹配的选项 需要匹配可用区 平台 cpu 内存
			: code === "disk" ? ["zone", "platform", "storage"].map(v => this.sendModule[v].attrValueId) : [];  //云硬盘订单的sku匹配的选项 需要匹配 平台 可用区 （还有一个硬盘类型 由下面添加）

		const trim = val => val.replace("[", "").replace("]", "");

		for (let v of list) if (!v || !list.length) return new SkuMap;  //如果列表存在空值 直接return出去 不再匹配

		let totalId = list.join(","),
			nub = 0, 	//验证sku成功的个数
			skuValue = {};

		for (let sku in this.skuMap) {
			sku.split(", ").forEach(skuString => {
				if (totalId.indexOf(trim(skuString)) > -1) nub++;
			});
			if (nub === list.length) {
				return this.skuMap[sku];
			}
			nub = 0;
		}
		return new SkuMap;
	}

	private itemNum: number = 0;
	private makeItemNum(): string {
		return new Date().getTime() + "" + (this.itemNum++);
	}

	private sendModuleToPay(): AttrList[] {   //把sendModule转换成数组
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

		/****下面开始处云主机订单的逻辑****/
		let payloadList = this.sendModuleToPay(),
			itemNo = this.makeItemNum(),
			payLoad = {
				skuId: this.vmSku.skuId,
				productId: this.vmSku.productId,
				attrList: payloadList,
				itemNo: itemNo,
				totalPrice: this.vmTotalPrice,
				quality: this.payLoad.quality,
				serviceType: "0",
				relyType: "",
				relyItemNo: ""
			}

		this.payLoadArr = [];
		this.payLoadArr.push(payLoad);   //加入云主机的订单

		/****下面开始处理数据盘订单的逻辑****/
		const storages = this.storage.getData();   //获取数据盘

		if (storages.length) {   //如果有数据盘的数据
			for (let storage of storages) {
				this.sendModule.storage = storage.storage;
				this.sendModule.disksize = storage.storagesize;
				this.sendModule.storagesize = storage.storagesize;

				let sku = this.getSkuId("disk"),
					payloadList = this.sendModuleToPay();
				payLoad = {
					skuId: sku.skuId,
					productId: sku.productId,
					attrList: payloadList,
					itemNo: this.makeItemNum(),
					totalPrice: this.diskTotalPrice,
					quality: this.payLoad.quality,
					serviceType: "1",
					relyType: "1",
					relyItemNo: itemNo
				}
				this.payLoadArr.push(payLoad);  //加入云硬盘
			}
		}
		console.log("发送的订单数据：" + this.payLoadArr)
		return this.payLoadArr;
	}

	setTimeUnit(): void {
		if (!this.vmSku.skuId) return;

		const timeUnit = this.configs.timelineunit.mapValueList[this.vmSku.skuId];
		if (timeUnit && timeUnit.length && this.sendModule.timelineunit.attrValueCode !== timeUnit[0].attrValueCode) {
			this.sendModule.timelineunit = timeUnit[0];    //设置一下时长为第一位
			this.setVmPrice();   //拿到时长就可以设置主机价格了  
		}
	}

	setVmPrice(): void {   //设置主机的价格
		const sku = this.vmSku.skuId,
			timeline = +(this.sendModule.timeline.attrValue || "0");
		if (!this.sendModule.timelineunit.attrValueCode || !sku) return;
		console.log(`[${sku}, ${this.sendModule.timelineunit.attrValueCode}]`, "云主机")
		const product = this.proMap[`[${sku}, ${this.sendModule.timelineunit.attrValueCode}]`];  //获取产品信息

		if (!product) return;  //如果没获取到价格

		if (product.commonServiceAttrValue) {
			this.sendModule.bootsize.attrValue = product.commonServiceAttrValue.bootStorageSize;  //设置启动盘大小
			this.sendModule.bootsize.attrDisplayValue = product.commonServiceAttrValue.bootStorageSize + "GB";  
		}else{
			this.sendModule.bootsize.attrValue = "50"; 
			this.sendModule.bootsize.attrDisplayValue = "50G"; 
		}

		this.vmBasePrice = product.billingInfo.basePrice * this.payLoad.quality;  //一次性费用
		this.vmTotalPrice = (product.billingInfo.basicPrice + product.billingInfo.cyclePrice) * timeline * this.payLoad.quality;   //周期费用
	}
	setDiskPrice(): void {  //设置数据盘的价格
		const timeline = +(this.sendModule.timeline.attrValue || "0"),
			storages = this.storage.getData();   //获取数据盘
		this.diskSku = [];
		let basePrice = 0, totalPrice = 0;
		for (let data of storages) {
			let sku = this.getSkuId("disk");

			this.sendModule.storage = data.storage;
			this.diskSku.push(sku); //获取sku

			let price = this.proMap[`[${sku.skuId}]`];  //计算价格

			console.log(`[${sku.skuId}]`, "云硬盘")
			if (!price) return; //如果没获取到价格
			basePrice += price.billingInfo.basePrice * this.payLoad.quality;  //一次性费用
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

	getRelyName(relyAttrId): string {
		for (let config in this.configs) {
			if (this.configs[config].attrId === relyAttrId) {
				return config;
			}
		}
	}
	rely(attrName: string): VlueList[] {
		if (!this.configs[attrName].relyAttrId) return [];

		//根据他的依赖的id获取它自身的list
		const list = (this.configs[attrName].mapValueList && this.configs[attrName].mapValueList[this.sendModule[this.getRelyName(this.configs[attrName].relyAttrId)].attrValueId]) || [];

		const attrid = this.sendModule[attrName].attrValueId;   //获取当前的sendmoudle的attrid
		const isHas = (attrid && list && list.length && !!list.filter(l => l.attrValueId === attrid).length) || (!list.length && !attrid);   //列表里面是否有以选择的senModule
		//设置sendmodule使它选择第一个
		if (!isHas) {
			this.sendModule[attrName] = list.length ? list[0] : new VlueList;   //当没有选择sendmoudle的attrid时候，说明该模块还没有选择过，如果list里面没有这个attrid说明，他的父级已经有变动，需要重新选择
			this.relyChanges(attrName);     //上面的一步说明页面上有变化的 进行一些改变
		}

		return list;
	}

	relyChanges(attrName) {   //当依赖的元素有改变的时候执行
		/******获取并设置网络******/
		if (attrName === "zone") {   //这里捕捉不到平台，侧面的，当zone改变的时候说明 自己依赖的云平台已经改变
			this.setNetwork(this.sendModule.platform.attrValue);   //获取网络
		}
		/******获取并设置镜像列表******/
		if (attrName === "imagetype") {   //镜像有改变的时候，从rely函数里传进来的是父层的改变，从html里面捕捉click也会执行到这里
			this.setImage(this.sendModule.platform.attrValue, this.sendModule.imagetype.attrValue, this.sendModule.startupsource.attrValue);   //获取镜像列表
		}

		this.vmSku = this.getSkuId("vm");     //确定sku

		if (this.vmSku.skuId) {
			this.setTimeUnit();   // 设置购买时长
		}
	}

	private setNetwork(platformId: string) {  //设置可用网络
		this.layoutService.show();
		this.service.getNetwork(platformId).then(res => {
			this.layoutService.hide();
			if (!res.length) return;
			let list: VlueList[] = [];

			for (let r of res) {
				list.push({
					attrValueId: "",
					attrValueCode: r.networkcode,
					attrDisplayValue: r.networkDisplayName,
					attrValue: r.networkId,
				})
			}

			this.networkList = list;
			this.sendModule.networktype = list[0];
			console.log(this.sendModule)
		}).catch(e => {this.layoutService.hide()})
	}
	private setImage(platformId: string, imageType: string, startupResouce: string) { //获取镜像列表
		this.layoutService.show();
		this.service.getImage(platformId, imageType, startupResouce).then(res => {
			this.layoutService.hide();
			if (!res.length) return;
			let list: VlueList[] = [];

			for (let r of res) {
				list.push({
					attrValueId: "",
					attrValueCode: r.imageId,
					attrDisplayValue: r.imageDisplayName,
					attrValue: r.imageCode,
				})
			}

			this.imageList = list;
			this.sendModule.os = list[0];
		}).catch(error => {this.layoutService.hide()})
	}

	addCart() {   //加入购物车
		if (!this.checkInput()) return;
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

	checkValue(value?: string) { //动态验证
		const isinv = value => value === "";

		const regs = {
			platform: () => !isinv(this.sendModule.platform.attrValue),
			zone: () => !isinv(this.sendModule.zone.attrValue),
			cpu: () => !isinv(this.sendModule.cpu.attrValue),
			mem: () => !isinv(this.sendModule.mem.attrValue),
			networktype: () => !isinv(this.sendModule.networktype.attrValue),
			securitygroup: () => !isinv(this.sendModule.securitygroup.attrValue),
			startupsource: () => !isinv(this.sendModule.startupsource.attrValue),
			imagetype: () => !isinv(this.sendModule.imagetype.attrValue),
			os: () => !isinv(this.sendModule.os.attrValueCode),
			password: () => /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^\sA-Za-z0-9])\S{8,20}$/.test(this.sendModule.password.attrValue),
			passwordShadow: () => this.passwordShadow === this.sendModule.password.attrValue,
			instancename: () => !this.sendModule.instancename.attrValue || /^[a-zA-Z\u4e00-\u9fa5].{1,67}/.test(this.sendModule.instancename.attrValue),
			timeline: () => this.sendModule.timeline.attrValue && /^\d*$/.test(this.sendModule.timeline.attrValue.trim()) && +this.sendModule.timeline.attrValue.trim() <= 999,
			timelineunit: () => !isinv(this.sendModule.timelineunit.attrValue)
		};

		const alertValue = {
			password: "密码格式不正确",
			passwordShadow: "两次密码输入不一致",
			instancename: "主机名称格式不正确",
			timeline: "请输入购买时长为最大不超过999的数字",
			platform: "请选择云平台",
			zone: "请选择可用区",
			cpu: "请选择cpu",
			mem: "请选择内存",
			networktype: "请选择网络类型",
			securitygroup: "请选择安全组",
			startupsource: "请选择启动源",
			imagetype: "请选择镜像类型",
			os: "请选择镜像名称",
			timelineunit: "请选择网络类型"
		}

		const check = value => {
			this.check[value] = regs[value]();
			if (!this.check[value]) return alertValue[value];
		}

		if (!value) {
			for (let reg in regs) {
				let is = check(reg);
				if (is) return is;
			}
		} else {
			return check(value);
		}
	}

	checkInput(): boolean {
		const al = value => !!alert(value);

		// if(!this.vmSku.skuId) return al("sku不正确");

		const value = this.checkValue();
		if (value) return al(value);
		return true;
	}

	goTo(url: string) {
		this.router.navigateByUrl(url);
	}
	buyNow() {
		if (!this.checkInput()) return;
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
