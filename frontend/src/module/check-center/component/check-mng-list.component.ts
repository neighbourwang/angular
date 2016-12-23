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
		,private _layoutService:LayoutService){

		//拒绝
		this._refuseHandler = new ItemLoader<any>(false, '拒绝', "check-center.approve-refust.post", _restApiCfg,_restApi);

		//列表数据加载
		this._listLoader = new ItemLoader<CheckListItem>(true, "待审批列表", "check-center.get-list.post", _restApiCfg, _restApi);
		this._listLoader.MapFunc = (source:Array<any>, target:Array<CheckListItem>)=>{

			for(let item of source)
			{
				let obj = new CheckListItem();
				target.push(obj);

				obj.orderId = item.orderId;
				obj.orderCodeStr = item.orderNo;//订单编号
				obj.serviceTypeIdStr = item.serviceType;//产品类型
				// obj.platformStr = ?? 区域
				// obj.zoneStr = ?? 可用区
				obj.orderTypeName = item.orderType;//订单类型
				obj.userStr = item.submiter;// 用户,提交者
				obj.departmentStr = item.departmentName;// 部门
				obj.entStr = item.enterpriszeName;// 企业
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
		this._departmentLoader = new ItemLoader<{id:string;name:string}>(false, "部门列表", "op-center.order-mng.department-list.get", _restApiCfg, _restApi);
		
		//提交者列表配置
		this._submiterLoader = new ItemLoader<{id:string;name:string}>(false, "提交者列表", "check-center.submiter-list.get", _restApiCfg, _restApi);
		
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

		let param = _.extend({}, this._param);

		
        //匹配后台搜索框参数/authsec/backend/approval/orders/search/paging 
		param.approvalStatus = 0;//approvalStatus代表未审批
        param.quickSearchStr = this._param.quickSearchStr;//输入订单号快速查询 ？
 	
		param.organization = this._param.departmentIdNum; //部门organization？
		param.orderType = this._param.orderTypeNum;//订单类型orderType
		param.serviceId = this._param.serviceTypeNum;//产品类型serviceId
		param.createTime = this._param.startDateStr;//创建时间
		param.expireTime = this._param.endDateStr; //结束时间
		 param.serviceId = this._param.submitUserId;//提交者？

		
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
		})
		.catch(err=>{
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
			,{key:"operation", value:status}
			], {reason:this.refuseReason})
		.then(success=>{
			this.clearApproveData();
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
		this.approveOrder(1, this._selectedItem.orderId);
	}

	cancelAccept(){
		this.clearApproveData();
	}

	onStartDateChange(date:string){
		this._param.startDateStr = date;
	}

	onEndDateChange(date:string){
		this._param.endDateStr = date;
	}

	changePage(pageNum:number){
		this.search(pageNum);
	}

	resetParam(){
		this._param.reset();
		this._submiterLoader.clear();
	}

}