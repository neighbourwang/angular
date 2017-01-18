
import { Input,Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent, DicLoader,ItemLoader,RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import { SearchOrderDetail, AdminListItem, DepartmentItem
	, Platform, ProductType, SubRegion
	, OrderMngParam,SubInstanceResp
	,SearchOrderItem
	, SubInstanceItemResp1} from '../model'
import {DictService} from '../../../../architecture/core/service/dict-service';

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

	private _selectedItem:SearchOrderItem = new SearchOrderItem();　
	
	private _departmentLoader:ItemLoader<DepartmentItem> = null;

	private _buyerLoader:ItemLoader<{id:string; name:string}> = null //提交者

	private _orderStatusDic:DicLoader = null;

	private _productTypeDic: DicLoader = null;
	
	private _orderLoader:ItemLoader<SearchOrderItem> = null;
	private _entId:string = "191af465-b5dc-4992-a5c9-459e339dc719";

	private _orderDetailLoader:ItemLoader<SearchOrderDetail> = null;

	private _cancelLoader : ItemLoader<any> = null;//撤单
	private cancelReason : string = null;//撤单原因

	private _orderDetail:SearchOrderDetail = null;	
	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi,
		private _dictServ:DictService){

		//获取订单查询详情
		this._orderDetailLoader = new ItemLoader<SearchOrderDetail>(false, "ORDER_MNG.ORDERS_DETAILS_DATA_FAILED", "op-center.order-search.detail.get", restApiCfg, restApi);
		this._orderDetailLoader.MapFunc = (source:Array<any>, target:Array<SearchOrderDetail>)=>{
			for(let item of source)
			{
				let obj = _.extendOwn(new SearchOrderDetail(), item) as SearchOrderDetail;
				target.push(obj);

				for(let i = 0; i < obj.subInstanceList.length; i++)
				{
					obj.subInstanceList[i] = _.extendOwn(new SubInstanceItemResp1(), item.subInstanceList[i]);
				}
			}
		}
		this._orderDetailLoader.Trait = (items:Array<SearchOrderDetail>)=>{
			let firstItem = this._orderDetailLoader.FirstItem;

			this._orderStatusDic.UpdateWithDic([firstItem], "statusName", "status");
			this._orderStatusDic.UpdateWithDic(firstItem.orderInstanceItems, "statusName", "status");

			this._productTypeDic.UpdateWithDic([firstItem], 'productTypeName', 'productType');
			this._productTypeDic.UpdateWithDic(firstItem.subInstanceList, 'serviceTypeName', 'serviceType');

		}
		this._orderDetailLoader.FirstItem = new SearchOrderDetail();
		this._orderDetailLoader.FirstItem.subInstanceList = [];


       //撤单
	   this._cancelLoader = new ItemLoader<any>(false,"撤单失败","op-center.order-search.cencel.post",restApiCfg, restApi);

		//配置部门列表加载
		this._departmentLoader = new ItemLoader<DepartmentItem>(false, 'ORDER_MNG.DEPARTMENT_LIST_DATA_FAILED', "op-center.order-mng.department-list.get", this.restApiCfg, this.restApi);

		//提交者加载
		this._buyerLoader = new ItemLoader<{id:string; name:string}>(false, '提交者列表', "check-center.submiter-list.get", this.restApiCfg, this.restApi);
		this._buyerLoader.MapFunc = (source:Array<any>, target:Array<{id:string;name:string}>)=>{
			for(let item of source)
			{
				let obj=_.extend({}, item) ;
				target.push(obj);
				obj.id = item.key;
				obj.name = item.value;
			}
		}
 
		//产品类型配置
		this._productTypeDic = new DicLoader(restApiCfg, restApi, "GLOBAL", "SERVICE_TYPE");


		//配置订单状态
		this._orderStatusDic = new DicLoader(this.restApiCfg, this.restApi, "ORDER", "STATUS");

		//配置订单加载
		this._orderLoader = new ItemLoader<SearchOrderItem>(true, "ORDERED_LIST_DATA_FAILED", "op-center.order-search.list.post", restApiCfg, restApi);
		this._orderLoader.MapFunc = (source:Array<any>, target:Array<SearchOrderItem>)=>{

			for(let item of source)
			{
				let obj = new SearchOrderItem();
				target.push(obj);

				_.extendOwn(obj, item);
				obj.submitTime = item.createDate;
				obj.EndTime = item.completeDate;
				obj.submitPeople = item.submiter;


				//费用
				if(item.billingInfo)
				{
					obj.oncePrice = item.billingInfo.basePrice;//一次性费用

					if(item.billingInfo.billingMode == 0)//包月包年
					{
						obj.price = item.billingInfo.basicPrice + item.billingInfo.cyclePrice;
					}	
					else if(item.billingInfo.billingMode == 1)//按量
					{
						obj.price = item.billingInfo.unitPrice;
					}
				}
			}
		};

		this._orderLoader.Trait = (items:Array<SearchOrderItem>)=>{
			this._orderStatusDic.UpdateWithDic(items, "statusName", "status");
			this._productTypeDic.UpdateWithDic(items, "serviceTypeName", "serviceType");
		};

	}
	ngOnInit(){
		this.layoutService.show();
		this._orderStatusDic.Go()
		.then(success=>{
			return this._productTypeDic.Go();
		})
		.then(success=>{
			return this._departmentLoader.Go(null, [{key:"enterpriseId", value:this.restApi.getLoginInfo().userInfo.enterpriseId}]);
		})
		.then(success=>{
			return this._buyerLoader.Go(null, [{key:"departmentId", value:this._param.organization}])
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

	search(pageNumber:number = 1){
		this.layoutService.show();

		let param = _.extend({}, this._param);
		param.pageParameter = {
			currentPage:pageNumber
			,size:10
		};
		param.createTime = param.createDate;
		param.expireTime = param.expireDate;
		param.userId = param.buyerId;
		param.orderCode = param.searchText;//快速查询只支持搜索输入订单编号
		
		//没有定义快速搜索字段
// {
//   "approverId": "string",
//   "approverStatus": "string",
//   "createTime": "2016-12-29T02:00:32.480Z",
//   "enterpriseId": "string",
//   "expireTime": "2016-12-29T02:00:32.480Z",
//   "orderCode": "string",
//   "orderType": "string",
//   "organization": "string",
//   "pageParameter": {
//     "currentPage": 0,
//     "offset": 0,
//     "size": 0,
//     "sort": {},
//     "totalPage": 0
//   },
//   "serviceType": "string",
//   "status": "string",
//   "userId": "string"
// }
		this._orderLoader.clear();
		this._orderLoader.TotalPages = 1;//清空页码
		this._orderLoader.Go(pageNumber, null, param)
		.then(success=>{
			this.layoutService.hide();

		},err=>{
			this.layoutService.hide();
		});
	}



	onCreateTimeChange($event){
		this._param.createDate = $event.formatted;
	}

	onExpireTimeChange($event){
		this._param.expireDate = $event.formatted;
	}
	showMsg(msg: string)
	{
		this._notice.open("COMMON.SYSTEM_PROMPT", msg);
	}

	showDetail(item:SearchOrderItem)
	{
		this.layoutService.show();
		this._orderDetailLoader.Go(null, [{key:"orderNo", value:item.orderNo}])
		.then(success=>{
			this._orderDetailLoader.FirstItem.type = item.orderType;
			$('#searchDetail').modal('show');
			this.layoutService.hide();
		})
		.catch(err=>{
			this.layoutService.hide();
			this.showMsg(err);
		})
	}

	changePage(pageNumber:number)
	{
		this.search(pageNumber);
	}

	resetParam(){
		this._buyerLoader.clear();
		this._param.reset();
		
	}

    //选中一行订单
	selectItem(item:SearchOrderItem){
		this._selectedItem = item;
		this.cancelReason = "";
		$('#cancelOrder').modal('show');
	}
	//撤单
	cancel(){
		this.layoutService.show();
	
        this._cancelLoader.Go(null,[{key:"orderId",value:this._selectedItem.orderId},{key:"reason",value:this.cancelReason}])
		.then(succeuss=>{
			this.layoutService.hide();
			$('#cancelOrder').modal('hide');
			this.search();
		})
		.catch(err=>{
			this.layoutService.hide();
			this.showMsg(err);
		})
	}
	
}