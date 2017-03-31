import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from '../../../../architecture';
import { ProductInfoTableService } from './product-info-table.service'

import { CartOrder,itemList } from '../../shoping-cart/model/cart-order.model';
import { TotalPrice } from '../../shoping-cart/model/cart-total-price.model';


@Component({
	selector: 'product-info-table',
	templateUrl: './product-info-table.component.html',
	styleUrls: ['./product-info-table.less']
})
export class ProductInfoTableComponent implements OnInit {

	totalPrice : TotalPrice = new TotalPrice();

	@Input("itemList") itemList : any[];     //orderList和orderId 设置一个
	@Input("hasSelect") hasSelect : boolean  = false;
	@Input("disabled") disabled : boolean  = false;

	@Output("onSelect") onSelect = new EventEmitter;

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private service : ProductInfoTableService
	) {
	};

	ngOnInit() {
		// this.layoutService.show();
		console.log(this.itemList)
	}

	selectChange (selectList) {
		this.onSelect.emit(selectList);
	}

}
