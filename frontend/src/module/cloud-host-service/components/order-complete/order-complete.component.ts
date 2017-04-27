import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from '../../../../architecture';
import { orderCompleteService } from './order-complete.service'

import { CartOrder,itemList } from '../../shoping-cart/model/cart-order.model';
import { TotalPrice } from '../../shoping-cart/model/cart-total-price.model';


@Component({
	selector: 'order-complete',
	templateUrl: './order-complete.component.html',
	styleUrls: ['./order-complete.less']
})
export class orderCompleteComponent implements OnInit {

	totalPrice : TotalPrice = new TotalPrice();
	itemsPrice : TotalPrice[] = [];

	@Input("orderId") orderId:string = "";
	@Input("orderList") orderList : any[];     //orderList和orderId 设置一个

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private service : orderCompleteService
	) {
	};

	ngOnInit() {
		this.layoutService.show();
		if(this.orderId) {
			this.setList(this.orderId);
		}
	}

	private setTotalPrice(orderList:any[]) {   //设置价格总价
		let billingArr = {},
			unitArr = {},
			oncePrice:number = 0;

		orderList.forEach(order => {
			order.itemList.forEach(item => {
				oncePrice += item.billingInfo.basePrice;
				if(item.billingInfo.basicPrice) {   //主机价格计算
					if(!billingArr[item.billingInfo.periodType]) billingArr[item.billingInfo.periodType] = 0;  //计算周期价格
					billingArr[item.billingInfo.periodType] += item.billingInfo.basicPrice * item.quantity * item.billingPeriod; 
				}
				if(item.billingInfo.unitPrice){
					if(!unitArr[item.billingInfo.periodType]) unitArr[item.billingInfo.periodType] = 0;  //计算周期价格
					unitArr[item.billingInfo.periodType] += item.billingInfo.unitPrice; 
				}
			})
		});
		this.totalPrice.oncePrice = oncePrice;
		this.totalPrice.billingArr = billingArr;
		this.totalPrice.unitArr = unitArr;
		console.log(this.totalPrice)
	}

	setList(params:string) {   //设置列表
		this.service.getOrderList(params).then(orderList => {
			this.layoutService.hide();
			this.orderList = orderList;
			// this.orderList = {"resultCode":"100","detailDescription":null,"resultContent":[{"id":"de268d89-4898-4e43-8261-79e61afba836","itemNo":"020170422154436135","groupNo":"20170422154435990","createDate":"2017-04-21 23:44:20","extendType":0,"itemList":[{"id":"7c2dde33-2cfb-4bff-893b-f8390fe19fe3","serviceType":1,"billingMode":"1","billingPeriod":null,"quantity":1,"billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":0.0,"cyclePrice":0.0,"unitPrice":20.0,"unitType":0.0},"attrList":[{"attrCode":"ZONE","attrDisplayName":"可用区","attrValueCode":"Dev_Cluster","attrDisplayValue":"Dev_Cluster","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKTYPE","attrDisplayName":"云硬盘","attrValueCode":"EMPTYDISK","attrDisplayValue":"空白盘","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKINSNAME","attrDisplayName":"云硬盘实例名称","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"STORAGE","attrDisplayName":"云硬盘类型","attrValueCode":"SharedVMFS","attrDisplayValue":"SharedVMFS","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKSTEPSIZE","attrDisplayName":"步长","attrValueCode":null,"attrDisplayValue":"2","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"TIMELINEUNIT","attrDisplayName":"时长单位","attrValueCode":"90139f53-7f7f-4c31-81b8-3c27e56ca624","attrDisplayValue":"按天","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKMAXSIZE","attrDisplayName":"最大","attrValueCode":null,"attrDisplayValue":"15","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKMOUNTHOSTNAME","attrDisplayName":"云主机名称","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKMOUNTHOSTID","attrDisplayName":"挂载云主机ID","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKINITIALSIZE","attrDisplayName":"初始大小","attrValueCode":null,"attrDisplayValue":"1","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"PLATFORM","attrDisplayName":"云平台","attrValueCode":"前端云平台","attrDisplayValue":"前端云平台","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"","attrDisplayName":"","attrValueCode":"","attrDisplayValue":"","valueUnit":null,"attrOrderSeq":null,"description":""},{"attrCode":"DISKSIZE","attrDisplayName":"容量","attrValueCode":"","attrDisplayValue":"1GB","valueUnit":null,"attrOrderSeq":null,"description":""}],"status":0,"createDate":"2017-04-21 23:44:20","expireDate":null}]}]}.resultContent
			this.setTotalPrice(orderList);			
		}).catch(e => {
			this.layoutService.hide();
		});
	}

	goTo(url : string) {
		this.router.navigateByUrl(url);
	}
}
