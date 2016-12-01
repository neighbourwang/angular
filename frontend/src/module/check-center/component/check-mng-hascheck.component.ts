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

import { CheckCenterParam,CheckListItem } from './../model';
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
	private _serviceTypeDic:DicLoader = null; //产品类型
	private _isAdvSearch:boolean = false;//高级查询
	private _orderTypeDic : DicLoader =null;//订单类型

	private _entId:string = "191af465-b5dc-4992-a5c9-459e339dc719";

	private _listLoader:ItemLoader<CheckListItem> = null;//列表数据加载
	constructor(
		private _restApiCfg:RestApiCfg
		,private _restApi:RestApi
		,private _layoutService:LayoutService){


		//列表数据加载
		this._listLoader = new ItemLoader<CheckListItem>(true, "待审批列表", "check-center.not-checked.list", _restApiCfg, _restApi);
		this._listLoader.MapFunc = (source:Array<any>, target:Array<CheckListItem>)=>{

			for(let item of source)
			{
				let obj = new CheckListItem();
				target.push(obj);
				
				obj.orderCodeStr = item.orderNo;//订单编号
				obj.serviceTypeIdStr = item.serviceType;//产品类型
				// obj.platformStr = ?? 区域
				// obj.zoneStr = ?? 可用区
				obj.orderTypeName = item.orderType;//订单类型
				obj.userStr = item.submiter;// 用户,提交者
				obj.departmentStr = item.departmentName;// 部门
				obj.entStr = item.enterpriszeName;// 企业
				//费用
				obj.billingModeName =item.billingInfo ? item.billingInfo.billingMode:""; //计费模式
				obj.billingDurationStr = item.period;//订单周期
				obj.oneTimePriceNum = item.billingInfo ? item.billingInfo.basePrice: "";//一次性费用
				// obj.priceNum = ??费用

				obj.createTimeStr = item.createDate;// 创建时间
				// obj.checkResultId = ?? 审批结果	
				obj.description = item.orderDesc; //描述		
				
				obj.specList = item.specList; //获取产品信息

			}
		};
	
		//部门列表配置
		this._departmentLoader = new ItemLoader<{id:string;name:string}>(false, "部门列表", "op-center.order-mng.department-list.get", _restApiCfg, _restApi);

		//产品类型配置
		this._serviceTypeDic = new DicLoader(_restApiCfg, _restApi, "GLOBAL", "SERVICE_TYPE");//²úÆ·ÀàÐÍÁÐ±í', "op-center.order-mng.product-type-list.get", _restApiCfg, _restApi);

        //订单类型
		this._orderTypeDic = new DicLoader(_restApiCfg, _restApi, "ORDER", "SERVICE_TYPE");


	}
	ngOnInit(){
		this._layoutService.show();
		this._serviceTypeDic.Go()
		.then(success=>{
			return this._departmentLoader.Go(null, [{key:"enterpriseId", value:this._entId}])
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
		this._notice.open("ÏµÍ³", msg);
	}

	//搜索
	search(pageNum:number = 1){

		let param = _.extend({}, this._param);

		
        //匹配后台搜索框参数/authsec/backend/approval/orders/search/paging 
		param.approvalStatus = 1;//approvalStatus代表已审批
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

	onStartDateChange(date:string)
	{
		this._param.startDateStr = date;
	}

	onEndDateChange(date:string)
	{
		this._param.endDateStr = date;
	}

}