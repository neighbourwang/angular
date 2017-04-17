
import { Component, ViewChild, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';
import { PhysicalMachineOrderService } from '../service/physical-machine-order.service';

import { DispatchEvent } from "../../components/dispatch-event"

import { Regions, PMOrderResponse, PMPartsEntity, PMNetworkVO, ResoucePolls, PMImageBaseVO } from '../model/service.model';

@Component({
	selector: 'physical-machine-order',
	templateUrl: '../template/physical-machine-order.component.html',
	styleUrls: ['../style/physical-machine-order.less'],
})
export class PhysicalMachineOrderComponent implements OnInit {


	@ViewChild('confirm')
	private confirmDialog: ConfirmComponent;

	@ViewChild('notice')
	private noticeDialog: NoticeComponent;

	@ViewChild('popup')
	private popup: PopupComponent;

	modalTitle: string = '';
	modalMessage: string = '';
	modalOKTitle: string = '';

	check = {};

	regions:Regions[] = [];
	region:Regions;
	resourcePolls:ResoucePolls[] = [];
	resourcePoll:ResoucePolls;

	//物理机规格值
	cpuList = this.service.cpuList;
	memList = this.service.memList;
	diskRequirements = this.service.diskRequirements;
	diskType = this.service.diskType;
	networkRequirements = this.service.networkRequirements;
	needHBA = this.service.needHBA;

	queryList = {
		cpuList: this.cpuList[0].value,
		memList: this.memList[0].value,
		diskRequirements: this.diskRequirements[0].value,
		diskType: this.diskType[0].value,
		networkRequirements: this.networkRequirements[0].value,
		needHBA: this.needHBA[0].value,
	};

	@ViewChild('cartButton') cartButton;


	constructor(
		private layoutService: LayoutService,
		private router: Router,
        private dux: DispatchEvent,
		private service: PhysicalMachineOrderService
	) {
		
	};

	ngOnInit() {
		this.makeSubscriber()
		this.fetchRegion()
	}

	private makeSubscriber() {
		this.dux.subscribe("region", () => { this.fetchResourcePoll() })	
	}

	/****区域*****/
	private fetchRegion() {
		this.service.fetchRegion().then(res => {
			this.regions = res;
			this.region = this.regions[0]

			this.dux.dispatch("region")
		})
	}

	/****资源池*****/
	private fetchResourcePoll() {
		this.service.fetchResourcePoll( this.region.id ).then(res => {
			this.resourcePolls = res;
			this.resourcePoll = this.resourcePolls[0]

			this.dux.dispatch("resourcePoll")
		})
	}



	addCart() {   //加入购物车
		// if (!this.checkInput()) return;
		// let payLoadArr = this.payLoadFormat();   //获取最新的的payload的对象
		// console.log(payLoadArr, JSON.stringify(payLoadArr))
		// // console.log(JSON.stringify(payLoad))
		// this.layoutService.show();
		// this.service.addCart(payLoadArr).then(res => {
		//	this.layoutService.hide();
		//	this.noticeDialog.open("","CLOUD_DRIVE_ORDER.SUCCESSFULLY_ADDED_TO_SHOPPING_CART");
		//	this.cartButton.setCartList();
		//	// this.router.navigateByUrl("physical-machine-service/physical-machine-list");
		// }).catch(res => {
		//	this.layoutService.hide();
		// })
	}


	checkValue(value?: string) { //动态验证
		
	}


	// 警告框相关
	showNotice(title: string, msg: string) {
	    this.modalTitle = title;
	    this.modalMessage = msg;

	    this.noticeDialog.open();
	}
	modalAction() {}
}
