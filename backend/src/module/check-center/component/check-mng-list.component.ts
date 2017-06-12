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
	
import { TranslateService } from 'ng2-translate';

import { CheckCenterParam
	, CheckListItem } from './../model';
import * as _ from 'underscore';
import {DictService} from '../../../architecture/core/service/dict-service';
import { MyDatePicker  } from '../../../architecture/components/date-picker/my-date-picker.component';

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
	private reasonTransaltion: string = null; //拒绝原因的字符串翻译


	@ViewChild("notice") private _notice:NoticeComponent;

	@ViewChild("refuseDialog")
		refuseDialog: PopupComponent;
	@ViewChild("confirmAcceptDialog")
	private _confirmAccept:ConfirmComponent;

	@ViewChild("createDatePicker")
  	private createDatePicker: MyDatePicker;

	@ViewChild("expireDatePicker")
  	private expireDatePicker: MyDatePicker;
	constructor(
		private _restApiCfg:RestApiCfg
		,private _restApi:RestApi
		, private translate: TranslateService
		,private _layoutService:LayoutService
		, private _dictServ: DictService){

		//多语言处理双向绑定的内容
		translate.onLangChange.subscribe(() => {
			translate.get('COMMON.AGREE').subscribe((res: string) => {
				this.reasonTransaltion = res
			});
		});
		translate.get('COMMON.AGREE').subscribe((res: string) => {
			this.reasonTransaltion = res
		});

		//计费模式字典
		this._billinModeDic = new DicLoader(_restApiCfg, _restApi, "BILLING_MODE", "TYPE");

		//拒绝
		this._refuseHandler = new ItemLoader<any>(false, 'COMMON.REFUSE_FAILED', "check-center.approve-refust.post", _restApiCfg,_restApi);

		//列表数据加载
		this._listLoader = new ItemLoader<CheckListItem>(true, "CHECK_CENTER.NOT_APPROVED_LIST_DATA_ERROR", "check-center.not-checked.list", _restApiCfg, _restApi);
		this._listLoader.MapFunc = (source:Array<any>, target:Array<CheckListItem>)=>{

			for(let item of source)
			{
				let obj = new CheckListItem();
				target.push(obj);

				obj.orderId = item.orderId;//订单id				
				obj.orderCodeStr = item.orderNo;//订单编号
				obj.serviceTypeIdStr = item.serviceType;//产品类型
				// obj.platformStr = item.platformName;
				// obj.zoneStr = item.zoneName;
				obj.orderTypeName = item.orderType;//订单类型
				obj.userStr = item.submiter;// 用户,提交者
				obj.departmentStr = item.departmentName;// 部门
				obj.entStr = item.enterpriseName;// 企业
				obj.basePrice = item.basePrice;// 物理机的一次性费用
				obj.basicPrice = item.basicPrice;// 物理机的费用

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

		if(this.createDatePicker&&this.createDatePicker.invalidDate){
			this.showMsg('开始时间不合法');
			return;
		}else if(this.expireDatePicker&&this.expireDatePicker.invalidDate){
			this.showMsg('结束时间不合法');
			return;
		}

		this._layoutService.show();
		this._listLoader.clear();//清空列表
		this._listLoader.TotalPages = 1;//清空页码
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
		if(item.relyOrderNo)
			this.showMsg('CHECK_CENTER.APPROVE_THE_ORDER_FIRST^^^'+item.relyOrderNo);
		else
			this.refuseDialog.open();
	}

	//确认拒绝
	confirmRefuse(){
		if(!(this.refuseReason && this.refuseReason.length <= 200))
		{
			this.showMsg('CHECK_CENTER.YOU_MUST_FILL_IN_THE_REASONS');
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
		this.refuseReason = this.reasonTransaltion;
		this._selectedItem = null;
		
	}

	//同意
	accept(item:CheckListItem)
	{
		this._selectedItem = item;
        if (item.relyOrderNo)
           this.showMsg('CHECK_CENTER.APPROVE_THE_ORDER_FIRST^^^' + item.relyOrderNo);
        else            
           this._confirmAccept.open('CHECK_CENTER.APPROVAL', 'CHECK_CENTER.ARE_YOU_SURE_YOU_WANT_TO_APPROVE');

			
	}

	confirmAccept(){
		this.refuseReason= this.reasonTransaltion;
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
		
		this._departmentLoader.clear();		
		this._userListLoader.clear();
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
