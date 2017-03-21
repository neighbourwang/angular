import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService , ConfirmComponent, NoticeComponent} from '../../../../architecture';
import { cartCompleteService } from './cart-complete.service'

import { TotalPrice } from '../../shoping-cart/model/cart-total-price.model';


@Component({
	selector: 'cart-complete',
	templateUrl: './cart-complete.component.html',
	styleUrls: ['./cart-complete.less']
})
export class cartCompleteComponent implements OnInit {

	cartList : any[];
	totalPrice : TotalPrice = new TotalPrice();
	
	modalTitle: string = '';
	modalMessage: string = '';
	modalOKTitle: string = ''

	@ViewChild('confirm')
	private confirmDialog: ConfirmComponent;

	@ViewChild('notice')
	private noticeDialog: NoticeComponent;

	@Input("cartId") cartId:string = "";

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private service : cartCompleteService
	) {
	};

	ngOnInit() {
		this.setList();
	}

	private setTotalPrice(cartList:any[]) {   //设置价格总价
		let billingArr = {},
			unitArr = {},
			oncePrice:number = 0;

		cartList.forEach(cart => {
			oncePrice += cart.billingInfo.basePrice * cart.quantity;
			if(cart.billingInfo.basicPrice) {   //主机价格计算
				if(!billingArr[cart.billingInfo.periodType]) billingArr[cart.billingInfo.periodType] = 0;  //计算周期价格
				billingArr[cart.billingInfo.periodType] += cart.billingInfo.basicPrice * cart.quantity; 
			}
			if(cart.billingInfo.unitPrice){
				if(!unitArr[cart.billingInfo.periodType]) unitArr[cart.billingInfo.periodType] = 0;  //计算周期价格
				unitArr[cart.billingInfo.periodType] += cart.billingInfo.unitPrice * cart.quantity * this.getDiskSize(cart); 
			}
		});
		this.totalPrice.oncePrice = oncePrice;
		this.totalPrice.billingArr = billingArr;
		this.totalPrice.unitArr = unitArr;
		console.log(this.totalPrice)
	}

	setList() {   //设置列表
		this.layoutService.show();
		this.service.getCartList().then(cartList => {
			this.layoutService.hide();
			this.cartList = cartList;
			this.setTotalPrice(cartList);			
		}).catch(e => {
			this.layoutService.hide();
		});
	}

	deleteCartList(itemId:string):void {
		this.modalconfirm = () => {
	    	this.layoutService.show();
			this.service.deleteCartList(itemId).then(res => {
	    		this.layoutService.hide();
				this.noticeDialog.open("","SHOPPING_CART.SUCCESSFULLY_DELETED");
				this.setList();
			}).catch(e =>{
	    		this.layoutService.hide();
				this.noticeDialog.open("SHOPPING_CART.DELETE_FAILED",e);
			})
		}
		this.confirmDialog.open("","SHOPPING_CART.CONFIRM_TO_DELETE");
	}

	getDiskSize(cart){
		for( let attr of cart.attrList){
			if(attr.attrCode === "DISKSIZE") return parseInt(attr.attrDisplayValue)
		}
	}
	modalconfirm = function(){};
	modalCANCEL = function(){};
	noticeconfirm = function(){};


}
