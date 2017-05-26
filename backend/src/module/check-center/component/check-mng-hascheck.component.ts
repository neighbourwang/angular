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
import { MyDatePicker  } from '../../../architecture/components/date-picker/my-date-picker.component';


import { CheckCenterParam
	, CheckListItem,ApproveItem } from './../model';
import * as _ from 'underscore';

@Component({
	selector: 'check-mng-list',
	templateUrl: '../template/check-mng-hascheck.component.html',
	styleUrls: ['../style/check-mng-list.less'],
	providers: []	
})
export class CheckMngHascheckComponent implements OnInit{
	@ViewChild("notice") private _notice:NoticeComponent;

	@ViewChild("createDatePicker")
  	private createDatePicker: MyDatePicker;

	@ViewChild("expireDatePicker")
  	private expireDatePicker: MyDatePicker;
	
	private _param:CheckCenterParam = new CheckCenterParam();
	private _entLoader:ItemLoader<{id:string; name:string}> = null; //企业列表
	private _departmentLoader:ItemLoader<{id:string;name:string}> = null; //部门列表
	private _serviceTypeDic:DicLoader = null; //产品类型
	private _orderTypeDic:DicLoader = null; //订单类型
	private _isAdvSearch:boolean = false;//高级查询
	private _userListLoader:ItemLoader<{id:string;name:string}> = null;//提交者列表
	private _approverListLoader:ItemLoader<{id:string;name:string}> = null;//审批人列表
	private _approveInfoLoader:ItemLoader<ApproveItem> = null;//审批意见
	private _listLoader:ItemLoader<CheckListItem> = null;//列表数据加载
	private _billinModeDic:DicLoader = null; //计费模式

	constructor(
		private _restApiCfg:RestApiCfg
		,private _restApi:RestApi
		,private _layoutService:LayoutService
		,private _dictServ:DictService){

		//计费模式字典
		this._billinModeDic = new DicLoader(_restApiCfg, _restApi, "BILLING_MODE", "TYPE");

		//列表数据加载
		this._listLoader = new ItemLoader<CheckListItem>(true, "CHECK_CENTER.APPROVE_LIST_DATA_ERROR", "check-center.not-checked.list", _restApiCfg, _restApi);
		this._listLoader.MapFunc = (source:Array<any>, target:Array<CheckListItem>)=>{

			for(let item of source)
			{
				let obj = new CheckListItem();
				target.push(obj);
				_.extendOwn(obj, item);
				
				obj.orderId = item.orderId;
				obj.orderCodeStr = item.orderNo;//订单编号
				obj.serviceTypeIdStr = item.serviceType;//产品类型
				// obj.platformStr = item.platformName;//区域
				// obj.zoneStr = item.zoneName;// 可用区
				obj.orderTypeName = item.orderType;//订单类型
				obj.userStr = item.submiter;// 用户,提交者
				obj.departmentStr = item.departmentName;// 部门
				obj.entStr = item.enterpriseName;// 企业
				//obj.checkResultName = item.operation;//审批结果
				//obj.checkResultName = '同意';
				if(item.orderItems){
					let orderItem :any=item.orderItems[0];
					if(item.orderItems.length>1){
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

					obj.platformStr = orderItem.platformName;//区域
					obj.zoneStr = orderItem.zoneName;// 可用区
					obj.specList = orderItem.specList;
					
					//费用
					if(orderItem.billingInfo){
						obj.billingModeNum =orderItem.billingInfo ? orderItem.billingInfo.billingMode: null; //计费模式
						obj.periodType = orderItem.billingInfo.periodType;
						obj.billingDurationStr = orderItem.period;//订单周期
						obj.oneTimePriceNum = orderItem.billingInfo ? orderItem.billingInfo.basePrice: null;//一次性费用

						if(obj.billingModeNum == 0)//包年包月
						{
							obj.priceNum = orderItem.billingInfo.basicPrice + orderItem.billingInfo.cyclePrice
						}
						else if(obj.billingModeNum == 1)//按量
						{
							obj.priceNum = orderItem.billingInfo.unitPrice;
						}else if(obj.billingModeNum ==3){
							obj.showPrice = false;
						}

					}
				
				}
				}

				obj.createTimeStr = item.createDate;// 创建时间
				// obj.checkResultId = ?? 审批结果	
				obj.description = item.orderDesc; //描述	

				obj.specList = item.specList; //获取产品信息
				

			}
		};

		this._listLoader.Trait = (target:Array<CheckListItem>)=>{
			//处理字典
			this._serviceTypeDic.UpdateWithDic(target, "serviceTypeName", "serviceTypeIdStr");
			this._orderTypeDic.UpdateWithDic(target, "orderTypeNum", "orderTypeName");
			this._billinModeDic.UpdateWithDic(target, "billingModeName", "billingModeNum")

			for(let i = 0; i < target.length; i++)
			{
				this.getApproveReason(target[i]);
			}
		};

		//审批人列表
		this._approverListLoader = new ItemLoader<{id:string;name:string}>(false, "CHECK_CENTER.APPROVE_USER_DATA_ERROR", "check-center.approver-list.get", _restApiCfg, _restApi);
		// this._approverListLoader.MapFunc = (source:Array<any>,target:Array<{id:string;name:string}>)=>{
		// 	target = target.concat(source.map(n=>{
		// 		return {id:n.key, name:n.value};
		// 	}));
		// };

		this._approverListLoader.MapFunc = (source:Array<any>, target:Array<{id:string;name:string}>)=>{
			for(let item of source)
			{
				let obj=_.extend({}, item) ;
				target.push(obj);
				obj.id = item.key;
				obj.name = item.value;
			}
		}

		//提交者列表
		this._userListLoader = new ItemLoader<{id:string;name:string}>(false, "CHECK_CENTER.APPROVE_SUBMITTER_DATRA_ERROR", "check-center.user-list.get", _restApiCfg, _restApi);
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
		this._entLoader = new ItemLoader<{id:string;name:string}>(false, "COMMON.ENTPRISE_OPTIONS_DATA_ERROR", "op-center.order-mng.ent-list.get", _restApiCfg, _restApi);

		//部门列表配置
		this._departmentLoader = new ItemLoader<{id:string;name:string}>(false, "COMMON.DEPARTMENT_OPTIONS_DATA_ERROR", "op-center.order-mng.department-list.get", _restApiCfg, _restApi);

		//产品类型配置
		this._serviceTypeDic = new DicLoader(_restApiCfg, _restApi, "GLOBAL", "SERVICE_TYPE");//²úÆ·ÀàÐÍÁÐ±í', "op-center.order-mng.product-type-list.get", _restApiCfg, _restApi);


		//审批意见
		this._approveInfoLoader = new ItemLoader<ApproveItem>(false, "CHECK_CENTER.APPROVE_USER_DATA_ERROR", "check-center.approve-info.get", _restApiCfg, _restApi);

	// 	this._approverListLoader.MapFunc = (source:Array<any>, target:Array<ApproveItem>)=>{
	// 	for(let item of source)
	// 	{
	// 		let obj = new ApproveItem();
	// 		target.push(obj);

	// 		_.extendOwn(obj, item);

	// 		obj.approver = item.approver;

    //   }
    // };

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
		this._notice.open("COMMON.SYSTEM", msg);
	}

	//搜索
	search(pageNum:number = 1){

		let param = _.extend({}, this._param);
		//匹配后台搜索框参数
		param.approverStatus = 3;//approvalStatus代表已审批
        param.orderCode = this._param.quickSearchStr;//输入订单号快速查询 ？
 		param.enterpriseId = this._param.entIdStr; //企业enterpriseId
		param.organization = this._param.departmentIdNum; //部门organization？
		param.orderType = this._param.orderTypeNum;//订单类型orderType
		param.serviceType = this._param.serviceTypeNum;//产品类型serviceId
		param.createTime = this._param.startDateStr;//创建时间
		param.expireTime = this._param.endDateStr; //结束时间
		param.userId = this._param.submitUserId;		//提交者
		param.approverId = this._param.checkUserIdStr;// 审批人
		
		param.pageParameter = {
			currentPage:pageNum
			,size:10
		};
		if(this.createDatePicker&&this.createDatePicker.invalidDate){
			this.showMsg('开始时间不合法');
			return;
		}else if(this.expireDatePicker&&this.expireDatePicker.invalidDate){
			this.showMsg('结束时间不合法');
			return;
		}

		this._layoutService.show();
		this._listLoader.clear();
		this._listLoader.TotalPages = 1;//清空页码
		this._listLoader.Go(pageNum, null, param)
		.then(success=>{
			this._layoutService.hide();
		})
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
			this._param.checkUserIdStr = null;
			this._layoutService.hide();	
		})
		.catch(err=>{	
			this._param.departmentIdNum = null;
			this._param.submitUserId = null;
			this._param.checkUserIdStr = null;
			this._layoutService.hide();
			this.showMsg(err);
		});
		
	}

	departmentChanged(){
		this._layoutService.show();
		this._userListLoader.Go(null, [{key:"departmentId", value:this._param.departmentIdNum}])
		.then(success=>{
			this._param.submitUserId = null;
			return this._approverListLoader.Go(null, [{key:"departmentId", value:this._param.departmentIdNum }])
		})
		.then(success=>{
			this._param.checkUserIdStr = null;
			this._layoutService.hide();
		})
		.catch(err=>{
			this._param.submitUserId = null;
			this._param.checkUserIdStr = null;
			this._layoutService.hide();

		});
	}

	changePage(pageNum:number)
	{
		this.search(pageNum);
	}

	getApproveReason(orderItem:CheckListItem){
		let itemLoader = new ItemLoader<ApproveItem>(false, "CHECK_CENTER.APPROVE_RESULT_DATA_ERROR", "check-center.approve-info.get", this._restApiCfg, this._restApi);
		orderItem.checkResult = itemLoader.Go(null, [{key:"orderId", value:orderItem.orderId}]);
	}

	resetParam(){
		
		this._departmentLoader.clear();
		this._userListLoader.clear();
		this._approverListLoader.clear();
		this.createDatePicker.removeBtnClicked();
		this.expireDatePicker.removeBtnClicked();	
		this._param.reset();
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