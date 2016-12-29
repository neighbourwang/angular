import { Component, OnInit,ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { cartListService } from '../../shoping-cart/service/cart-list.service'
import { CartList } from '../../shoping-cart/model/cart-list.model';

@Component({
	selector: 'cart-button',
	templateUrl: './cart-button.component.html',
	styleUrls: ['./cart-button.component.less'],
	providers: []
})
export class CartButtonComponent implements OnInit {

	private cartList: CartList[];
	private cartLength : number;

	@ViewChild('confirm')
	private confirmDialog: ConfirmComponent;

	@ViewChild('notice')
	private noticeDialog: NoticeComponent;

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private cartService: cartListService
	) { }

	ngOnInit() {
		this.setCartList();
	}

	private goTo(url: string) {
		this.router.navigateByUrl(url);
	}

	setCartList(): void {
		this.cartService.getCartList().then(cartList => {
			this.cartLength = cartList.length;
			this.cartList = cartList;
		})
	}
	delectAllCart(): void {
		this.modalconfirm = () => {
			const promiseList = this.cartList.map(cart => this.cartService.deleteCartList(cart.id));
			Promise.all(promiseList).then(arr => {
				this.setCartList();
				this.noticeDialog.open("","SHOPPING_CART.SUCCESSFULLY_EMPTY_SHOPPING_CART");
			});
		}
		this.confirmDialog.open("","SHOPPING_CART.SURE_TO_EMPTY_EMPTY_SHOPPING_CART");
	}



	modalconfirm = function(){};
	modalcancle = function(){};
	modalnotice = function(){};
}
