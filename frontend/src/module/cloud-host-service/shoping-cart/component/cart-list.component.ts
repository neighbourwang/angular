
import { Component,ViewChild, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';

import { LayoutService, NoticeComponent, ConfirmComponent, Validation } from '../../../../architecture';

import { cartListService } from '../service/cart-list.service'
import { CartList } from '../model/cart-list.model';

@Component({
	selector: 'cart-list',
	templateUrl: '../template/cart-list.component.html',
	styleUrls: ['../style/cart-list.less'],
})

export class cartListComponent implements OnInit {

	@ViewChild('confirm')
	private confirmDialog: ConfirmComponent;

	@ViewChild('notice')
	private noticeDialog: NoticeComponent;
  
	modalTitle: string = '';
	modalMessage: string = '';
	modalOKTitle: string = '';

	totalPrice : number;

	cartList: CartList[];

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private service: cartListService,
		private location: Location
	) {}

	ngOnInit() {
		this.getCartList();
	}

	getCartList():void {
	    this.layoutService.show();
		this.service.getCartList().then(cartList => {
	    	this.layoutService.hide();
			this.cartList = cartList;

			let totalPrice:number = 0;
			cartList.forEach(cart => {
				totalPrice += cart.billingInfo.basePrice+cart.billingInfo.basicPrice;
			})
			this.totalPrice = totalPrice;
		}).catch(e => {
	      this.layoutService.hide()
	  	})
	};

	deleteCartList(itemId:string):void {
		this.modalconfirm = () => {
	    	this.layoutService.show();
			this.service.deleteCartList(itemId).then(res => {
	    		this.layoutService.hide();
				this.noticeDialog.open("","删除成功！");
				this.getCartList();
			}).catch(e =>{
	    		this.layoutService.hide();
				this.noticeDialog.open("删除失败",e);
			})
		}
		this.confirmDialog.open("","你确定要删除吗？");
	}

	buyNow():void {
		const list = this.cartList.map(cart => cart.id);   //提取cartID
		this.layoutService.show();
		this.service.purchaseCart(list).then(res => {
			this.layoutService.hide();
			this.modalconfirm = function(){
				this.goTo("cloud-host-service/cart-order");
			}
			this.noticeDialog.open("","购买成功！");
		}).catch(e => {
			this.noticeDialog.open("购买失败",e);
		})
	}

	nub(nub : string|number) {
		return parseInt("" + (+nub)*100)/100;
	}

	goTo(url : string) {
		this.router.navigateByUrl(url);
	}

	modalconfirm = function(){};
	modalcancle = function(){};
	noticeconfirm = function(){};

	
}