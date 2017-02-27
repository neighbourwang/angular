import { Input, Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent,PopupComponent,DicLoader,ItemLoader, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import {CostPandectParam,Time,CostManageItem,CostManageImprove} from '../model'

import * as _ from 'underscore';

@Component({
	selector: 'cost-manage',
	templateUrl: '../template/cost-manage.component.html',
	styleUrls: ['../style/cost-manage.less'],
	providers: []
})
export class CostManageComponent implements OnInit{

@ViewChild("notice")
  	private _notice: NoticeComponent;

 @ViewChild("costUpdate")
  costUpdate: PopupComponent;

//参数
_param:CostPandectParam = new CostPandectParam();
_saveParam : CostManageImprove = new CostManageImprove();

//日期下拉列表
private _years:Array<Time>=[];
currentYear :number;
//企业下拉列表
private _enterpriseLoader:ItemLoader<{id:string; name:string}> = null;

//列表
private costItemLoader:ItemLoader<CostManageItem> = null;

private showLoader:ItemLoader<CostManageImprove> = null;
private saveLoader:ItemLoader<CostManageImprove> = null;

//状态
private _statusTypeDic:DicLoader = null;

	
	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){

		this._enterpriseLoader = new ItemLoader<{id:string; name:string}>(false, '企业列表加载错误', "op-center.order-mng.ent-list.get", this.restApiCfg, this.restApi);

        this._statusTypeDic = new DicLoader(restApiCfg, restApi, "ORDER", "TYPE");


		this.costItemLoader = new ItemLoader<CostManageItem>(false,'账单管理列表加载失败','',restApiCfg,restApi);
		// this.costItemLoader.MapFunc =(source:Array<any>,target:Array<CostManageItem>)=>{

		// }

		

}
	ngOnInit(){
        this.layoutService.show();
		this.getCurrentTime();
  		this.getTimeData();//时间下拉列表
		this._enterpriseLoader.Go(null, [{key:"userId", value:"37d3dfca-064c-4077-879c-75ecf9c6725c"}]) 
        .then(success=>{
           return this._statusTypeDic.Go();
        })
        .catch(err=>{
			this.layoutService.hide();
			this.showMsg(err);
		});
		this.layoutService.hide();
	}
getCurrentTime(){
    let date = new Date();
    this.currentYear = date.getFullYear();
}

getTimeData(){
    
    for(let i = 1999; i<=this.currentYear ; i++){
        let _year = new Time(i.toString(),i.toString());
        this._years.push(_year);  
    }

    
}
search(page:number){
	let param;
	param = _.extend({},this._param);
	this.layoutService.show();
	this.costItemLoader.Go(null,null,param)
	.then(success=>{
		
		this.layoutService.hide();
	})
	.catch(err=>{
		this.layoutService.hide();
		this.showMsg(err);
	})
}

//显示金额管理
updateCost(){
		// this.layoutService.show();
        // $('#costUpdate').modal('show');
	// 	this.showLoader.Go(null,[],null)
	// 	.then(success=>{
	// 		this.costUpdate.open();
	// 	})
	// 	.catch(err=>{
	// 		this.showMsg(err);
	// })
		this.costUpdate.open();
}

acceptCostUpdate()
{
	let param;
	param = _.extend({},this._saveParam);
	this.layoutService.show();
	this.saveLoader.Go(null,null,param)
	.then(success=>{
		this.search(null);
		this.layoutService.hide();
	})
	.catch(err=>{
		this.layoutService.hide();
		this.showMsg(err);
	})
}
cancelCostUpdate(){
	
}

showMsg(msg: string)
	{
		this._notice.open("COMMON.SYSTEM_PROMPT", msg);
	}

	
}