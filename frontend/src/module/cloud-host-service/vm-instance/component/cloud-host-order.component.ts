/**
 * [订购逻辑]
 * 基本介绍：
 * 1. 本页面能提交一个云主机，和三个挂载到该主机上的云硬盘，总共最多四个订单
 * 2. 每个订单最后提交的都是一个 PayLoad， 发给后端的是payLoadArr 是一个PayLoad数组
 * 3. sendModule是和页面绑定的数据，最终是要转换成PayLoad
 *
 * 流程介绍：
 * 1. 每个订单根据所选来获取一个产品的列表
 * 2. 根据产品的列表获取到启动盘的列表
 * 3. 根据启动盘的列表确定最终的sku
 * 4. 根据sku的id 来获取时长单位
 * 5. 根据sku id与时长单位获取来获取价格 
 * 6. 提交的时候根据sendModule转换成PayLoad
 */

import { Component, ViewChild, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, ValidationRegs, Validation } from '../../../../architecture';
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

	@ViewChild('confirm')
	private confirmDialog: ConfirmComponent;

	@ViewChild('notice')
	private noticeDialog: NoticeComponent;

	@ViewChild('popup')
	private popup: PopupComponent;

	@Input() options: OrderOptions;

	modalTitle: string = '';
	modalMessage: string = '';
	modalOKTitle: string = '';

	totalPrice: number = 0;
	vmSku: SkuMap = new SkuMap;
	vmSkuMap: SkuMap[];
	diskSku: SkuMap[];
	vmProduct: ProMap; //最终匹配到的主机
	diskProduct: ProMap[] = []; //最终匹配到的硬盘

	bootsizeList : VlueList[] = [];
	networkList: VlueList[];
	imageList: VlueList[];

	vmBasePrice: number = 0; //云主机一次性费用
	vmTotalPrice: number = 0; //云主机费用
	diskBasePrice: number = 0; //云硬盘一次性费用
	diskTotalPrice: number = 0; //云硬盘费用
	diskUnitType: number = 0; //云硬盘类型

	isZoneSupportOs: boolean = true; //可用区是否支持该镜像

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
		private v: Validation,
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
			this.configs["bootstorage"].mapValueList = this.configs["storage"].mapValueList;  //临时添加
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

	private getSkuMap(code: "vm" | "disk"): SkuMap[] {   //获取根据参数获取的sku数组 因为云主机的sku不止一个

		let list = code === "vm" ? ["zone", "platform", "cpu", "mem", "bootsize"].map(v => this.sendModule[v].attrValueId)   //vm主机订单的sku匹配的选项 需要匹配可用区 平台 cpu 内存
			: code === "disk" ? ["zone", "platform", "storage"].map(v => this.sendModule[v].attrValueId) : [];  //云硬盘订单的sku匹配的选项 需要匹配 平台 可用区 （还有一个硬盘类型 由下面添加）

		const trim = val => val.replace("[", "").replace("]", "");

		for (let v of list) if (!v || !list.length) return [];  //如果列表存在空值 直接return出去 不再匹配

		let totalId = list.join(","),
			nub = 0, 	//验证sku成功的个数
			skuValue = {},
			skuMap = [];

		for (let sku in this.skuMap) {
			sku.split(", ").forEach(skuString => {
				if (totalId.indexOf(trim(skuString)) > -1) nub++;
			});
			if (nub === list.length) {
				skuMap.push(this.skuMap[sku]);
			}
			nub = 0;
		}
		console.log("匹配的sku列表：" ,skuMap)
		return skuMap;
	}

	private itemNum: number = 0;
	private makeItemNum(): string {
		return new Date().getTime() + "" + (this.itemNum++);
	}

	private sendModuleToPay(): AttrList[] {   //把sendModule转换成数组
		let payloadList = [];

		for (let v in this.sendModule) {
			if(this.sendModule[v].attrValueCode === "" && this.sendModule[v].attrValue === "")  continue;

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
console.log(this.vmProduct)
		/****下面开始处云主机订单的逻辑****/
		let payloadList = this.sendModuleToPay(),
			itemNo = this.makeItemNum(),
			payLoad = {
				skuId: this.vmSku.skuId,
				productId: this.vmProduct.productId,
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
		const storages = this.storage ? this.storage.getData() : [];   //获取数据盘

		if (storages.length) {   //如果有数据盘的数据
			for (let storage of storages) {
				this.sendModule.storage = storage.storage;
				this.sendModule.disksize = storage.storagesize;
				this.sendModule.storagesize = storage.storagesize;

				let sku = this.getSkuMap("disk")[0],
					pro = this.diskProduct[0],
					payloadList = this.sendModuleToPay();
				payLoad = {
					skuId: sku.skuId,
					productId: pro.productId,
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
		console.log("发送的订单数据：" , this.payLoadArr)
		return this.payLoadArr;
	}

	setVmPrice(): void {   //设置主机的价格
		const sku = this.vmSku.skuId,
			timeline = +(this.sendModule.timeline.attrValue || "0");
		console.log(this.sendModule.timelineunit.attrValueCode)
		if (!this.sendModule.timelineunit.attrValueCode || !sku) return;
		this.vmProduct = this.proMap[`[${sku}, ${this.sendModule.timelineunit.attrValueCode}]`];  //获取产品信息

		console.log("匹配到的云主机：", this.vmProduct)		
		if (!this.vmProduct) return;  //如果没获取到价格

		this.vmBasePrice = this.vmProduct.billingInfo.basePrice * this.payLoad.quality;  //一次性费用
		this.vmTotalPrice = (this.vmProduct.billingInfo.basicPrice) * timeline * this.payLoad.quality;   //周期费用
	}
	setDiskPrice(): void {  //设置数据盘的价格
		const timeline = +(this.sendModule.timeline.attrValue || "0"),
			storages = this.storage ? this.storage.getData() : [];   //获取数据盘
		this.diskSku = [];
		let basePrice = 0, totalPrice = 0;
		for (let data of storages) {
			let skuMap = this.getSkuMap("disk");

			if(!skuMap.length) return;  //如果没有获取到sku

			let sku = skuMap[0];
			this.sendModule.storage = data.storage;
			this.diskSku.push(sku); //获取sku

			let price = this.proMap[`[${sku.skuId}]`];  //计算价格
			this.diskProduct.push(price);

			console.log("匹配到的云硬盘：", price)
			if (!price) return; //如果没获取到价格

			basePrice += price.billingInfo.basePrice * this.payLoad.quality;  //一次性费用
			totalPrice += price.billingInfo.unitPrice * data.storagesize.attrValue * this.payLoad.quality;   //周期费用

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
			this.setNetwork(this.sendModule.platform.attrValue, this.sendModule.zone.attrValue);   //获取网络
		}
		/******获取并设置镜像列表******/
		if (attrName === "imagetype" || attrName === "zone") {   //镜像有改变的时候，从rely函数里传进来的是父层的改变，从html里面捕捉click也会执行到这里
			this.setImage(this.sendModule.platform.attrValue, this.sendModule.imagetype.attrValue, this.sendModule.startupsource.attrValue);   //获取镜像列表
		}

		this.vmSkuMap = this.getSkuMap("vm");     //确定sku

		if (this.vmSkuMap.length) {
			this.vmSku = this.vmSkuMap[0];   // 设置启动盘大小
			this.setTimeUnit();
		}
	}

	private setTimeUnit(): void {
		if (!this.vmSku.skuId) return;

		const timeUnit = this.configs.timelineunit.mapValueList[this.vmSku.skuId];
		if (timeUnit && timeUnit.length) {
			this.sendModule.timelineunit = timeUnit[0];    //设置一下时长为第一位
			this.setVmPrice();   //拿到时长就可以设置主机价格了  
		}
	}

	// private setBootsize() {
	// 	this.bootsizeList = this.vmSkuMap.map(vmsku => {
	// 		let bootsize = this.configs.bootsize.mapValueList[vmsku.skuId];
			
	// 		if(!bootsize && !bootsize.length) return;

	// 		bootsize[0].sku = vmsku;
	// 		return bootsize[0];
	// 	});
	// 	this.sendModule.bootsize = this.bootsizeList[0];   //设置一下启动盘为第一位
	// 	this.bootSizeChange();
	// }
	// bootSizeChange() {   //监听启动盘大小列表的改变， 只有启动盘大小列表的改变才能确定vm的skuid
	// 	this.vmSku = this.sendModule.bootsize.sku;
	// 	this.setTimeUnit(); //确定了真正的skuid后 再去确定购买时长
	// }

	private setNetwork(platformId: string, zoneId: string) {  //设置可用网络
		this.layoutService.show();
		this.service.getNetwork(platformId,zoneId).then(res => {
			this.layoutService.hide();
			if (!res.length) return;
			let list: VlueList[] = [];

			for (let r of res) {
				if(r.networkType != "2") continue;
				list.push({
					attrValueId: "",
					attrValueCode: r.networkcode,
					attrDisplayValue: r.networkDisplayName,
					attrValue: r.networkId,
				})
			}

			this.networkList = list;
			this.sendModule.networktype = list[0];
		}).catch(e => {
			this.networkList = [];
			this.layoutService.hide();
		})
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
					capacity: r.capacity
				})
			}

			this.imageList = list;
			this.sendModule.os = list[0];
		}).catch(error => {
			this.imageList = [];
			this.layoutService.hide()
		})
	}

	oSfilterBootsize(bootSizeList:VlueList[]):VlueList[] {  //根据os的大小过滤bootsize的大小
		if(!this.sendModule.os.attrValueCode) return bootSizeList;

		const filteredList = bootSizeList.filter(bootSizeObj => 
			parseInt(bootSizeObj.attrValue)*1024*1024*1024 >= this.sendModule.os.capacity
		);
		
		setTimeout(res => {
			this.isZoneSupportOs = !!filteredList.length;
		},0);
		return filteredList;
	}

	checkValue(key?:string){
		const regs:ValidationRegs = {
			platform: [this.sendModule.platform.attrValue, [this.v.isUnBlank], "VM_INSTANCE.PLEASE_SELECT_CLOUD_PALTFORM"],
			zone: [this.sendModule.zone.attrValue, [this.v.isUnBlank], "VM_INSTANCE.PLEASE_SELECT_AVAILABLE_ZONE"],
			cpu: [this.sendModule.cpu.attrValue, [this.v.isUnBlank], "VM_INSTANCE.PLEASE_SELECT_CPU"],
			mem: [this.sendModule.mem.attrValue, [this.v.isUnBlank], "VM_INSTANCE.PLEASE_SELECT_RAM"],
			networktype: [this.sendModule.networktype.attrValue, [this.v.isUnBlank], "VM_INSTANCE.PLEASE_SELECT_NET_TYPE"],
			securitygroup: [this.sendModule.securitygroup.attrValue, [this.v.isUnBlank], "VM_INSTANCE.PLEASE_SELECT_SECURITY_GROUP"],
			startupsource: [this.sendModule.startupsource.attrValue, [this.v.isUnBlank], "VM_INSTANCE.PLEASE_SELECT_STARTUP_SOURCE"],
			imagetype: [this.sendModule.imagetype.attrValue, [this.v.isUnBlank], "VM_INSTANCE.PLEASE_SELECT_IMAGE_TYPE"],
			os: [this.sendModule.os.attrValueCode, [this.v.isUnBlank], "VM_INSTANCE.PLEASE_SELECT_IMAGE_NAME"],
			password: [this.sendModule.password.attrValue, [this.v.isPassword, this.v.lengthRange(8,30), this.v.isUnBlank], "VM_INSTANCE.PASSWORD_FORMAT_IS_NOT_CORRECT"],
			passwordShadow: [this.passwordShadow, [this.v.equalTo(this.sendModule.password.attrValue), this.v.isUnBlank], "VM_INSTANCE.TWO_PASSWORD_ENTRIES_ARE_INCONSISTENT"],
			instancename: [this.sendModule.instancename.attrValue, [this.v.isInstanceName, this.v.isBase], "VM_INSTANCE.HOST_NAME_FORMAT_IS_NOT_CORRECT"],
			timeline: [this.sendModule.timeline.attrValue.trim(), [this.v.isNumber, this.v.max(999), this.v.isUnBlank], "VM_INSTANCE.PURCHASE_DURATION_DESCRIPTION"],
			timelineunit: [this.sendModule.timelineunit.attrValue, [this.v.isUnBlank], "VM_INSTANCE.PLEASE_SELECT_TIMELINE_UNIT"],
		}

		return this.v.check(key, regs);
	}

	checkInput(): boolean {
		const al = value => !!this.showNotice("提示",value);

		// if(!this.vmSku.skuId) return al("sku不正确");

		const value = this.checkValue();
		if (value) return al(value);
		return true;
	}

	checkQuota():Promise<boolean> {  //计算配额
		const compare = (big, small) =>  +big >= +small;  //比较大小
		const argAllTrue = (...arg:boolean[]) => arg.filter(r => r).length === arg.length;    //传来的参数全为真

		return Promise.all([this.service.getPlatformQuota(this.sendModule.platform.attrValue), this.service.getQuotaResoure()]).then(res => {
			const [platformQuota, quotaResoure] = res;
			
			return argAllTrue(
				compare(quotaResoure.mem || 0 - quotaResoure.usedMem || 0, this.sendModule.mem.attrValue),
				compare(quotaResoure.vcpu || 0 - quotaResoure.usedCpu || 0, this.sendModule.cpu.attrValue),
				compare(platformQuota.memory || 0, this.sendModule.mem.attrValue),
				compare(platformQuota.cpu || 0, this.sendModule.cpu.attrValue),
			)
		})
	}

	goTo(url: string) {
		this.router.navigateByUrl(url);
	}

	submitCheck():Promise<PayLoad[]>{  //检测是否可以提交订单
		if (!this.checkInput()) return Promise.reject("提示一下：表单验证不通过");

		this.layoutService.show();
		return this.checkQuota().then(isEnoughQuota => {
			this.layoutService.hide();
			if(!isEnoughQuota) {
				this.showNotice("提示","部门或平台配额不足, 无法完成购买！");
				return;
			}

			return this.payLoadFormat();   //获取最新的的payload的对象
			
		}).catch(res => {
			this.layoutService.hide();
		})
	}

	addCart() {   //加入购物车
		this.submitCheck().then(payLoadArr => {
			this.layoutService.show();
			return this.service.addCart(payLoadArr).then(res => {
				this.layoutService.hide();
				this.noticeDialog.open("","CLOUD_DRIVE_ORDER.SUCCESSFULLY_ADDED_TO_SHOPPING_CART");
				this.cartButton.setCartList();
				// this.router.navigateByUrl("cloud-host-service/cloud-host-list");
			}).catch(res => {
				this.layoutService.hide();
			})
		});
	}
	buyNow() {
		this.submitCheck().then(payLoadArr => {
			this.layoutService.show();
			this.service.saveOrder(payLoadArr).then(res => {
				this.layoutService.hide();
				this.router.navigate(['cloud-host-service/cart-order/', JSON.stringify(res)]);
			}).catch(error => {
				this.layoutService.hide();
			})
		})
	};


	// 警告框相关
	showNotice(title: string, msg: string) {
	    this.modalTitle = title;
	    this.modalMessage = msg;

	    this.noticeDialog.open();
	}
	modalAction() {}
}
