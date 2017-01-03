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

import { CheckCenterParam
	, CheckListItem } from './../model';
import * as _ from 'underscore';

@Component({
	selector: 'check-mng-list',
	templateUrl: '../template/check-mng-list.component.html',
	styleUrls: ['../style/check-mng-list.less'],
	providers: []	
})

export class CheckMngListComponent implements OnInit{ 
	private _param:CheckCenterParam = new CheckCenterParam();
	private _entLoader:ItemLoader<{id:string; name:string}> = null; //企业列表
	private _departmentLoader:ItemLoader<{id:string;name:string}> = null; //部门列表
	private _serviceTypeDic:DicLoader = null; //产品类型
	private _orderTypeDic:DicLoader = null; //订单类型
	private _isAdvSearch:boolean = false;//高级查询
	private _userListLoader:ItemLoader<{id:string;name:string}> = null;//提交者列表
	private _listLoader:ItemLoader<CheckListItem> = null;//列表数据加载
	private _refuseHandler:ItemLoader<any> = null;//拒绝
	private _selectedItem:CheckListItem = null;//当前选择的数据
	private refuseReason:string = null;//拒绝原因
	private _billinModeDic:DicLoader = null; //计费模式


	@ViewChild("notice") private _notice:NoticeComponent;
	@ViewChild("refuseDialog")
		refuseDialog: PopupComponent;
	@ViewChild("confirmAcceptDialog")
	private _confirmAccept:ConfirmComponent;
	constructor(
		private _restApiCfg:RestApiCfg
		,private _restApi:RestApi
		,private _layoutService:LayoutService){

		//计费模式字典
		this._billinModeDic = new DicLoader(_restApiCfg, _restApi, "BILLING_MODE", "TYPE");

		//拒绝
		this._refuseHandler = new ItemLoader<any>(false, '拒绝', "check-center.approve-refust.post", _restApiCfg,_restApi);

		//列表数据加载
		this._listLoader = new ItemLoader<CheckListItem>(true, "待审批列表", "check-center.not-checked.list", _restApiCfg, _restApi);
		this._listLoader.MapFunc = (source:Array<any>, target:Array<CheckListItem>)=>{

			for(let item of source)
			{
				let obj = new CheckListItem();
				target.push(obj);

				obj.orderId = item.orderId;//订单id				
				obj.orderCodeStr = item.orderNo;//订单编号
				obj.serviceTypeIdStr = item.serviceType;//产品类型
				obj.platformStr = item.platformName;//区域
				obj.zoneStr = item.zoneName;// 可用区
				obj.orderTypeName = item.orderType;//订单类型
				obj.userStr = item.submiter;// 用户,提交者
				obj.departmentStr = item.departmentName;// 部门
				obj.entStr = item.enterpriseName;// 企业
				//费用
				obj.billingModeNum =item.billingInfo ? item.billingInfo.billingMode: null; //计费模式
				obj.billingDurationStr = item.period;//订单周期
				obj.oneTimePriceNum = item.billingInfo ? item.billingInfo.basePrice: null;//一次性费用
				if(item.billingInfo)
				{
					if(obj.billingModeNum == 0)//包年包月
					{
						obj.priceNum = item.billingInfo.basicPrice + item.billingInfo.cyclePrice
					}
					else if(obj.billingModeNum == 1)//按量
					{
						obj.priceNum = item.billingInfo.unitPrice;
					}
					
				}

				obj.createTimeStr = item.createDate;// 创建时间
				// obj.checkResultId = ?? 审批结果	
				obj.description = item.orderDesc; //描述	

				obj.specList = item.specList;

			}
		};
		// this._listLoader.FakeDataFunc = (target:Array<CheckListItem>)=>{
		// 	let obj = new CheckListItem();
		// 	target.push(obj);

		// 	obj.orderId = 'abc-swerw';//订单id				
		// 	obj.orderCodeStr = 'abc-123423';//订单编号
		// };

		this._listLoader.Trait = (target:Array<CheckListItem>)=>{
			//处理字典
			this._serviceTypeDic.UpdateWithDic(target, "serviceTypeName", "serviceTypeIdStr");
			this._orderTypeDic.UpdateWithDic(target, "orderTypeNum", "orderTypeName");
			this._billinModeDic.UpdateWithDic(target, "billingModeName", "billingModeNum")
		};

		//提交者列表
		this._userListLoader = new ItemLoader<{id:string;name:string}>(false, "提交者列表", "check-center.user-list.get", _restApiCfg, _restApi);
		// this._userListLoader.MapFunc = (source:Array<any>,target:Array<{id:string;name:string}>)=>{
		// 	target = target.concat(source.map(n=>{
		// 		return {id:n.key, name:n.value};
		// 	}));
		// };
			this._userListLoader.MapFunc = (source:Array<any>, target:Array<{id:string;name:string}>)=>{
			for(let item of source)
			{
				let obj=_.extend({}, item) ;
				target.push(obj);
				obj.id = item.key;
				obj.name = item.value;
			}
		}

		//订单类型
		this._orderTypeDic = new DicLoader(_restApiCfg, _restApi, "ORDER", "TYPE");

		//企业列表配置
		this._entLoader = new ItemLoader<{id:string;name:string}>(false, "企业列表", "op-center.order-mng.ent-list.get", _restApiCfg, _restApi);

		//部门列表配置
		this._departmentLoader = new ItemLoader<{id:string;name:string}>(false, "部门列表", "op-center.order-mng.department-list.get", _restApiCfg, _restApi);

		//产品类型配置
		this._serviceTypeDic = new DicLoader(_restApiCfg, _restApi, "GLOBAL", "SERVICE_TYPE");//²úÆ·ÀàÐÍÁÐ±í', "op-center.order-mng.product-type-list.get", _restApiCfg, _restApi);

	}
	
	ngOnInit(){

		this._layoutService.show();
		this._entLoader.Go()
		.then(success=>{
			return this._serviceTypeDic.Go();
		})
		.then(success=>{
			return this._orderTypeDic.Go();
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
		 this._notice.open("系统", msg);
		
	}

	//搜索
	search(pageNum:number = 1){
/*
{
  "approverId": "string",
  "approverStatus": "string",
  "createTime": "2017-01-03T07:29:47.705Z",
  "enterpriseId": "string",
  "expireTime": "2017-01-03T07:29:47.705Z",
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
		let param = _.extend({}, this._param);

		
        //匹配后台搜索框参数/authsec/backend/approval/orders/search/paging 
		param.approverStatus = 2;//approvalStatus代表未审批
        param.orderCode = this._param.quickSearchStr;//输入订单号快速查询 ？
 		param.enterpriseId = this._param.entIdStr; //企业enterpriseId
		param.organization = this._param.departmentIdNum; //部门organization？
		param.orderType = this._param.orderTypeNum;//订单类型orderType
		param.serviceType = this._param.serviceTypeNum;//产品类型serviceId
		param.createTime = this._param.startDateStr;//创建时间
		param.expireTime = this._param.endDateStr; //结束时间
		param.userId = this._param.submitUserId;		//提交者？

		
		param.pageParameter = {
			currentPage:pageNum
			,size:10
		};
		this._layoutService.show();
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
			this._param.departmentIdNum = null;
			this._param.submitUserId = null;		
			this._layoutService.hide();
		})
		.catch(err=>{
			this._param.departmentIdNum = null;
			this._param.submitUserId = null;	
			this._layoutService.hide();
			this.showMsg(err);
		});
		
	}

	//拒绝
	refuse(item:CheckListItem){
		this._selectedItem = item;
		this.refuseDialog.open();
	}

	//确认拒绝
	confirmRefuse(){
		if(!(this.refuseReason && this.refuseReason.length <= 200))
		{
			this.showMsg('必须填写拒绝原因，且不能超出200字');
			return;
		}

		this.approveOrder(0, this._selectedItem.orderId);
	}

	//审批处理
	//0:拒绝
	//1:同意
	private approveOrder(status:number, orderId:string)
	{
		
		this._refuseHandler.Go(null, [{key:"orderId",value:orderId}
			,{key:"operation", value:status},{key:"reason", value:this.refuseReason}
			])
		.then(success=>{
			this.clearApproveData();
			this.search();
			this.refuseDialog.close();
		})
		.catch(err=>{
			this.showMsg(err);
		});
		
	}

	//取消拒绝
	cancelRefuse(){
		this.clearApproveData();
		this.refuseDialog.close();
	}

	//清除提交数据
	clearApproveData(){
		this.refuseReason = null;
		this._selectedItem = null;
	}

	//同意
	accept(item:CheckListItem)
	{
		this._selectedItem = item;
		this._confirmAccept.open('审批同意', '你确认要审批同意该订单吗？');
	}

	confirmAccept(){
		this.refuseReason='同意';
		this.approveOrder(1, this._selectedItem.orderId);
	}

	cancelAccept(){
		this.clearApproveData();
	}

	departmentChanged(){
		this._layoutService.show();
		this._userListLoader.Go(null, [{key:"departmentId", value:this._param.departmentIdNum}])
		.then(success=>{
			this._param.submitUserId = null;
			this._layoutService.hide();
		})
		.catch(err=>{
			this._param.submitUserId = null;
			this._layoutService.hide();
		});
	}	

	changePage(pageNum:number)
	{
		this.search(pageNum);
	}

	resetParam(){
		this._param.reset();
		this._departmentLoader.clear();		
		this._userListLoader.clear();
	}

	onStartDateChange($event)
	{
		this._param.startDateStr = $event.formatted;
	}

	onEndDateChange($event)
	{
		this._param.endDateStr = $event.formatted;
	}

}