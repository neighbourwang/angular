import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { LayoutService } from '../../../../architecture';
import { cartOrderService } from '../service/cart-order.service'


@Component({
	selector: 'cart-order',
	templateUrl: '../template/cart-order.component.html',
	styleUrls: ['../style/cart-order.less']
})
export class cartOrderComponent implements OnInit {

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private route: ActivatedRoute,
		private service : cartOrderService
	) {
	};

	orderId:string = "";

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.orderId = params["orderlist"];
	    });
	}


	goTo(url : string) {
		this.router.navigateByUrl(url);
	}
}
