import { Input, Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent,DicLoader,ItemLoader, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import {CostSetItem,CostSetInfo} from '../model'

import * as _ from 'underscore';

@Component({
	selector: 'cost-set-default',
	templateUrl: '../template/cost-set-default.component.html',
	styleUrls: ['../style/cost-set-default.less'],
	providers: []
})
export class CostSetDefaultComponent implements OnInit{

@ViewChild("notice")
  	private _notice: NoticeComponent;

@Input()
private costItem: CostSetInfo = new CostSetInfo();

private entSaveLoader:ItemLoader<CostSetInfo> = null;
private defaultSaveLoader:ItemLoader<CostSetInfo> = null;

private param : CostSetInfo= new CostSetInfo();

	
	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){
        //企业设置保存
		this.entSaveLoader = new ItemLoader<CostSetInfo>(false, '企业费用设置保存失败', "op-center.order-set.ent-set-save.post", this.restApiCfg, this.restApi);

        this.entSaveLoader.MapFunc = (source:Array<any>, target:Array<CostSetInfo>)=>{
			for(let item of source)
			{
				let obj=_.extend({}, item) ;
				target.push(obj);
		
			}
		}
		 //默认设置保存
		this.defaultSaveLoader = new ItemLoader<CostSetInfo>(false, '默认费用设置保存失败', "op-center.order-set.default-set-save.post", this.restApiCfg, this.restApi);

        this.defaultSaveLoader.MapFunc = (source:Array<any>, target:Array<CostSetInfo>)=>{
			for(let item of source)
			{
				let obj=_.extend({}, item) ;
				target.push(obj);
		
			}
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



showMsg(msg: string)
	{
		this._notice.open("COMMON.SYSTEM_PROMPT", msg);
	}

	
}