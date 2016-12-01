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
	templateUrl: '../template/check-mng-hascheck.component.html',
	styleUrls: ['../style/check-mng-list.less'],
	providers: []	
})
export class CheckMngHascheckComponent implements OnInit{
	@ViewChild("notice") private _notice:NoticeComponent;
	
	private _param:CheckCenterParam = new CheckCenterParam();
	private _entLoader:ItemLoader<{id:string; name:string}> = null; //企业列表
	private _departmentLoader:ItemLoader<{id:string;name:string}> = null; //部门列表
	private _serviceTypeDic:DicLoader = null; //产品类型
	private _orderTypeDic:DicLoader = null; //订单类型
	private _isAdvSearch:boolean = false;//高级查询
	private _userListLoader:ItemLoader<{id:string;name:string}> = null;//用户列表
	private _approverListLoader:ItemLoader<{id:string;name:string}> = null;//审批人列表
	private _listLoader:ItemLoader<CheckListItem> = null;//列表数据加载

	constructor(
		private _restApiCfg:RestApiCfg
		,private _restApi:RestApi
		,private _layoutService:LayoutService){

		//列表数据加载
		this._listLoader = new ItemLoader<CheckListItem>(true, "已审批列表", "check-center.not-checked.list", _restApiCfg, _restApi);
		this._listLoader.MapFunc = (source:Array<any>, target:Array<CheckListItem>)=>{
			let obj = new CheckListItem();
			target.push(obj);

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

		this._listLoader.Trait = (target:Array<CheckListItem>)=>{
			//处理字典
			this._serviceTypeDic.UpdateWithDic(target, "serviceTypeName", "serviceTypeIdStr");
			this._orderTypeDic.UpdateWithDic(target, "orderTypeNum", "orderTypeName");
		};

		//审批人列表
		this._approverListLoader = new ItemLoader<{id:string;name:string}>(false, "审批人列表", "check-center.approver-list.get", _restApiCfg, _restApi);
		this._approverListLoader.MapFunc = (source:Array<any>,target:Array<{id:string;name:string}>)=>{
			target = target.concat(source.map(n=>{
				return {id:n.key, name:n.value};
			}));
		};

		//用户列表
		this._userListLoader = new ItemLoader<{id:string;name:string}>(false, "用户列表", "check-center.user-list.get", _restApiCfg, _restApi);
		this._userListLoader.MapFunc = (source:Array<any>,target:Array<{id:string;name:string}>)=>{
			target = target.concat(source.map(n=>{
				return {id:n.key, name:n.value};
			}));
		};
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

		//匹配后台搜索框参数
		param.approvalStatus = 1;//approvalStatus代表已审批
        param.quickSearchStr = this._param.quickSearchStr;//输入订单号快速查询 ？
 		param.enterpriseId = this._param.entIdStr; //企业enterpriseId
		param.organization = this._param.departmentIdNum; //部门organization？
		param.orderType = this._param.orderTypeNum;//订单类型orderType
		param.serviceId = this._param.serviceTypeNum;//产品类型serviceId
		param.createTime = this._param.startDateStr;//创建时间
		param.expireTime = this._param.endDateStr; //结束时间
		param.serviceId = this._param.submitUserId;		//提交者？
			
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

	departmentChanged(){
		this._layoutService.show();
		this._userListLoader.Go(null, [{key:"departmentId", value:this._param.departmentIdNum}])
		.then(success=>{
			return this._approverListLoader.Go(null, [{key:"departmentId", value:this._param.departmentIdNum }])
		})
		.then(success=>{
			this._layoutService.hide();
		})
		.catch(err=>{
			this._layoutService.hide();
		});
	}

	contentIdGen(num:number):string
	{
		return `content-${num}`;
	}

	changePage(pageNum:number)
	{
		this.search(pageNum);
	}

	approveIdGen(num:number)
	{
		return `approve-${num}`;		
	}

}