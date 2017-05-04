
import { Component, ViewChild, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, ValidationRegs, Validation } from '../../../../architecture';
import { ManagementServicesOrderService } from '../service/management-services-order.service';

import { DispatchEvent } from "../../components/dispatch-event"

import { SuperviseProductItem, ProductSimpleItem, ShoppingCartProfile } from '../model/service.model';
import { PostAttrList, PayLoad} from '../model/post.model';
import { Values, ValuesAttr} from '../model/other.model';
	
const codeList = {
	"0" : "VM",
	"1" : "DISK",
	"2" : "PHYSICAL",
	"3" : "DATABASES",
	"4" : "MIDDLEWARE",
	"5" : "LOAD_BALANCE",
	"6" : "ALI_VM",
	"7" : "ALI_DISK",
	"8" : "LOAD_BALANCE",
	"9" : "NONE",
}

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
	productInfo: SuperviseProductItem;

	postData: ShoppingCartProfile

	values: Values = new Values;
	code: string;

	check = {};

	@ViewChild('cartButton') cartButton;


	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private dux: DispatchEvent,
		private v: Validation,
		private service: ManagementServicesOrderService
	) {
		this.v.result = {}
	};

	ngOnInit() {
		this.v.result = {};
		this.dux.reset()

		this.makeSubscriber()
		this.fetchServicesList()
		this.fetchAttribute()
		this.initDispatch()
	}

	/****初始化派发事件***/
	initDispatch() {
		// this.dux.dispatch("SPEC")  //规格选取
	}

	private makeSubscriber() {
		this.dux.subscribe("PRODUCT", () => { this.fetchProductInfo() })
		this.dux.subscribe("VM", () => { this.fetchVmlist() })  
		this.dux.subscribe("DISK", () => { this.fetchDisklist() })
		this.dux.subscribe("PHYSICAL", () => {})
		this.dux.subscribe("DATABASES", () => {})
		this.dux.subscribe("MIDDLEWARE", () => {})
		this.dux.subscribe("LOAD_BALANCE", () => {})
		this.dux.subscribe("ALI_VM", () => {})
		this.dux.subscribe("ALI_DISK", () => {})
		this.dux.subscribe("LOAD_BALANCE", () => {})
		this.dux.subscribe("NONE", () => {})
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

	/******************获取attribute******************/
	private fetchAttribute() {
		this.service.fetchAttribute()
			.then(res => {
				this.postData = res
			})
	}

	/******获取管理服务产品详情*****/
	private fetchProductInfo() {
		this.service.fetchProductInfo( this.product.id )
			.then(res => {
				console.log("fetchProductInfo", res)
				this.productInfo = res;
				this.code = res.serviceObjectCode;
				this.dux.dispatch(codeList[res.serviceObjectCode])
			})
	}

	/******************获取云主机列表******************/
	private fetchVmlist() {

	}

	/******************获取硬盘列表******************/
	private fetchDisklist() {
		
	}


	
	// 警告框相关
	showNotice(title: string, msg: string) {
		this.modalTitle = title;
		this.modalMessage = msg;

		this.noticeDialog.open();
	}
	modalAction() { }
}
