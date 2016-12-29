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

import { CheckCenterParam,CheckListItem} from './../model';
import {DictService} from '../../../architecture/core/service/dict-service';

import * as _ from 'underscore';

@Component({
	selector: 'check-mng-list',
	templateUrl: '../template/check-mng-list.component.html',
	styleUrls: ['../style/check-mng-list.less'],
	providers: []	
})
export class CheckMngListComponent implements OnInit{ 
	private _param:CheckCenterParam = new CheckCenterParam();
	private _departmentLoader:ItemLoader<{id:string;name:string}> = null; //部门列表
	private _submiterLoader:ItemLoader<{id:string;name:string}> = null;//提交者列表
	private _serviceTypeDic:DicLoader = null; //产品类型
	private _orderTypeDic : DicLoader =null;//订单类型
	private _isAdvSearch:boolean = false;//高级查询
	private _listLoader:ItemLoader<CheckListItem> = null;//列表数据加载
	private _refuseHandler:ItemLoader<any> = null;//拒绝
	private _selectedItem:CheckListItem = null;//当前选择的数据
	private refuseReason:string = null;//拒绝原因


	private _entId:string = "191af465-b5dc-4992-a5c9-459e339dc719";


	@ViewChild("notice") private _notice:NoticeComponent;
	@ViewChild("refuseDialog")
		refuseDialog: PopupComponent;
	@ViewChild("confirmAcceptDialog")
	private _confirmAccept:ConfirmComponent;

	constructor(
		private _restApiCfg:RestApiCfg
		,private _restApi:RestApi
		,private _layoutService:LayoutService
		,private _dictServ:DictService){

		//拒绝

		this._refuseHandler = new ItemLoader<any>(false, '同意/拒绝', "check-center.approve-refust.post", _restApiCfg,_restApi);


		//列表数据加载
		this._listLoader = new ItemLoader<CheckListItem>(true, "CHECK_CENTER.PENDING_LIST", "check-center.get-list.post", _restApiCfg, _restApi);
		this._listLoader.MapFunc = (source:Array<any>, target:Array<CheckListItem>)=>{

			for(let item of source)
			{
				let obj = _.extendOwn(new CheckListItem(), item) as CheckListItem;
				target.push(obj);

				obj.orderId = item.orderId;
				obj.orderCodeStr = item.orderNo;//订单编号
				obj.serviceTypeIdStr = item.serviceType;//产品类型
				obj.userStr = item.submiter;// 用户,提交者
				obj.departmentStr = item.departmentName;// 部门
				obj.entStr = item.enterpriszeName;// 企业
				//费用
				obj.billingDurationStr = item.period;//订单周期
				obj.oneTimePriceNum = item.billingInfo ? item.billingInfo.basePrice: null;//一次性费用
				if(item.billingInfo)
				{
					obj.billingMode = item.billingInfo.billingMode;
					if(item.billingInfo.billingMode == 0)//包年包月
					{
						obj.priceNum = item.billingInfo.basicPrice + item.billingInfo.cyclePrice
					}
					else if(item.billingInfo.billingMode == 1)//按量
					{
						obj.priceNum = item.billingInfo.unitPrice;
					}
				}

				obj.createTimeStr = item.createDate;// 创建时间
				// obj.checkResultId = ?? 审批结果	
				obj.description = item.orderDesc; //描述			

				obj.specList = item.specList; //获取产品信息
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
		};

		//部门列表配置
		this._departmentLoader = new ItemLoader<{id:string;name:string}>(false, "CHECK_CENTER.DEPARTMENTS_LIST", "op-center.order-mng.department-list.get", _restApiCfg, _restApi);
		
		//提交者列表配置
		this._submiterLoader = new ItemLoader<{id:string;name:string}>(false, "CHECK_CENTER.SUBMITTERS_LIST", "check-center.submiter-list.get", _restApiCfg, _restApi);
		
		this._submiterLoader.MapFunc = (source:Array<any>, target:Array<{id:string;name:string}>)=>{
			for(let item of source)
			{
				let obj=_.extend({}, item) ;
				target.push(obj);
				obj.id = item.key;
				obj.name = item.value;
			}
		}
		//产品类型配置
		this._serviceTypeDic = new DicLoader(_restApiCfg, _restApi, "GLOBAL", "SERVICE_TYPE");
        //订单类型
		this._orderTypeDic = new DicLoader(_restApiCfg, _restApi, "ORDER", "TYPE");
	}
	
	ngOnInit(){

		this._layoutService.show();
		this._departmentLoader.Go(null, [{key:"enterpriseId", value:this._restApi.getLoginInfo().userInfo.enterpriseId}])
		.then(success=>{
			return this._serviceTypeDic.Go();
		})
		.then(success =>{
			return this._orderTypeDic.Go();
		})
		.then(success=>{
			this._layoutService.hide();
		})
		.then(success=>{
			this.search();
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
  "createTime": "2016-12-28T02:22:56.512Z",
  "enterpriseId": "string",
  "expireTime": "2016-12-28T02:22:56.512Z",
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

		let param = {
			approverStatus: '0'//'0';//approvalStatus代表未审批
	        ,quickSearchStr: this._param.quickSearchStr//输入订单号快速查询 ？
			,organization :this._param.departmentIdNum //部门organization？
			,orderType:this._param.orderTypeNum//订单类型orderType
			,serviceType:this._param.serviceTypeNum//产品类型serviceId
			,createTime:this._param.startDateStr//创建时间
			,expireTime:this._param.endDateStr //结束时间
			,userId:this._param.submitUserId//提交者？
			,enterpriseId:this._restApi.getLoginInfo().userInfo.enterpriseId
			,pageParameter: {
				currentPage:pageNum
				,size:10
			}
			
		};

		
        //匹配后台搜索框参数/authsec/backend/approval/orders/search/paging 
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
			this._layoutService.hide();
		})
		.catch(err=>{
			this._layoutService.hide();
			this.showMsg(err);
		});
		
	}
	//根据部门加载提交者
	loadSubmiter(){
		this._layoutService.show();
		this._submiterLoader.Go(null, [{key:"departmentId", value:this._param.departmentIdNum}])
		.then(success=>{
			this._layoutService.hide();
			this._param.submitUserId = null;
		})
		.catch(err=>{
			this._layoutService.hide();
			this._param.submitUserId = null;
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
			this.showMsg('CHECK_CENTER.REFUSE_REASON_DESCRIPTION');
			return;
		}

		this.approveOrder(0, this._selectedItem.orderId);
	}
	
	//审批处理
	//0:拒绝
	//1:同意
	private approveOrder(status:number, orderId:string)
	{
		this._layoutService.show();
		this._refuseHandler.Go(null, [{key:"orderId",value:orderId}
			,{key:"operation", value:status},{key:"reason", value:this.refuseReason}
			])
		.then(success=>{
			this._layoutService.hide();
			this.clearApproveData();
			this.refuseDialog.close();
			this.search();
		})
		.catch(err=>{
			this._layoutService.hide();
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
		this._confirmAccept.open('CHECK_CENTER.APPROVAL_CONSENT', 'CHECK_CENTER.CONFIRM_TO_APPROVE_THE_ORDER');
	}

	confirmAccept(){
		this.refuseReason = "同意";
		this.approveOrder(1, this._selectedItem.orderId);
	}

	cancelAccept(){
		this.clearApproveData();
	}

	onStartDateChange($event){
		this._param.startDateStr = $event.formatted;
	}

	onEndDateChange($event){
		this._param.endDateStr = $event.formatted;
	}

	changePage(pageNum:number){
		this.search(pageNum);
	}

	resetParam(){
		this._param.reset();
		this._submiterLoader.clear();
	}

}