
import { Input,Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent, DicLoader,ItemLoader,RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import { SearchOrderDetail, AdminListItem, DepartmentItem, Platform, ProductType, SubRegion, OrderMngParam,SubInstanceResp,SubInstanceItemResp,SearchOrderItem} from '../model'

import * as _ from 'underscore';
@Component({
	selector: 'order-mng-search',
	templateUrl: '../template/order-mng-search.component.html',
	styleUrls: ['../style/order-mng-search.less'],
	providers: []}
	)
export class OrderMngSearchComponent implements OnInit{

	@ViewChild("notice")
  	private _notice: NoticeComponent;

	private _param:OrderMngParam = new OrderMngParam();
	
	private _departmentLoader:ItemLoader<DepartmentItem> = null;

	private _buyerLoader:ItemLoader<{id:string; name:string}> = null //订购人

	private _orderStatus:DicLoader = null;

	private _productTypeLoader: DicLoader = null;
	
	private _orderLoader:ItemLoader<SearchOrderItem> = null;
	private _entId:string = "191af465-b5dc-4992-a5c9-459e339dc719";

	private _orderDetailLoader:ItemLoader<SearchOrderDetail> = null;

	private _orderDetail:SearchOrderDetail = null;	
	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){

		//获取订单详情
		this._orderDetailLoader = new ItemLoader<SearchOrderDetail>(false, "订单详情", "op-center.order-search.detail.get", restApiCfg, restApi);

		//配置部门列表加载
		this._departmentLoader = new ItemLoader<DepartmentItem>(false, '部门列表', "op-center.order-mng.department-list.get", this.restApiCfg, this.restApi);

		//订购人加载
		this._buyerLoader = new ItemLoader<{id:string; name:string}>(false, '部门列表', "op-center.order-mng.buyer-list.get", this.restApiCfg, this.restApi);

		//产品类型配置
		this._productTypeLoader = new DicLoader(restApiCfg, restApi, "GLOBAL", "SERVICE_TYPE");


		//配置订单状态
		this._orderStatus = new DicLoader(this.restApiCfg, this.restApi, "ORDER", "STATUS");

		//配置订单加载
		this._orderLoader = new ItemLoader<SearchOrderItem>(true, "订单列表", "op-center.order-search.list.post", restApiCfg, restApi);
		this._orderLoader.MapFunc = (source:Array<any>, target:Array<SearchOrderItem>)=>{

			let getfirstItem:(item:any)=>any = function(item:any):any{
				if(item && !_.isEmpty(item.itemList))
				{
					return item.itemList[0];
				}
				return null;
			};


			for(let item of source)
			{
				let obj = new SearchOrderItem();
				target.push(obj);

				_.extendOwn(obj, item);

				let getProperty = _.propertyOf(getfirstItem(item));


				obj.serviceType = getProperty("serviceType");// 产品类型
				obj.orderType = null;// 订单类型
				obj.status = getProperty("status");// 订单状态
				let billingInfo = getProperty('billingInfo');
				//费用
				if(billingInfo)
				{
					obj.oncePrice = billingInfo.basePrice;//一次性费用

					if(billingInfo.billingMode == 0)//包月包年
					{
						obj.price = billingInfo.basicPrice + billingInfo.cyclePrice;
					}	
					else if(billingInfo.billingMode == 1)//按量
					{
						obj.price = billingInfo.unitPrice;
					}
				}
				obj.submitTime = getProperty('createDate');// 提交时间
				obj.EndTime = getProperty('expireDate');//完成时间
				obj.submitPeople = getProperty('buyer');//提交者
				obj.departmentName = getProperty('departmentName');//所属部门
			}
		};

		this._orderLoader.Trait = (items:Array<SearchOrderItem>)=>{
			this._orderStatus.UpdateWithDic(items, "statusName", "status");
			this._productTypeLoader.UpdateWithDic(items, "serviceTypeName", "serviceType");
		};
      
	}
	ngOnInit(){
		this.layoutService.show();
		this._orderStatus.Go()
		.then(success=>{
			return this._productTypeLoader.Go();
		})
		.then(success=>{
			return this.loadDepartment();
		})
		.then(success=>{
			return this.loadBuyer();
		})
		.then(success=>{
			this.layoutService.hide();
		})
		.catch(err=>{
			this.layoutService.hide();
			this.showMsg(err);
		});
	}

	loadDepartment(){
		this._departmentLoader.Go(null, [{key:"enterpriseId", value:this._entId}])
		.then(success=>{
			this._param.organization = null;
		}, err=>{
			this._param.organization = null;
		});
	}

	loadBuyer(){
		this._buyerLoader.Go(null, [{key:"departmentId", value:this._param.organization}])
		.then(success=>{
			this._param.organization = null;
		}, err=>{
			this._param.organization = null;
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

		},err=>{
			this.layoutService.hide();
		});
	}



	onSubmitTimeChange($event){
		this._param.createDate = $event.formatted;
	}

	onEndTimeChange($event){
		this._param.expireDate = $event.formatted;
	}
	showMsg(msg: string)
	{
		this._notice.open("系统提示", msg);
	}
	cancel(){
/*
{
        "desc": "订单退订",
        "method": "GET",
        "id": "op-center.order-mng.order-cancel.get",
        "url": " /marketplace/authsec/subscription/instance/{_subId}/cancel"        
    }
*/
	}

	showDetail(orderId:string)
	{
		this.layoutService.show();
		this._orderDetailLoader.Go(null, [{key:"subinstanceCode", value:orderId}])
		.then(success=>{
			this.layoutService.hide();
			$('#searchDetail').modal('show');
		})
		.catch(err=>{
			this.layoutService.hide();
			this.showMsg(err);
		})
	}
	
}