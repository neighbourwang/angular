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

@Component({
	selector: 'check-mng-list',
	templateUrl: '../template/check-mng-list.component.html',
	styleUrls: ['../style/check-mng-list.less'],
	providers: []	
})
export class CheckMngListComponent implements OnInit{
	private _entLoader:ItemLoader<{id:string; name:string}> = null; //企业列表
	private _departmentLoader:ItemLoader<{id:string;name:string}> = null; //部门列表
	private _serviceTypeDic:DicLoader = null; //产品类型列表
	private _isAdvSearch:boolean = false;//高级查询

	@ViewChild("notice") private _notice:NoticeComponent;

	constructor(
		private _restApiCfg:RestApiCfg
		,private _restApi:RestApi
		,private _layoutService:LayoutService){

		//企业列表配置
		this._entLoader = new ItemLoader<{id:string;name:string}>(false, "企业列表", "op-center.order-mng.ent-list.get", _restApiCfg, _restApi);

		//部门列表配置
		this._departmentLoader = new ItemLoader<{id:string;name:string}>(false, "部门列表", "op-center.order-mng.department-list.get", _restApiCfg, _restApi);

		//产品类型
		this._serviceTypeDic = new DicLoader(_restApiCfg, _restApi, "GLOBAL", "SERVICE_TYPE");//产品类型列表', "op-center.order-mng.product-type-list.get", _restApiCfg, _restApi);

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
		.catch(err=>{
			this._layoutService.hide();
			this.showMsg(err);
		});
	}

	showMsg(msg:string)
	{
		this._notice.open("系统", msg);
	}

	//查询
	search(){

	}

	//企业选择发生变化
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

}