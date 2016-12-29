	
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
import {CheckCenterSet} from '../model';
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

	  @ViewChild("notice") private _notice:NoticeComponent;

	  private isEdit : boolean = true;//编辑状态

	  private loadHandler : ItemLoader<CheckCenterSet> ;//加载数据
	  private saveHandler : ItemLoader<CheckCenterSet> ;//加载数据
	
	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){
			this.loadHandler = new  ItemLoader<CheckCenterSet>(false, "CHECK_CENTER.APPROVAL_SETTINGS", "check-center.approve-set.get", restApiCfg, restApi);
			this.loadHandler.MapFunc=(source:Array<any>,target:Array<CheckCenterSet>)=>{
					for(let item of source){
						let obj = new CheckCenterSet();
						target.push(obj);
						if(item.frontAuditEnable== 1){
							obj.auditEnable = true;//开启
						}else{
							obj.auditEnable = false;//关闭
						}
						// obj.isOpen= item.isOpen;
						 obj.time = item.frontAutoApprovalTime;
					}
			};

			this.loadHandler.FirstItem = new CheckCenterSet();

			this.saveHandler = new  ItemLoader<CheckCenterSet>(false, "CHECK_CENTER.APPROVAL_SETTINGS", "check-center.approve-set.put", restApiCfg, restApi);
		}
	ngOnInit(){
		this.search();
	}

  search(){
	 this.layoutService.show();
	 this.loadHandler.Go(null, [{key:"_enterpriseId", value:this.restApi.getLoginInfo().userInfo.enterpriseId}])
	.then(succeess=>{
		this.layoutService.hide();
	})
	.catch(err=>{
			this.layoutService.hide();
			this.showMsg(err);
		});
  }

  edit(){
	  this.isEdit = !this.isEdit;
  }

  //保存
  save(){
// 	  {
//   "backAuditEnable": "string",
//   "backendTime": 0,
//   "enterpriseId": "string",
//   "frontAuditEnable": "string",
//   "frontTime": 0
// }

	this.layoutService.show();
	let _param = _.extend({}, this.loadHandler.FirstItem);

	 _param.frontTime = _param.time;
	 _param.frontAuditEnable = _param.auditEnable ? 1:0;
	 _param.enterpriseId  = this.restApi.getLoginInfo().userInfo.enterpriseId;
	 _param.backAuditEnable = null;
	 _param.backendTime = null;
	

	this.saveHandler.Go(null, null, _param)
	.then(succeess=>{
		this.search();
	})
	.then(succeess=>{
		this.isEdit = !this.isEdit;
		this.layoutService.hide();	
	})
	.catch(err=>{
			this.layoutService.hide();
			this.showMsg(err);
		});
  }

  	showMsg(msg:string)
	{
		this._notice.open("CHECK_CENTER.SYSTEM", msg);
	}
	
}