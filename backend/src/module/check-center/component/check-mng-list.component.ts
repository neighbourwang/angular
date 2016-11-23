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

import { CheckCenterParam } from './../model';

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
	private _userListLoader:ItemLoader<{id:string;name:string}> = null;//用户列表

	@ViewChild("notice") private _notice:NoticeComponent;
	@ViewChild("refuseDialog")
		refuseDialog: PopupComponent;
	constructor(
		private _restApiCfg:RestApiCfg
		,private _restApi:RestApi
		,private _layoutService:LayoutService){

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
			this._layoutService.hide();
		})
		.then(success=>{
			return this._orderTypeDic.Go();
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
	search(){

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

	refuse(){
		this.refuseDialog.open();
	}

	departmentChanged(){
		this._layoutService.show();
		this._userListLoader.Go(null, [{key:"departmentId", value:this._param.departmentIdNum}])
		.then(success=>{
			this._layoutService.hide();
		})
		.catch(err=>{
			this._layoutService.hide();
		});
	}
}