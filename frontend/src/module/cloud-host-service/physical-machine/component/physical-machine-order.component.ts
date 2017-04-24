
import { Component, ViewChild, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, ValidationRegs, Validation } from '../../../../architecture';
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
	phsicalList: PMOrderResponse[] = [];
	selectedPhsical: PMOrderResponse = new PMOrderResponse;
	oSlList: PMImageBaseVO[] = [];
	os: PMImageBaseVO = new PMImageBaseVO;

	//物理机规格值
	cpuList = this.service.cpuList;
	cpu = this.cpuList[this.cpuList.length - 1];
	memList = this.service.memList;
	mem = this.memList[this.memList.length - 1];
	diskRequirements = this.service.diskRequirements;
	diskRequirement: any[];
	diskTypes = this.service.diskType;
	diskType: any[];
	networkRequirements = this.service.networkRequirements;
	networkRequirement: any[];
	needHBAList = this.service.needHBAList;
	HBA = this.needHBAList[0];

	//密码用户名
	username: string = "root";
	password: string;
	passwordShadow: string;
	instancename: string;
	quality: number = 1;

	timeForever: boolean = false;

	@ViewChild('cartButton') cartButton;


	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private dux: DispatchEvent,
		private v: Validation,
		private service: PhysicalMachineOrderService
	) {

	};

	ngOnInit() {
		this.makeSubscriber()
		this.fetchRegion()

		this.initDispatch()
		this.v.result = {};
	}

	/****初始化派发事件***/
	initDispatch() {
		this.dux.dispatch("spec")  //规格选取
	}

	private makeSubscriber() {
		this.dux.subscribe("region", () => { this.fetchResourcePoll() })
		this.dux.subscribe("spec", () => { this.changedSpec() })
		this.dux.subscribe("resourcePoll", () => { this.changedSpec() })
		this.dux.subscribe("phsical", () => { this.phsicalChange() })
		this.dux.subscribe("phsical", () => { this.setOs() })
		this.dux.subscribe("phsical", () => { this.setPhysicalInfo() })
	}

	/****区域*****/
	private fetchRegion() {
		this.service.fetchRegion().then(res => {
			if(!res.length) return

			this.regions = res;
			this.region = this.regions[0]

			this.dux.dispatch("region")
		})
	}

	/****资源池*****/
	private fetchResourcePoll() {
		this.service.fetchResourcePoll(this.region.id).then(res => {
			if(!res.length) return

			this.resourcePolls = res;
			this.resourcePoll = this.resourcePolls[0]

			this.dux.dispatch("resourcePoll")
		})
	}

	/*****规格变化*****/
	private changedSpec() {
		if(!this.resourcePoll) return;

		const filterCheckBox = (arrs: any[]) => arrs.filter(arr => arr.isSelected).map(arr => arr.value);

		this.diskRequirement = filterCheckBox(this.diskRequirements)
		this.diskType = filterCheckBox(this.diskTypes)
		this.networkRequirement = filterCheckBox(this.networkRequirements)

		let {
			resourcePoll: { id: poolid},
			cpu: { value: cpu },
			mem: { value: mem },
			HBA: { value: hbaEnable },
			diskRequirement, diskType, networkRequirement } = this

		poolid = "9ab4b3b2-50fb-455f-95d9-fa3f0ed246a7"  //临时添加
		this.layoutService.show()
		this.service.fetchPhysicalDetail(poolid, cpu, mem, diskRequirement, diskType, networkRequirement, hbaEnable)
			.then( res => {
				this.layoutService.hide()
				this.phsicalList = res;
			})
			.catch( error => {
				this.layoutService.hide()
				this.showNotice("提示", "获取物理机列表失败")
			})
	}

	/******选中物理机变化******/
	private phsicalChange() {
		console.log(this.selectedPhsical)
	}

	/*****设置镜像*****/
	private setOs() {
		this.service.fetchImageList(this.selectedPhsical.id)
			.then(res => {
				if(!res.length) return

				this.oSlList = res
				this.os = res[0]
			})
	}

	/******获取物理机的价格等信息*******/
	private setPhysicalInfo() {
		this.service.fetchPhysicalInfo(this.selectedPhsical.id)
			.then(res => {

			})
	}

	private checkValue(key?:string){

		const regs:ValidationRegs = {
			region: [this.region.id, [this.v.isUnBlank], "请选择区域"],
			resourcePoll: [this.resourcePoll.id, [this.v.isUnBlank], "请选择资源池"],
			selectedPhsical: [this.selectedPhsical.id, [this.v.isUnBlank], "请选择物理机"],
			pmNetworkVO: [this.selectedPhsical.pmNetworkVO.id, [this.v.isUnBlank], "该物理机无可用网络"],
			os: [this.os.id, [this.v.isUnBlank], "请选择镜像"],
			password: [this.password, [this.v.isPassword, this.v.lengthRange(8,30), this.v.isUnBlank], "VM_INSTANCE.PASSWORD_FORMAT_IS_NOT_CORRECT"],
			passwordShadow: [this.passwordShadow, [this.v.equalTo(this.password), this.v.isUnBlank], "VM_INSTANCE.TWO_PASSWORD_ENTRIES_ARE_INCONSISTENT"],
			instancename: [this.instancename, [this.v.isInstanceName, this.v.isBase], "VM_INSTANCE.HOST_NAME_FORMAT_IS_NOT_CORRECT"],
			// timeline: [this.sendModule.timeline.attrValue.trim(), [this.v.isNumber, this.v.max(999), this.v.isUnBlank], "VM_INSTANCE.PURCHASE_DURATION_DESCRIPTION"],
			// timelineunit: [this.sendModule.timelineunit.attrValue, [this.v.isUnBlank], "VM_INSTANCE.PLEASE_SELECT_TIMELINE_UNIT"],
		}

		return this.v.check(key, regs);
	}

	private checkInput(): boolean {
		const al = value => !!this.showNotice("提示",value);

		const value = this.checkValue();
		if (value) return al(value);
		return true;
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

	// 警告框相关
	showNotice(title: string, msg: string) {
		this.modalTitle = title;
		this.modalMessage = msg;

		this.noticeDialog.open();
	}
	modalAction() { }
}
