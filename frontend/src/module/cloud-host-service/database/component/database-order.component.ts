
import { Component, ViewChild, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, ValidationRegs, Validation } from '../../../../architecture';
import { DatabaseServiceOrder } from '../service/database-order.service';

import { DispatchEvent } from "../../components/dispatch-event"

import { cloudVmComponentOrder } from "../../vm-instance/component/cloud-host-order.component"
import { cloudHostServiceOrder } from '../../vm-instance/service/cloud-host-order.service';

import { DbTemplateInfo, MDproductReq } from "../model/post.model"
import { DatabaseValue, DiskValue, VlueList } from "../model/other.model"

@Component({
	selector: 'cloud-vm-order',
	templateUrl: '../template/database-order.component.html',
	styleUrls: ['../style/database-order.less'],
})
export class DatabaseComponentOrder extends cloudVmComponentOrder implements OnInit {

	dbInits = [];
	dbInit;

	databases = [];   //数据库模板列表
	database;   //选中的数据库模板

	dbProductList = [];  //数据库产品列表
	dbProduct;  //数据库产品

	diskProducts = [];   //硬盘产品列表
	diskSkuList = [];   //硬盘sku列表
	vmItemNo: string //云主机的itemno

	databaseValue: DatabaseValue = new DatabaseValue;
	diskValue: DiskValue = new DiskValue;

	asmpasswordShadow:string = ""
	syspasswordShadow:string = ""

	storageTypes = [{
		value: "FS",
		name: "文件系统(File System)"
	}, {
		value: "ASM",
		name: "自动化存储管理(ASM)"
	}];

	fetchTmIdsPost: DbTemplateInfo = new DbTemplateInfo;   //获取模板id的post
	fetchDBProductPost: MDproductReq = new MDproductReq;

	constructor(
		public layoutService: LayoutService,
		public router: Router,
		public v: Validation,
		public dbv: Validation,
		public dux: DispatchEvent,
		public service: cloudHostServiceOrder,
		private dbservice: DatabaseServiceOrder
	) {
		super(layoutService, router, v, dux, service)
	
		this.v.result = {};
		this.dbv.result = {};
		this.dux.reset();

		this.fetchDBProductPost.serviceType = "3"   //数据库的serviceType = 3
	};

	ngOnInit() {
		this.makeSubscriber()
		this.makeDbSubScriber()
		this.fetchConfig()
		this.fetchDatabaseInit()
	}

	makeDbSubScriber() {
		this.dux.subscribe("DB_TYPE_CHANGE", () => { this.fetchDatabaseSearch() })   //数据库选项有变化时候
		this.dux.subscribe("DB_PRODUCT_CHANGE", () => { this.fetchShoppingMDproducts() })   //数据库产品有变化时候 （模板id，云平台）
		this.dux.subscribe("PLATFORM", () => { this.fetchShoppingMDproducts() })   //云平台有变化时
		this.dux.subscribe("ZONE", () => { this.setDiskPrice() })   //zone有变化时重新计算云硬盘
		this.dux.subscribe("SELECT_DB_PRODUCT", () => { this.databaseChange() })   //选择产品列表触发的时间
		this.dux.subscribe("SET_DISK_PRODUCTS", () => { this.setDiskProducts() })   //设置云硬盘的列表
		this.dux.subscribe("SET_DISK_PRODUCTS", () => { this.setDiskPrice() })   //当设置完云硬盘的产品列表时 设置云硬盘的价格
		this.dux.subscribe("SET_DISKPRICE", () => { this.setDiskPrice() })   //设置云硬盘的价格
	}

	private fetchDatabaseInit() {
		this.dbservice.fetchDatabaseInit().then(res => {
			if(!res.items.length) return

			this.dbInits = res.items
			this.dbtypeChange(res.items[0])
		})
	}

	private dbtypeChange(value) {
		this.dbInit = value; 
		this.fetchTmIdsPost.dbType = value.db.value; 

		let { version, mode } = this.dbInit
		this.fetchTmIdsPost.version = version.length ? version[0] : ""
		this.fetchTmIdsPost.deploymentMode = mode.length ? mode[0].value : ""

		this.dux.dispatch("DB_TYPE_CHANGE")
	}

	private fetchDatabaseSearch() {
		this.layoutService.show()
		this.dbservice.fetchDatabaseSearch(this.fetchTmIdsPost).then(res => {
			this.layoutService.hide()
			this.databases = res;
			this.fetchDBProductPost.templateIds = res.map(r => r.id)

			this.dux.dispatch("DB_PRODUCT_CHANGE")
		}).catch(res => this.layoutService.hide())
	}

	private fetchShoppingMDproducts() {   //获取数据库产品
		if( !this.values.PLATFORM.attrValue || !this.fetchDBProductPost.templateIds.length) return;  //当没有id或者云平台时

		this.fetchDBProductPost.platformId = this.values.PLATFORM.attrValue;
		this.dbservice.fetchShoppingMDproducts(this.fetchDBProductPost)
			.then(res => {
				let { mdProductShoppingItems: items } =  res

				this.dbProductList = items
				this.dbProduct = items.length ? items[0] : {}

				this.dux.dispatch("SELECT_DB_PRODUCT")
			})
	}

	private databaseChange() {   //选择数据库模板后
		if(!this.dbProduct.templatId) return  //如果没有产品 返回

		this.database = this.databases.filter(data => data.id === this.dbProduct.templatId)[0]   //确定模板
		this.database.diskInfoList.forEach(disk => disk.storage = this.values.STORAGE)  //目录下面的所有的硬盘的storage下拉列表设置为第一位
		console.log(this.database.attrList, "this.database.attrList")
		this.database.attrList.forEach(data => this.attrList[data.attrCode] = data )  //把数据库新加的attrList添加到老的list里面去
		this.dux.dispatch("SET_DISK_PRODUCTS")
	}

	setDiskSkuList() {   //确定硬盘的sku列表  并且在这里确定diskValue
		let lists = this.database.diskInfoList;
		if(!lists.length) return [];
		let arr = []
		for (let list of lists) {
			list.diskValue = new DiskValue
		    list.diskValue.PLATFORM = this.values.PLATFORM; 
		    list.diskValue.ZONE = this.values.ZONE; 
			list.diskValue.STORAGE = list.storage; 
			list.diskValue.COPYLEVEL.attrValue = list.copyLevel
			list.diskValue.DISKSIZE.attrValue = list.diskSize || list.minDiskSize; 
			list.diskValue.MOUNTPATH.attrValue = list.mountPath; 
			list.diskValue.DISKGROUP.attrValue = list.diskGroup; 
			list.diskValue.USAGETYPE.attrValue = list.usageType; 

			this.getSkuMap("disk", list.diskValue);
			arr.push(this.diskSku);  //加入云硬盘
		}
		this.diskSkuList = arr;
	}

	setDiskProducts() {     //确定硬盘的产品列表
		this.setDiskSkuList()
		let arr = []
		this.diskSkuList.forEach(sku => {
			if(!sku) return arr.push(undefined)
			let diskTimelineUnit = this.attrList.TIMELINEUNIT.mapValueList[sku.skuId].filter(value => value.attrValueId === this.values.TIMELINEUNIT.attrValueId)   //根据vm的时长id找到硬盘的时长
			if(!diskTimelineUnit.length) return arr.push(undefined)

			let product = this.proMap[`[${sku.skuId}, ${diskTimelineUnit[0].attrValueCode}]`]
			arr.push(product)
		})
		this.diskProducts = arr;
	}

	setDiskPrice() {
		if(!this.database) return false;
		console.log(this.diskSkuList, this.diskProducts)
	}

	formatDisk():any[]|string {
		let lists = this.database.diskInfoList;
		if(!lists.length) return [];

		let arr = []
		for (let i = 0; i < lists.length; ++i) {
			if(!this.diskProducts[i]) return `第${i+1}块云硬盘没有找到相应的产品`;   //如果没有响应的产品 则直接返回当前的序号 云硬盘产品缺一不可

	 		let payloadList = this.sendModuleToPay(lists[i].diskValue);
	 		let payLoad = {
	 			skuId: this.diskSkuList[i].skuId,
	 			productId: this.diskProducts[i].productId,
	 			attrList: payloadList,
	 			itemNo: this.makeItemNum(),
	 			totalPrice: this.diskTotalPrice,
	 			quality: this.payLoad.quality,
	 			serviceType: "1",
	 			relyType: "1",
	 			relyItemNo: this.vmItemNo
	 		}
	 		arr.push(payLoad);  //加入云硬盘
	 	}
	 	return arr;
	}	

	formatVm() {
		this.vmItemNo = this.makeItemNum();
		let payloadList = this.sendModuleToPay(),
			payLoad = {
				skuId: this.vmSku.skuId,
				productId: this.vmProduct.productId,
				attrList: payloadList,
				itemNo: this.vmItemNo,
				totalPrice: this.vmTotalPrice,
				quality: this.payLoad.quality,
				serviceType: "0",
				relyType: "",
				relyItemNo: ""
			}
		return [payLoad]
	}

	dbPayLoadFormat() {
		let vm = this.formatVm()
		let disk = this.formatDisk()
console.log(this.databaseValue)
		console.log(vm, disk)
	}

	checkDbValue(key?: string) {
		const regs: ValidationRegs = {
			listenpost: [this.databaseValue.ARCHMODE.attrValue, [this.v.isUnBlank, this.v.isNumber], "监听端口输入不正确"],
			maxconnection: [this.databaseValue.MAXCONNECTION.attrValue, [this.v.isUnBlank, this.v.isNumber], "最大连接数输入不正确"],
			syspassword: [this.databaseValue.SYSPASSWORD.attrValue, [this.v.isPassword, this.v.lengthRange(8, 30), this.v.isUnBlank], "VM_INSTANCE.PASSWORD_FORMAT_IS_NOT_CORRECT"],
			syspasswordShadow: [this.syspasswordShadow, [this.v.equalTo(this.databaseValue.SYSPASSWORD.attrValue), this.v.isUnBlank], "VM_INSTANCE.TWO_PASSWORD_ENTRIES_ARE_INCONSISTENT"],
			asmpassword: [this.databaseValue.ASMPASSWORD.attrValue, [this.v.isPassword, this.v.lengthRange(8, 30), this.v.isUnBlank], "VM_INSTANCE.PASSWORD_FORMAT_IS_NOT_CORRECT"],
			asmpasswordShadow: [this.asmpasswordShadow, [this.v.equalTo(this.databaseValue.ASMPASSWORD.attrValue), this.v.isUnBlank], "VM_INSTANCE.TWO_PASSWORD_ENTRIES_ARE_INCONSISTENT"],
		}

		return this.v.check(key, regs);
	}

	checkDbInput(): boolean {
		const al = value => !!this.showNotice("提示",value);

		const value = this.checkDbValue();
		if (value) return al(value);
		return true;
	}

	outputValue($event, i) {
		this.database.diskInfoList[i].diskSize = $event
		this.dux.dispatch("SET_DISKPRICE")
	}

}
