import { Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
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
export class ProductInfoTableComponent implements OnInit,OnChanges {

	totalPrice : TotalPrice = new TotalPrice();

	@Input("orderId") orderId:string = "";
	@Input("itemList") itemList : any[] = [];     //
	@Input("hasSelect") hasSelect : boolean  = false;
	@Input("disabled") disabled : boolean  = false;
	@Input("isorder") isorder : boolean =false;

	@Output("onSelect") onSelect = new EventEmitter;
	@Output("countPrice") countPrice = new EventEmitter;

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private service : ProductInfoTableService
	) {
	};

	ngOnInit() {
		// this.layoutService.show();
		if(this.orderId) {
			this.setList(this.orderId);
		}
	}

	setList(params:string) {   //设置列表
		this.service.getOrderList(params).then(orderList => {
			this.layoutService.hide();
			this.itemList = orderList.map(r => {
                    let returnList = r.itemList[0];
                    returnList.isOrder = true;
                    return returnList;
                });
		}).catch(e => {
			this.layoutService.hide();
		});
	}

	ngOnChanges(value) {
		// this.itemList = value.itemList.currentValue;
		// console.log(value.itemList.currentValue, value.itemList.previousValue, 232323)
	}

	selectChange (selectList) {
		this.onSelect.emit(selectList);
	}
	priceChange (totalPrice) {
		this.countPrice.emit(totalPrice);
	}

}
