
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
import {CheckSetListItem} from '../model'
import * as _ from 'underscore';

@Component({
	selector: 'order-mng-cancel',
	templateUrl: '../template/check-mng-set.component.html',
	styleUrls: ['../style/check-mng-set.less'],
	providers: []}
	)
export class CheckMngSetComponent implements OnInit{

	@ViewChild("setPoup")
	setPoup: PopupComponent;

	@ViewChild("notice")
	private notice:NoticeComponent;

	private _itemLoader:ItemLoader<CheckSetListItem> = null;
	private _setHandler:ItemLoader<any> = null;
	private _selectedItem: CheckSetListItem = new CheckSetListItem();

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){
		//加载审设置列表
		this._itemLoader = new ItemLoader<CheckSetListItem>(true, "CHECK_CENTER.APPROVE_SET_LIST", "check-center.approval-set-list.get", restApiCfg, restApi);

		//审批设置
		this._setHandler = new ItemLoader<any>(false, "CHECK_CENTER.APPROVE_SET_ERROR", "check-center.approval.auto-set", restApiCfg, restApi);
 	
	}
	ngOnInit(){
		this.loadList();
	}

	showMsg(msg:string)
	{
		this.notice.open(null, msg)
	}

	loadList(){
		this.layoutService.show();
		this._itemLoader.Go(1, [{key:"_page", value:1}, {key:"_size", value:9999}])
		.then(success=>{
			this.layoutService.hide();
		}).catch(err=>{
			this.layoutService.hide();
			this.showMsg('CHECK_CENTER.APPROVE_SET_LIST_LOAD_ERROR');
		});
	}

	 //编辑
	set(item:CheckSetListItem){
		this._selectedItem =_.extend({}, item);

		console.log('set ', this._selectedItem);

		this.setPoup.open();
		console.log('ent-est-mng/edit');
	}
	
	//设置审批数据
	acceptEntModify(){
		if(!this._selectedItem.backAutoApprovalTime || this._selectedItem.backAutoApprovalTime < 0)
		{
			this.showMsg('CHECK_CENTER.APPROVE_SET_NEED_APPROVE_TIME')
			return;
		}

		if(this._selectedItem.backAuditEnable == null)
		{
			this.showMsg('CHECK_CENTER.APPROVE_SET_NEED_APPROVE_ENABLE')
			return;
		}

		this.layoutService.show();
		this._setHandler.Go(null, [], {backAuditEnable:this._selectedItem.backAuditEnable ? 1 : 0
			,backendTime:this._selectedItem.backAutoApprovalTime
			,enterpriseId: this._selectedItem.id
			,frontAuditEnable:null
			,frontTime:null
		})
		.then(success=>{
			this.layoutService.hide();
			this.setPoup.close();
			this.loadList();
		})
		.catch(err=>{
			this.layoutService.hide();
			this.showMsg('CHECK_CENTER.APPROVE_SET_ERROR');
		})
	}

	//取消审批
	cancelEntModify(){
		this.setPoup.close();
	}
}