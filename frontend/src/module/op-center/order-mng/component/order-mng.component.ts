import { Component, OnInit, ViewChild,EventEmitter,Output} from '@angular/core';
import { Router } from '@angular/router';
import { DicLoader, ItemLoader, NoticeComponent, RestApi, RestApiCfg, LayoutService, ConfirmComponent, PopupComponent } from '../../../../architecture';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { DictService } from '../../../../architecture/core/service/dict-service';

import { MyDatePicker  } from '../../../../architecture/components/date-picker/my-date-picker.component';
import {
	ListItem
	, OrderMngParam
	, SubInstanceResp
	, SubInstanceItemResp
	, SubInstanceAttrPair
	, ProductBillingItem
	, RenewSetting
	, PurchaseUnit
	, OrderDetailItem
	, CancelParam
	, AutoRenewItem
	,UserInfo
	,PhysicalMachinePart
	,PhysicalMachine
} from '../model'
import * as _ from 'underscore';

@Component({
	selector: 'order-mng',
	templateUrl: '../template/order-mng.component.html',
	styleUrls: ['../style/order-mng-list.less', '../style/order-mng-renew.less'],
	providers: []
}
)
export class OrderMngComponent implements OnInit {
	@ViewChild("notice")
	private _notice: NoticeComponent;

	@ViewChild("createDatePicker")
  	private createDatePicker: MyDatePicker;

	@ViewChild("expireDatePicker")
  	private expireDatePicker: MyDatePicker;

	@ViewChild("renewDialog")
	private _renewDialog: ModalComponent;

	@ViewChild("cancelDialog")
	private _cancelDialog: ModalComponent;

	@ViewChild("testDialog")
	private _testDialog: ModalComponent;

	@ViewChild("AutoRenewDialog")
	AutoRenewDialog: PopupComponent;

 
	//订单详情加载
	private _orderDetailLoader: ItemLoader<OrderDetailItem> = null;

	//当前选择的行
	private selectedOrderItem: SubInstanceResp = null;
	//查询参数
	private _param: OrderMngParam = new OrderMngParam();
	//部门
	private _departmentLoader: ItemLoader<ListItem> = null;

	//订购人
	private _buyerLoader: ItemLoader<{ id: string; name: string }> = null

	//订单状态
	private _orderStatusDic: DicLoader = null;
	//产品类型
	private _productTypeLoader: DicLoader = null;
	//区域
	private _platformLoader: ItemLoader<ListItem> = null;
	//可用区
	private _regionLoader: ItemLoader<ListItem> = null;
	//订单查询
	private _orderLoader: ItemLoader<SubInstanceResp> = null;

	//续订数据
	private _renewSetting: RenewSetting = new RenewSetting();
	private _renewHandler: ItemLoader<any> = null;

	//退订
	// private cancelObj: CancelParam = new CancelParam();
	private _cancelHandler: ItemLoader<any> = null;
	private detail: OrderDetailItem = new OrderDetailItem();

	private cancelParamList = [];
	private _entId: string = "191af465-b5dc-4992-a5c9-459e339dc719";

	//计费模式
	private _billinModeDic: DicLoader = null;
	//续费模式
	private _periodTypeDic: DicLoader = null;
	//续订费用
	private _renewPriceLoader: ItemLoader<ProductBillingItem> = null;

	//类型
	private _typeDic: DicLoader = null;

	private showInstance: boolean = true;

	//自动续订
	private autoRenewItem: AutoRenewItem = new AutoRenewItem();
	private autoRenewConfigItem: ItemLoader<any> = null;
	private autoRenewSetting: ItemLoader<any> = null;

	private userTypeLoader:ItemLoader<UserInfo>= null;
	private isAdmin:boolean = false;

    private currentPage:number = 1;//记录当前页码
	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg: RestApiCfg,
		private restApi: RestApi,
		private _dictServ: DictService) {

		//类型
		this._typeDic = new DicLoader(restApiCfg, restApi, "ORDER", "TYPE");

		this.userTypeLoader = new ItemLoader<UserInfo> (false,'用户类型加载出错','op-center.order-mng.ent-type.get',this.restApiCfg,this.restApi);
	     this.userTypeLoader.MapFunc = (source:Array<any>, target:Array<UserInfo>)=>{
                let obj = new UserInfo();
                for(let item of source){
                obj.enterpriseId = item.enterpriseId;
				obj.enterpriseName = item.enterpriseName;
				obj.organizationId = item.organizationId;
				obj.organizationName = item.organizationName;
                obj.roleName = item.roles[0].roleName;
                }
				
                target.push(obj);
			
		}

		// this.userTypeLoader.Trait = (target:Array<UserInfo>)=>{
		
		// }

		//详情已购服务加载
		this._orderDetailLoader = new ItemLoader<OrderDetailItem>(false, "已购服务详情加载失败！", "op-center.order-mng.order-detail.get", restApiCfg, restApi);
		this._orderDetailLoader.MapFunc = (source: Array<any>, target: Array<OrderDetailItem>) => {
			for (let item of source) {
				let obj: OrderDetailItem = _.extendOwn(new OrderDetailItem(), item)
				target.push(obj);
				
			}
		};
		this._orderDetailLoader.Trait = (target:Array<OrderDetailItem>)=>{
			
			for(let item of target ){
				//实例名称
				if(item.itemList){
					if(item.itemList[0].pmEntity){
						for(let partItem of item.itemList[0].pmEntity.partsEntitys){
							if(partItem.partsName=='磁盘'||partItem.partsName=='内存'){
								partItem.capacity = Number(partItem.number)*Number(partItem.specValue)+'GB';//只有磁盘和内存计算总容量
								partItem.specValue+='GB';		
							}		
							if(partItem.partsName=='CPU'){
								partItem.specValue=partItem.specValue.replace('Ghz','GHZ');
							}
							if(partItem.partsName=='网卡'){
								partItem.specValue+='M';
							}
						}
					}else{
						// Mock数据
						item.itemList[0].pmEntity = new PhysicalMachine();
						let _item = new PhysicalMachinePart();
						_item.partsName = 'CPU';
						_item.specName = 'Xeon E5 2560';
						_item.specValue = '2Ghz';
						_item.number = '3';
						_item.capacity = '4';
						item.itemList[0].pmEntity.partsEntitys[0] = _item;
						for(let partItem of item.itemList[0].pmEntity.partsEntitys){
							if(partItem.partsName=='磁盘'||partItem.partsName=='内存'){
								partItem.capacity = Number(partItem.number)*Number(partItem.specValue)+'GB';//只有磁盘和内存计算总容量
								partItem.specValue+='GB';		
							}		
							if(partItem.partsName=='CPU'){
								partItem.specValue=partItem.specValue.replace('Ghz','GHZ');
							}
							if(partItem.partsName=='网卡'){
								partItem.specValue+='M';
							}
						}
					}
					if(item.itemList[0].specList){
						let getProperty = _.property("attrDisplayValue");
						if(item.productType==0||item.productType==4||item.productType==11){
							item.instanceName = getProperty(item.itemList[0].specList.find(n=>n.attrCode == 'INSTANCENAME'));
						}else{
							item.instanceName = getProperty(item.itemList[0].specList.find(n=>n.attrCode == 'DISKINSNAME'));
						}
					}	
				}
				//匹配历史信息的实例名称
				if(item.hisOrderList){
					for(let hisItem of item.hisOrderList){
						// item.hisOrderList[0].type=0;
						// item.hisOrderList[1].type=0;0是订购单
						let getProperty = _.property("attrDisplayValue");
						if(hisItem.specList){
							 if(hisItem.productType==0||item.productType==4){
								hisItem.instanceName = getProperty(hisItem.specList.find(n=>n.attrCode == 'INSTANCENAME'));
							}else{
								hisItem.instanceName = getProperty(hisItem.specList.find(n=>n.attrCode == 'DISKINSNAME'));
							}
						}
					}
				}
			}
		}

		this._orderDetailLoader.FirstItem = new OrderDetailItem();

		//续订费用
		this._renewPriceLoader = new ItemLoader<ProductBillingItem>(false, "ORDER_MNG.RENEWAL_FEE_DATA_FAILED", "op-center.order-mng.order-renew-price.get", restApiCfg, restApi);

		//续费模式
		this._periodTypeDic = new DicLoader(restApiCfg, restApi, "PACKAGE_BILLING", "PERIOD_TYPE");

		//计费模式
		this._billinModeDic = new DicLoader(restApiCfg, restApi, "BILLING_MODE", "TYPE");

		//退订
		this._cancelHandler = new ItemLoader<any>(false, "退订失败！", "op-center.order-mng.order-cancel.post", restApiCfg, restApi);

		//续订
		this._renewHandler = new ItemLoader<any>(false, "COMMON.RENEW_DATA_FAILED", "op-center.order-mng.order-renew.get", restApiCfg, restApi);

		//初始化单项order数据
		this.selectedOrderItem = new SubInstanceResp();

		//自动续订配置变更
		this.autoRenewConfigItem = new ItemLoader<any>(false, "自动续订配置变更加载失败", "op-center.order-mng.order-auto-renew-config.get", restApiCfg, restApi);
		this.autoRenewConfigItem.Trait = (target: Array<AutoRenewItem>) => {
			this.autoRenewItem.subExtendType = -1;
			if (target[0].serivceRenewWayProductItems) {
				this.autoRenewItem.clearSerivceRenewWayProductItems();
				for (let n in target[0].serivceRenewWayProductItems) {
					this.autoRenewItem.pushSerivceRenewWayProductItem();
					let billingInfo = this.autoRenewItem.serivceRenewWayProductItems[n].billingInfo;
					let targetBillingInfo = target[0].serivceRenewWayProductItems[n].billingInfo;
					for (let n in billingInfo) {
						if (targetBillingInfo[n]) {
							billingInfo[n] = targetBillingInfo[n];
						}
					}
					this.autoRenewItem.serivceRenewWayProductItems[n].billingInfo.extendTypeToPeriodType();
				}
				this.autoRenewItem.extendTypeToPeriodType();
			} else {
				this.autoRenewItem.serivceRenewWayProductItems = [];
			}
		};

		//对订购实例进行自动续订的设定及取消
		this.autoRenewSetting = new ItemLoader<any>(false, "已购实例自动续订提交失败", "op-center.order-mng.order-auto-renew-setting.post", restApiCfg, restApi);

		//部门配置
		this._departmentLoader = new ItemLoader<ListItem>(false, "ORDER_MNG.DEPARTMENT_LIST_DATA_FAILED", "op-center.order-mng.department-list.get", restApiCfg, restApi);

		//订购人加载
		this._buyerLoader = new ItemLoader<{ id: string; name: string }>(false, 'ORDER_MNG.SUBSCRIBER_LIST_DATA_FAILED', "check-center.submiter-list.get", this.restApiCfg, this.restApi);

		this._buyerLoader.MapFunc = (source: Array<any>, target: Array<{ id: string; name: string }>) => {
			for (let item of source) {
				let obj = _.extend({}, item);
				target.push(obj);
				obj.id = item.key;
				obj.name = item.value;
			}
		}
		//订单状态配置
		this._orderStatusDic = new DicLoader(restApiCfg, restApi, "SUBINSTANCE", "STATUS");

		//产品类型配置
		this._productTypeLoader = new DicLoader(restApiCfg, restApi, "GLOBAL", "SERVICE_TYPE")
		//区域配置
		this._platformLoader = new ItemLoader<ListItem>(false, "COMMON.ZONE_DATA_FAILED", "op-center.order-mng.platform-list.get", restApiCfg, restApi);

		//可用区配置
		this._regionLoader = new ItemLoader<ListItem>(false, "COMMON.AVAILABLE_ZONE_DATA_ERROR", "op-center.order-mng.region-list.get", restApiCfg, restApi);
		this._regionLoader.MapFunc = (source: Array<any>, target: Array<ListItem>) => {
			for (let item of source) {
				let obj = new ListItem();
				target.push(obj);

				obj.id = item.zoneId;
				obj.name = item.zoneName;
			}
		};

		//配置订单加载
		this._orderLoader = new ItemLoader<SubInstanceResp>(true, "ORDER_MNG.ORDERED_LIST_DATA_FAILED", "op-center.order-mng.order-list.post", restApiCfg, restApi);
		this._orderLoader.MapFunc = (source: Array<any>, target: Array<SubInstanceResp>) => {
			for (let item of source) {
				let obj = new SubInstanceResp();
				
				target.push(_.extendOwn(obj, item));
			}
		};

		this._orderLoader.Trait = (target: Array<SubInstanceResp>) => {

			let canRenew: (item: SubInstanceItemResp) => boolean = (item: SubInstanceItemResp): boolean => {
				if (item.serviceType == 1)//云硬盘
					return false;

				if (item.billingInfo && item.billingInfo.billingMode == 1)//按流量计费无法续订
					return false;

				if (item.status != "2" && item.status != "7")//成功、即将过期:7的订单可以续订
					return false;
				return true;
			};
			let canCancel: (item: SubInstanceItemResp) => boolean = (item: SubInstanceItemResp): boolean => {
				if (item.status != "2" )//已激活的订单可退订
					return false;
				return true;
			};

			//只有周期计费可以自动续订
			let canContinueRenew: (item: SubInstanceItemResp) => boolean = (item: SubInstanceItemResp): boolean => {
				if (item.billingInfo && item.billingInfo.billingMode != 0)//只有周期计费，0代表周期计费
					return false;
				return true;
			};

			let reloadstruct: (items: Array<SubInstanceItemResp>) => void = (items: Array<SubInstanceItemResp>) => {
				for (let i = 0; i < items.length; i++) {
					items[i] = _.extendOwn(new SubInstanceItemResp(), items[i]);
				}
			};


			let showInstance: (item: SubInstanceItemResp) => boolean = (item: SubInstanceItemResp): boolean => {
				if (item.instanceName == null || item.instanceName == undefined || item.serviceType == 1)//云硬盘
					return false;

				return true;
			};

			for (let i = 0; i < target.length; i++) {
				let orderItem = target[i];

				reloadstruct(orderItem.itemList);

				if (orderItem.itemList && orderItem.itemList.length > 0) {
		           
					orderItem.itemList[0].showSpecList = true;
					
					if (orderItem.itemList.find(n => !canRenew(n)) != null)
						orderItem.canRenew = false;
					else
						orderItem.canRenew = true;
						
					if (orderItem.itemList.find(n => !canCancel(n)) != null)
						orderItem.canCancel = false;
					else
						orderItem.canCancel = true;

					if (orderItem.itemList.find(n => !canContinueRenew(n) != null))
						orderItem.canContinueRenew = false;
					else
						orderItem.canContinueRenew = true;


					if (orderItem.itemList.find(n => showInstance(n) != null))
						orderItem.showInstance = false;
					else
						orderItem.showInstance = true;
				}
				else {
					orderItem.canContinueRenew = true;
					orderItem.canRenew = true;
					orderItem.showInstance = true;
				}


			}


		};

	}
	ngOnInit() {
		this.layoutService.show();
		
		this._orderStatusDic.Go()	
			.then(success => {
				this.loadUserType();
			})	
			.then(success => {
				return this._typeDic.Go();
			})
			.then(success => {
				return this._billinModeDic.Go();
			})
			.then(success => {
				return this._periodTypeDic.Go();
			})
			.then(success => {
				return this._platformLoader.Go();
			})
			.then(success => {
				return this._productTypeLoader.Go();
			})
			.then(success => {
				this.search();
			})
			.then(success => {
				this.layoutService.hide();
			})
			.catch(err => {
				this.layoutService.hide();
				this.showMsg(err);
			});

			

		this._param.enterpriseId = this.restApi.getLoginInfo().userInfo.enterpriseId;

	}

	loadBuyer() {
		this.layoutService.show();
		this._buyerLoader.Go(null, [{ key: "departmentId", value: this._param.organization }])
			.then(success => {
				this.layoutService.hide();
				this._param.buyerId = null;
			}, err => {
				this.layoutService.hide();
				this._param.buyerId = null;
			});
	}

	//显示详情
	showDetail(orderItem: SubInstanceResp) {
		this.layoutService.show();
		this._orderDetailLoader.Go(null, [{ key: "subinstanceCode", value: orderItem.orderId }])
			.then(success => {
				this.layoutService.hide();
				$('#orderDetail').modal('show');
			})
			.catch(err => {
				this.layoutService.hide();
				this.showMsg(err);
			})
	}

	//自动续订
	autoRenew(orderItem: SubInstanceResp) {
		this.renewOverEnd()
		let getProperty = _.property("attrDisplayValue");
		console.log(orderItem);
		if (!_.isEmpty(orderItem.itemList)) {
			this.autoRenewItem.isSelectedType = false;
			let itemList = orderItem.itemList[0].specList;
			this.autoRenewItem.platform = getProperty(itemList.find(n => n.attrCode == "PLATFORM"));
			this.autoRenewItem.zone = getProperty(itemList.find(n => n.attrCode == "ZONE"));
			this.autoRenewItem.instanceName = getProperty(itemList.find(n => n.attrCode == "INSTANCENAME"));
			this.autoRenewItem.billingMode = orderItem.itemList[0].billingMode;
			this.autoRenewItem.settingType = getProperty(itemList.find(n => n.attrCode == "SETTINGTYPE"));
			this.autoRenewItem.serviceType = orderItem.itemList[0].serviceType;
			this.autoRenewItem.expireDate = orderItem.itemList[0].expireDate;
			this.autoRenewItem.oneTimePrice = orderItem.itemList[0].oneTimePrice;
			this.autoRenewItem.price = orderItem.itemList[0].billingInfo.basicPrice;
			this.autoRenewItem.periodType = orderItem.itemList[0].periodType;
			this.autoRenewItem.extendType = orderItem.extendType;
			this.autoRenewItem.instanceId = orderItem.orderId;
			this.autoRenewItem.status = orderItem.itemList[0].status;

			this.layoutService.show();
			if (this.autoRenewItem.extendType == 0) {
				this.autoRenewConfigItem.Go(null, [{ key: "_instanceId", value: orderItem.orderId }, { key: "_serviceType", value: orderItem.itemList[0].serviceType }])
					.then(success => {
						console.log(success);
						this.layoutService.hide();
					})
					.catch(err => {
						this.showMsg(err);
						this.layoutService.hide();
					})
				this.AutoRenewDialog.open('已购服务自动续订：' + orderItem.orderNo);
			}
			else {
				this.layoutService.hide();
				this.AutoRenewDialog.open('已购服务取消自动续订：' + orderItem.orderNo);
				this.autoRenewItem.subExtendType = 0;
				this.autoRenewItem.isSelectedType = true;
			}
		}
	};

	submitRenew() {
		if (!this.autoRenewItem.isSelectedType) {
			this.showMsg('请选择自动续订方式！');
			return false
		};
		this.layoutService.show();
		if (this.autoRenewItem.subExtendType > 0) {
			this.autoRenewSetting.Go(null, null, { 'extendType': this.autoRenewItem.subExtendType, "subinstanceId": this.autoRenewItem.instanceId })
				.then(success => {
					this.layoutService.hide();
					this.renewOver();
				})
				.catch(err => {
					this.showMsg(err);
					this.layoutService.hide();
				})

		} else if (this.autoRenewItem.subExtendType === 0) {
			this.autoRenewSetting.Go(null, null, { 'extendType': this.autoRenewItem.subExtendType, "subinstanceId": this.autoRenewItem.instanceId })
				.then(success => {
					this.layoutService.hide();
					this.renewOver()
				})
				.catch(err => {
					this.showMsg(err);
					this.layoutService.hide();
				})
		}
		else {
			this.showMsg('此服务无法自动续订');
			this.layoutService.hide();
		}
	}

	renewOver() {
		this.autoRenewItem.renewOver = true;
		this.AutoRenewDialog.hideCt();
		this.AutoRenewDialog.hideOt();
	}

	renewOverEnd() {
		this.autoRenewItem.renewOver = false;
		this.AutoRenewDialog.showCt();
		this.AutoRenewDialog.showOt();
	}

	//判断用户是普通用户还是管理员
    loadUserType(){
        this.layoutService.show();
        this.userTypeLoader.Go()
            .then(sucess=>{
				let item = this.userTypeLoader.FirstItem;
				if(item.roleName&&item.roleName=='ENTERPRISE_ADMIN'){
					this.isAdmin = true;
					item.isAdmin = true;
				}
					
				this._departmentLoader.Items.splice(0,this._departmentLoader.Items.length);
				if(item.isAdmin){
					this.layoutService.show();
					// this.restApi.getLoginInfo().userInfo.enterpriseId;
					this._departmentLoader.Go(null, [{ key: "enterpriseId", value: item.enterpriseId}])
					.then(sucess=>{
						this.layoutService.hide();
					})
					.catch(err=>{
						this.layoutService.hide();
						this.showMsg(err);
					})
				}else{
					// let obj = new ListItem();
					// obj.id = this.userTypeLoader.FirstItem.organizationId;
					// obj.name = this.userTypeLoader.FirstItem.organizationName;
					this._param.organization = item.organizationId;
					this.loadBuyer();
					// this._departmentLoader.Items.push(obj);
				}
                this.layoutService.hide();
            })
            .catch(err=>{
                this.layoutService.hide();
                this.showMsg(err);
            })
     
        
    }

	//选择续订	
	renewSelect(orderItem: SubInstanceResp) {
		// 成功、即将过期:7的订单可以  续订  成功指已激活
		if (!_.isEmpty(orderItem.itemList)
			&& orderItem.itemList.filter(n => n.status == "2" || n.status == "7").length > 0) {
			$('#renewOrder').modal('show');
			this.selectedOrderItem = orderItem;

			let self = this;
			let getRenewPrice: () => number = function () {
				let item = self._renewPriceLoader.FirstItem;
					return item.basicPrice;

				// return item.basePrice || item.basicPrice || item.cyclePrice || item.unitPrice;
			};

			this._renewSetting.reset();
	

			this.layoutService.show();
			this._renewPriceLoader.Go(null, [{ key: "_subId", value: orderItem.orderId }])
				.then(success => {
					this.layoutService.hide();
					// alert('测试'+this._renewSetting.renewDate);
					
					orderItem.itemList.map(n => {
						n.renewPrice = getRenewPrice();
						n.renewPeriodType = this._renewPriceLoader.FirstItem.periodType;
					});
			this._renewSetting.onetimePrice = this._renewPriceLoader.FirstItem.basePrice;
			this._renewSetting.price = this._renewPriceLoader.FirstItem.basicPrice;
			this._renewSetting.periodType = this._renewPriceLoader.FirstItem.periodType;
			
				})
				.catch(err => {
					this.layoutService.hide();
					this.showMsg(err);
				})

		}
		else {
			this.showMsg(`ORDER_MNG.ONLY_SUCCESS_OR_EXPIRING_ORDERS_CAN_BE_RENEWED`);
		}


	}

	showMsg(msg: string) {
		this._notice.open("COMMON.SYSTEM_PROMPT", msg);
	}

	search(pageNumber: number = 1) {
		let param = _.extend({}, this._param);


		console.log('search param', param, this._param);

		//搜索框参数匹配后台API



		param.pageParameter = {
			currentPage: pageNumber - 1
			, size: 10
		};

		this.layoutService.show();
		this._orderLoader.clear();
		this._orderLoader.TotalPages = 1;//清空页码
		this._orderLoader.Go(null, null, param)
			.then(success => {
				this.layoutService.hide();
			})
			.catch(err => {
				this.layoutService.hide();
				this.showMsg(err);
			})
	}
	changePage(pageNumber: number) {
		this.currentPage = pageNumber;
		this.search(pageNumber);
	}

	onPlatformChanged() {
		this.layoutService.show();
		this._param.zoneId = null;
		this._regionLoader.Go(null, [{ key: "_id", value: this._param.platformId }])
			.then(success => {
				this.layoutService.hide();
			})
			.catch(err => {
				this.layoutService.hide();
				this.showMsg(err);
			})
	}

	onCreateTimeChange($event) {
		this._param.createDate = $event.formatted;
	}

	onExpireTimeChange($event) {
		this._param.expireDate = $event.formatted;
	}

	//续订
	renew() {

		let list = this.selectedOrderItem.itemList[0].specList;

		let items = [];
		for (let item of list) {
			if (item.attrCode == 'TIMELINEUNIT') {
				items.push(item);
			} else if (item.attrCode == 'TIMELINE') {
				item.attrDisplayValue = this._renewSetting.value.toString();
				items.push(item);
			}
		}
		
		let param = 

		[
			{
				"attrCode": "TIMELINEUNIT",
				"attrDisplayName":  "时长单位",
				"attrDisplayValue": items[0].attrDisplayValue,
				"attrId": items[0].attrId,
				"attrValue": items[0].attrValue,
				"attrValueCode":  items[0].attrValueCode,
				"attrValueId": "",
				"description":items[0].description,
				"valueType": "",
				"valueUnit": items[0].valueUnit
			},{
				"attrCode": "TIMELINE",
				"attrDisplayName":  "购买时长",
				"attrDisplayValue": items[1].attrDisplayValue,
				"attrId": items[1].attrId,
				"attrValue":this._renewSetting.value.toString(),
				"attrValueCode":  items[1].attrValueCode,
				"attrValueId": "",
				"description":items[1].description,
				"valueType": "",
				"valueUnit": items[1].valueUnit
			}
		]

		// 	[
		// 	{
		// 	"attrId": this.selectedOrderItem.orderId,
		// 	"attrCode": "TIMELINEUNIT",
		// 	"attrDisplayValue":items[0].attrDisplayValue,
		// 	"attrDisplayName": "时长单位",
		// 	"attrValueId": "",
		// 	"attrValue": "5",
		// 	"attrValueCode": items[0].attrValueCode
		// 	},
		// 	{
		// 	"attrId": this.selectedOrderItem.orderId,
		// 	"attrCode": "TIMELINE",
		// 	"attrDisplayName": "购买时长",
		// 	"attrDisplayValue": "",
		// 	"attrValueId": "",
		// 	"attrValue": this._renewSetting.value.toString(),
		// 	"attrValueCode": ""
		// 	}
		// ]
		

    //   let param =
	//    [
	// 		{	"attrId": this.selectedOrderItem.orderId,
	// 			"attrCode": "TIMELINEUNIT",
	// 			"attrDisplayName": "时长单位",
	// 			"attrValueCode":items[0].attrValueCode,
	// 			"attrDisplayValue": "按月",
	// 			"valueUnit": '',
	// 			"attrOrderSeq": '',
	// 			"description": ''
	// 		},
	// 		{	"attrId": this.selectedOrderItem.orderId,
	// 			"attrCode": "TIMELINE",
	// 			"attrDisplayName": "购买时长",
	// 			"attrValueCode": "",
	// 			"attrDisplayValue": this._renewSetting.value.toString(),
	// 			"valueUnit": '',
	// 			"attrOrderSeq": '',
	// 			"description": ''
	// 		}
	// 	]
		this.layoutService.show();
		this._renewHandler.Go(null, [{ key: "_subId", value: this.selectedOrderItem.orderId }], param)
			.then(success => {
				this.layoutService.hide();
				this._renewSetting.completed = true;
			})
			.catch(err => {
				this.layoutService.hide();
				this.showMsg(err);
			});
	}

	//退订
	acceptCancel(data) {
		let [itemList, detail] = data;
		// this.layoutService.show();
		let param=[];
		if(itemList[0].isChecked){
			param.push(this.selectedOrderItem.orderId);
		}
		for(let item of detail.relatedSubInstanceList){
			if(item.isChecked){
				param.push(item.instanceId);
			}
		}
		this._cancelHandler.Go(null, null, param)
			.then(success => {
				this.layoutService.hide();
				$('#cancelOrder').modal('hide');

				this.search();
			})
			.catch(err => {
				this.showMsg(err);
			})
		this.layoutService.hide();
	}

	cancelSelect(orderItem: SubInstanceResp) {
		// 成功、即将过期:7的订单可以  续订
		if (!_.isEmpty(orderItem.itemList)
			&& orderItem.itemList.filter(n => n.status == "2").length > 0) {
			// console.log('cancel select', orderItem);

			this.selectedOrderItem = orderItem;
			this.layoutService.show();
			this._orderDetailLoader.Go(null, [{ key: "subinstanceCode", value: orderItem.orderId }])
				.then(success => {
					this.layoutService.hide();
					this.detail = this._orderDetailLoader.FirstItem;
					$('#cancelOrder').modal('show');
				})
				.catch(err => {
					this.layoutService.hide();
					this.showMsg(err);
				})

			// todo: set the cancelObj here
			// this.cancelObj = new CancelParam(orderItem.isDisk, orderItem.isMachine, orderItem.isInUse);
			// this.cancelObj.subId = orderItem.orderId;
			// console.log('cancelObj', this.cancelObj);
		}
		else {
			this.showMsg(`ORDER_MNG.ONLY_SUCCESS_OR_EXPIRING_ORDERS_CAN_BE_UNSUBSCRIBE`);
		}
	}

	selectForever() {
		this._renewSetting.isForever = !this._renewSetting.isForever;

		if (this._renewSetting.isForever) {
			this._renewSetting.renewDate = this.calRenewDate("5", 999);
			this._renewSetting.value = 999;
			this._renewSetting.unit = 5;
		}
	}

	get selectedPeriodTypeName(): string {
		if (this.selectedOrderItem
			&& !_.isEmpty(this.selectedOrderItem.itemList)
			&& this.selectedOrderItem.itemList[0].billingInfo&& this.selectedOrderItem.itemList[0].billingInfo.periodType!=null) {
			let item = this._periodTypeDic.Items.find(n => n.value == this.selectedOrderItem.itemList[0].billingInfo.periodType.toString());
			if (item)
				return item.displayValue as string;
			else
				return "None";
		}
		else
			return "None";
	}

	//计算到期日期
	renewValueChange() {
		/*
		PACKAGE_BILLING PERIOD_TYPE 0 HOURLY 按小时
		PACKAGE_BILLING PERIOD_TYPE 1 DAILY 按天
		PACKAGE_BILLING PERIOD_TYPE 2 WEEKLY 按周
		PACKAGE_BILLING PERIOD_TYPE 3 MONTHLY 按月
		PACKAGE_BILLING PERIOD_TYPE 5 YEARLY 按年
		*/
		if (this.selectedOrderItem
			&& !_.isEmpty(this.selectedOrderItem.itemList)
			&& this.selectedOrderItem.itemList[0].billingInfo
			&& _.isNumber([0, 1, 2, 3, 5].find(n => n == this.selectedOrderItem.itemList[0].billingInfo.periodType))) {
			// alert(this._renewSetting.renewDate);
			this._renewSetting.renewDate = this.calRenewDate(this.selectedOrderItem.itemList[0].billingInfo.periodType.toString(), this._renewSetting.value);
			// alert(this._renewSetting.renewDate);
			this._renewSetting.unit = this.selectedOrderItem.itemList[0].billingInfo.periodType;
			this.selectedOrderItem.itemList[0].renewDate = this._renewSetting.renewDate;
		}
		else {
			console.log("续订计算前提发生错误", this.selectedOrderItem, this._renewSetting);
		}
	}

	//计算时长
	calRenewDate(renewMode: string, renewLen: number): string {
		let toDate: (date: Date) => string = function (date: Date): string {
		// 	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
			let hours:String=`${date.getHours()}`;
			let minutes:string =`${date.getMinutes()}`;
			let seconds:String=`${date.getSeconds()}`;;
			if(Number(hours)<10){
				hours='0'+hours;
			}
			if(Number(minutes)<10){
				minutes='0'+minutes;
			}
			if(Number(seconds)<10){
				seconds='0'+seconds;
			}
			return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} `+hours+':'+minutes+':'+seconds;
	};

		let handlerObj = {
			"0": (len: number) => {
				return function (expDate: string) {
					let date1: Date = new Date(expDate);
					date1.setHours(date1.getHours() + len);
					return date1;
				};
			}
			, "1": (len: number) => {
				return function (expDate: string) {
					let date: Date = new Date(expDate);
					date.setDate(date.getDate() + len);
					return date;
				}
			}
			, "2": (len: number) => {
				return function (expDate: string) {
					let date: Date = new Date(expDate);
					date.setDate(date.getDate() + len * 7);
					return date;
				}

			}
			, "3": (len: number) => {
				return function (expDate: string) {
					let date: Date = new Date(expDate);
					date.setMonth(date.getMonth() + len);
					return date;
				}

			}
			, "5": (len: number) => {
				return function (expDate: string) {
					let date: Date = new Date(expDate);//expDate为null时，date为 1970-1-1 08:00:00
					date.setFullYear(date.getFullYear() + len);
					return date;
				}

			}
		}


        // let date ='2017-03-15 00:00:00';
		// return toDate(handlerObj[renewMode](renewLen)(date));
		return toDate(handlerObj[renewMode](renewLen)(this.selectedOrderItem.itemList[0].expireDate));
	}

	resetParam() {
		this._buyerLoader.clear();
		this.createDatePicker.removeBtnClicked();
		this.expireDatePicker.removeBtnClicked();
		this._param.reset();
	}
  cancelSuccess($event){
	  console.log($event);
	  this.search(this.currentPage); 
  }

 
}