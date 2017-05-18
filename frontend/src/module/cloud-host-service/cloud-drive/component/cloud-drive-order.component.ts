/**
***********子组件*************
 * [订购逻辑]
 * 参考订购云主机的逻辑
 */

import { Component, OnInit, Input , Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, Validation, ValidationRegs  } from '../../../../architecture';
import { TranslateService } from 'ng2-translate';
import { cloudDriveServiceOrder } from '../service/cloud-drive-order.service'

import { AttrList, PayLoad } from '../model/attr-list.model';
import { OrderOptions } from '../model/options.model';
import { OrderList, OrderService, SendModule,TimeLineData, VlueList, SkuMap, ProMap, BillingInfo } from '../model/services.model';

@Component({
	selector: 'cloud-drive-order',
	templateUrl: '../template/cloud-drive-order.component.html',
	styleUrls: ['../style/cloud-drive-order.less']
})
export class cloudDriveComponentOrder implements OnInit {

	@ViewChild('cartButton') cartButton;

	@ViewChild('confirm')
	private confirmDialog: ConfirmComponent;

	@ViewChild('notice')
	private noticeDialog: NoticeComponent;

	@ViewChild('popup')
	private popup: PopupComponent;

	@Input() options:OrderOptions;

	configs: OrderList;
	payLoad: PayLoad;
	payLoadArr : PayLoad[];  //最后提交的是个PayLoad数组
	sendModule: SendModule;
	setPassword: boolean = false;

	modalTitle: string = '';
	modalMessage: string = '';
	modalOKTitle: string = '';

	// timeForever : boolean = false;

	// rightFixed : boolean = false;   //让右侧配置起飞
	sku : SkuMap = new SkuMap;

	passwordShadow: string;
	skuMap: SkuMap[];  //skuMap
	proMap: ProMap[];  //skuMap
	product: ProMap; //最终匹配到的硬盘

	diskBasePrice : number = 0; //云硬盘一次性费用
	diskTotalPrice : number = 0; //云硬盘费用
	diskUnitType : number = 0; //云硬盘类型

	isAttachVm: boolean = false;

    constructor(
        private translateService: TranslateService,
		private layoutService: LayoutService,
		private router: Router,
		private v:Validation,
		private service:cloudDriveServiceOrder
	) {
		this.configs = new OrderList();
		this.sendModule = new SendModule();
		this.payLoad = new PayLoad();
		this.v.result = {};
	}

	ngOnInit() {
		this.setConfigList();
		this.service.dictRelyType.then(res => {
			console.log(res)
		})
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
			this.skuMap = configList.skuMap;
			this.proMap = configList.proMap;

			//设置初始化的硬盘大小
			this.sendModule.disksize.attrValue = this.sendModule.diskinitialsize.attrValue;
			this.sendModule.disksize.attrDisplayValue = this.sendModule.diskinitialsize.attrValue + "GB";
		}).then(res => {
			this.layoutService.hide();
		}).catch(e => {
			this.layoutService.hide();
		})
	}


	private getSkuId(): SkuMap {   //获取skuID和productId

		let list = ["zone", "platform","storage"].map(v => this.sendModule[v].attrValueId);  //云硬盘订单的sku匹配的选项 需要匹配 平台 可用区 （还有一个硬盘类型 由下面添加）

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

	//把payLoad转换成提交的post对象
	private payLoadFormat(): PayLoad[] {

		// this.sendModule.diskinsname.attrValue = (window as any).escape(this.sendModule.diskinsname.attrDisplayValue).toLocaleLowerCase().replace(/%u/gi,'\\u');

		let payloadList = [];
		for (let v in this.sendModule) {
			payloadList.push({
				attrId: this.configs[v].attrId,                       	//服务属性ID
				attrCode: this.configs[v].attrCode,                   	//服务属性CODE
				attrDisplayValue: this.sendModule[v].attrDisplayValue,	//服务属性Name
				attrDisplayName: this.configs[v].attrDisplayName,     	//服务属性Name
				attrValueId: this.sendModule[v].attrValueId,          	//服务属性值ID
				attrValue: this.sendModule[v].attrValue,              	//服务属性值
				attrValueCode: this.sendModule[v].attrValueCode,      	//服务属性值
			});
		};

		this.payLoad.skuId = this.sku.skuId;
		this.payLoad.productId = this.product.productId;
		this.payLoad.attrList = payloadList;
		this.payLoad.itemNo = this.makeItemNum();
		this.payLoad.serviceType = "1";  //云硬盘的type
		this.payLoad.relyType = this.sendModule.diskmounthostid.attrValue ? "1" : "0";  //依赖类型

		this.payLoadArr = [];
		this.payLoadArr.push(this.payLoad);

		console.log("发送的数据：", this.payLoad)

		return this.payLoadArr;
	}

	setSenModule(config: OrderService): void {

		const isValueLength = config.valueList && config.valueList.length;
		const attrName = config.attrCode.toLowerCase();

		//设置创建云硬盘的属性列表
		isValueLength ? this.sendModule[attrName] = config.valueList[0] : 0;   //默认第一个
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
		const list = this.configs[attrName].mapValueList[this.sendModule[this.getRelyName(this.configs[attrName].relyAttrId)].attrValueId] || [];

		const attrid = this.sendModule[attrName].attrValueId;   //获取当前的sendmoudle的attrid
		const isHas = attrid && list && list.length && !!list.filter(l => l.attrValueId === attrid).length;   //列表里面是否有以选择的senModule
		 //设置sendmodule使它选择第一个
		if(list.length && (!attrid || !isHas)) this.sendModule[attrName] = list[0];   //当没有选择sendmoudle的attrid时候，说明该模块还没有选择过，如果list里面没有这个attrid说明，他的父级已经有变动，需要重新选择

		this.setDiskPrice();
		return list;
	}

	setDiskPrice(): void {  //设置数据盘的价格
		const sku = this.getSkuId();
		console.log(sku);
		if(!sku.skuId) return;
		this.sku = sku;

		this.setTimeUnit();  //设置购买时长

		let price = this.proMap[`[${sku.skuId}, ${this.sendModule.timelineunit.attrValueCode}]`];  //计算价格
		if(!price) return;

		this.product = price;

		this.diskBasePrice = price.billingInfo.basePrice * this.payLoad.quality;  //一次性费用
		this.diskTotalPrice = price.billingInfo.unitPrice * +this.sendModule.disksize.attrValue * this.payLoad.quality;   //周期费用

		this.diskUnitType = price.billingInfo.unitType;
	}

	outputValue(value) {
		this.sendModule.disksize.attrValue = value;
		this.sendModule.disksize.attrDisplayValue = value + "GB";
	}

	addCart() {   //加入购物车
		if(!this.checkInput()) return;
		this.layoutService.show();
		let payLoadArr = this.payLoadFormat();   //获取最新的的payload的对象
		this.service.addCart(payLoadArr).then(res => {
            this.layoutService.hide();
          
            this.noticeDialog.open("","CLOUD_DRIVE_ORDER.SUCCESSFULLY_ADDED_TO_SHOPPING_CART");
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

	checkValue(key?:string){
		const regs:ValidationRegs = {
			platform: [this.sendModule.platform.attrValue, [this.v.isUnBlank], "CLOUD_DRIVE_ORDER.PLEASE_SELECT_CLOUD_PLATFORM"],
			zone: [this.sendModule.zone.attrValue, [this.v.isUnBlank], "CLOUD_DRIVE_ORDER.PLEASE_SELECT_AVAILABLE_ZONE"],
			disktype: [this.sendModule.disktype.attrValue, [this.v.isUnBlank], "CLOUD_DRIVE_ORDER.PLEASE_SELECT_CLOUD_HARD_DISK"],
			storage: [this.sendModule.storage.attrValue, [this.v.isUnBlank], "CLOUD_DRIVE_ORDER.PLEASE_SELECT_CLOUD_HARD_DISK_TYPE"],
			diskinsname: [this.sendModule.diskinsname.attrValue, [this.v.isInstanceName, this.v.isBase], "CLOUD_DRIVE_ORDER.CLOUD_HARD_DISK_NAME_FORMAT_IS_NOT_CORRECT"]
		}

		return this.v.check(key, regs);
	}
	

	checkInput() {
		const al = value => !!this.showNotice("COMMON.PROMPT",value);

		if(!this.sku) return al("CLOUD_DRIVE_ORDER.SKU_IS_NOT_CORRECT");  //CLOUD_DRIVE_ORDER.SKU_IS_NOT_CORRECT

		const value = this.checkValue();
		if(value) return al(value);
		return true;
	}

	vmListClick(vm) {
		if(this.isAttachVm && vm) {
			this.sendModule.diskmounthostid.attrValue = vm.uuid;
			this.sendModule.diskmounthostname.attrValue = vm.instanceName;
		}else {
			this.sendModule.diskmounthostid.attrValue = "";
			this.sendModule.diskmounthostname.attrValue = "";
		}
	}

	private setTimeUnit(): void {
		if (!this.sku.skuId) return;

		const timeUnit = this.configs.timelineunit.mapValueList[this.sku.skuId];
		if (timeUnit && timeUnit.length) {
			this.sendModule.timelineunit = timeUnit[0];    //设置一下时长为第一位
		}
	}

	goTo(url: string) {
		this.router.navigateByUrl(url);
	}
	buyNow() {
		if(!this.checkInput()) return;
		this.layoutService.show();
		let payLoadArr = this.payLoadFormat();   //获取最新的的payload的对象
		console.log(this.sendModule, payLoadArr)
		console.log(JSON.stringify(payLoadArr))
		this.service.saveOrder(payLoadArr).then(res => {
			this.layoutService.hide();
			this.router.navigate(['cloud-host-service/cart-order/', JSON.stringify(res)]);
		}).catch(res => {
			this.layoutService.hide();
		})
	}



	// 警告框相关
	showNotice(title: string, msg: string) {
	    this.modalTitle = title;
	    this.modalMessage = msg;

	    this.noticeDialog.open();
	}
	modalAction() {}

}
