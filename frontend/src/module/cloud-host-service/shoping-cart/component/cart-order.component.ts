import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from '../../../../architecture';
import { cartOrderService } from '../service/cart-order.service'

import { CartOrder } from '../model/cart-order.model';

@Component({
	selector: 'cart-order',
	templateUrl: '../template/cart-order.component.html',
	styleUrls: ['../style/cart-order.less']
})
export class cartOrderComponent implements OnInit {

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private service : cartOrderService
	) {
	};

	ngOnInit() {
		this.service.getOrderList().then(orderList => {
			console.log(orderList)
		});
	}

}
