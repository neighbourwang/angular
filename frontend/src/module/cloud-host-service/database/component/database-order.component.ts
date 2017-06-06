
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

	@ViewChild('confirm')
	public confirmDialog: ConfirmComponent;

	@ViewChild('notice')
	public noticeDialog: NoticeComponent;

	dbInits = [];
	dbInit;

	databases = [];   //数据库模板列表
	database;   //选中的数据库模板

	dbProductList = [];  //数据库产品列表
	dbProduct;  //数据库产品

	diskusage = []   //云硬盘用途
	copylevel = []  //冗余级别

	diskProducts = [];   //硬盘产品列表
	diskSkuList = [];   //硬盘sku列表
	vmItemNo: string //云主机的itemno

	oneTimeTotalPrice:number = 0;
	totalBilling:number = 0;
	totalAnnual:number = 0;

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
		public dbservice: DatabaseServiceOrder
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
		this.getDict()
	}

	makeDbSubScriber() {
		this.dux.subscribe("DB_TYPE_CHANGE", () => { this.fetchDatabaseSearch() })   //数据库选项有变化时候
		this.dux.subscribe("DB_PRODUCT_CHANGE", () => { this.fetchShoppingMDproducts() })   //数据库产品有变化时候 （模板id，云平台）
		this.dux.subscribe("PLATFORM", () => { this.fetchShoppingMDproducts() })   //云平台有变化时
		this.dux.subscribe("ZONE", () => { this.setDiskPrice() })   //zone有变化时重新计算云硬盘
		this.dux.subscribe("SELECT_DB_PRODUCT", () => { this.databaseChange() })   //选择产品列表触发的时间
		this.dux.subscribe("SELECT_DB_PRODUCT", () => { this.setTotalPrice() })   //选择产品列表触发的时间
		this.dux.subscribe("SET_DISK_PRODUCTS", () => { this.setDiskProducts() })   //设置云硬盘的列表
		this.dux.subscribe("SET_DISK_PRODUCTS", () => { this.setTotalPrice() })   //当设置完云硬盘的产品列表时 设置云硬盘的价格
		this.dux.subscribe("SET_DISKPRICE", () => { this.setTotalPrice() })   //设置云硬盘的价格
		this.dux.subscribe("SET_VMPRICE", () => { this.setTotalPrice() })
	}

	private fetchDatabaseInit() {
		this.layoutService.show()
		this.dbservice.fetchDatabaseInit().then(res => {
			this.layoutService.hide()
			if(!res.items.length) return

			this.dbInits = res.items
			this.dbtypeChange(res.items[0])
		})
		.catch(e => this.layoutService.hide())
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
		if( !this.values.PLATFORM.attrValue || !this.fetchDBProductPost.templateIds.length){   //当没有id或者云平台时
			this.dbProductList = []
			this.dbProduct = undefined
			return;  
		}

		this.fetchDBProductPost.platformId = this.values.PLATFORM.attrValue;
		this.dbservice.fetchShoppingMDproducts(this.fetchDBProductPost)
			.then(res => {
				let { mdProductShoppingItems: items } =  res

				this.dbProductList = items
				this.dbProduct = items.length ? items[0] : {}

				if(items.length) this.dux.dispatch("SELECT_DB_PRODUCT")
			})
	}

	private databaseChange() {   //选择数据库模板后
		if(!this.dbProduct.templatId) return  //如果没有产品 返回

		this.database = this.databases.filter(data => data.id === this.dbProduct.templatId)[0]   //确定模板
		this.database.diskInfoList.forEach(disk => disk.storage = this.values.STORAGE)  //目录下面的所有的硬盘的storage下拉列表设置为第一位
		this.database.attrList.forEach(data => this.attrList[data.attrCode] = data )  //把数据库新加的attrList添加到老的list里面去

		this.dux.dispatch("CPU")    //确定模板后需要过滤根据最小规格过滤 CPU MEM BOOTSIZE，因为MEM依赖CPU，所以这里dispatch CPU 就可以同时更新MEM
		this.oSfilterBootsize()     //确定模板后需要过滤根据最小规格过滤 重新计算启动盘的大小

		//做一些数据库的选项初始化的工作
		this.databaseValueInit()
		this.dux.dispatch("SET_DISK_PRODUCTS")
	}

	customSetValueList(code, valueList) {    //中间件数据库需要根据模板过滤MEM CPU BOOTSIZE的最小配置 
		if( code === "MEM" && this.database && this.database.memory ) {
			return valueList.filter(value => +value.attrValue >= this.database.memory * 1024 )
		}
		if( code === "CPU" && this.database && this.database.cpu ) {
			return valueList.filter(value => +value.attrValue >= this.database.cpu )
		}
		if( code === "BOOTSIZE" && this.database && this.database.bootStorageSize ) {
			return valueList.filter(value => +value.attrValue >= this.database.bootStorageSize )
		}

		return valueList;
	}

	databaseValueInit() {
		this.databaseValue.ARCHMODE.attrValue = "archivelog";
		this.databaseValue.DBCHARSET.attrValue = "UTF8";
	}

	getDict() {  //获取数据字典的值
	 	Promise.all([this.dbservice.diskusage, this.dbservice.copylevel]).then(res => {   //获取这两个数据字典
	 		console.log(res)
	 		this.diskusage = res[0]
	 		this.copylevel = res[1]
	 	})
	}	
	setListDiskValue() {  //把diskValue加入到 this.database.diskInfoList里面去
		let lists = this.database.diskInfoList;
		if(!lists.length || !this.diskusage.length || !this.copylevel.length) return;

		for (let list of lists) {
			let copylevel = this.copylevel.filter(level => level.value == list.copyLevel)[0]
			let diskusage = this.diskusage.filter(usage => usage.value == list.usageType)[0]

			list.diskValue = new DiskValue
		    list.diskValue.PLATFORM = this.values.PLATFORM; 
		    list.diskValue.ZONE = this.values.ZONE; 
			list.diskValue.STORAGE = list.storage; 
			list.diskValue.COPYLEVEL.attrValue = copylevel ? copylevel.code : "";
			list.diskValue.USAGETYPE.attrValue = diskusage? diskusage.code : "" ; 
			list.diskValue.DISKSIZE.attrValue = list.diskSize || list.minDiskSize; 
			list.diskValue.MOUNTPATH.attrValue = list.mountPath; 
			list.diskValue.DISKGROUP.attrValue = list.diskGroup; 
		}
	}

	setDiskSkuList() {   //确定硬盘的sku列表  并且在这里确定diskValue
		this.setListDiskValue()
		let lists = this.database.diskInfoList;
		if(!lists.length) return [];
		let arr = []
		for (let list of lists) {
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

	setTotalPrice() {
		this.setListDiskValue()
		let billingList = [];
		
		[...this.diskProducts, this.dbProduct, this.vmProduct].forEach((prod, i) => {
			if(prod) {
				let disksize = this.database.diskInfoList[i] && this.database.diskInfoList[i].diskValue 
											? this.database.diskInfoList[i].diskValue.DISKSIZE.attrValue : 1   //获取云硬盘的大小
				billingList.push(Object.assign({}, prod.billingInfo, { disksize }))
			}
		})
		this.oneTimeTotalPrice = 0;
		this.totalBilling = 0;
		this.totalAnnual = 0;
		billingList.forEach(billing => {
			this.oneTimeTotalPrice += billing.basePrice;  //计算一次性价格
			if(billing.billingMode == 1) this.totalBilling += billing.basicPrice * +this.values.TIMELINE.attrValue;
			if(billing.billingMode == 2) this.totalAnnual += billing.unitPrice * billing.disksize * +this.values.TIMELINE.attrValue;
		})
	}

	formatDisk():any[] {
		let lists = this.database.diskInfoList;
		if(!lists.length) return [];

		let arr = []
		for (let i = 0; i < lists.length; ++i) {
			if(!this.diskProducts[i]) return [`第${i+1}块云硬盘没有找到相应的产品`];   //如果没有响应的产品 则直接返回当前的序号 云硬盘产品缺一不可

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

	formatVm():any[] {
		let errorMsg = this.checkValue()
		if(errorMsg) return [errorMsg];

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

	formatDB():any[] {
		let errorMsg = this.checkDbValue()
		if(errorMsg) return [errorMsg];

		this.databaseValue.STORAGETYPE.attrValue = this.database.storageType;
		this.databaseValue.TIMELINE = this.values.TIMELINE
		this.databaseValue.TIMELINEUNIT = this.values.TIMELINEUNIT
		this.databaseValue.DBTYPE.attrValue = this.dbInit.db.label
		this.databaseValue.DBVERSION.attrValue = this.fetchTmIdsPost.version
		this.databaseValue.DEPLOYMODE.attrValue = this.deploymentModeString

		let payloadList = this.sendModuleToPay(this.databaseValue);
		let payLoad = {
			skuId: this.dbProduct.skuId,
			productId: this.dbProduct.productId,
			attrList: payloadList,
			itemNo: this.makeItemNum(),
			totalPrice: this.diskTotalPrice,
			quality: this.payLoad.quality,
			serviceType: "3",
			relyType: "1",
			relyItemNo: this.vmItemNo
		}

		return [payLoad]
	}

	dbPayLoadFormat() {
		let vm = this.formatVm()
		let disk = this.formatDisk()
		let db = this.formatDB()

		let payLoadArr = [...vm, ...disk, ...db]

		return payLoadArr;
	}


	submitCheck():Promise<any[]>{  //检测是否可以提交订单
		let payLoadArr = this.dbPayLoadFormat();
		let errMsg = payLoadArr.filter(pay => typeof pay === "string")
		if(errMsg.length)  return Promise.reject(errMsg[0]);

		this.layoutService.show();
		return this.checkQuota().then(isEnoughQuota => {
			this.layoutService.hide();
			if(!isEnoughQuota) {
				this.showNotice("提示","部门或平台配额不足, 无法完成购买！");
				throw "配额不足";
			}

			return payLoadArr;   //获取最新的的payload的对象
		}).catch(res => {
			this.layoutService.hide();
		})
	}

	checkDbValue(key?: string) {
		let regs: any = {
			dbProduct: [this.dbProduct, [this.v.isUnBlank], "请选择数据库产品"],
			listenpost: [this.databaseValue.LISTENPOST.attrValue, [this.v.isUnBlank, this.v.isNumber], "监听端口输入不正确"],
			maxconnection: [this.databaseValue.MAXCONNECTION.attrValue, [this.v.isUnBlank, this.v.isNumber], "最大连接数输入不正确"],
			syspassword: [this.databaseValue.SYSPASSWORD.attrValue, [this.v.isPassword, this.v.lengthRange(8, 30), this.v.isUnBlank], "VM_INSTANCE.PASSWORD_FORMAT_IS_NOT_CORRECT"],
			syspasswordShadow: [this.syspasswordShadow, [this.v.equalTo(this.databaseValue.SYSPASSWORD.attrValue), this.v.isUnBlank], "VM_INSTANCE.TWO_PASSWORD_ENTRIES_ARE_INCONSISTENT"]
		}

		if(this.database.storageType==='ASM') {
			regs.asmpassword = [this.databaseValue.ASMPASSWORD.attrValue, [this.v.isPassword, this.v.lengthRange(8, 30), this.v.isUnBlank], "VM_INSTANCE.PASSWORD_FORMAT_IS_NOT_CORRECT"];
			regs.asmpasswordShadow = [this.asmpasswordShadow, [this.v.equalTo(this.databaseValue.ASMPASSWORD.attrValue), this.v.isUnBlank], "VM_INSTANCE.TWO_PASSWORD_ENTRIES_ARE_INCONSISTENT"]
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

	get deploymentModeString () {
		return this.dbInit ? this.dbInit.mode.filter(m => m.value === this.fetchTmIdsPost.deploymentMode)[0].label : ""
	}

}
