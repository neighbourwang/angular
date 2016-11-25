
import { Component,ViewChild, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';

import { LayoutService, NoticeComponent, ConfirmComponent, Validation } from '../../../../architecture';

import { cartListService } from '../service/cart-list.service'
import { CartList } from '../model/cart-list.model';
import { TotalPrice } from '../model/cart-total-price.model';

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

	totalPrice : TotalPrice = new TotalPrice();

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

	private setTotalPrice(orderList:any[]) {   //设置价格总价
		let billingArr = {},
			oncePrice:number = 0;

		// orderList.forEach(order => {
			orderList.forEach(item => {
				oncePrice += item.billingInfo.basePrice;
				if(!billingArr[item.billingInfo.billingMode]) {   //计算周期价格
					billingArr[item.billingInfo.billingMode] = 0;
				}
				billingArr[item.billingInfo.billingMode] += item.billingInfo.basicPrice; 
			})
		// });
		this.totalPrice.oncePrice = oncePrice;
		this.totalPrice.billingArr = billingArr;
	}

	getCartList():void {
	    this.layoutService.show();
		this.service.getCartList().then(cartList => {
	    	this.layoutService.hide();
			this.cartList = cartList;
			this.setTotalPrice(cartList);
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
			this.noticeconfirm = function(){
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
	noticeconfirm = function(){};

	
}