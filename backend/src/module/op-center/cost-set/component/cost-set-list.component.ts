import { Input, Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent,PopupComponent,DicLoader,ItemLoader, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import {CostSetItem,CostSetInfo} from '../model'

import * as _ from 'underscore';

@Component({
	selector: 'cost-set-list',
	templateUrl: '../template/cost-set-list.component.html',
	styleUrls: ['../style/cost-set-list.less'],
	providers: []
})
export class CostSetListComponent implements OnInit{

@ViewChild("notice")
  	private _notice: NoticeComponent;

 @ViewChild("defaultSetDailog")
  defaultSetDailog: PopupComponent;

 @ViewChild("entSetDailog")
  entSetDailog: PopupComponent;
  

private costItemLoader:ItemLoader<CostSetItem> = null;
private param : CostSetInfo= new CostSetInfo();
	
	
	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){
       		this.costItemLoader = new ItemLoader<CostSetItem>(false, '费用设置列表加载失败', "op-center.order-set.cost-set-list.post", this.restApiCfg, this.restApi);
		// this.costItemLoader.MapFunc=(source:Array<any>,target:Array<CostManageItem>)=>{
		// 	for(let item of source){
		// 		let obj=_.extend({},item);
		// 		target.push(obj);
		// 	}
			
		// }
		this.costItemLoader.FakeDataFunc = (target:Array<CostSetItem>)=>{
			let obj = new CostSetItem();
			obj.name = '上海慧于';
			obj.payway = '现金';
			obj.cicleTime = '1个月';
			obj.endDate = '2017-2-23';
			obj.sentDate = '2017-2-22';
		}

}
	ngOnInit(){
        this.layoutService.show();
        
        this.search(1);
		this.layoutService.hide();
	}

	search(page:number){
		const pageSize= 10;
		let param = {
			"currentPage": page,
			"pageSize": pageSize,
			"totalPage": 0,
			"totalRecords": 0
		}
		this.layoutService.show();
		this.costItemLoader.Go(null,null,param)
		.then(succeuss=>{
			this.layoutService.hide();
		})
		.catch(err=>{
			this.layoutService.hide();
		})
	}

//企业默认设置按钮
entSet(){
	// $('#costSetDefault').modal('show');
	this.entSetDailog.open();
}

//默认默认设置按钮
defaultSet(){
	// $('#costSetEnt').modal('show');
	this.defaultSetDailog.open();
}

acceptDefaultSet(){

}

cancelDefaultSet(){

}

acceptEntSet(){

}

cancelEntSet(){

}

showMsg(msg: string)
	{
		this._notice.open("COMMON.SYSTEM_PROMPT", msg);
	}

	
}