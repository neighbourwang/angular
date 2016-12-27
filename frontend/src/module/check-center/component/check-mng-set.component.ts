	
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
	  private isOpen : boolean ; //开启radia

	  private loadHandler : ItemLoader<CheckCenterSet> ;//加载数据
	  private saveHandler : ItemLoader<CheckCenterSet> ;//加载数据
	
	   private param :CheckCenterSet =new CheckCenterSet() ;//传递参数

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){
			this.loadHandler = new  ItemLoader<CheckCenterSet>(false, "审批设置", "op-center.order-mng.department-list.get", restApiCfg, restApi);
			this.loadHandler.MapFunc=(source:Array<any>,target:Array<CheckCenterSet>)=>{
					for(let item of source){
						let obj = new CheckCenterSet();
						target.push(obj);
						// obj.isOpen= item.isOpen;
						// obj.time = item.time;
					}
			};
	}

	ngOnInit(){
	

	}

  search(){
	 this.layoutService.show();
	 this.loadHandler.Go()
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
	this.isEdit = !this.isEdit;
	// this.layoutService.show();
	// this.saveHandler.Go()
	// .then(succeess=>{
	// 	this.layoutService.hide();
	// 	this.isEdit = !this.isEdit;
	// })
	// .catch(err=>{
	// 		this.layoutService.hide();
	// 		this.showMsg(err);
	// 	});
  }

  selectOpen(){
	  this.isOpen = !this.isOpen;
  }
  selectClose(){
	this.isOpen = !this.isOpen;
  }

  	showMsg(msg:string)
	{
		this._notice.open("系统", msg);
	}
	
}