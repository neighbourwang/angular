import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { DicLoader, ItemLoader, NoticeComponent, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import { ListItem
	, OrderMngParam
	, SubInstanceResp
	,SubInstanceItemResp
	,SubInstanceAttrPair
	,ProductBillingItem
	, RenewSetting
	, PurchaseUnit} from '../model'
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

	  private isForerver:boolean = false;

  	//当前选择的行
  	private selectedOrderItem: SubInstanceResp = null;
	//查询参数
	private _param:OrderMngParam = new OrderMngParam();
	//部门
	private _departmentLoader:ItemLoader<ListItem> = null;
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
	private _isCanceled:boolean = false;
	private _cancelHandler:ItemLoader<any> = null;

	private _entId:string = "191af465-b5dc-4992-a5c9-459e339dc719";

	//计费模式
	private _billinModeDic:DicLoader = null;
	//续费模式
	private _renewModeDic:DicLoader = null;
	//续订费用
	private _renewPriceLoader:ItemLoader<ProductBillingItem> = null;

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){

		//续订费用
		this._renewPriceLoader = new ItemLoader<ProductBillingItem>(false, "续订费用", "op-center.order-mng.order-renew-price.get", restApiCfg, restApi);

		//续费模式
		this._renewModeDic = new DicLoader(restApiCfg, restApi, "PACKAGE_BILLING", "PERIOD_TYPE");

		//计费模式
		this._billinModeDic = new DicLoader(restApiCfg, restApi, "BILLING_MODE", "TYPE");

		//退订
		this._cancelHandler = new ItemLoader<any>(false, "退订", "op-center.order-mng.order-cancel.get", restApiCfg, restApi);

		//续订
		this._renewHandler = new ItemLoader<any>(false, "续订", "op-center.order-mng.order-renew.get", restApiCfg, restApi);

		//初始化单项order数据
		this.selectedOrderItem = new SubInstanceResp();


		//部门配置
		this._departmentLoader = new ItemLoader<ListItem>(false, "部门列表", "op-center.order-mng.department-list.get", restApiCfg, restApi);
		
		//订单状态配置
		this._orderStatusDic = new DicLoader(restApiCfg, restApi, "SUBINSTANCE", "STATUS");

		//产品类型配置
		this._productTypeLoader = new DicLoader(restApiCfg, restApi, "GLOBAL", "SERVICE_TYPE")
		//区域配置
		this._platformLoader = new ItemLoader<ListItem>(false, "区域", "op-center.order-mng.platform-list.get", restApiCfg, restApi);
		
		//可用区配置
		this._regionLoader = new ItemLoader<ListItem>(false, "可用区", "op-center.order-mng.region-list.get", restApiCfg, restApi);
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
		this._orderLoader = new ItemLoader<SubInstanceResp>(true, "订单列表", "op-center.order-mng.order-list.post", restApiCfg, restApi);
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
			return this._platformLoader.Go();
		})
		.then(success=>{
			this.layoutService.hide();
		})
		.then(success=>{
			return this.loadDepartment();
		})
		.then(success=>{
			return this._billinModeDic.Go();
		})
		.then(success=>{
			return this._renewModeDic.Go();
		})
		.then(success=>{
			this.layoutService.hide();
		})
		.catch(err=>{
			this.layoutService.hide();
			this.showMsg(err);
		});

	}

	//加载部门数据，使用的是临时企业id
	loadDepartment():Promise<any>{
		//测试企业1
		return new Promise((resovle, reject)=>{
			this._departmentLoader.Go(null, [{key:"enterpriseId", value:this._entId}])
			.then(success=>{
				resovle(success);
			},err=>{
				reject(err);
			})
		});
	}
	
	showDetail(orderItem:SubInstanceResp){
		//this.router.navigateByUrl('op-center/order-mng/order-mng-detail');
	}

	//选择续订	
	renewSelect(orderItem:SubInstanceResp){
		this.selectedOrderItem = orderItem;

		let self = this;
		let getRenewPrice:()=>number = function() {
			let item = self._renewPriceLoader.FirstItem;

			return item.basePrice || item.basicPrice || item.cyclePrice || item.unitPrice;
		};


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

	cancelSelect(orderItem:SubInstanceResp)
	{
		this._isCanceled = false;
		this.selectedOrderItem = orderItem;
	}
	

	showMsg(msg: string)
	{
		this._notice.open("系统提示", msg);
	}

	search(pageNumber:number = 1){
		//this._param.enterpriseId = this._entId;
		let param = _.extend({}, this._param);

		//搜索框参数匹配后台API



		param.pageParameter = {
			currentPage:pageNumber
			,size:10
		};


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
		list.map(n=>{
			let item = this._orderStatusDic.Items.find(m=>m.value == n.status);
			if(item) n.statusName = item.displayValue as string;

			item = this._productTypeLoader.Items.find(m=>m.value == n.serviceType);
			if(item) n.serviceTypeName = item.displayValue as string;

			item = this._billinModeDic.Items.find(m=>m.value == n.billingMode);
			if(item) n.billingModeName = item.displayValue as string;
		});

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
		let param = [{
			attrCode: "TIMELINE",
			attrDisplayName: "购买时长",
			attrDisplayValue: this._renewSetting.value,//界面上获取的的值
			attrId: "de227a98-a0f7-11e6-a18b-0050568a49fd",
			attrValue: this._renewSetting.value,//界面上获取的值
			attrValueCode: "",//可以为空
			attrValueId: "",//可以为空
			description: "",
			valueType: "",
			valueUnit: ""//可以为空
		}];

		this._renewHandler.Go(null, [{key:"_subId", value:this.selectedOrderItem.orderId}], param)
		.then(success=>{
			this._renewSetting.completed = true;
			this.search();
		})
		.catch(err=>{
			this.showMsg(err);
		});
	}

	//退订
	cancel(){
		this._cancelHandler.Go(null, [{key:"_subId", value:this.selectedOrderItem.orderId}])
		.then(success=>{
			this._isCanceled = true;
			this.search();
		})
		.catch(err=>{
			this.showMsg(err);
		})
	}

	selectForever(){
	      this.isForerver = !this.isForerver;
	}

	get selectedBillingModeName():string{
		if(this.selectedOrderItem 
			&& this.selectedOrderItem.itemList
			&& this.selectedOrderItem.itemList[0].billingModeName)
			return this.selectedOrderItem.itemList[0].billingModeName;
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
			&& this.selectedOrderItem.itemList
			&& this.selectedOrderItem.itemList[0].billingInfo
			&& !_.isEmpty([0,1,2,3,5].find(n=>n==this.selectedOrderItem.itemList[0].billingInfo.periodType)))
		{
			
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

			this._renewSetting.renewDate = toDate(handlerObj[this.selectedOrderItem.itemList[0].billingInfo.periodType.toString()](this._renewSetting.value)(this.selectedOrderItem.itemList[0].expireDate));
		}
		else{
			console.log("续订计算前提发生错误", this.selectedOrderItem);
		}


	}


}