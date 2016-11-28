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

	private getSkuId(payLoadList: AttrList[]): { skuId: string, productId: string } {   //获取skuID和productId
		const trim = val => val.replace("[", "").replace("]", ""),
			totalId = payLoadList.map(list => list.attrId).join(",");

		let nub = 0, 	//验证sku成功的个数
			skuValue = "";  

		for (let sku in this.skuMap) {
			sku.split(", ").forEach(skuString => {
				totalId.indexOf(trim(skuString))
			})
		}

		return {
			skuId: "1c8628ae-f062-4250-8439-df50f7fe82d8",
			productId: "3ddb2960-eb3c-449c-90de-fd62235c249c"
		};
	}

	private itemNum:number = 0;
	private makeItemNum():string {
		return new Date().getTime() + "" + (this.itemNum++);
	}

	//把payLoad转换成提交的post对象
	private payLoadFormat(): PayLoad[] {
		//特殊处理
		console.log(this.sendModule.timeline)
		this.sendModule.timeline.attrValue = parseInt(this.sendModule.timeline.value);

		//临时处理 演示用
		this.sendModule.storagesize.attrValue = "20";
		this.sendModule.bootsize.attrValue = "20";

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

		let sku = this.getSkuId(payloadList);   //获取sku

		this.payLoad.skuId = sku.skuId;
		this.payLoad.productId = sku.productId;
		this.payLoad.attrList = payloadList;
		this.payLoad.itemNo = this.makeItemNum();

		this.payLoadArr = [];
		this.payLoadArr.push(this.payLoad);

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
			this.setTimeLineType();
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
		this.layoutService.show();
		this.checkInput();
		let payLoadArr = this.payLoadFormat();   //获取最新的的payload的对象
		// console.log(JSON.stringify(payLoadArr))
		this.service.saveOrder(payLoadArr).then(res => {
			this.layoutService.hide();
			this.router.navigateByUrl("cloud-host-service/cart-order");
		}).catch(res => {
			this.layoutService.hide();
		})
	}
}
