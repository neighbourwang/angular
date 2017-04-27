
import { Component, ViewChild, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, ValidationRegs, Validation } from '../../../../architecture';
import { ManagementServicesOrderService } from '../service/management-services-order.service';

import { DispatchEvent } from "../../components/dispatch-event"

// import { Regions, PMOrderResponse, PMPartsEntity, PMNetworkVO, ResoucePolls, PMImageBaseVO, AttrList, ValuesList, ValuesType, Values } from '../model/service.model';
import { SuperviseServiceDetailInfoItem, ProductNewProfile, ProductSimpleItem } from '../model/service.model';
import { PostAttrList, PayLoad} from '../model/post.model';

@Component({
	selector: 'management-services-order',
	templateUrl: '../template/management-services-order.component.html',
	styleUrls: ['../style/management-services-order.less'],
})
export class ManagementServicesOrderComponent implements OnInit {


	@ViewChild('confirm')
	private confirmDialog: ConfirmComponent;

	@ViewChild('notice')
	private noticeDialog: NoticeComponent;

	@ViewChild('popup')
	private popup: PopupComponent;

	modalTitle: string = '';
	modalMessage: string = '';
	modalOKTitle: string = '';

	productList: ProductSimpleItem[] = [];
	product: ProductSimpleItem;
	productInfo: ProductNewProfile;


	check = {};

	@ViewChild('cartButton') cartButton;


	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private dux: DispatchEvent,
		private v: Validation,
		private service: ManagementServicesOrderService
	) {

	};

	ngOnInit() {
		this.v.result = {};
		this.dux.reset()


		this.makeSubscriber()
		this.fetchServicesList()
		this.initDispatch()
	}

	/****初始化派发事件***/
	initDispatch() {
		// this.dux.dispatch("SPEC")  //规格选取
	}

	private makeSubscriber() {
		this.dux.subscribe("PRODUCT", () => { this.fetchProductInfo() })
		this.dux.subscribe("PRODUCT", () => { this.fetchProductCategory() })
	}

	/******获取管理服务列表 最上面的下拉框*****/
	private fetchServicesList() {
		this.service.fetchServicesList()
			.then(res => {
				if(!res.length) return false
				
				this.productList = res;
				this.product = res[0]
				this.dux.dispatch("PRODUCT")
			})
	}

	/******获取管理服务产品详情*****/
	private fetchProductInfo() {
				console.log("fetchProductInfo")
		this.service.fetchProductInfo( this.product.id )
			.then(res => {
				console.log("fetchProductInfo", res)
				this.productInfo = res;
			})
	}

	/******获取管理服务产品的产品目录*****/
	private fetchProductCategory() {
		this.service.fetchProductCategory( this.product.id )
			.then(res => {
				console.log("fetchProductCategory", res)
			})
	}



	
	// 警告框相关
	showNotice(title: string, msg: string) {
		this.modalTitle = title;
		this.modalMessage = msg;

		this.noticeDialog.open();
	}
	modalAction() { }
}
