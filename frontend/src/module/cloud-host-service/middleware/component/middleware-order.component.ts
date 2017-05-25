/************************************/
//继承的数据库，所以里面的数据database之类的都是指的中间件 
//把调用的接口和提交订单时候发送的数据改动了一下
/************************************/
import { Component, ViewChild, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, ValidationRegs, Validation } from '../../../../architecture';
import { MiddlewareServiceOrder } from '../service/middleware-order.service';

import { DispatchEvent } from "../../components/dispatch-event"

import { DatabaseComponentOrder } from "../../database/component/database-order.component"
import { cloudHostServiceOrder } from '../../vm-instance/service/cloud-host-order.service';
import { DatabaseServiceOrder } from '../../database/service/database-order.service';

import { MWTemplateInfo, MDproductReq } from "../model/post.model"
import { MiddlewareValue, DiskValue, VlueList } from "../model/other.model"

@Component({
	selector: 'cloud-vm-order',
	templateUrl: '../template/middleware-order.component.html',
	styleUrls: ['../style/middleware-order.less'],
})
export class MiddlewareComponentOrder extends DatabaseComponentOrder implements OnInit {

	mwInits = [];
	mwInit;

	fetchMWIdsPost: MWTemplateInfo = new MWTemplateInfo

	middlewareValue: MiddlewareValue = new MiddlewareValue;

	mwpasswordShadow: string;

	constructor(
		public layoutService: LayoutService,
		public router: Router,
		public v: Validation,
		public dbv: Validation,
		public dux: DispatchEvent,
		public service: cloudHostServiceOrder,
		public dbservice: DatabaseServiceOrder,
		private mwservice: MiddlewareServiceOrder
	) {
		super(layoutService, router, v, dbv, dux, service, dbservice)
	
		this.v.result = {};
		this.dbv.result = {};
		this.dux.reset();
	};

	ngOnInit() {
		this.makeSubscriber()
		this.makeDbSubScriber()
		this.makeMWSubScriber()
		this.fetchConfig()
		this.fetchMiddlewareInit()
		this.setMWdefaultValue()
		this.getDict()
	}

	makeMWSubScriber() {
		this.dux.subscribe("MW_TYPE_CHANGE", () => { this.fetchMiddleWareSearch() })   //数据库选项有变化时候
		// this.dux.subscribe("MW_PRODUCT_CHANGE", () => { this.fetchShoppingWMproducts() })   //数据库产品有变化时候 （模板id，云平台）
	}

	private setMWdefaultValue() {
		this.middlewareValue.WEBLOGICACCOUNT.attrValue = "weblogic"
	}

	private fetchMiddlewareInit() {
		this.layoutService.show()
		this.mwservice.fetchMiddlewareInit().then(res => {
			this.layoutService.hide()
			if(!res.items.length) return

			this.mwInits = res.items
			this.mdtypeChange(res.items[0])
		})
		.catch(e => this.layoutService.hide())
	}

	private mdtypeChange(value) {
		this.mwInit = value; 
		this.fetchMWIdsPost.type = value.middleware.value; 

		let { version, mode } = this.mwInit
		this.fetchMWIdsPost.version = version.length ? version[0] : ""
		this.fetchMWIdsPost.deploymentMode = mode.length ? mode[0].value : ""

		this.dux.dispatch("MW_TYPE_CHANGE")
	}

	private fetchMiddleWareSearch() {
		this.layoutService.show()
		this.mwservice.fetchMiddleWareSearch(this.fetchMWIdsPost).then(res => {
			this.layoutService.hide()
			this.databases = res;
			this.fetchDBProductPost.templateIds = res.map(r => r.id)

			this.dux.dispatch("DB_PRODUCT_CHANGE")
		}).catch(res => this.layoutService.hide())
	}

	getDict() {  //获取数据字典的值
	 	Promise.all([this.mwservice.diskusage, this.dbservice.copylevel]).then(res => {   //获取这两个数据字典
	 		this.diskusage = res[0]
	 		this.copylevel = res[1]
	 	})
	}	

	formatDB():any[] {
		let errorMsg = this.checkDbValue()
		if(errorMsg) return [errorMsg];

		this.middlewareValue.DEPLOYMODE.attrValue = this.database.deploymentModeString;
		this.middlewareValue.TIMELINE = this.values.TIMELINE
		this.middlewareValue.TIMELINEUNIT = this.values.TIMELINEUNIT
		this.middlewareValue.MIDDLEWARETYPE.attrValue = this.mwInit.middleware.label
		this.middlewareValue.MIDDLEWAREVERSION.attrValue = this.fetchMWIdsPost.version

		let payloadList = this.sendModuleToPay(this.middlewareValue);
		let payLoad = {
			skuId: this.dbProduct.skuId,
			productId: this.dbProduct.productId,
			attrList: payloadList,
			itemNo: this.makeItemNum(),
			totalPrice: this.diskTotalPrice,
			quality: this.payLoad.quality,
			serviceType: "5",
			relyType: "1",
			relyItemNo: this.vmItemNo
		}

		return [payLoad]
	}

	get deploymentModeString () {
		return this.mwInit ? this.mwInit.mode.filter(m => m.value === this.fetchMWIdsPost.deploymentMode)[0].label : ""
	}

	checkDbValue(key?: string) {
		let regs: any = {
			weblogicUser: [this.middlewareValue.WEBLOGICACCOUNT.attrValue, [this.v.isUnBlank, this.v.isBase], "weblogic用户名输入不正确"],
			mwpassword: [this.middlewareValue.WEBLOGICPASSWORD.attrValue, [this.v.isPassword, this.v.lengthRange(8, 30), this.v.isUnBlank], "VM_INSTANCE.PASSWORD_FORMAT_IS_NOT_CORRECT"],
			mwpasswordShadow: [this.mwpasswordShadow, [this.v.equalTo(this.middlewareValue.WEBLOGICPASSWORD.attrValue), this.v.isUnBlank], "VM_INSTANCE.TWO_PASSWORD_ENTRIES_ARE_INCONSISTENT"]
		}

		return this.v.check(key, regs);
	}
}
