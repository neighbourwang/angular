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

import { DispatchEvent } from "../../components/dispatch-event"

import { AttrList, PayLoad } from '../model/attr-list.model';
import { OrderOptions } from '../model/options.model';
import { OrderList, OrderService, SendModule, AttrConfigList, ValuesList, Values, TimeLineData, VlueList, SkuMap, ProMap, BillingInfo, Network, Image } from '../model/services.model';

@Component({
	selector: 'cloud-vm-order',
	templateUrl: '../template/cloud-host-order.component.html',
	styleUrls: ['../style/cloud-host-order.less'],
})
export class cloudVmComponentOrder implements OnInit {

	attrList: AttrConfigList = new AttrConfigList;
	valuesList: ValuesList = new ValuesList;
	values: Values = new Values;
	payLoad: PayLoad = new PayLoad();
	payLoadArr: PayLoad[];  //最后提交的是个PayLoad数组
	sendModule: SendModule;
	setPassword: boolean = true;

	bootsizeList: VlueList[] = [];
	networkList: VlueList[];
	imageList: VlueList[];

	passwordShadow: string;
	skuMap: SkuMap[];  //skuMap
	proMap: ProMap[];  //skuMap

	totalPrice: number = 0;
	vmSku: SkuMap = new SkuMap;
	vmSkuMap: SkuMap[];
	diskSku: SkuMap;
	vmProduct: ProMap; //最终匹配到的主机
	diskProduct: ProMap[] = []; //最终匹配到的硬盘

	vmBasePrice: number = 0; //云主机一次性费用
	vmTotalPrice: number = 0; //云主机费用
	diskBasePrice: number = 0; //云硬盘一次性费用
	diskTotalPrice: number = 0; //云硬盘费用
	diskUnitType: number = 0; //云硬盘类型

	isZoneSupportOs: boolean = true; //可用区是否支持该镜像

	tempImagetype =
	{
		"attrValueId": "tempid",
		"attrValueCode": null,
		"attrDisplayValue": "私有镜像",
		"attrValue": "1#2",
		"status": false
	}

	@ViewChild('confirm')
	private confirmDialog: ConfirmComponent;

	@ViewChild('notice')
	private noticeDialog: NoticeComponent;

	@ViewChild('popup')
	private popup: PopupComponent;

	modalTitle: string = '';
	modalMessage: string = '';
	modalOKTitle: string = '';

	@ViewChild('cartButton') cartButton;
	@ViewChild('storage') storage;

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private v: Validation,
		private dux: DispatchEvent,
		private service: cloudHostServiceOrder
	) {
		this.v.result = {};
	};

	ngOnInit() {
		this.makeSubscriber()
		this.fetchConfig()
	}

	/****初始化派发事件***/
	initDispatch() {
		// this.dux.dispatch("spec")  //规格选取
	}

	private makeSubscriber() {
		this.dux.subscribe("CONFIG_DONE", () => { this.setMapValueSubscriber() })   //先设置子层有依赖的订阅者
		this.dux.subscribe("CONFIG_DONE", () => { this.setDefaultValueList() })     //再无依赖的父层 并派发事件
		this.dux.subscribe("ZONE", () => { this.setNetwork() })
		this.dux.subscribe("IMAGETYPE", () => { this.setImage() })
		this.dux.subscribe("OS", () => { this.osChanged() })
		this.dux.subscribe("FINDE_VMSKU", () => { this.getSkuMap("vm") })
		this.dux.subscribe("FINDE_DISKSKU", () => { this.getSkuMap("disk") })
		this.dux.subscribe("SET_TIME_UNIT", () => { this.setTimeUnit() })
		this.dux.subscribe("SET_VMPRICE", () => { this.setVmPrice() })

		// this.dux.subscribe("spec", () => { this.changedSpec() })
		// this.dux.subscribe("resourcePoll", () => { this.changedSpec() })
		// this.dux.subscribe("phsical", () => { this.phsicalChange() })
		// this.dux.subscribe("phsical", () => { this.setOs() })
		// this.dux.subscribe("phsical", () => { this.setPhysicalInfo() })
	}

	private fetchConfig() {
		this.layoutService.show();
		this.service.getHostConfigList().then(configList => {
			configList.attrList.forEach(config => {
				this.layoutService.hide();

				this.attrList[config.attrCode] = config;
			});
			this.skuMap = configList.skuMap;
			this.proMap = configList.proMap;

			this.dux.dispatch("CONFIG_DONE")   //派发获取配置完成的时间
		}).catch(e => {
			this.layoutService.hide();
		})
	}

	//设置独立的含有valueList的默认值
	private setDefaultValueList() {
		for (let code in this.attrList) {
			if (this.attrList[code].valueList) {
				this.setValueListAndValue(code)
			}
		}
	}

	//设置有ralyid子层的订阅者
	private setMapValueSubscriber() {
		for (let code in this.attrList) {

			if (code === "OS" || code === "NETWORKTYPE") this.attrList[code].relyAttrId = ""   //去掉OS和NETWORKTYPE的relyid 因为他们是通过远程获取的

			if (this.attrList[code].relyAttrId) {
				let subCode, relyId = this.attrList[code].relyAttrId;
				for (let code in this.attrList) {
					if (this.attrList[code].attrId === relyId) {
						subCode = code;
						break;
					}
				}

				this.dux.subscribe(subCode, () => {
					if (!this.attrList[code].mapValueList || !this.values[subCode]) return false    //如果父层没有mapvaluelist 返回

					let valueList = this.attrList[code].mapValueList[this.values[subCode].attrValueId] || []
					this.setValueListAndValue(code, valueList)
				})
			}
		}
	}

	//设置默认值 并派发事件
	private setValueListAndValue(code, list?) {
		list = list ? list : this.attrList[code].valueList

		if (code === "IMAGETYPE") list = list.concat(this.tempImagetype) //后端未实现 临时添加

		this.valuesList[code] = list
		this.values[code] = this.valuesList[code].length ? this.valuesList[code][0] : new Values

		this.dux.dispatch(code)  //派发当前的code的subscriber
		if (["ZONE", "PLATFORM", "CPU", "MEM", "BOOTSIZE"].indexOf(code) > -1) this.dux.dispatch("FINDE_VMSKU")   //如果是这五个触发 匹配sku的事件
		if (["ZONE", "PLATFORM", "STORAGE"].indexOf(code) > -1) this.dux.dispatch("FINDE_DISKSKU")   //如果是这五个触发 匹配sku的事件
	}


	private setNetwork() {  //设置可用网络
		this.layoutService.show();
		this.service.getNetwork(this.values.PLATFORM.attrValue, this.values.ZONE.attrValue).then(res => {
			this.layoutService.hide();
			let list: VlueList[] = [];

			for (let r of res) {
				if (r.networkType != "2") continue;
				list.push({
					attrValueId: "",
					attrValueCode: r.networkcode,
					attrDisplayValue: r.networkDisplayName,
					attrValue: r.networkId,
				})
			}

			this.setValueListAndValue("NETWORKTYPE", list)
		}).catch(e => {
			this.setValueListAndValue("NETWORKTYPE", [])
			this.layoutService.hide();
		})
	}

	private setImage() { //获取镜像列表
		if (!(this.values.PLATFORM && this.values.STARTUPSOURCE && this.values.IMAGETYPE)) return this.setValueListAndValue("OS", []);

		this.layoutService.show();
		this.service.getImage(this.values.PLATFORM.attrValue, this.values.IMAGETYPE.attrValue, this.values.STARTUPSOURCE.attrValue).then(res => {
			this.layoutService.hide();
			let list: VlueList[] = [];

			for (let r of res) {
				list.push({
					attrValueId: "",
					attrValueCode: r.imageId,
					attrDisplayValue: r.imageDisplayName,
					attrValue: r.imageCode,
					capacity: r.capacity,
					osType: r.osType
				})
			}

			this.setValueListAndValue("OS", list)
		}).catch(error => {
			this.setValueListAndValue("OS", []);
			this.layoutService.hide()
		})
	}

	private osChanged() {
		if (!this.values.USERNAME || !this.values.OS) return

		this.values.USERNAME.attrValue = this.values.OS.osType == 0 ? "administrtor" : "root";
	}

	private oSfilterBootsize(bootSizeList: VlueList[]): VlueList[] {  //根据os的大小过滤bootsize的大小
		if (!this.values.OS) return [];

		const filteredList = bootSizeList.filter(bootSizeObj =>
			parseInt(bootSizeObj.attrValue) * 1024 * 1024 * 1024 >= this.values.OS.capacity
		);

		setTimeout(res => {
			this.isZoneSupportOs = !!filteredList.length;
		}, 0);
		return filteredList;
	}

	private getSkuMap(code: "vm" | "disk"): SkuMap[] {   //获取根据参数获取的sku数组 因为云主机的sku不止一个

		let list = code === "vm" ? ["ZONE", "PLATFORM", "CPU", "MEM", "BOOTSIZE"].map(v => this.values[v].attrValueId)   //vm主机订单的sku匹配的选项 需要匹配可用区 平台 cpu 内存
			: code === "disk" ? ["ZONE", "PLATFORM", "STORAGE"].map(v => this.values[v].attrValueId) : [];  //云硬盘订单的sku匹配的选项 需要匹配 平台 可用区 （还有一个硬盘类型 由下面添加）

		const trim = val => val.replace("[", "").replace("]", "");

		for (let v of list) if (!v || !list.length) return [];  //如果列表存在空值 直接return出去 不再匹配

		let totalId = list.join(","),
			nub = 0,	//验证sku成功的个数
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
		console.log("匹配的sku列表：", code, skuMap)
		if (code === "vm") this.vmSku = skuMap[0]   //目前sku只有一个 所以取第一个
		if (code === "disk") this.diskSku = skuMap[0]
		this.dux.dispatch("SET_TIME_UNIT")
	}

	private setTimeUnit(): void {
		if (!(this.vmSku && this.vmSku.skuId)) return;

		const timeUnit = this.attrList.TIMELINEUNIT.mapValueList[this.vmSku.skuId];
		this.setValueListAndValue("TIMELINEUNIT", timeUnit)

		this.dux.dispatch("SET_VMPRICE")
	}

	private setVmPrice(): void {   //设置主机的价格
		const sku = this.vmSku.skuId,
			timeline = +(this.values.TIMELINE.attrValue || "0");
		// console.log(this.values.TIMELINEUNIT.attrValueCode)
		if (!this.values.TIMELINEUNIT.attrValueCode || !sku) return;
		this.vmProduct = this.proMap[`[${sku}, ${this.values.TIMELINEUNIT.attrValueCode}]`];  //获取产品信息

		console.log("匹配到的云主机：", this.vmProduct)
		if (!this.vmProduct) return;  //如果没获取到价格

		this.vmBasePrice = this.vmProduct.billingInfo.basePrice * this.payLoad.quality;  //一次性费用
		this.vmTotalPrice = (this.vmProduct.billingInfo.basicPrice) * timeline * this.payLoad.quality;   //周期费用
	}
	// private setDiskPrice(): void {  //设置数据盘的价格
	//	const timeline = +(this.values.TIMELINE.attrValue || "0"),
	//		storages = this.storage ? this.storage.getData() : [];   //获取数据盘

	//	let basePrice = 0, totalPrice = 0;
	//	for (let data of storages) {
	//		let skuMap = this.getSkuMap("disk");

	//		if(!skuMap.length) return;  //如果没有获取到sku

	//		let sku = skuMap[0];
	//		this.values.STORAGE = data.storage;
	//		this.diskSku.push(sku); //获取sku

	//		let price = this.proMap[`[${sku.skuId}]`];  //计算价格
	//		this.diskProduct.push(price);

	//		console.log("匹配到的云硬盘：", price)
	//		if (!price) return; //如果没获取到价格

	//		basePrice += price.billingInfo.basePrice * this.payLoad.quality;  //一次性费用
	//		totalPrice += price.billingInfo.unitPrice * data.storagesize.attrValue * this.payLoad.quality;   //周期费用

	//		this.diskUnitType = price.billingInfo.unitType;
	//	}

	//	this.diskBasePrice = basePrice;  //一次性费用
	//	this.diskTotalPrice = totalPrice;   //周期费用
	// }

	checkValue(key?: string) {
		const regs: ValidationRegs = {
			platform: [this.values.PLATFORM.attrValue, [this.v.isUnBlank], "VM_INSTANCE.PLEASE_SELECT_CLOUD_PALTFORM"],
			zone: [this.values.ZONE.attrValue, [this.v.isUnBlank], "VM_INSTANCE.PLEASE_SELECT_AVAILABLE_ZONE"],
			cpu: [this.values.CPU.attrValue, [this.v.isUnBlank], "VM_INSTANCE.PLEASE_SELECT_CPU"],
			mem: [this.values.MEM.attrValue, [this.v.isUnBlank], "VM_INSTANCE.PLEASE_SELECT_RAM"],
			networktype: [this.values.NETWORKTYPE.attrValue, [this.v.isUnBlank], "VM_INSTANCE.PLEASE_SELECT_NET_TYPE"],
			securitygroup: [this.values.SECURITYGROUP.attrValue, [this.v.isUnBlank], "VM_INSTANCE.PLEASE_SELECT_SECURITY_GROUP"],
			startupsource: [this.values.STARTUPSOURCE.attrValue, [this.v.isUnBlank], "VM_INSTANCE.PLEASE_SELECT_STARTUP_SOURCE"],
			imagetype: [this.values.IMAGETYPE.attrValue, [this.v.isUnBlank], "VM_INSTANCE.PLEASE_SELECT_IMAGE_TYPE"],
			os: [this.values.OS.attrValueCode, [this.v.isUnBlank], "VM_INSTANCE.PLEASE_SELECT_IMAGE_NAME"],
			password: [this.values.PASSWORD.attrValue, [this.v.isPassword, this.v.lengthRange(8, 30), this.v.isUnBlank], "VM_INSTANCE.PASSWORD_FORMAT_IS_NOT_CORRECT"],
			passwordShadow: [this.passwordShadow, [this.v.equalTo(this.values.PASSWORD.attrValue), this.v.isUnBlank], "VM_INSTANCE.TWO_PASSWORD_ENTRIES_ARE_INCONSISTENT"],
			instancename: [this.values.INSTANCENAME.attrValue, [this.v.isInstanceName, this.v.isBase], "VM_INSTANCE.HOST_NAME_FORMAT_IS_NOT_CORRECT"],
			timeline: [this.values.TIMELINE.attrValue.trim(), [this.v.isNumber, this.v.max(999), this.v.isUnBlank], "VM_INSTANCE.PURCHASE_DURATION_DESCRIPTION"],
			timelineunit: [this.values.TIMELINEUNIT.attrValue, [this.v.isUnBlank], "VM_INSTANCE.PLEASE_SELECT_TIMELINE_UNIT"],
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

		return Promise.all([this.service.getPlatformQuota(this.values.PLATFORM.attrValue), this.service.getQuotaResoure()]).then(res => {
			const [platformQuota, quotaResoure] = res;
			console.log(platformQuota, quotaResoure, this.values.MEM.attrValue, this.values.CPU.attrValue)
			return argAllTrue(
				compare(quotaResoure.mem || 0 - quotaResoure.usedMem || 0, +this.values.MEM.attrValue),
				compare(quotaResoure.vcpu || 0 - quotaResoure.usedCpu || 0, this.values.CPU.attrValue),
				compare(platformQuota.memory || 0, +this.values.MEM.attrValue),
				compare(platformQuota.cpu || 0, this.values.CPU.attrValue),
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
				throw "配额不足";
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

	private itemNum: number = 0;
	private makeItemNum(): string {
		return new Date().getTime() + "" + (this.itemNum++);
	}

	private sendModuleToPay(): AttrList[] {   //把sendModule转换成数组
		let payloadList = [];

		for (let v in this.values) {
			if(this.values[v].attrValueCode === "" && this.values[v].attrValue === "")  continue;

			payloadList.push({
				attrId: this.attrList[v].attrId,                  	//服务属性ID
				attrCode: this.attrList[v].attrCode,              	//服务属性CODE
				attrDisplayValue: this.values[v].attrDisplayValue,	//服务属性Name
				attrDisplayName: this.attrList[v].attrDisplayName,	//服务属性Name
				attrValueId: this.values[v].attrValueId,          	//服务属性值ID
				attrValue: this.values[v].attrValue,              	//服务属性值
				attrValueCode: this.values[v].attrValueCode,      	//服务属性值
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


	buyNow() {
		this.submitCheck().then(payLoadArr => {
			if(!payLoadArr) return;

			this.layoutService.show();
			this.service.saveOrder(payLoadArr).then(res => {
				this.layoutService.hide();
				this.router.navigate(['cloud-host-service/cart-order/', JSON.stringify(res)]);
			}).catch(error => {
				this.layoutService.hide();
			})
		})
	}
	// 警告框相关
	showNotice(title: string, msg: string) {
		this.modalTitle = title;
		this.modalMessage = msg;

		this.noticeDialog.open();
	}
	modalAction() { }
}
