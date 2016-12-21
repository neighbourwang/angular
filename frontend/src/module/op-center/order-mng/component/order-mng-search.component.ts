
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
	
	private _departmentLoader:ItemLoader<DepartmentItem> = null;

	private _buyerLoader:ItemLoader<{id:string; name:string}> = null //订购人

	private _orderStatusDic:DicLoader = null;

	private _productTypeDic: DicLoader = null;
	
	private _orderLoader:ItemLoader<SearchOrderItem> = null;
	private _entId:string = "191af465-b5dc-4992-a5c9-459e339dc719";

	private _orderDetailLoader:ItemLoader<SearchOrderDetail> = null;

	private _orderDetail:SearchOrderDetail = null;	
	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi,
		private _dictServ:DictService){

		//获取订单详情
		this._orderDetailLoader = new ItemLoader<SearchOrderDetail>(false, "订单详情", "op-center.order-search.detail.get", restApiCfg, restApi);
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


		//配置部门列表加载
		this._departmentLoader = new ItemLoader<DepartmentItem>(false, '部门列表', "op-center.order-mng.department-list.get", this.restApiCfg, this.restApi);

		//订购人加载
		this._buyerLoader = new ItemLoader<{id:string; name:string}>(false, '部门列表', "op-center.order-mng.buyer-list.get", this.restApiCfg, this.restApi);

		//产品类型配置
		this._productTypeDic = new DicLoader(restApiCfg, restApi, "GLOBAL", "SERVICE_TYPE");


		//配置订单状态
		this._orderStatusDic = new DicLoader(this.restApiCfg, this.restApi, "ORDER", "STATUS");

		//配置订单加载
		this._orderLoader = new ItemLoader<SearchOrderItem>(true, "订单列表", "op-center.order-search.list.post", restApiCfg, restApi);
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
			return this._departmentLoader.Go();
		})
		// .then(success=>{
		// 	return this.loadBuyer();
		// })
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
	}

	// loadDepartment(){
	// 	this._departmentLoader.Go(null, [{key:"enterpriseId", value:this._entId}])
	// 	.then(success=>{
	// 		this._param.organization = null;
	// 	}, err=>{
	// 		this._param.organization = null;
	// 	});
	// }

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

		let param = {
			status:this._param.status
			,serviceId:this._param.serviceType
			,pageParameter:{
				currentPage:pageNumber
				,size:10
			}
		};
// 		{
//   "approverId": "",
//   "createTime": "",
//   "enterpriseId": "",
//   "expireTime": "",
//   "orderCode": "",
//   "orderType": "",
//   "organization": "",
//   "pageParameter": {
//     "currentPage": 1,
//     "offset": 0,
//     "size": 1,
//     "sort": {},
//     "totalPage": 0
//   },
//   "serviceId": "",
//   "status": "",
//   "userId": ""
// }

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
	
}