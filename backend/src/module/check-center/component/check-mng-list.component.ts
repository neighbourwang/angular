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
	private _entLoader:ItemLoader<{id:string; name:string}> = null; //��ҵ�б�
	private _departmentLoader:ItemLoader<{id:string;name:string}> = null; //�����б�
	private _serviceTypeDic:DicLoader = null; //��Ʒ�����б�
	private _isAdvSearch:boolean = false;//�߼���ѯ

	@ViewChild("notice") private _notice:NoticeComponent;

	constructor(
		private _restApiCfg:RestApiCfg
		,private _restApi:RestApi
		,private _layoutService:LayoutService){

		//��ҵ�б�����
		this._entLoader = new ItemLoader<{id:string;name:string}>(false, "��ҵ�б�", "op-center.order-mng.ent-list.get", _restApiCfg, _restApi);

		//�����б�����
		this._departmentLoader = new ItemLoader<{id:string;name:string}>(false, "�����б�", "op-center.order-mng.department-list.get", _restApiCfg, _restApi);

		//��Ʒ����
		this._serviceTypeDic = new DicLoader(_restApiCfg, _restApi, "GLOBAL", "SERVICE_TYPE");//��Ʒ�����б�', "op-center.order-mng.product-type-list.get", _restApiCfg, _restApi);

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
		this._notice.open("ϵͳ", msg);
	}

	//��ѯ
	search(){

	}

	//��ҵѡ�����仯
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