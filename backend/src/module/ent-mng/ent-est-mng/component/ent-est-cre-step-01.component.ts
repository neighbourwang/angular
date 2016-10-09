import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService, NoticeComponent } from '../../../../architecture';
import { EntEstBasicInfo } from '../model/ent-est-basic-info'
import { EntEstCreService } from '../service/ent-est-cre.service'
import { CurrencyType } from "../model/currency";

@Component({
	selector:'ent-est-cre-step-01'
	,templateUrl:'../template/ent-est-cre-step-01.component.html'
	,styleUrls:[]
	,providers:[
		EntEstCreService
		]
})
export class EntEstCreStep01Component implements OnInit{
	@ViewChild('notice')
    notice: NoticeComponent;

	private entEstBasicInfo:EntEstBasicInfo;
	private currencyTypes : CurrencyType[] = [];
	constructor(
		private router: Router,
		private service: EntEstCreService
		){

	}
	ngOnInit(){
		this.entEstBasicInfo = this.service.getEntEst().BasicInfo;
		this.service.loadCurrencyTypes(this.currencyTypes, null);
	}

	next(){
		if(!this.validate())
			return;

      	this.router.navigateByUrl("ent-mng/ent-est-mng/ent-est-cre-step-02");
	}

	showMsg(msg: string)
	{
		this.notice.open("系统提示", msg);
	}

	validate():boolean{
		
		let notValid = [
		{
			"name":"名称"
			,'value':this.entEstBasicInfo.name
			,"op":"*"
		}].find(n=>this.service.validate(n.name, n.value, n.op) !== undefined)

		if(notValid !== void 0)
		{
			this.showMsg(this.service.validate(notValid.name, notValid.value, notValid.op));
			return false;
		}

		return true;
	}

	cancel(){
		this.router.navigateByUrl('ent-mng/ent-est-mng/ent-est-mng');
	}
}