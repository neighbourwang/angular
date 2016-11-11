import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { DicLoader, ItemLoader, NoticeComponent, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import { ListItem
	, OrderMngParam
	, SubInstanceResp} from '../model'


@Component({
	selector: 'order-mng',
	templateUrl: '../template/order-mng.component.html',
	styleUrls: ['../style/order-mng-list.less','../style/order-mng-renew.less'],
	providers: []}
	)
export class OrderMngComponent implements OnInit{
	@ViewChild("notice")
  	private _notice: NoticeComponent;

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
		//订单查询配置
		this._orderLoader = new ItemLoader<SubInstanceResp>(false, "订单", "op-center.order-mng.order-list.get", restApiCfg, restApi);
		
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
		.catch(err=>{
			this.layoutService.hide();
			this.showMsg(err);
		});

	}
	
	showDetail(){
		this.router.navigateByUrl('op-center/order-mng/order-mng-detail');
	}
	renewOrder(){
		this.router.navigateByUrl('op-center/order-mng/order-mng-renew');
	}
	cancelOrder(){
		this.router.navigateByUrl('op-center/order-mng/order-mng-cancel');
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
}