import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from '../../../../architecture';
import { cartOrderService } from '../service/cart-order.service'

import { CartOrder,itemList } from '../model/cart-order.model';
import { TotalPrice } from '../model/cart-total-price.model';

@Component({
	selector: 'cart-order',
	templateUrl: '../template/cart-order.component.html',
	styleUrls: ['../style/cart-order.less']
})
export class cartOrderComponent implements OnInit {

	orderList : any[];
	totalPrice : TotalPrice = new TotalPrice();

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private service : cartOrderService
	) {
	};

	ngOnInit() {
		this.setList();
		this.layoutService.show();
	}

	private setTotalPrice(orderList:any[]) {   //设置价格总价
		let billingArr = {},
			oncePrice:number = 0;

		orderList.forEach(order => {
			order.itemList.forEach(item => {
				oncePrice += item.billingInfo.basePrice;
				if(!billingArr[item.billingInfo.billingMode]) {   //计算周期价格
					billingArr[item.billingInfo.billingMode] = 0;
				}
				billingArr[item.billingInfo.billingMode] += item.billingInfo.basicPrice; 
			})
		});
		this.totalPrice.oncePrice = oncePrice;
		this.totalPrice.billingArr = billingArr;
	}

	setList() {   //设置列表
		this.service.getOrderList().then(orderList => {
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
