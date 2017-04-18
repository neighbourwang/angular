
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

	regions: Regions[] = [];
	region: Regions;
	resourcePolls: ResoucePolls[] = [];
	resourcePoll: ResoucePolls;
	phsicalList: PMOrderResponse[];
	selectedPhsical: PMOrderResponse;

	//物理机规格值
	cpuList = this.service.cpuList;
	cpu = this.cpuList[0];
	memList = this.service.memList;
	mem = this.memList[0];
	diskRequirements = this.service.diskRequirements;
	diskRequirement: any[];
	diskTypes = this.service.diskType;
	diskType: any[];
	networkRequirements = this.service.networkRequirements;
	networkRequirement: any[];
	needHBA = this.service.needHBA;
	HBA = [];

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

		this.initDispatch()
	}

	/****初始化派发事件***/
	initDispatch() {
		this.dux.dispatch("spec")  //规格选取
	}

	private makeSubscriber() {
		this.dux.subscribe("region", () => { this.fetchResourcePoll() })
		this.dux.subscribe("spec", () => { this.changedSpec() })
		this.dux.subscribe("phsical", () => { this.phsicalChange() })
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
		this.service.fetchResourcePoll(this.region.id).then(res => {
			this.resourcePolls = res;
			this.resourcePoll = this.resourcePolls[0]

			this.dux.dispatch("resourcePoll")
		})
	}

	/*****规格变化*****/
	private changedSpec() {
		const filterCheckBox = (arrs: any[]) => arrs.filter(arr => arr.isSelected).map(arr => arr.value);

		this.diskRequirement = filterCheckBox(this.diskRequirements)
		this.diskType = filterCheckBox(this.diskTypes)
		this.networkRequirement = filterCheckBox(this.networkRequirements)
		this.HBA = filterCheckBox(this.needHBA)

		let {
			cpu: { value: cpu },
			mem: { value: mem },
			HBA, diskRequirement, diskType, networkRequirement } = this

		this.service.fetchPhysicalDetail(cpu, mem, diskRequirement, diskType, networkRequirement)
			.then( res => {
				this.phsicalList = res;
				this.selectedPhsical = undefined;

				this.dux.dispatch("phsical")
			})
	}

	/******选中物理机变化******/
	private phsicalChange() {
		console.log(this.selectedPhsical)
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
	modalAction() { }
}
