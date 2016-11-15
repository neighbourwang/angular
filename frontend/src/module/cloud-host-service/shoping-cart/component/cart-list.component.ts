
import { Component,ViewChild, OnInit } from '@angular/core';
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

	cartList: CartList[];

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private service: cartListService
	) {}

	ngOnInit() {
		this.getCartList();
	}

	getCartList():void {
	    this.layoutService.show();
		this.service.getOrderList().then(cartList => {
	    	this.layoutService.hide();
			this.cartList = cartList;
		}).catch(e => {
	      this.layoutService.hide()
	  	})
	};

	deleteCartList(itemId:string):void {
		this.modalconfirm = () => {
			this.service.deleteCartList(itemId).then(res => {
				this.noticeDialog.open("","删除成功！");
				this.getCartList();
			}).catch(e =>{
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


	goTo(url : string) {
		this.router.navigateByUrl(url);
	}

	modalconfirm = function(){};
	modalcancle = function(){};

	
}