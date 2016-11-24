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
		this.layoutService.show();
		this.service.getOrderList().then(orderList => {
			this.layoutService.hide();
			console.log(orderList)
			this.orderList = orderList;

			let totalPrice:number = 0;
			orderList.forEach(order => {
				order.itemList.forEach(item => {
					totalPrice += item.billingInfo.basePrice+item.billingInfo.basicPrice;
				})
			})
			this.totalPrice = totalPrice;
		}).catch(e => {
			this.layoutService.hide();
		});

	
	}

	goTo(url : string) {
		this.router.navigateByUrl(url);
	}
}
