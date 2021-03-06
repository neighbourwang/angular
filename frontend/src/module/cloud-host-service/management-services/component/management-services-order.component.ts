
import { Component, ViewChild, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, ValidationRegs, Validation } from '../../../../architecture';
import { ManagementServicesOrderService } from '../service/management-services-order.service';

import { cloudHostServiceList } from '../../vm-instance/service/cloud-host-list.service';
import { cloudDriveServiceList } from '../../cloud-drive/service/cloud-drive-list.service';
import { PhysicalMachineListService } from '../../physical-machine/service/physical-machine-list.service';

import { DispatchEvent } from "../../components/dispatch-event"

import { SuperviseProductItem, ProductSimpleItem, ShoppingCartProfile, ServiceResAttributePair } from '../model/service.model';
import { PostAttrList, PayLoad} from '../model/post.model';
import { Values, ValuesAttr, Selected} from '../model/other.model';

import { QuiryDistList } from '../../cloud-drive/model/dist-list.model';
import { QuiryVmList } from '../../vm-instance/model/vm-list.model';
import { PMServiceItem } from "../../physical-machine/model/service.model"
import { PMServiceQuery } from "../../physical-machine/model/post.model"
	
const codeList = {
	"0" : "VM",
	"1" : "DISK",
	"2" : "PHYSICAL",
	"3" : "DATABASES",
	"4" : "MIDDLEWARE",
	"5" : "LOAD_BALANCE",
	"6" : "ALI_VM",
	"7" : "ALI_DISK",
	"8" : "NONE"
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

	postData: ShoppingCartProfile = new ShoppingCartProfile;
	postDataList: ShoppingCartProfile[] = []

	quiryDiskList:QuiryDistList = new QuiryDistList
	quiryVmList:QuiryVmList = new QuiryVmList

	diskList: any[] = []
	vmList: any[] = []

	values: Values = new Values;
	selectedList: Selected[] = [];
	code: string;
	description: string;

	pmListQuery: PMServiceQuery = new PMServiceQuery;
	pmCurrentPage: number = 1;
	pmTotalPage: number = 0;
	pmList:PMServiceItem[] = [];

	check = {};

	@ViewChild('cartButton') cartButton;


	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private dux: DispatchEvent,
		private v: Validation,
		private customV: Validation,
		private service: ManagementServicesOrderService,
		private diskService: cloudDriveServiceList,
		private vmService: cloudHostServiceList,
		private pmService: PhysicalMachineListService
	) {
		this.v.result = {}
		this.customV.result = {}  //自定义表单的一些验证

		// this.quiryVmList.pageParameter.size = 2
		this.quiryDiskList.queryField = "name"
		this.quiryVmList.queryField = "name"
		// this.quiryVmList.pageParameter.size = 10
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
		this.dux.subscribe("PRODUCT", () => { this.fetchProductInfo() })   //选取产品时 -》 获取产品详情 
		this.dux.subscribe("PRODUCT_INFO", () => { this.countPrice() })    //选取产品详情时 -》 计算产品价格
		this.dux.subscribe("PRODUCT_INFO", () => { this.initPostData() })  //选取产品详情时 -》 填充postdata的一些能填充的信息
		this.dux.subscribe("VM", () => { this.reFetchVmList() })  
		this.dux.subscribe("DISK", () => { this.reFetchDiskList() })
		this.dux.subscribe("PHYSICAL", () => { this.reFetchPmList() })
		this.dux.subscribe("DATABASES", () => { this.reFetchVmList() })
		this.dux.subscribe("MIDDLEWARE", () => { this.reFetchVmList() })
		this.dux.subscribe("ALI_VM", () => { this.customInput() })
		this.dux.subscribe("ALI_DISK", () => { this.customInput() })
		this.dux.subscribe("LOAD_BALANCE", () => { this.customInput() })
		this.dux.subscribe("NONE", () => { this.customInput() })
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
			.catch(e => this.layoutService.hide())
	}

	/******************获取attribute******************/
	private fetchAttribute() {
		this.service.fetchAttribute()
			.then(res => {
				this.postData = res
			})
			.catch(e => this.layoutService.hide())
	}

	/******获取管理服务产品详情*****/
	private fetchProductInfo() {
		this.service.fetchProductInfo( this.product.id )
			.then(res => {
				this.productInfo = res;
				this.code = res.serviceObjectCode;
				this.dux.dispatch(codeList[res.serviceObjectCode])
				this.dux.dispatch("PRODUCT_INFO")
			})
			.catch(e => this.layoutService.hide())
	}

	/******************确定产品后，把postData外层的信息填充了******************/
	private initPostData() {
		this.postData.skuId = this.productInfo.serviceSkuId
		this.postData.productId = this.productInfo.productId
		this.postData.serviceType = "11"
		this.postData.totalPrice = 1
		this.postData.quality = 1
		this.values.SERVICEOBJECTCODE.attrValue = this.productInfo.serviceObjectCode	
		this.service.instanceList.then(res => {
			this.values.SERVICEOBJECTCODE.attrDisplayValue = res.filter( r => r.value == this.productInfo.serviceObjectCode)[0].displayValue
		})

		this.values.TIMELINE.attrValue = "1";
		this.values.TIMELINEUNIT.attrValue = this.productInfo.billingCycleType;
		this.checkValue("timeline")

		this.selectedList = []
	}

	/******************计算价格******************/
	private countPrice() {

	}

	///// 云硬盘
	/******************获取硬盘列表******************/
	private fetchDisklist() {
		// this.diskList = {"resultCode":"100","detailDescription":null,"resultContent":[{"id":"2cde01b8-7b0e-46d4-8893-82fb5e405587","uuid":"895600587+再来五个_U84","instanceItemId":"54ced79f-f8c4-4c68-8d19-d5770f4f1dcf","subInstanceId":"9ee707fa-ffca-4ea7-ae96-aae10efcd81e","name":"再来五个","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Dev_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0}},{"id":"39233db0-901f-4f60-8443-70687518e242","uuid":"956608690+看我来测试_SL5","instanceItemId":"dcae8ed6-357a-45fb-9835-8b6ae4d79bf9","subInstanceId":"b613a10d-6491-4002-b775-2f2ac01f3f50","name":"看我来测试","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Dev_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0}},{"id":"4aeaa8ce-666d-4f9f-89ba-f0f305419ad7","uuid":"895600822+yOj7qj05rM_BRP","instanceItemId":"760c90c6-0bd7-4888-98dd-7807c6b87b9b","subInstanceId":"e578cad9-d6bb-4743-a6af-e0a6faae9969","name":"yOj7qj05rM","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Dev_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0}},{"id":"4e61c4db-4bc7-40b6-83ef-ac44998ba494","uuid":"895600563+空白片_FNG","instanceItemId":"f08cd766-7e60-4263-96fa-f4eb6b6f27e2","subInstanceId":"0be72ebd-d177-4048-be07-d7c169884ec6","name":"空白片","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Dev_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0}},{"id":"91620e33-024b-468e-bd12-3ce445df9244","uuid":"895602620+Mpwsn01PjO_ZY4","instanceItemId":"9842978e-30e7-4437-b343-54514c9ff27b","subInstanceId":"19a5d516-b0e1-4878-9b81-037de74cbc63","name":"Mpwsn01PjO","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Dev_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0}},{"id":"9c5c2882-c616-425d-bd57-722cd55aaddf","uuid":"895600555+空白片_RCU","instanceItemId":"f1f74220-ce4c-4e0d-b0b5-b91cb1777a60","subInstanceId":"2fa34b45-0ef4-4616-9a3b-01cc0eb12988","name":"空白片","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Dev_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0}},{"id":"9ce9ec45-3a5c-4e99-ab3f-3a9a3e19b9ae","uuid":"895600531+空白片_86E","instanceItemId":"05fb59c4-f1ec-4abe-b834-252eaf7e7291","subInstanceId":"e1fa8ae9-21ec-4af1-819d-07ad10fe21c8","name":"空白片","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Dev_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0}},{"id":"ace4356f-9402-43d7-94c2-618ab597a0c3","uuid":"895602553+BQANzVHTOj_AL7","instanceItemId":"6962e443-eb22-4b69-989b-b8b466ba4118","subInstanceId":"53856416-aa34-4f79-8d76-9a577eb3b547","name":"BQANzVHTOj","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Dev_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0}},{"id":"b2c6d8c9-0d4e-4c8e-9a8a-6b433b0950a0","uuid":"895600539+空白片_UAC","instanceItemId":"edea4402-6936-458d-bc86-b46a4153f71b","subInstanceId":"4f0c9b34-f973-4d27-a46f-9425fff668f3","name":"空白片","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Dev_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0}},{"id":"b33b4cd3-437c-4bbe-99fa-47d8dfb0c3f8","uuid":"956608613+测试中文名_PL3","instanceItemId":"0b3ee5d6-c2b6-4756-9a79-d5d2bba5a879","subInstanceId":"03c1d18d-9baa-443a-a489-a24fb5b2d275","name":"测试中文名","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Dev_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0}},{"id":"b44cf9cc-8a7a-4724-bd46-c1334ddc6d0a","uuid":"956608943+测试不行吧_69X","instanceItemId":"d3f67aa3-a1d4-4337-a534-6df1b420b87e","subInstanceId":"82a437d0-3164-4948-a755-d06a7d97c77c","name":"测试不行吧","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Dev_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0}},{"id":"c43b546b-a9c2-4124-a178-3ac0a6f4dc26","uuid":"895602545+XNkRrDhdu2_2ET","instanceItemId":"2b98390a-49bf-4728-95ca-2cd9b775ca26","subInstanceId":"6ab3b902-0901-4d04-bfcf-94c6cf366625","name":"XNkRrDhdu2","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Op_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0}}],"pageInfo":{"currentPage":1,"totalPage":1,"pageSize":20,"totalRecords":12}}.resultContent
		this.layoutService.show()
		this.diskService.getDistList(this.quiryDiskList)
			.then(res => {
				this.layoutService.hide()
				if (res.resultCode !== "100" || !res.resultContent.length) return ;

				this.quiryDiskList.pageParameter.totalPage = res.pageInfo.totalPage;
				this.diskList = this.diskList.concat(res.resultContent)
			})
			.catch(e => this.layoutService.hide())
	}
	private diskNextPage() {
		let { currentPage, totalPage } = this.quiryDiskList.pageParameter
		if(currentPage + 1 === totalPage) return

		this.quiryDiskList.pageParameter.currentPage += 1
		this.fetchDisklist()
	}
	private reFetchDiskList() {
		this.quiryDiskList.pageParameter.currentPage = 0
		this.diskList = []
		this.fetchDisklist()
	}

	/******************硬盘的平台和地域发生变化******************/
	private diskPlatformClick(data) {
		this.quiryDiskList.platformId = data.area.id;
		this.quiryDiskList.zoneId = data.zone.zoneId;
		this.reFetchDiskList()
	}
	/******************云硬盘被选择******************/
	private diskSelect() {
		this.selectedList = this.diskList.filter(disk => disk.isSelected)
			.map(disk => {
				let returnData = new Selected;
				returnData.REGION.attrValue = disk.platformName
				returnData.ZONE.attrValue = disk.zoneName
				returnData.INSTANCEID.attrValue = disk.id
				returnData.RELYSUBINSTANCENAME.attrValue = disk.name
				returnData.relyItemNo = disk.subInstanceId

				return returnData
			})
		console.log(this.selectedList)
	}

	///// 云主机
	/******************获取主机列表******************/
	private fetchVmlist() {
		this.layoutService.show()
		this.vmService.getHostList(this.quiryVmList)
			.then(res => {
				this.layoutService.hide()
				if (res.resultCode !== "100" || !res.resultContent.length) return ;

				this.quiryVmList.pageParameter.totalPage = res.pageInfo.totalPage;
				this.vmList = this.vmList.concat(res.resultContent)
			})
			.catch(e => this.layoutService.hide())
	}
	private vmNextPage() {
		let { currentPage, totalPage } = this.quiryVmList.pageParameter
		if(currentPage + 1 >= totalPage) return

		this.quiryVmList.pageParameter.currentPage += 1
		this.fetchVmlist()
	}
	private reFetchVmList() {
		this.quiryVmList.pageParameter.currentPage = 0
		this.vmList = []
		this.fetchVmlist()
	}

	/******************主机的平台和地域发生变化******************/
	private vmPlatformClick(data) {
		this.quiryVmList.platformId = data.area.id;
		this.quiryVmList.zoneId = data.zone.zoneId;
		this.reFetchVmList()
	}
	/******************云主机被选择******************/
	private vmSelect() {
		this.selectedList = this.vmList.filter(vm => vm.isSelected)
			.map(vm => {
				let returnData = new Selected;
				let [region, zone] = vm.regionZone.split(" ")
				returnData.REGION.attrValue = region
				returnData.ZONE.attrValue = zone
				returnData.INSTANCEID.attrValue = vm.itemId
				returnData.RELYSUBINSTANCENAME.attrValue = vm.instanceName
				returnData.relyItemNo = vm.subInstanceId

				return returnData
			})
		console.log(this.selectedList)
	}

	//////物理机
	private fetchPmList() {
		this.layoutService.show()
		this.pmService.fetchPMList(this.pmCurrentPage, this.pmListQuery)
			.then(res => {
				this.layoutService.hide()
				if (res.resultCode !== "100" || !res.resultContent.length) return ;

                this.pmTotalPage = res.pageInfo.totalPage
				this.pmList = this.pmList.concat(res.resultContent)
			})
			.catch(e => this.layoutService.hide())
	}
	private pmNextPage() {
		if(this.pmCurrentPage >= this.pmTotalPage) return
		this.pmCurrentPage += 1
		this.fetchPmList()
	}
	private reFetchPmList() {
		this.pmCurrentPage = 1
		this.pmList = []
		this.fetchPmList()
	}

	/******************物理机的区域变化******************/
	private regionClick(event) {
		this.pmListQuery.regionId = event.region ? event.region.id : ""
		this.reFetchPmList()
	}
	/******************物理机被选择******************/
	private pmSelect() {
		this.selectedList = this.pmList.filter(pm => (pm as any).isSelected)
			.map(pm => {
				let returnData = new Selected;
				returnData.REGION.attrValue = ""
				returnData.ZONE.attrValue = pm.poolRegionInfo
				returnData.INSTANCEID.attrValue = pm.pmId
				returnData.RELYSUBINSTANCENAME.attrValue = pm.pmName
				returnData.relyItemNo = pm.subinstanceId

				return returnData
			})
	}

	/******************自定义表单******************/
	private customInput() {

	}


	private scrollChange(event, fn) {
		let { scrollTop, scrollHeight, clientHeight} = event.target
		if(scrollHeight === 0) return false

		if(scrollTop + clientHeight === scrollHeight && fn) fn.call(this)
	}

	
	private checkValue(key?:string){
		const regs:ValidationRegs = {
			description: [this.values.REMARK.attrValue, [this.v.maxLength(300)], "备注信息填写有误"],
			timeline: [this.values.TIMELINE.attrValue, [this.v.isUnBlank, this.v.isInteger, this.v.min(1)], "购买周期填写有误"],
		}

		return this.v.check(key, regs);
	}
	
	private customCheckValue(key?:string){
		const regs:ValidationRegs = {
			region: [ this.values.REGION.attrValue, [this.v.isUnBlank, this.v.isBase], "区域填写有误"],
			zone: [this.values.ZONE.attrValue, [this.v.isUnBlank, this.v.isBase], "可用区填写有误"],
			intanceType: [this.values.INSTANCETYPE.attrValue, [this.v.isUnBlank, this.v.isBase], "请选择实例类型"],
			intanceId: [this.values.INSTANCEID.attrValue, [this.v.isUnBlank, this.v.isBase], "实例ID填写有误"],
			instanceName: [this.values.RELYSUBINSTANCENAME.attrValue, [this.v.isUnBlank, this.v.isBase], "实例名称填写有误"],
		}

		return this.customV.check(key, regs);
	}


	private checkInput(): boolean {
		const al = value => !!this.showNotice("提示",value);

		let value = this.checkValue();
		if (value) return al(value);

		if(this.isCustomInput()) {
			value = this.customCheckValue()
			if (value) return al(value);
		}

		return true;
	}


	private itemNum:number = 0;
	private makeItemNum():string {
		return new Date().getTime() + "" + (this.itemNum++);
	}
	private payLoadFormat() {
		let valuesList:Values[] = []

		if(this.selectedList.length) {   //如果是选择型的
			valuesList = this.selectedList.map(select => Object.assign({} ,this.values, select))
		}else {
			if ( !this.values.INSTANCEID.attrValue ) return false
			valuesList = [this.values]
		}

		this.postDataList = valuesList.map(values => {
			this.values.BILLINGTYPE.attrValue = this.productInfo.billingType
			this.values.SERVICENAME.attrValue = this.product.name
			this.values.INSTANCENAME.attrValue = this.product.name

			let { attrList } = this.postData

			attrList = attrList.map(attr => Object.assign({}, attr, values[attr.attrCode]))

			return Object.assign({}, this.postData, { attrList }, { itemNo: this.makeItemNum() }, { relyItemNo: values.relyItemNo })
		})
		console.log(this.postDataList)
		return true;
	}

	addCart() {   //加入购物车
		if (!this.checkInput()) return;

		if(!this.payLoadFormat()) return this.showNotice("提示", "请选择至少一个实例");   //获取最新的的payload的对象
		this.layoutService.show();
		this.service.addCart(this.postDataList).then(res => {
			this.layoutService.hide();
			this.noticeDialog.open("","CLOUD_DRIVE_ORDER.SUCCESSFULLY_ADDED_TO_SHOPPING_CART");
			this.cartButton.setCartList();
		}).catch(res => {
			this.layoutService.hide();
			this.showNotice("提示", "加入购物车失败")
		})
	}


	buyNow() {
		if (!this.checkInput()) return;

		if(!this.payLoadFormat()) return this.showNotice("提示", "请选择至少一个实例");   //获取最新的的payload的对象
		this.layoutService.show();
		this.service.saveOrder(this.postDataList).then(res => {
			this.layoutService.hide();
			this.router.navigate(['cloud-host-service/cart-order/', JSON.stringify(res)]);
		}).catch(error => {
			this.layoutService.hide();
			this.showNotice("提示", "提交订单失败")
		})
	}
	
	// 警告框相关
	showNotice(title: string, msg: string) {
		this.modalTitle = title;
		this.modalMessage = msg;

		this.noticeDialog.open();
	}
	modalAction() { }

	isCustomInput() {
		return ['5','6','7','8'].indexOf(this.code) > -1
	}

	get selectLength() {
		return this.isCustomInput() ? 1 : this.selectedList.length
	}

	get selectedName() {
		return this.selectedList.map(s => s.RELYSUBINSTANCENAME.attrValue)
	}
}
