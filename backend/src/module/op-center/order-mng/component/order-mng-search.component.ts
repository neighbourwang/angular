	
import { Input,Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent, DicLoader,ItemLoader,RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import { AdminListItem, DepartmentItem, Platform, ProductType, SubRegion, OrderMngParam,SubInstanceResp,SubInstanceItemResp,SearchOrderItem} from '../model'

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

	private _productTypeLoader: DicLoader = null;
	
	//private _orderStatusDic:DicLoader = null;
	private _orderLoader:ItemLoader<SearchOrderItem> = null;

	private _entId:string = "191af465-b5dc-4992-a5c9-459e339dc719";
	
	
	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){
			//配置部门列表加载
		this._departmentLoader = new ItemLoader<DepartmentItem>(false, '部门列表', "op-center.order-mng.department-list.get", this.restApiCfg, this.restApi);

			//订购人加载
		this._buyerLoader = new ItemLoader<DepartmentItem>(false, '部门列表', "op-center.order-mng.booker-list.get", this.restApiCfg, this.restApi);

		//产品类型配置
		this._productTypeLoader = new DicLoader(restApiCfg, restApi, "GLOBAL", "SERVICE_TYPE");


		//配置订单状态
		this._orderStatusDic = new DicLoader(this.restApiCfg, this.restApi, "SUBINSTANCE", "STATUS");

		//配置订单加载
		this._orderLoader = new ItemLoader<SearchOrderItem>(true, "订单查询列表", "op-center.order-mng.search-list.post", restApiCfg, restApi);
		this._orderLoader.MapFunc = (source:Array<any>, target:Array<SearchOrderItem>)=>{
		for(let item of source)
		{
			let obj = new SearchOrderItem();
			target.push(obj);

			_.extendOwn(obj, item);

			obj.orderId = item.id;// 订单编号
			obj.serviceType = item.productType;// 产品类型
			obj.orderType = item.orderType;// 订单类型
			obj.status = item.orderStatus;// 订单状态
			//费用
			if(item.productBillingItem)
			{
				obj.oncePrice = item.productBillingItem.basePrice;//一次性费用

				if(item.productBillingItem.billingMode == 0)//包月包年
				{
					obj.price = item.productBillingItem.basicPrice + item.productBillingItem.cyclePrice;
				}	
				else if(item.productBillingItem.billingMode == 1)//按量
				{
					obj.price = item.productBillingItem.unitPrice;
				}
			}
			obj.submitTime = item.createDate;// 提交时间
			obj.EndTime = item.completeDate;//完成时间
			obj.submitPeople = item.submiter;//提交者
			obj.departmentName = item.departmentName;//所属部门
      }
    };
//   @ApiModelProperty(notes = "订单ID")
//     private String id;
//     @ApiModelProperty(notes = "订单编号")
//     private String orderCode;

// 		@ApiModelProperty(notes = "产品类型")
//     private String productType;
//     @ApiModelProperty(notes = "订单类型")
//     private String orderType;
//     @ApiModelProperty(notes = "订单状态")
//     private Byte orderStatus;
//     @ApiModelProperty(notes = "费用")
//     private ProductBillingItem productBillingItem;
//     @ApiModelProperty(notes = "提交时间")
//     @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss", timezone = "GTM+8")
//     private Date createDate;
//     @ApiModelProperty(notes = "完成时间")
//     @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss", timezone = "GTM+8")
//     private Date completeDate;
//     @ApiModelProperty(notes = "提交者")
//     private String submiter;
//     @ApiModelProperty(notes = "所属部门")
//     private String departmentName;
		 
	}
	ngOnInit(){
		this.layoutService.show();
		this._orderStatusDic.Go()
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
		this._buyerLoader.Go(null, [{key:"enterpriseId", value:this._entId}])
		.then(success=>{
			this._param.organization = null;
		}, err=>{
			this._param.organization = null;
		});
	}
	//翻译订单状态及产品类型
	updateStatusName(){
		let list:Array<SubInstanceItemResp> = []
		
		list.map(n=>{
			let item = this._orderStatusDic.Items.find(m=>m.value == n.status);
			if(item) n.statusName = item.displayValue as string;

			item = this._productTypeLoader.Items.find(m=>m.value == n.serviceType.toString());
			if(item) n.serviceTypeName = item.displayValue as string;
		});

	}

	search(pageNumber:number = 1){
		this.layoutService.show();

		let param = _.extend({}, this._param);

		//匹配后台搜索框参数
        // param.searchText = this._param.queryParam;
        // param.productType = this._param.serviceType;
		// param.orderStatus = this._param.status;
		
		
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
	
}