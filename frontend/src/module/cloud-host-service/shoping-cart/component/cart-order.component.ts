import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from '../../../../architecture';
import { cartOrderService } from '../service/cart-order.service'

import { CartOrder,itemList } from '../model/cart-order.model';

@Component({
	selector: 'cart-order',
	templateUrl: '../template/cart-order.component.html',
	styleUrls: ['../style/cart-order.less']
})
export class cartOrderComponent implements OnInit {

	orderList : any[];
	totalPrice : number;

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
		let totalPrice:number = 0;
		orderList.forEach(order => {
			order.itemList.forEach(item => {
				totalPrice += item.billingInfo.basePrice+item.billingInfo.basicPrice;
			})
		})
		this.totalPrice = totalPrice;
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
