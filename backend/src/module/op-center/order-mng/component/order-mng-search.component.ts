	
import { Input,Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent, DicLoader,ItemLoader,RestApi, RestApiCfg, LayoutService, ConfirmComponent} from '../../../../architecture';
import { SearchOrderDetail,SubInstanceItemResp1,AdminListItem, DepartmentItem, Platform, ProductType,
	 SubRegion, OrderMngParam,SubInstanceResp,SubInstanceItemResp,SearchOrderItem} from '../model';
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
	private _adminLoader:ItemLoader<AdminListItem> = null;//企业
	
	private _departmentLoader:ItemLoader<DepartmentItem> = null;

	private _buyerLoader:ItemLoader<{id:string; name:string}> = null //订购人

	private _orderDetailLoader:ItemLoader<SearchOrderDetail>=null;//订单查询详情

	private _orderStatusDic:DicLoader = null;

	private _productTypeLoader: DicLoader = null;
	
	private _orderLoader:ItemLoader<SearchOrderItem> = null;

	private _entId:string = "191af465-b5dc-4992-a5c9-459e339dc719";
	
	private _selectedItem:SearchOrderItem = new SearchOrderItem();　
	
	private _cancelLoader : ItemLoader<any> = null;//撤单
	private cancelReason : string = null;//撤单原因
	
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
				// obj.orderCode = item.orderCode;
				// obj.type = item.productType;
				// obj.productType = item.productType; 
				// obj.status = item.status;
				// obj.department = item.department;
				// obj.departmentId = item.departmentId;
				// obj.createDate = item.createDate;
				// obj.completeDate = item.completeDate;
				// obj.enterpirse = item.enterpirse;

				for(let i = 0; i < obj.subInstanceList.length; i++)
				{
					obj.subInstanceList[i] = _.extendOwn(new SubInstanceItemResp1(), item.subInstanceList[i]);
				}
			}
		}
		this._orderDetailLoader.Trait = (target:Array<SearchOrderDetail>)=>{
			let firstItem = this._orderDetailLoader.FirstItem;

			this._orderStatusDic.UpdateWithDic([firstItem], "statusName", "status");
			this._orderStatusDic.UpdateWithDic(firstItem.orderInstanceItems, "statusName", "status");

			this._productTypeLoader.UpdateWithDic([firstItem], 'productTypeName', 'productType');
			this._productTypeLoader.UpdateWithDic(firstItem.subInstanceList, 'serviceTypeName', 'serviceType');

			if(firstItem.productType=='0'){//云主机服务,
				if(firstItem.subInstanceList[0].specList){
					for(let item of firstItem.subInstanceList[0].specList){
						if(!this.checkVm(item)){
							let index = firstItem.subInstanceList[0].specList.indexOf(item);
							firstItem.subInstanceList[0].specList.splice(index,1);
						}
							
					}
				}
			}
			console.log(firstItem.subInstanceList[0].specList);
		}
		this._orderDetailLoader.FirstItem = new SearchOrderDetail();
		this._orderDetailLoader.FirstItem.subInstanceList = [];

		//配置企业列表加载
		this._adminLoader = new ItemLoader<AdminListItem>(false, "COMMON.ENTPRISE_OPTIONS_DATA_ERROR", "op-center.order-mng.ent-list.get", this.restApiCfg, this.restApi);

			//配置部门列表加载
		this._departmentLoader = new ItemLoader<DepartmentItem>(false, 'COMMON.DEPARTMENT_OPTIONS_DATA_ERROR', "op-center.order-mng.department-list.get", this.restApiCfg, this.restApi);

			//订购人加载
		this._buyerLoader = new ItemLoader<DepartmentItem>(false, 'ORDER_MNG.BUYER_DATA_ERROR', "check-center.user-list.get", this.restApiCfg, this.restApi);
		this._buyerLoader.MapFunc = (source:Array<any>, target:Array<{id:string;name:string}>)=>{
			for(let item of source)
			{
				let obj=_.extend({}, item) ;
				target.push(obj);
				obj.id = item.key;
				obj.name = item.value;
			}
		}


      
       //撤单
	   this._cancelLoader = new ItemLoader<any>(false,'ORDER_MNG.DEBIT_FAILED',"op-center.order-search.cencel.post",restApiCfg, restApi);

	   
		//产品类型配置
		this._productTypeLoader = new DicLoader(restApiCfg, restApi, "GLOBAL", "SERVICE_TYPE");


		//配置订单状态
		this._orderStatusDic = new DicLoader(this.restApiCfg, this.restApi, "ORDER", "STATUS");

		//配置订单加载
		this._orderLoader = new ItemLoader<SearchOrderItem>(true, "ORDER_MNG.ORDER_LIST_DATA_ERROR", "op-center.order-mng.search-list.post", restApiCfg, restApi);
		this._orderLoader.MapFunc = (source:Array<any>, target:Array<SearchOrderItem>)=>{
		for(let item of source)
		{
			let obj = new SearchOrderItem();
			target.push(obj);

			_.extendOwn(obj, item);

            obj.orderId = item.orderId;//订单ID
			obj.orderNo = item.orderNo;// 订单编号，界面显示
			obj.serviceType = item.serviceType;// 产品类型
			obj.orderType = item.orderType;// 订单类型
			obj.status = item.status;// 订单状态
			//费用
			if(item.billingInfo)
			{
				obj.oncePrice = item.billingInfo.basePrice;//一次性费用
				obj.periodType = item.billingInfo.periodType;

				if(item.billingInfo.billingMode == 0)//包月包年
				{
					obj.price = item.billingInfo.basicPrice + item.billingInfo.cyclePrice;
				}	
				else if(item.billingInfo.billingMode == 1)//按量
				{
					obj.price = item.billingInfo.unitPrice;
				}
			}
			obj.submitTime = item.createDate;// 提交时间
			obj.EndTime = item.completeDate;//完成时间
			obj.submitPeople = item.submiter;//提交者
			obj.submitId = item.submiterId;//提交者Id,查询时需要
			obj.departmentName = item.departmentName;//所属部门
      }
    };


//   "resultContent": [
//     {
//       "billingInfo": {
//         "basePrice": 0,
//         "basicPrice": 0,
//         "billingId": "string",
//         "billingMode": "string",
//         "cyclePrice": 0,
//         "periodType": "string",
//         "unitPrice": 0,
//         "unitType": 0
//       },
//       "completeDate": "2016-12-13T08:14:41.653Z",
//       "createDate": "2016-12-13T08:14:41.653Z",
//       "departmentId": "string",
//       "departmentName": "string",
//       "enterpriseId": "string",
//       "enterpriseName": "string",
//       "expireDate": "2016-12-13T08:14:41.653Z",
//       "instanceName": "string",
//       "orderDesc": "string",
//       "orderId": "string",
//       "orderNo": "string",
//       "orderType": "string",
//       "period": 0,
//       "platformName": "string",
//       "quantity": 0,
//       "serviceType": "string",
//       "specList": [
//         {
//           "attrCode": "string",
//           "attrDisplayName": "string",
//           "attrDisplayValue": "string",
//           "attrOrderSeq": 0,
//           "attrValueCode": "string",
//           "description": "string",
//           "valueUnit": "string"
//         }
//       ],
//       "status": "string",
//       "submiter": "string",
//       "submiterId": "string",
//       "zoneName": "string"
//     }
//   ]


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

	checkVm(vm:any){//云主机产品显示 区域，可用区，实例规格(CPU,MEM,BOOTSTORAGE)，IP地址（无），操作系统(无)，密码，实例名称
		if(vm.attrCode== "PLATFORM"||vm.attrCode== "ZONE"||vm.attrCode== "CPU"||vm.attrCode== "MEM"||vm.attrCode== "BOOTSTORAGE"||vm.attrCode== "PASSWORD"||vm.attrCode== "INSTANCENAME")
			return true;
		return false;
	}
	ngOnInit(){
		this.layoutService.show();
		this._orderStatusDic.Go()
		.then(success=>{
			return this._productTypeLoader.Go();
		})
		.then(success=>{
			return this._adminLoader.Go();
		})
		.then(success=>{
			return this.loadDepartment();
		})
		.then(success=>{
			return this.loadBuyer();
		})
		.then(success=>{
			return this.search();
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
		this.layoutService.show();
		this._param.organization = null;
		this._param.buyerId = null;
		this._departmentLoader.Go(null, [{key:"enterpriseId", value:this._param.enterpriseId}])
		.then(success=>{
			this.layoutService.hide();
		}, err=>{
			this.layoutService.hide();
		});
	}

	loadBuyer(){
		this.layoutService.show();
		this._param.buyerId = null;
		this._buyerLoader.Go(null, [{key:"departmentId", value:this._param.organization}])
		.then(success=>{
			this.layoutService.hide();
		}, err=>{
			this.layoutService.hide();
		});
	}
	// //翻译订单状态及产品类型
	// updateStatusName(){
	// 	let list:Array<SubInstanceItemResp> = []
		
	// 	list.map(n=>{
	// 		let item = this._orderStatusDic.Items.find(m=>m.value == n.status);
	// 		if(item) n.statusName = item.displayValue as string;

	// 		item = this._productTypeLoader.Items.find(m=>m.value == n.serviceType.toString());
	// 		if(item) n.serviceTypeName = item.displayValue as string;
	// 	});

	// }

	search(pageNumber:number = 1){
		/*
{
  "approverId": "string",
  "approverStatus": "string",
  "createTime": "2017-01-03T07:29:47.768Z",
  "enterpriseId": "string",
  "expireTime": "2017-01-03T07:29:47.768Z",
  "orderCode": "string",
  "orderType": "string",
  "organization": "string",
  "pageParameter": {
    "currentPage": 0,
    "offset": 0,
    "size": 0,
    "sort": {},
    "totalPage": 0
  },
  "serviceType": "string",
  "status": "string",
  "userId": "string"
}
		*/
		this.layoutService.show();

		let param = _.extend({}, this._param);

		//匹配后台搜索框参数
		param.orderCode = this._param.queryParam
        // param.searchText = this._param.queryParam;
		param.organization = this._param.organization;
		//param.serviceId = this._param.serviceType;
		param.status = this._param.status;
		param.createTime = this._param.createDate;
		param.expireTime = this._param.expireDate;
		
		param.userId = this._param.buyerId;
		param.pageParameter = {
			currentPage:pageNumber
			,size:10
		};
		this._orderLoader.clear();
		this._orderLoader.TotalPages = 1;//清空页码
		this._orderLoader.Go(pageNumber, null, param)
		.then(success=>{
			this.layoutService.hide();
		},err=>{
			this.layoutService.hide();
		});
	}

// {
//   "approverId": "string",
//   "createTime": "2016-12-13T08:14:41.275Z",
//   "enterpriseId": "string",
//   "expireTime": "2016-12-13T08:14:41.275Z",
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
//   "serviceId": "string",
//   "status": "string",
//   "userId": "string"
// }

	onSubmitTimeChange($event){
		this._param.createDate = $event.formatted;
	}

	onEndTimeChange($event){
		this._param.expireDate = $event.formatted;
	}
	
	showMsg(msg: string)
	{
		this._notice.open("COMMON.SYSTEM_PROMPT", msg);
	}

	resetParam(){
		this._param.reset();
		this._departmentLoader.clear();
		this._buyerLoader.clear();
		
	}
	//翻页
	changePage(pageNumber:number)
	{
		this.search(pageNumber);
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