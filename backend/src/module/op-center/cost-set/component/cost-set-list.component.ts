import { Input, Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent,DicLoader,ItemLoader, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import {CostSetItem} from '../model'

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

private costItemLoader:ItemLoader<CostSetItem> = null;
	
	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){
       		this.costItemLoader = new ItemLoader<CostSetItem>(false, '费用管理列表加载失败', "", this.restApiCfg, this.restApi);
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
        
        // this._buyerLoader.Go(null, [{key:"departmentId", value:null}])
        // .then(success=>{
        //    this._orderTypeDic.Go();
        // })
        // .catch(err=>{
		// 	this.layoutService.hide();
		// 	this.showMsg(err);
		// });
		this.layoutService.hide();
	}

//企业默认设置按钮
entSet(){
	$('#costSetDefault').modal('show');
}

//默认默认设置按钮
defaultSet(){
	$('#costSetEnt').modal('show');
}

showMsg(msg: string)
	{
		this._notice.open("COMMON.SYSTEM_PROMPT", msg);
	}

	
}