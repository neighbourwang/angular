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


@Component({
	selector: 'order-mng',
	templateUrl: '../template/order-mng.component.html',
	styleUrls: ['../style/order-mng-list.less','../style/order-mng-renew.less'],
	providers: []}
	)
export class OrderMngComponent implements OnInit{
	@ViewChild("notice")
  	private _notice: NoticeComponent;

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

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){

		//退订
		this._cancelHandler = new ItemLoader<any>(false, "退订", "op-center.order-mng.order-cancel.get", restApiCfg, restApi);

		//续订
		this._renewHandler = new ItemLoader<any>(false, "续订", "op-center.order-mng.order-renew.get", restApiCfg, restApi);

		//初始化单项order数据
		this.selectedOrderItem = new SubInstanceResp();


		//部门配置
		this._departmentLoader = new ItemLoader<ListItem>(false, "部门列表", "op-center.order-mng.department-list.get", restApiCfg, restApi);
		
		//订单状态配置
		this._orderStatusDic = new DicLoader(restApiCfg, restApi, "ORDER", "STATUS");

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
		.catch(err=>{
			this.layoutService.hide();
			this.showMsg(err);
		});

	}

	//加载部门数据，使用的是临时企业id
	loadDepartment():Promise<any>{
		//测试企业1
		return new Promise((resovle, reject)=>{
			this._departmentLoader.Go(null, [{key:"enterpriseId", value:"191af465-b5dc-4992-a5c9-459e339dc719"}])
			.then(success=>{
				resovle(success);
			},err=>{
				reject(err);
			})
		});
	}
	
	showDetail(){
		this.router.navigateByUrl('op-center/order-mng/order-mng-detail');
	}
	
	renewSelect(orderItem:SubInstanceResp){
		this.selectedOrderItem = orderItem;
	}

	cancelSelect(orderItme:SubInstanceResp)
	{
		this._isCanceled = false;
		this.selectedOrderItem = orderItme;
	}
	

	showMsg(msg: string)
	{
		this._notice.open("系统提示", msg);
	}

	search(){
		this.layoutService.show();
		this._orderLoader.Go(1, null, this._param)
		.then(success=>{
			this.layoutService.hide();
		})
		.catch(err=>{
			this.layoutService.hide();
			this.showMsg(err);
		})
	}

	onPlatformChanged(){
		this.layoutService.show();
		this._regionLoader.Go(null, [{key:"_id", value:this._param.region}])
		.then(success=>{
			this.layoutService.hide();
		})
		.catch(err=>{
			this.layoutService.hide();
			this.showMsg(err);
		})
	}

	onCreateTimeChange($event){
		this._param.createTime = $event.formatted;
	}

	onExpireTimeChange($event){
		this._param.expireTime = $event.formatted;
	}

	//续订
	renew(){
		this._renewHandler.Go(null, [{key:"_subId", value:this.selectedOrderItem.orderId}])
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
}