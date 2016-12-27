import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DicLoader, ItemLoader, NoticeComponent, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {DictService} from '../../../../architecture/core/service/dict-service';
import { ListItem
	, OrderMngParam
	, SubInstanceResp
	,SubInstanceItemResp
	,SubInstanceAttrPair
	,ProductBillingItem
	, RenewSetting
	, PurchaseUnit
	, OrderDetailItem
	, CancelParam
} from '../model'
import * as _ from 'underscore';

@Component({
	selector: 'order-mng',
	templateUrl: '../template/order-mng.component.html',
	styleUrls: ['../style/order-mng-list.less','../style/order-mng-renew.less'],
	providers: []}
	)
export class OrderMngComponent implements OnInit{
	@ViewChild("notice")
  	private _notice: NoticeComponent;

  	@ViewChild("renewDialog")
  	private _renewDialog:ModalComponent;

  	@ViewChild("cancelDialog")
  	private _cancelDialog:ModalComponent;

  	@ViewChild("testDialog")
  	private _testDialog:ModalComponent;

  	//订单详情加载
  	private _orderDetailLoader:ItemLoader<OrderDetailItem> = null;

  	//当前选择的行
  	private selectedOrderItem: SubInstanceResp = null;
	//查询参数
	private _param:OrderMngParam = new OrderMngParam();
	//部门
	private _departmentLoader:ItemLoader<ListItem> = null;

    //订购人
	private _buyerLoader:ItemLoader<{id:string; name:string}> = null 

	//订单状态
	private _orderStatusDic:DicLoader = null;
	//产品类型
	private _productTypeLoader:DicLoader = null;
	//区域
	private _platformLoader:ItemLoader<ListItem> = null;
	//可用区
	private _regionLoader:ItemLoader<ListItem> = null;
	//订单查询
	private _orderLoader:ItemLoader<SubInstanceResp> = null;

	//续订数据
	private _renewSetting:RenewSetting = new RenewSetting();
	private _renewHandler:ItemLoader<any> = null;

	//退订
	private cancelObj:CancelParam = new CancelParam();
	private _cancelHandler:ItemLoader<any> = null;

	private _entId:string = "191af465-b5dc-4992-a5c9-459e339dc719";

	//计费模式
	private _billinModeDic:DicLoader = null;
	//续费模式
	private _periodTypeDic:DicLoader = null;
	//续订费用
	private _renewPriceLoader:ItemLoader<ProductBillingItem> = null;

	//类型
	private _typeDic:DicLoader = null;

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi,
		private _dictServ:DictService){

		//类型
		this._typeDic = new DicLoader(restApiCfg, restApi, "ORDER", "TYPE");

		//订单详情加载
		this._orderDetailLoader = new ItemLoader<OrderDetailItem>(false, "ORDER_MNG.ORDER_DETAILS", "op-center.order-mng.order-detail.get", restApiCfg, restApi);
		this._orderDetailLoader.MapFunc = (source:Array<any>, target:Array<OrderDetailItem>)=>{
			for(let item of source)
			{
				let obj:OrderDetailItem = _.extendOwn(new OrderDetailItem(), item)
				target.push(obj);
			}
		};
		this._orderDetailLoader.Trait = (items:Array<OrderDetailItem>)=>{
			let firstItem = this._orderDetailLoader.FirstItem;
			console.log('firstitem', firstItem,  'billingMode');
			this._billinModeDic.UpdateWithDic([firstItem], "billingModeName", "billingMode");
			this._billinModeDic.UpdateWithDic(firstItem.relatedSubInstanceList, "billingModeName", "billingMode");
			this._billinModeDic.UpdateWithDic(firstItem.relatedOrderList, "billingModeName", "billingMode");

			this._periodTypeDic.UpdateWithDic([firstItem], "productTypeName", "productType");
			this._periodTypeDic.UpdateWithDic(firstItem.relatedSubInstanceList, "productTypeName", "productType");
			this._periodTypeDic.UpdateWithDic(firstItem.relatedOrderList, "productTypeName", "productType");

			this._orderStatusDic.UpdateWithDic([firstItem], "statusName", "status");
			this._orderStatusDic.UpdateWithDic(firstItem.relatedSubInstanceList, "statusName", "status");
			this._orderStatusDic.UpdateWithDic(firstItem.relatedOrderList, "statusName", "status");

			this._typeDic.UpdateWithDic([firstItem], 'typeName', 'type');
			this._typeDic.UpdateWithDic(firstItem.relatedSubInstanceList, 'typeName', 'type');
			this._typeDic.UpdateWithDic(firstItem.relatedOrderList, 'typeName', 'type');
			console.log('firstitem done', firstItem);
		};

		this._orderDetailLoader.FirstItem = new OrderDetailItem();

		//续订费用
		this._renewPriceLoader = new ItemLoader<ProductBillingItem>(false, "ORDER_MNG.RENEWAL_FEE", "op-center.order-mng.order-renew-price.get", restApiCfg, restApi);

		//续费模式
		this._periodTypeDic = new DicLoader(restApiCfg, restApi, "PACKAGE_BILLING", "PERIOD_TYPE");

		//计费模式
		this._billinModeDic = new DicLoader(restApiCfg, restApi, "BILLING_MODE", "TYPE");

		//退订
		this._cancelHandler = new ItemLoader<any>(false, "COMMON.UNSUBSCRIBE", "op-center.order-mng.order-cancel.get", restApiCfg, restApi);

		//续订
		this._renewHandler = new ItemLoader<any>(false, "COMMON.RENEW", "op-center.order-mng.order-renew.get", restApiCfg, restApi);

		//初始化单项order数据
		this.selectedOrderItem = new SubInstanceResp();


		//部门配置
		this._departmentLoader = new ItemLoader<ListItem>(false, "ORDER_MNG.DEPARTMENT_LIST", "op-center.order-mng.department-list.get", restApiCfg, restApi);
		
		//订购人加载
		this._buyerLoader = new ItemLoader<{id:string; name:string}>(false, 'ORDER_MNG.SUBSCRIBER_LIST', "check-center.submiter-list.get", this.restApiCfg, this.restApi);

        this._buyerLoader.MapFunc = (source:Array<any>, target:Array<{id:string;name:string}>)=>{
			for(let item of source)
			{
				let obj=_.extend({}, item) ;
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
		this._platformLoader = new ItemLoader<ListItem>(false, "COMMON.ZONE", "op-center.order-mng.platform-list.get", restApiCfg, restApi);
		
		//可用区配置
		this._regionLoader = new ItemLoader<ListItem>(false, "COMMON.AVAILABLE_ZONE", "op-center.order-mng.region-list.get", restApiCfg, restApi);
		this._regionLoader.MapFunc = (source:Array<any>, target:Array<ListItem>)=>{
			for(let item of source)
			{
				let obj = new ListItem();
				target.push(obj);

				obj.id = item.zoneId;
				obj.name = item.zoneName;
			}
		};

		//配置订单加载
		this._orderLoader = new ItemLoader<SubInstanceResp>(true, "ORDER_MNG.ORDERED_LSIT", "op-center.order-mng.order-list.post", restApiCfg, restApi);
		this._orderLoader.Trait = (target:Array<SubInstanceResp>)=>{

			let canRenew:(item:SubInstanceItemResp)=>boolean = (item:SubInstanceItemResp):boolean=>{
				if (item.serviceType == 1)
			      return false;

			    if(item.billingInfo && item.billingInfo.billingMode == 1)//按流量计费
			      return false;

			    return true;
			};

			let reloadstruct:(items:Array<SubInstanceItemResp>)=>void = (items:Array<SubInstanceItemResp>)=>{
				for(let i = 0; i < items.length; i++){
					items[i] = _.extendOwn(new SubInstanceItemResp(), items[i]);
				}
			};


			for(let i = 0; i < target.length; i++)
			{
				let orderItem = target[i];

				reloadstruct(orderItem.itemList);

				if(orderItem.itemList && orderItem.itemList.length > 0)
				{
					if(orderItem.itemList.find(n=>!canRenew(n)) != null)
						orderItem.canRenew = false;
					else
						orderItem.canRenew = true;
				}
				else{
					orderItem.canRenew = true;
				}

				this._billinModeDic.UpdateWithDic(orderItem.itemList, "billingModeName", "billingMode");
				
			}
		};
/*
		this._orderLoader.FakeDataFunc = (target:Array<SubInstanceResp>)=>{
			let obj = new SubInstanceResp();
			target.push(obj);

			obj.orderNo = "1234";
			obj.purchaseDate = "2016-11-11";
			let subItem = new SubInstanceItemResp();
			obj.itemList = [];
			obj.itemList.push(subItem);

			subItem.quantity = 1;

			subItem.specList = [];
			let spec = new SubInstanceAttrPair();
			subItem.specList.push(spec);
			spec.attrDisplayName = "区域";
			spec.attrDisplayValue = "东1111区";
	 
	        let spec2 = new SubInstanceAttrPair();
			subItem.specList.push(spec2);
			spec2.attrDisplayName = '可用区';
			spec2.attrDisplayValue = '可用区B';

			  let spec3 = new SubInstanceAttrPair();
			subItem.specList.push(spec3);
			spec3.attrDisplayName = '实例规格';
			spec3.attrDisplayValue = 'CPU 2赫/内存 4GB/启动盘 70G';

			 let spec4 = new SubInstanceAttrPair();
			subItem.specList.push(spec4);
			spec4.attrDisplayName = 'IP地址';
			spec4.attrDisplayValue = '10.1.1.1(内部) 192.168.1.1(外部)';

			let spec5 = new SubInstanceAttrPair();
			subItem.specList.push(spec5);
			spec5.attrDisplayName = '操作系统';
			spec5.attrDisplayValue = '******';

			let spec6 = new SubInstanceAttrPair();
			subItem.specList.push(spec6);
			spec6.attrDisplayName = '密码';
			spec6.attrDisplayValue = '已设置';

			let spec7 = new SubInstanceAttrPair();
			subItem.specList.push(spec7);
			spec7.attrDisplayName = '实例名称';
			spec7.attrDisplayValue = 'abcabc';


			subItem.billingInfo = new ProductBillingItem();
			subItem.billingInfo.basePrice = 5;
			subItem.billingInfo.basicPrice = 6;
			subItem.billingInfo.billingMode = '包年包月';
			
			subItem.period = 1;
			subItem.quantity = 1;
			subItem.serviceType = '云主机';
			subItem.statusName = '成功';
			subItem.createDate = '2016-11-11';
			subItem.expireDate = '2017-11-11';
		};
		*/
		
	}
	ngOnInit(){
		this.layoutService.show();
		this._orderStatusDic.Go()
		.then(success=>{
			return this._productTypeLoader.Go();
		})
		.then(success=>{
			return this._typeDic.Go();
		})
		.then(success=>{
			return this._departmentLoader.Go(null, [{key:"enterpriseId", value:this.restApi.getLoginInfo().userInfo.enterpriseId}]);
		})
		.then(success=>{
			return this._billinModeDic.Go();
		})
		.then(success=>{
			return this._periodTypeDic.Go();
		})
		.then(success=>{
			return this._platformLoader.Go();
		})
		.then(success=>{
			this.layoutService.hide();
		})
		.then(success=>{
			this.search();
		})
		.catch(err=>{
			this.layoutService.hide();
			this.showMsg(err);
		});

		this._param.enterpriseId = this.restApi.getLoginInfo().userInfo.enterpriseId;

	}

	loadBuyer(){
		this.layoutService.show();
		this._buyerLoader.Go(null, [{key:"departmentId", value:this._param.organization}])
		.then(success=>{
			this.layoutService.hide();
			this._param.buyerId = null;
		}, err=>{
			this.layoutService.hide();
			this._param.buyerId = null;
		});
	}
	
	//显示详情
	showDetail(orderItem:SubInstanceResp){
		this.layoutService.show();

		this._orderDetailLoader.Go(null, [{key:"subinstanceCode",value:orderItem.orderId}])
		.then(success=>{
			this.layoutService.hide();
			$('#orderDetail').modal('show');
		})
		.catch(err=>{
			this.layoutService.hide();
			this.showMsg(err);
		})
	}

	//选择续订	
	renewSelect(orderItem:SubInstanceResp){
		// 成功、即将过期:7的订单可以  续订
		if(!_.isEmpty(orderItem.itemList)
			&& orderItem.itemList.filter(n=>n.status == "7").length > 0)
		{
			$('#renewOrder').modal('show');
			this.selectedOrderItem = orderItem;

			let self = this;
			let getRenewPrice:()=>number = function() {
				let item = self._renewPriceLoader.FirstItem;

				return item.basePrice || item.basicPrice || item.cyclePrice || item.unitPrice;
			};

			this._renewSetting.reset();


			this.layoutService.show();
			this._renewPriceLoader.Go(null, [{key:"_subId", value:orderItem.orderId}])
			.then(success=>{
				this.layoutService.hide();

				orderItem.itemList.map(n=>{
					n.renewPrice = getRenewPrice();
				});
			})
			.catch(err=>{
				this.layoutService.hide();
				this.showMsg(err);
			})
			
		}
		else{
			this.showMsg(`ORDER_MNG.ONLY_SUCCESS_OR_EXPIRING_ORDERS_CAN_BE_RENEWED`);
		}


	}

	showMsg(msg: string)
	{
		this._notice.open("COMMON.SYSTEM_PROMPT", msg);
	}

	search(pageNumber:number = 1){

		
		let param = _.extend({}, this._param);


		//搜索框参数匹配后台API



		param.pageParameter = {
			currentPage:pageNumber - 1
			,size:10
		};
		param.enterpiseId = this.restApi.getLoginInfo().userInfo.enterpriseId;


		this.layoutService.show();
		this._orderLoader.Go(null, null, param)
		.then(success=>{
			this.layoutService.hide();
			this.updateStatusName();
		})
		.catch(err=>{
			this.layoutService.hide();
			this.showMsg(err);
		})
	}

	//翻译订单状态
	updateStatusName(){
		let list:Array<SubInstanceItemResp> = []
		this._orderLoader.Items.map(n=>list = list.concat(n.itemList));
		this._orderStatusDic.UpdateWithDic(list, "statusName", "status");
		this._productTypeLoader.UpdateWithDic(list, "serviceTypeName", "serviceType");
		this._billinModeDic.UpdateWithDic(list, "billingModeName", "billingMode");

	}

	changePage(pageNumber:number)
	{
		this.search(pageNumber);
	}

	onPlatformChanged(){
		this.layoutService.show();
		this._regionLoader.Go(null, [{key:"_id", value:this._param.platformId}])
		.then(success=>{
			this.layoutService.hide();
		})
		.catch(err=>{
			this.layoutService.hide();
			this.showMsg(err);
		})
	}

	onCreateTimeChange($event){
		this._param.createDate = $event.formatted;
	}

	onExpireTimeChange($event){
		this._param.expireDate = $event.formatted;
	}

	//续订
	renew(){
		console.log('renew start');
		let param = [{
			attrCode: "TIMELINE",
			attrDisplayName: "ORDER_MNG.PURCHASE_TIME",
			attrDisplayValue: this._renewSetting.value,//界面上获取的的值
			attrId: "de227a98-a0f7-11e6-a18b-0050568a49fd",
			attrValue: this._renewSetting.value,//界面上获取的值
			attrValueCode: "",//可以为空
			attrValueId: "",//可以为空
			description: "",
			valueType: "",
			valueUnit: this._renewSetting.unit //可以为空
		}];

		this.layoutService.show();
		this._renewHandler.Go(null, [{key:"_subId", value:this.selectedOrderItem.orderId}], param)
		.then(success=>{
			this.layoutService.hide();
			this._renewSetting.completed = true;
			console.log('renew completed');
		})
		.catch(err=>{
			this.layoutService.hide();
			this.showMsg(err);
		});
	}

	//退订
	cancel(){
		this._cancelHandler.Go(null, [{key:"_subId", value:this.cancelObj.subId},
			{key:"_subId", value:this.cancelObj.cascadeFlag}])
		.then(success=>{
			this.search();
		})
		.catch(err=>{
			this.showMsg(err);
		})
	}

	cancelSelect(orderItem:SubInstanceResp)
	{
		// 成功、即将过期:7的订单可以  续订
		if(!_.isEmpty(orderItem.itemList)
			&& orderItem.itemList.filter(n=>n.status == "7").length > 0)
		{
			$('#cancelOrder').modal('show');

			// todo: set the cancelObj here
			this.cancelObj.subId = orderItem.orderId;
		}
		else
		{
			this.showMsg(`ORDER_MNG.ONLY_SUCCESS_OR_EXPIRING_ORDERS_CAN_BE_UNSUBSCRIBE`);
		}
	}

	selectForever(){
		this._renewSetting.isForever = !this._renewSetting.isForever;

		if(this._renewSetting.isForever)
		{
			this._renewSetting.renewDate = this.calRenewDate("5", 999);
			this._renewSetting.value = 999;
			this._renewSetting.unit = 5;
		}
	}

	get selectedPeriodTypeName():string{
		if(this.selectedOrderItem 
			&& !_.isEmpty(this.selectedOrderItem.itemList)
			&& this.selectedOrderItem.itemList[0].billingInfo){
			let item = this._periodTypeDic.Items.find(n=>n.value == this.selectedOrderItem.itemList[0].billingInfo.periodType.toString());
			if(item)
				return item.displayValue as string;
			else
				return "None";
		}
		else
			return "None";
	}

	//计算到期日期
	renewValueChange(){
		/*
		PACKAGE_BILLING PERIOD_TYPE 0 HOURLY 按小时
		PACKAGE_BILLING PERIOD_TYPE 1 DAILY 按天
		PACKAGE_BILLING PERIOD_TYPE 2 WEEKLY 按周
		PACKAGE_BILLING PERIOD_TYPE 3 MONTHLY 按月
		PACKAGE_BILLING PERIOD_TYPE 5 YEARLY 按年
		*/
		if(this.selectedOrderItem
			&& !_.isEmpty(this.selectedOrderItem.itemList)
			&& this.selectedOrderItem.itemList[0].billingInfo
			&& _.isNumber([0,1,2,3,5].find(n=>n==this.selectedOrderItem.itemList[0].billingInfo.periodType)))
		{
			this._renewSetting.renewDate = this.calRenewDate(this.selectedOrderItem.itemList[0].billingInfo.periodType.toString(), this._renewSetting.value);
			this._renewSetting.unit = this.selectedOrderItem.itemList[0].billingInfo.periodType;
		}
		else{
			console.log("续订计算前提发生错误", this.selectedOrderItem, this._renewSetting);
		}
	}

	//计算时长
	calRenewDate(renewMode:string, renewLen:number):string{
		let toDate:(date:Date)=>string = function(date:Date):string{
			return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
		};

		let handlerObj = {
			"0":(len:number)=>{
				return function(expDate:string){
					let date1:Date = new Date(expDate);
					date1.setHours(date1.getHours() + len);
					return date1;
				};
			}
			,"1":(len:number)=>{
				return function(expDate:string) {
					let date:Date = new Date(expDate);
					date.setDate(date.getDate() + len);
					return date;
				}
			}
			,"2":(len:number)=>{
				return function(expDate:string) {
					let date:Date = new Date(expDate);
					date.setDate(date.getDate() + len * 7);
					return date;
				}

			}
			,"3":(len:number)=>{
				return function(expDate:string) {
					let date:Date = new Date(expDate);
					date.setMonth(date.getMonth() + len);
					return date;
				}

			}
			,"5":(len:number)=>{
				return function(expDate:string) {
					let date:Date = new Date(expDate);
					date.setFullYear(date.getFullYear() + len);
					return date;
				}

			}
		}

		

		return toDate(handlerObj[renewMode](renewLen)(this.selectedOrderItem.itemList[0].expireDate));
	}
	
	resetParam(){
		this._buyerLoader.clear();
		this._param.reset();
	}

}