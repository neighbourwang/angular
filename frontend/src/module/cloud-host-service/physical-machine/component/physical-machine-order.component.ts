
import { Component, ViewChild, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, ValidationRegs, Validation } from '../../../../architecture';
import { PhysicalMachineOrderService } from '../service/physical-machine-order.service';

import { DispatchEvent } from "../../components/dispatch-event"

import { Regions, PMOrderResponse, PMPartsEntity, PMNetworkVO, ResoucePolls, PMImageBaseVO, AttrList, ValuesList, ValuesType, Values } from '../model/service.model';
import { PostAttrList, PayLoad} from '../model/post.model';

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

	attrList: AttrList = new AttrList;
	valuesList: ValuesList = new ValuesList;
	values: Values = new Values;
	payLoad: PayLoad = new PayLoad();
	payLoadArr: PayLoad[];  //最后提交的是个PayLoad数组
	proMap:any;

	phyBasePrice: number;
	phyTotalPrice: number;
	phyProduct: any;

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
	passwordShadow: string;

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
		this.v.result = {};
		this.dux.reset()

		this.makeSubscriber()
		this.fetchRegion()
		this.initDispatch()
	}

	/****初始化派发事件***/
	initDispatch() {
		this.dux.dispatch("SPEC")  //规格选取
	}

	private makeSubscriber() {
		this.dux.subscribe("REGION", () => { this.fetchResourcePoll() })
		this.dux.subscribe("REGION", () => { this.setRegionValue() })
		this.dux.subscribe("SPEC", () => { this.changedSpec() })
		this.dux.subscribe("RESOURCEPOLL", () => { this.changedSpec() })
		this.dux.subscribe("RESOURCEPOLL", () => { this.setOs() })
		this.dux.subscribe("PHSICAL", () => { this.phsicalChange() })
		this.dux.subscribe("PHSICAL", () => { this.setPhysicalInfo() })
		this.dux.subscribe("PHSICAL", () => { this.setPMIDValues() })
		this.dux.subscribe("OSYSTEM", () => { this.setUserNameValues() })
		this.dux.subscribe("CONFIG_DONE", () => { this.setDefaultValues() })
		this.dux.subscribe("TIMELINEUNIT", () => { this.getTureProduct() })
	}

	/****区域*****/
	private fetchRegion() {
		this.service.fetchRegion().then(res => {
			if(!res.length) return

			this.regions = res;
			this.region = this.regions[0]

			this.dux.dispatch("REGION")
		})
	}

	/****资源池*****/
	private fetchResourcePoll() {
		this.service.fetchResourcePoll(this.region.id).then(res => {
			if(!res.length) {
				this.resourcePolls = []
				this.phsicalList = []
				this.phyProduct = null
				return false;
			}

			this.resourcePolls = res;
			this.resourcePoll = this.resourcePolls[0]

			this.dux.dispatch("RESOURCEPOLL")
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

	/*****设置操作系统*****/
	private setOs() {
		this.service.fetchImageList(this.resourcePoll.id)
			.then(res => {
				if(!res.length) return this.setValueListAndValue("OSYSTEM", [])

				let list: ValuesType[] = [];
				for (let r of res) {
					list.push({
						attrValueId: "",
						attrValueCode: "",
						attrDisplayValue: r.destImageName,
						attrValue: r.id,
						osType: +r.osTypeId,
					})
				}

				this.setValueListAndValue("OSYSTEM", list)
			})
			.catch(e => {
				this.showNotice("提示", "获取操作系统列表失败")
				this.setValueListAndValue("OSYSTEM", [])
			})
	}

	/*******设置系统的用户名********/
	private setUserNameValues() {
		const userName = { 
			attrValue: this.values.OSYSTEM.osType, 
			attrDisplayName: this.values.OSYSTEM.osType == 0 ? "administrtor" : "root", 
		}
		this.setValueListAndValue("USERNAME", [ Object.assign(new ValuesType, userName) ])
	}

	/******获取物理机的价格等信息*******/
	private setPhysicalInfo() {
		this.layoutService.show();
		this.service.fetchPhysicalInfo(this.selectedPhsical.id)
			.then(res => {
				res.attrList.forEach(config => {
					this.layoutService.hide();
					this.attrList[config.attrCode] = config;
				});
				this.proMap = res.proMap;

				this.dux.dispatch("CONFIG_DONE")   //派发获取配置完成的时间
			})
			.catch( error => {
				this.layoutService.hide()
				this.showNotice("提示", "获取物理机产品信息失败")
			})
	}

	/*****设置物理机的values*******/
	private setPMIDValues() {
		this.setValueListAndValue("PMID", [ Object.assign(new ValuesType, { attrValue: this.selectedPhsical.id }) ])
	}
	/******设置默认的值*******/
	private setDefaultValues() {
		for( let code of ["TIMELINEUNIT", "RESOURCEPOOL"]) this.setValueListAndValue(code)
	}

	//设置默认值 并派发事件
	private setValueListAndValue(code, list?) {
		this.valuesList[code] = list || this.attrList[code].valueList
		this.values[code] = this.valuesList[code].length ? this.valuesList[code][0] : new ValuesType
// if(code === "USERNAME") console.log("USERNAME", this.values["USERNAME"], this.valuesList["USERNAME"])
		this.dux.dispatch(code)  //派发当前的code的subscriber
	}

	/*****初始化产品数据*******/
	private initProduct() {
		this.phyBasePrice = 0
		this.phyTotalPrice = 0
	}

	/*******获取真正的产品*******/
	private getTureProduct() {
		this.phyProduct = this.proMap["[" + this.values.TIMELINEUNIT.attrValueCode + "]"]
		console.log("匹配到的物理机", this.phyProduct)
		if (!this.phyProduct) return this.initProduct()

		let timeline = +this.values.TIMELINE.attrValue.trim()
		this.phyBasePrice = this.phyProduct.billingInfo.basePrice * this.payLoad.quality;  //一次性费用
		this.phyTotalPrice = (this.phyProduct.billingInfo.basicPrice) * timeline * this.payLoad.quality;   //周期费用
	}

	private checkValue(key?:string){

		const regs:ValidationRegs = {
			region: [this.region.id, [this.v.isUnBlank], "请选择区域"],
			resourcePoll: [this.resourcePoll.id, [this.v.isUnBlank], "请选择资源池"],
			selectedPhsical: [this.selectedPhsical.id, [this.v.isUnBlank], "请选择物理机"],
			// pmNetworkVO: [this.selectedPhsical.pmNetworkVO && this.selectedPhsical.pmNetworkVO.id, [this.v.isUnBlank], "该物理机无可用网络"],
			os: [this.values.OSYSTEM.attrValue, [this.v.isUnBlank], "请选择镜像"], 
			password: [this.values.PASSWORD.attrValue, [this.v.isPassword, this.v.lengthRange(8,30), this.v.isUnBlank], "VM_INSTANCE.PASSWORD_FORMAT_IS_NOT_CORRECT"],
			passwordShadow: [this.passwordShadow, [this.v.equalTo(this.values.PASSWORD.attrValue), this.v.isUnBlank], "VM_INSTANCE.TWO_PASSWORD_ENTRIES_ARE_INCONSISTENT"],
			instancename: [this.values.INSTANCENAME.attrValue, [this.v.isInstanceName, this.v.isBase], "VM_INSTANCE.HOST_NAME_FORMAT_IS_NOT_CORRECT"],
			timeline: [this.values.TIMELINE.attrValue.trim(), [this.v.isInteger, this.v.range(1,999), this.v.isUnBlank], "VM_INSTANCE.PURCHASE_DURATION_DESCRIPTION"],
			timelineunit: [this.values.TIMELINEUNIT.attrValue, [this.v.isUnBlank], "VM_INSTANCE.PLEASE_SELECT_TIMELINE_UNIT"],
		}

		return this.v.check(key, regs);
	}

	private checkInput(): boolean {
		const al = value => !!this.showNotice("提示",value);

		const value = this.checkValue();
		if (value) return al(value);
		return true;
	}

	private setRegionValue() {
		this.values.REGION.attrValue = this.region.name
	}

	private valuesListToPay(): PostAttrList[] {   //把valuesList转换成数组
		let payloadList = [];

		for (let v in this.values) {
			// if(this.values[v].attrValueCode === "" && this.values[v].attrValue === "")  continue;

			payloadList.push({
				attrId: this.attrList[v].attrId,                  	//服务属性ID
				attrCode: this.attrList[v].attrCode,              	//服务属性CODE
				attrDisplayValue: this.values[v].attrDisplayValue,	//服务属性Name
				attrDisplayName: this.attrList[v].attrDisplayName,	//服务属性Name
				attrValueId: this.values[v].attrValueId,          	//服务属性值ID
				attrValue: this.values[v].attrValue,              	//服务属性值
				attrValueCode: this.values[v].attrValueCode,      	//服务属性值
			});
		};

		let partInfoList = this.phyProduct.billingInfo.addonPriceDetailInfo  //把部件的信息加进去
		if(partInfoList.length) {
			partInfoList.forEach(part => {
				payloadList.push({
					attrId: part.id,                	//服务属性ID
					attrCode: "PARTADDONNUM",       	//服务属性CODE
					attrDisplayValue: part.partsNum,	//服务属性Name
					attrDisplayName: part.partsname,	//服务属性Name
					attrValueId: part.id,           	//服务属性值ID
					attrValue: part.partsNum,       	//服务属性值
					attrValueCode: "",              	//服务属性值
				})
			})
		}
		payloadList.concat()
		return payloadList;
	}

 	private itemNum: number = 0;
 	private makeItemNum(): string {
 		return new Date().getTime() + "" + (this.itemNum++);
 	}
 	private payLoadFormat(): PayLoad[] {

		/****下面开始处云主机订单的逻辑****/
		let payloadList = this.valuesListToPay(),
			itemNo = this.makeItemNum(),
			payLoad = {
				skuId: this.phyProduct.serviceSkuId,
				productId: this.phyProduct.productId,
				attrList: payloadList,
				itemNo: itemNo,
				totalPrice: this.phyTotalPrice,
				quality: this.payLoad.quality,
				serviceType: "4",
				relyType: "",
				relyItemNo: ""
			}

		this.payLoadArr = [];
		this.payLoadArr.push(payLoad);   //加入云主机的订单

		console.log("发送的订单数据：" , this.payLoadArr)
		return this.payLoadArr;
	}

	addCart() {   //加入购物车
		if (!this.checkInput()) return;
		let payLoadArr = this.payLoadFormat();   //获取最新的的payload的对象
		this.layoutService.show();
		this.service.addCart(payLoadArr).then(res => {
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
		let payLoadArr = this.payLoadFormat();   //获取最新的的payload的对象
		this.layoutService.show();
		this.service.saveOrder(payLoadArr).then(res => {
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
}
