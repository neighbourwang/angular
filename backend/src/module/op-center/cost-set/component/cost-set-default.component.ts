import { Input, Component, OnInit, ViewChild,EventEmitter, Output,OnChanges} from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent,DicLoader,ItemLoader, RestApi, RestApiCfg, LayoutService, ConfirmComponent, PopupComponent } from '../../../../architecture';
import {CostSetItem,CostSetInfo} from '../model'

import * as _ from 'underscore';

@Component({
	selector: 'cost-set-default',
	templateUrl: '../template/cost-set-default.component.html',
	styleUrls: ['../style/cost-set-default.less'],
	providers: []
})
export class CostSetDefaultComponent implements OnInit,OnChanges{

@ViewChild("notice")
  	private _notice: NoticeComponent;
 @ViewChild("popup") popup: PopupComponent;

 @Output() complete=new EventEmitter();

@Input()
private costItem: CostSetInfo = new CostSetInfo();

private currencyList=[];	
	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){
}
	ngOnInit(){
        this.layoutService.show();
		this.loadCurrency();
		
        
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

	ngOnChanges(changes) {
		// if(this.costItem){
		// 	if(this.costItem.currency=='RMB'){
		// 		this.costItem.currency = '1';	
		//  }else
		// 		this.costItem.currency ='2';
		// }
	}

	open(titleName:string) {
		this.popup.open(titleName);
	} 

	acceptDefaultSet(){
	
		this.complete.emit(this.costItem);
	}

	cancelDefaultSet(){

	}


showMsg(msg: string)
	{
		this._notice.open("COMMON.SYSTEM_PROMPT", msg);
	}

loadCurrency(){
	this.currencyList.push({id:'RMB',name:'人民币'});
	this.currencyList.push({id:'MY',name:'美元'});
}	
close() {
	this.popup.close();
}

}