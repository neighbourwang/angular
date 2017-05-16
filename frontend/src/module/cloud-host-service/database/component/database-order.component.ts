
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

	databaseValue: DatabaseValue = new DatabaseValue;
	diskValue: DiskValue = new DiskValue;

	storageTypes = [{
		value: "FS",
		name: "文件系统(File System)"
	}, {
		value: "ASM",
		name: "自动化存储管理(ASM)"
	}];
	storageType = "FS"

	fetchTmIdsPost: DbTemplateInfo = new DbTemplateInfo;   //获取模板id的post
	fetchDBProductPost: MDproductReq = new MDproductReq;

	constructor(
		public layoutService: LayoutService,
		public router: Router,
		public v: Validation,
		public dux: DispatchEvent,
		public service: cloudHostServiceOrder,
		private dbservice: DatabaseServiceOrder
	) {
		super(layoutService, router, v, dux, service)
	
		this.v.result = {};
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
		this.dux.subscribe("SELECT_DB_PRODUCT", () => { this.databaseChange() })   //选择产品列表触发的时间

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
		this.database.diskInfoList.forEach(disk => disk.storage = this.values.BOOTSTORAGE)  //目录下面的所有的硬盘的storage下拉列表设置为第一位
	}

	formatDisk() {
		let lists = this.database.diskInfoList;
		if(!lists.length) return [];

		for (let list of lists) {
		    this.diskValue.PLATFORM = this.values.PLATFORM; 
		    this.diskValue.ZONE = this.values.ZONE; 
			this.diskValue.STORAGE.attrValue = list.storage; 
			this.diskValue.COPYLEVEL.attrValue = list.copyLevel
			this.diskValue.DISKSIZE.attrValue = list.diskSize || list.minDiskSize; 
			this.diskValue.MOUNTPATH.attrValue = list.mountPath; 
			this.diskValue.DISKGROUP.attrValue = list.diskGroup; 
			this.diskValue.USAGETYPE.attrValue = list.usageType; 

			// let sku = this.getSkuMap("disk", this.diskValue)[0],
			//	pro = this.diskProduct[0],
			//	payloadList = this.sendModuleToPay();
			// let payLoad = {
			//	skuId: sku.skuId,
			//	productId: pro.productId,
			//	attrList: payloadList,
			//	itemNo: this.makeItemNum(),
			//	totalPrice: this.diskTotalPrice,
			//	quality: this.payLoad.quality,
			//	serviceType: "1",
			//	relyType: "1",
			//	relyItemNo: "itemNo"
			// }
			// this.payLoadArr.push(payLoad);  //加入云硬盘
		}
	}

	dbPayLoadFormat() {
		this.formatDisk()
	}

	outputValue($event, i) {
		this.database.diskInfoList[i].diskSize = $event
	}

}
