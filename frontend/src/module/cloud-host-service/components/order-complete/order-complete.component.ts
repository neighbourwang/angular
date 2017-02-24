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

	orderList : any[];
	totalPrice : TotalPrice = new TotalPrice();

	@Input("orderId") orderId:string = "";

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private service : orderCompleteService
	) {
	};

	ngOnInit() {
		this.layoutService.show();
		this.setList(this.orderId);
	}

	private setTotalPrice(orderList:any[]) {   //设置价格总价
		let billingArr = {},
			unitArr = {},
			oncePrice:number = 0;

		orderList.forEach(order => {
			order.itemList.forEach(item => {
				oncePrice += item.billingInfo.basePrice;
				if(item.billingInfo.periodType) {
					if(!billingArr[item.billingInfo.periodType]) billingArr[item.billingInfo.periodType] = 0;  //计算周期价格
					billingArr[item.billingInfo.periodType] += item.billingInfo.basicPrice + item.billingInfo.cyclePrice; 
				}
				if(item.billingInfo.unitType){
					if(!unitArr[item.billingInfo.unitType]) unitArr[item.billingInfo.unitType] = 0;  //计算周期价格
					unitArr[item.billingInfo.unitType] += item.billingInfo.unitPrice; 
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
			this.setTotalPrice(orderList);			
		}).catch(e => {
			this.layoutService.hide();
		});
	}

	goTo(url : string) {
		this.router.navigateByUrl(url);
	}
}
