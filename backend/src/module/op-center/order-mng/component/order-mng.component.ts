import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { DicLoader, ItemLoader, NoticeComponent, RestApi, RestApiCfg, LayoutService, PopupComponent, ConfirmComponent, SystemDictionaryService, SystemDictionary } from '../../../../architecture';
import { SubInstanceAttrPair, ProductBillingItem, SubInstanceResp, SubInstanceItemResp, AdminListItem, DepartmentItem, Platform, ProductType, SubRegion, OrderMngParam,RenewSetting} from '../model'
import * as _ from 'underscore';

@Component({
	selector: 'order-mng',
	templateUrl: '../template/order-mng.component.html',
	styleUrls: ['../style/order-mng-list.less'],
	providers: []}
	)
export class OrderMngComponent implements OnInit{
	@ViewChild("notice")
  	private _notice: NoticeComponent;

	  
	 @ViewChild("renewOrder")
     renewOrder: PopupComponent;

	private _adminLoader:ItemLoader<AdminListItem> = null;
	private _departmentLoader:ItemLoader<DepartmentItem> = null;
	private _productTypeLoader: DicLoader = null;
	private _platformLoader:ItemLoader<Platform> = null;
	private _subregionLoader:ItemLoader<SubRegion> = null;
	private _orderStatus:DicLoader = null;
	private _orderLoader:ItemLoader<SubInstanceResp> = null;
	private _billinModeDic:DicLoader = null;
    private _buyerListLoader:ItemLoader<{id:string;name:string}> = null;//订购人列表
	//退订
	private _isCanceled:boolean = false;
	private _cancelHandler:ItemLoader<any> = null;

	//续订数据
	private _renewSetting:RenewSetting = new RenewSetting();
	private _renewHandler:ItemLoader<any> = null;
	//续订费用
	private _renewPriceLoader:ItemLoader<ProductBillingItem> = null;
	//当前选择的行
  	private selectedOrderItem: SubInstanceResp = new SubInstanceResp();


	//续费模式
	private _periodTypeDic:DicLoader = null;

	private _param:OrderMngParam = new OrderMngParam();
	private initDate:string = null;

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){

		this._billinModeDic = new DicLoader(restApiCfg, restApi, "BILLING_MODE", "TYPE");

		this._buyerListLoader = new ItemLoader<{id:string;name:string}>(false,"订购人列表","op-center.order-mng.buyer-list.get",restApiCfg,restApi);
		//退订
		this._cancelHandler = new ItemLoader<any>(false, "退订", "op-center.order-mng.order-cancel.get", restApiCfg, restApi);

		//续订
		this._renewHandler = new ItemLoader<any>(false, "订单续订", "op-center.order-mng.order-renew.get", restApiCfg, restApi);

		//续订费用
		this._renewPriceLoader = new ItemLoader<ProductBillingItem>(false, "续订费用", "op-center.order-mng.order-renew-price.get", restApiCfg, restApi);

		//续费模式
		this._periodTypeDic = new DicLoader(restApiCfg, restApi, "PACKAGE_BILLING", "PERIOD_TYPE");

		//配置企业列表加载
		this._adminLoader = new ItemLoader<AdminListItem>(false, "企业列表", "op-center.order-mng.ent-list.get", this.restApiCfg, this.restApi);

		//配置部门列表加载
		this._departmentLoader = new ItemLoader<DepartmentItem>(false, '部门列表', "op-center.order-mng.department-list.get", this.restApiCfg, this.restApi);

		//产品类型配置
		this._productTypeLoader = new DicLoader(restApiCfg, restApi, "GLOBAL", "SERVICE_TYPE");

		//配置区域加载
		this._platformLoader = new ItemLoader<Platform>(false, '区域', "op-center.order-mng.region-list.get", this.restApiCfg, this.restApi);

		//配置可用区加载
		this._subregionLoader = new ItemLoader<SubRegion>(false, '可用区', "op-center.order-mng.avail-region-list.get", this.restApiCfg, this.restApi);

		//配置订单状态
		this._orderStatus = new DicLoader(this.restApiCfg, this.restApi, "SUBINSTANCE", "STATUS");

		//配置订单加载
		this._orderLoader = new ItemLoader<SubInstanceResp>(true, "订单列表", "op-center.order-mng.order-list.post", restApiCfg, restApi);
		this._orderLoader.Trait = (target:Array<SubInstanceResp>)=>{

			let canRenew:(item:SubInstanceItemResp)=>boolean = (item:SubInstanceItemResp):boolean=>{
				if (item.serviceType == 1)
			      return false;

			    if(item.billingInfo && item.billingInfo.billingMode == 1)//按流量计费
			      return false;

			    return true;
			};

			for(let i = 0; i < target.length; i++)
			{
				let orderItem = target[i];
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
			}
		};
		/*
		this._orderLoader.FakeDataFunc = (target:Array<SubInstanceResp>)=>{
			let obj = new SubInstanceResp();
			target.push(obj);

			obj.orderNo = "1234";
			obj.orderId = "123432223";
			obj.purchaseDate = "2016-11-11";
			let subItem = new SubInstanceItemResp();
			obj.itemList = [];
			obj.itemList.push(subItem);

			subItem.quantity = 1;

			subItem.specList = [];
			let spec = new SubInstanceAttrPair();
			subItem.specList.push(spec);
			spec.attrDisplayName = "区域";
			spec.attrDisplayValue = "东1区";
	 
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
		this._orderStatus.Go()
		.then(success=>{
			return this._productTypeLoader.Go();
		})
		.then(success=>{
			return this._billinModeDic.Go();
		})
		.then(success=>{
			return this.loadPlatform();
		})
		.then(success=>{
			return this._periodTypeDic.Go();
		})
		.then(success=>{
			return this.loadAdmin();
		})
		.then(success=>{
			this.layoutService.hide();
		})
		.catch(err=>{
			this.layoutService.hide();
			this.showMsg(err);
		});

	}

	loadAdmin():Promise<any>{
		return new Promise((resolve, reject)=>{
			this._adminLoader.Go(null, [{key:"userId", value:"37d3dfca-064c-4077-879c-75ecf9c6725c "}])
			.then(success=>{
				resolve(success);
			},err=>{
				reject(err);
			})
		});
	}

//根据企业加载部门
	loadDepartment(){
		this._departmentLoader.Go(null, [{key:"enterpriseId", value:this._param.enterpriseId}])
		.then(success=>{
			this._param.organization = null;
		}, err=>{
			this._param.organization = null;
		});
	}
//根据部门加载订购人
	loadBuyer(){
		this._buyerListLoader.Go(null,[{key:"departmentId",value:this._param.organization}])
		.then(success=>{
			this._param.buyerId = null;
		})
		.catch(err=>{
			this._param.buyerId = null;
			this.showMsg("加载订购人列表出错！");
		})
	}

	
	loadPlatform():Promise<any>{
		return new Promise((resolve, reject)=>{
			this._platformLoader.Go()
			.then(success=>{
				resolve(success);
			},err=>{
				reject(err);
			});

		});
	}

	loadSubregion(){
		this._subregionLoader.Go(null, [{key:'_id', value:this._param.platformId}])
		.then(success=>{
			this._param.zoneId = null;
		},err=>{
			this._param.zoneId = null;
		});
	}

	showMsg(msg: string)
	{
		this._notice.open("系统提示", msg);
	}

	showDetail(orderItemId:string){
		this.router.navigateByUrl(`op-center/order-mng/order-mng-detail/${orderItemId}`);
	}
	
	//续订
	renew(){
		console.log('renew start');
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
			valueUnit: this._renewSetting.unit //可以为空
		}];

		this.layoutService.show();
		this._renewHandler.Go(null, [{key:"orderId", value:this.selectedOrderItem.orderId}], param)
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

	search(pageNumber:number = 1){
		this.layoutService.show();

		let param = _.extend({}, this._param);

		//匹配后台搜索框参数
        param.searchText = this._param.queryParam;

		
		param.pageParameter = {
			currentPage:pageNumber
			,size:10
		};
		this._orderLoader.Go(pageNumber, null, param)
		.then(success=>{
			this.layoutService.hide();

			//翻译状态
			this.updateStatusName();
		},err=>{
			this.layoutService.hide();
		});
	}

	//翻译订单状态
	updateStatusName(){
		let list:Array<SubInstanceItemResp> = []
		this._orderLoader.Items.map(n=>list = list.concat(n.itemList));
		list.map(n=>{
			let item = this._orderStatus.Items.find(m=>m.value == n.status);
			if(item) n.statusName = item.displayValue as string;

			item = this._productTypeLoader.Items.find(m=>m.value == n.serviceType.toString());
			if(item) n.serviceTypeName = item.displayValue as string;

			item = this._billinModeDic.Items.find(m=>{
				if(n.billingMode)
					return m.value == n.billingMode.toString();
				else
					return false;
			});
			if(item) n.billingModeName = item.displayValue as string;
		});

	}

	onCreateTimeChange($event){
		this._param.createDate = $event.formatted;
	}

	onExpireTimeChange($event){
		this._param.expireDate = $event.formatted;
	}

	//翻页
	changePage(pageNumber:number)
	{
		this.search(pageNumber);
	}

	//选择续订	
	renewSelect(orderItem:SubInstanceResp){
		
		// 已激活、即将过期:7的订单可以  续订
		if(!_.isEmpty(orderItem.itemList)
			&& orderItem.itemList.filter(n=>n.status == "7" || n.status == "2").length > 0)
		{
			$('#renewOrder').modal('show');
			
			this.selectedOrderItem = orderItem;
			this._renewSetting.reset();

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
		else
		{
			this.showMsg(`只有个“已激活”或“即将过期”的订单可以续订`);
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

	selectForever(){
		this._renewSetting.isForever = !this._renewSetting.isForever;

		if(this._renewSetting.isForever)
		{
			this._renewSetting.renewDate = this.calRenewDate("5", 999);
			this._renewSetting.value = 999;
			this._renewSetting.unit = 5;
		}
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

	//选择退订
	cancelSelect(orderItem:SubInstanceResp)
	{
		// 已激活、即将过期:7的订单可以  续订
		if(!_.isEmpty(orderItem.itemList)
			&& orderItem.itemList.filter(n=>n.status == "7" ||n.status == "2").length > 0)
		{
			$('#cancelOrder').modal('show');

			this._isCanceled = false;
			this.selectedOrderItem = orderItem;
		}
		else
		{
			this.showMsg(`只有个“已激活”或“即将过期”的订单可以退订`);
		}
	}

	
}