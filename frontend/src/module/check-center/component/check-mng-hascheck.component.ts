import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi
	, RestApiCfg
	, LayoutService
	, NoticeComponent
	, PopupComponent
	, ConfirmComponent
	, SystemDictionaryService
	, SystemDictionary
	, DicLoader
	, ItemLoader } from '../../../architecture';
import {DictService} from '../../../architecture/core/service/dict-service';
import { CheckCenterParam,CheckListItem,ApproveItem } from './../model';
import * as _ from 'underscore';

@Component({
	selector: 'check-mng-list',
	templateUrl: '../template/check-mng-hascheck.component.html',
	styleUrls: ['../style/check-mng-list.less'],
	providers: []	
})
export class CheckMngHascheckComponent implements OnInit{
	@ViewChild("notice") private _notice:NoticeComponent;
	
	private _param:CheckCenterParam = new CheckCenterParam();
	private _departmentLoader:ItemLoader<{id:string;name:string}> = null; //部门列表
	private _submiterLoader:ItemLoader<{id:string;name:string}> = null;//提交者列表
	private _serviceTypeDic:DicLoader = null; //产品类型
	private _isAdvSearch:boolean = false;//高级查询
	private _orderTypeDic : DicLoader =null;//订单类型
	
	private _checkerLoader:ItemLoader<{id:string;name:string}> = null;//审批人列表

	private _entId:string = "191af465-b5dc-4992-a5c9-459e339dc719";
	private _billinModeDic:DicLoader = null; //计费模式

	private _listLoader:ItemLoader<CheckListItem> = null;//列表数据加载
	constructor(
		private _restApiCfg:RestApiCfg
		,private _restApi:RestApi
		,private _layoutService:LayoutService
		,private _dictServ:DictService){


		//列表数据加载
		this._listLoader = new ItemLoader<CheckListItem>(true, "CHECK_CENTER.APPROVED_LIST", "check-center.get-list.post", _restApiCfg, _restApi);
		this._listLoader.MapFunc = (source:Array<any>, target:Array<CheckListItem>)=>{

			for(let item of source)
			{
				let obj = _.extendOwn(new CheckListItem(), item) as CheckListItem;
				target.push(obj);
				
				obj.orderCodeStr = item.orderNo;//订单编号
				obj.serviceTypeIdStr = item.serviceType;//产品类型
				obj.userStr = item.submiter;// 用户,提交者
				obj.departmentStr = item.departmentName;// 部门
				obj.entStr = item.enterpriseName;// 企业

				if(item.orderItems){
					let orderItem :any=item.orderItems[0];
					if(item.orderItems>1){
						for(let _item of item.orderItems){
						if(_item.serviceType==0){
								orderItem.platformName=_item.platformName;
								orderItem.zoneName=_item.zoneName;
							}
							if(_item.serviceType==3){
								orderItem.specList = _item.specList;
							}	
						}
					}
					
					if(orderItem!=null){
						
						obj.platformName = orderItem.platformName;
						obj.zoneName = orderItem.zoneName;

						if(orderItem.billingInfo){
							obj.billingMode = orderItem.billingInfo.billingMode;
							obj.periodType = orderItem.billingInfo.periodType;
							if(orderItem.billingInfo.billingMode == 0)//包年包月
							{
								obj.priceNum = orderItem.billingInfo.basicPrice + orderItem.billingInfo.cyclePrice
							}
							else if(orderItem.billingInfo.billingMode == 1)//按量
							{
								obj.priceNum = orderItem.billingInfo.unitPrice;
							}
							//费用
							obj.billingDurationStr = orderItem.period;//订单周期
							obj.oneTimePriceNum = orderItem.billingInfo ? orderItem.billingInfo.basePrice: "";//一次性费用

							obj.specList = orderItem.specList; //获取产品信息
						}
					}
				}

				
			

				obj.createTimeStr = item.createDate;// 创建时间
				// obj.checkResultId = ?? 审批结果	
				obj.description = item.orderDesc; //描述		
				
				

			}
		};
		this._listLoader.Trait = (target:Array<CheckListItem>)=>{
			//处理字典
			// this._serviceTypeDic.UpdateWithDic(target, "serviceTypeName", "serviceTypeIdStr");
			// this._orderTypeDic.UpdateWithDic(target, "orderTypeNum", "orderTypeName");
			// this._billinModeDic.UpdateWithDic(target, "billingModeName", "billingModeNum")

			for(let i = 0; i < target.length; i++)
			{
				this.getApproveReason(target[i]);
			}
		};
		//部门列表配置
		this._departmentLoader = new ItemLoader<{id:string;name:string}>(false, "CHECK_CENTER.DEPARTMENTS_LIST", "op-center.order-mng.department-list.get", _restApiCfg, _restApi);


		//提交者列表配置
		this._submiterLoader = new ItemLoader<{id:string;name:string}>(false, "CHECK_CENTER.SUBMITTERS_LIST", "check-center.submiter-list.get", _restApiCfg, _restApi);//无API接口
	
         this._submiterLoader.MapFunc = (source:Array<any>, target:Array<{id:string;name:string}>)=>{
			for(let item of source)
			{
				let obj=_.extend({}, item) ;
				target.push(obj);
				obj.id = item.key;
				obj.name = item.value;
			}
		}
		//审批人列表配置
		this._checkerLoader = new ItemLoader<{id:string;name:string}>(false, "CHECK_CENTER.SUBMITTERS_LIST", "check-center.checker-list.get", _restApiCfg, _restApi);//无API接口
	
	    this._checkerLoader.MapFunc = (source:Array<any>, target:Array<{id:string;name:string}>)=>{
			for(let item of source)
			{
				let obj=_.extend({}, item) ;
				target.push(obj);
				obj.id = item.key;
				obj.name = item.value;
			}
		}
		//产品类型配置
		this._serviceTypeDic = new DicLoader(_restApiCfg, _restApi, "GLOBAL", "SERVICE_TYPE");//²úÆ·ÀàÐÍÁÐ±í', "op-center.order-mng.product-type-list.get", _restApiCfg, _restApi);

        //订单类型
		this._orderTypeDic = new DicLoader(_restApiCfg, _restApi, "ORDER", "TYPE");


	}

	
	ngOnInit(){
		this._layoutService.show();
		this._serviceTypeDic.Go()
		.then(success =>{
			return this._orderTypeDic.Go();
		})
		.then(success=>{
			return this._departmentLoader.Go(null, [{key:"enterpriseId", value:this._restApi.getLoginInfo().userInfo.enterpriseId}])
		})
		.then(success=>{
			this.search();
		})
		.then(success=>{
			this._layoutService.hide();
		})
		.catch(err=>{
			this._layoutService.hide();
			this.showMsg(err);
		});
	}

	showMsg(msg:string)
	{
		this._notice.open("CHECK_CENTER.SYSTEM", msg);
	}

	//搜索
	search(pageNum:number = 1){

/*
{
  "approverId": "string",
  "approverStatus": "string",
  "createTime": "2016-12-29T02:00:32.480Z",
  "enterpriseId": "string",
  "expireTime": "2016-12-29T02:00:32.480Z",
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
		this._layoutService.show();
		let param = {
			approverStatus: '1'//'0';//approvalStatus代表未审批
	        ,orderCode: this._param.quickSearchStr//输入订单号快速查询 ？
			,organization :this._param.departmentIdNum //部门organization？
			,orderType:this._param.orderTypeNum//订单类型orderType
			,serviceType:this._param.serviceTypeNum//产品类型serviceId
			,createTime:this._param.startDateStr//创建时间
			,expireTime:this._param.endDateStr //结束时间
			,userId:this._param.submitUserId//提交者？
			,approverId: this._param.checkUserIdStr //审批人
			,enterpriseId:this._restApi.getLoginInfo().userInfo.enterpriseId
			,pageParameter: {
				currentPage:pageNum
				,size:10
			}
			
		};
		
		this._listLoader.clear();
		this._listLoader.TotalPages = 1;
		this._listLoader.Go(pageNum, null, param)
		.then(success=>{
			this._layoutService.hide();
		})
		.catch(err=>{
			this._layoutService.hide();
			this.showMsg(err);

		});

	}


	//根据企业加载部门
	entChanged(){
		this._layoutService.show();
		this._departmentLoader.Go(null, [{key:"enterpriseId", value:this._param.entIdStr}])
		.then(success=>{
			this._layoutService.hide();
		})
		.catch(err=>{
			this._layoutService.hide();
			this.showMsg(err);
		});
		
	}

   //根据部门加载提交者,审批人
	loadSubmiter(){
		this._layoutService.show();
		this._submiterLoader.Go(null, [{key:"departmentId", value:this._param.departmentIdNum}])
		.then(success=>{
			this._param.submitUserId = null;
			this._checkerLoader.Go(null, [{key:"departmentId", value:this._param.departmentIdNum}]);		
		})
		.then(success=>{
			this._param.checkUserIdStr = null;
			this._layoutService.hide();
		
		})
		.catch(err=>{
			this._param.submitUserId = null;
			this._param.checkUserIdStr = null;
			this._layoutService.hide();
			this.showMsg(err);
		});
		
	}
	onStartDateChange($event)
	{
		this._param.startDateStr = $event.formatted;
	}

	onEndDateChange($event)
	{
		this._param.endDateStr = $event.formatted;
	}

	resetParam(){
		this._param.reset();
		this._submiterLoader.clear();
	}

	

	getApproveReason(orderItem:CheckListItem){
		let itemLoader = new ItemLoader<ApproveItem>(false, "审批结果加载出错", "check-center.approve-info.get", this._restApiCfg, this._restApi);
		orderItem.checkResult = itemLoader.Go(null, [{key:"orderId", value:orderItem.orderId}]);
	}
}