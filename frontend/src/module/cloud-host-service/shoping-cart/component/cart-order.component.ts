import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from '../../../../architecture';
import { cartOrderService } from '../service/cart-order.service'

import { AttrList, PayLoad } from '../model/attr-list.model';

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
	}

}
