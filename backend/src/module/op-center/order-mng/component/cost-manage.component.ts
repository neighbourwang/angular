import { Input, Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent,PopupComponent,DicLoader,ItemLoader, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import {} from '../model'

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
//订单类型
private _orderTypeDic:DicLoader = null;
//订购人
private _buyerLoader:ItemLoader<{id:string; name:string}> = null;

	
	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){
        //订购人加载
		this._buyerLoader = new ItemLoader<{id:string; name:string}>(false, 'ORDER_MNG.SUBSCRIBER_LIST_DATA_FAILED', "check-center.submiter-list.get", this.restApiCfg, this.restApi);

        this._buyerLoader.MapFunc = (source:Array<any>, target:Array<{id:string;name:string}>)=>{
			for(let item of source)
			{
				let obj=_.extend({}, item) ;
				target.push(obj);
				obj.id = item.key;
				obj.name = item.value;
			}
		}

        this._orderTypeDic = new DicLoader(restApiCfg, restApi, "ORDER", "TYPE");

}
	ngOnInit(){
        //this.layoutService.show();
        
        // this._buyerLoader.Go(null, [{key:"departmentId", value:null}])
        // .then(success=>{
        //    this._orderTypeDic.Go();
        // })
        // .catch(err=>{
		// 	this.layoutService.hide();
		// 	this.showMsg(err);
		// });
		//this.layoutService.hide();
	}

//显示金额管理
updateCost(){
		// this.layoutService.show();
        // $('#costUpdate').modal('show');
		this.costUpdate.open();
}

acceptCostUpdate()
{

}
cancelCostUpdate(){
	
}

showMsg(msg: string)
	{
		this._notice.open("COMMON.SYSTEM_PROMPT", msg);
	}

	
}