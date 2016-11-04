import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { DicLoader, ItemLoader, NoticeComponent, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import { ListItem
	, OrderMngParam
	, OrderItem} from '../model'


@Component({
	selector: 'order-mng',
	templateUrl: '../template/order-mng.component.html',
	styleUrls: ['../style/order-mng-list.less'],
	providers: []}
	)
export class OrderMngComponent implements OnInit{

	//查询参数
	private _param:OrderMngParam = new OrderMngParam();
	//部门
	private _departmentLoader:ItemLoader<ListItem> = null;
	//订单状态
	private _orderStatusDic:DicLoader = null;
	//产品类型
	private _productTypeLoader:ItemLoader<ListItem> = null;
	//区域
	private _platformLoader:ItemLoader<ListItem> = null;
	//可用区
	private _regionLoader:ItemLoader<ListItem> = null;
	//订单查询
	private _orderLoader:ItemLoader<OrderItem> = null;

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){

		//部门配置
		this._departmentLoader = new ItemLoader<ListItem>(false, "部门列表", "op-center.order-mng.department-list.get", restApiCfg, restApi);
		this._departmentLoader.MapFunc = (source:Array<any>, target:Array<ListItem>)=>{

		};
		//订单状态配置
		this._orderStatusDic = new DicLoader(restApiCfg, restApi, "ORDER", "STATUS");

		//产品类型配置
		this._productTypeLoader = new ItemLoader<ListItem>(false, "产品类型", "op-center.order-mng.product-type.get", restApiCfg, restApi);
		this._productTypeLoader.MapFunc = (source:Array<any>, target:Array<ListItem>)=>{
			
		};
		//区域配置
		this._platformLoader = new ItemLoader<ListItem>(false, "区域", "op-center.order-mng.platform-list.get", restApiCfg, restApi);
		this._platformLoader.MapFunc = (source:Array<any>, target:Array<ListItem>)=>{
			
		};
		//可用区配置
		this._regionLoader = new ItemLoader<ListItem>(false, "可用区", "op-center.order-mng.region-list.get", restApiCfg, restApi);
		this._regionLoader.MapFunc = (source:Array<any>, target:Array<ListItem>)=>{
			
		};
		//订单查询配置
		this._orderLoader = new ItemLoader<OrderItem>(false, "订单", "op-center.order-mng.order-list.get", restApiCfg, restApi);
		this._orderLoader.MapFunc = (source:Array<any>, target:Array<OrderItem>)=>{
			
		};	
	}
	ngOnInit(){
	
	}
	showDetail(){
		this.router.navigateByUrl('op-center/order-mng/order-mng-detail');
	}
	renewOrder(){
		this.router.navigateByUrl('op-center/order-mng/order-mng-renew');
	}
}