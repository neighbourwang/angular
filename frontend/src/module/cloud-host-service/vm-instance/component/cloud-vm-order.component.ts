/**
 * [订购逻辑]
 * 基本介绍：
 * 1. 本页面能提交一个云主机，和三个挂载到该主机上的云硬盘，总共最多四个订单
 * 2. 每个订单最后提交的都是一个 PayLoad， 发给后端的是payLoadArr 是一个PayLoad数组
 * 3. sendModule是和页面绑定的数据，最终是要转换成PayLoad
 *
 * 流程介绍：
 * 1. 每个订单根据所选来获取一个产品的列表
 * 2. 根据产品的列表获取到启动盘的列表
 * 3. 根据启动盘的列表确定最终的sku
 * 4. 根据sku的id 来获取时长单位
 * 5. 根据sku id与时长单位获取来获取价格 
 * 6. 提交的时候根据sendModule转换成PayLoad
 */

import { Component, ViewChild, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, ValidationRegs, Validation } from '../../../../architecture';
import { cloudHostServiceOrder } from '../service/cloud-host-order.service';

import { DispatchEvent } from "../../components/dispatch-event"

import { AttrList, PayLoad } from '../model/attr-list.model';
import { OrderOptions } from '../model/options.model';
import { OrderList, OrderService, SendModule, TimeLineData, VlueList, SkuMap, ProMap, BillingInfo, Network, Image } from '../model/services.model';

@Component({
	selector: 'cloud-host-order',
	templateUrl: '../template/cloud-vm-order.component.html',
	styleUrls: ['../style/cloud-host-order.less'],
})
export class cloudHostComponentOrder implements OnInit {

	attrList: OrderList;
	payLoad: PayLoad;
	payLoadArr: PayLoad[];  //最后提交的是个PayLoad数组
	sendModule: SendModule;
	setPassword: boolean = true;

	@ViewChild('confirm')
	private confirmDialog: ConfirmComponent;

	@ViewChild('notice')
	private noticeDialog: NoticeComponent;

	@ViewChild('popup')
	private popup: PopupComponent;

	modalTitle: string = '';
	modalMessage: string = '';
	modalOKTitle: string = '';

	platforms : VlueList[] = [];
	platform : VlueList[];
	zones : VlueList[] = [];
	zone : VlueList;
	
	imagetype : VlueList;
	diskinitialsize : VlueList;
	disktype : VlueList;
	networktype : VlueList;
	billingmode : VlueList;
	cpu : VlueList;
	diskmounthostid : VlueList;
	username : VlueList;
	diskstepsize : VlueList;
	settingtype : VlueList;
	bootstorage : VlueList;
	bootsize : VlueList;
	timelineunit : VlueList;
	securitygroup : VlueList;
	diskinsname : VlueList;
	diskmounthostname : VlueList;
	storage : VlueList;
	instancename : VlueList;
	mem : VlueList;
	startupsource : VlueList;
	timeline : VlueList;
	diskmaxsize : VlueList;
	storagesize : VlueList;
	disksize : VlueList;
	password : VlueList;
	os : VlueList;

	@ViewChild('cartButton') cartButton;
    // @ViewChild('storage') storage;

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private v: Validation,
		private dux: DispatchEvent,
		private service: cloudHostServiceOrder
	) {
		this.v.result = {};
	};

	ngOnInit() {
		this.makeSubscriber()
		this.fetchConfig()
		this.setSelectList()
	}

	/****初始化派发事件***/
	initDispatch() {
		this.dux.dispatch("spec")  //规格选取
	}

	private makeSubscriber() {
		// this.dux.subscribe("region", () => { this.fetchResourcePoll() })
		// this.dux.subscribe("spec", () => { this.changedSpec() })
		// this.dux.subscribe("resourcePoll", () => { this.changedSpec() })
		// this.dux.subscribe("phsical", () => { this.phsicalChange() })
		// this.dux.subscribe("phsical", () => { this.setOs() })
		// this.dux.subscribe("phsical", () => { this.setPhysicalInfo() })
	}

	private fetchConfig() {
		this.layoutService.show();
		this.service.getHostConfigList().then(configList => {
			configList.attrList.forEach(config => {
				this.attrList[config.attrCode] = config;
			});
			// this.proMap = configList.proMap
			// this.skuMap = configList.skuMap
		})
	}

	private setSelectList() {
		// this.platforms = 

	}

	// 警告框相关
	showNotice(title: string, msg: string) {
	    this.modalTitle = title;
	    this.modalMessage = msg;

	    this.noticeDialog.open();
	}
	modalAction() {}
}
