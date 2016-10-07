import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../../../architecture';
import { EntEstBasicInfo } from '../model/ent-est-basic-info'
import { EntEstCreService } from '../service/ent-est-cre.service'
import { CurrencyType } from "../model/currency";

@Component({
	selector:'ent-est-cre-step-01'
	,templateUrl:'../template/ent-est-cre-step-01.component.html'
	,styleUrls:[]
	,providers:[EntEstCreService]
})
export class EntEstCreStep01Component implements OnInit{
	private entEstBasicInfo:EntEstBasicInfo = new EntEstBasicInfo();
	private currencyTypes : CurrencyType[] = [];
	constructor(
		private router: Router,
		private service: EntEstCreService
		){

	}
	ngOnInit(){
		this.service.loadCurrencyTypes(this.currencyTypes, this.showNotice);
		this.entEstBasicInfo.currencyType = "1";
		this.service.loadEntEstBasicInfo(this.entEstBasicInfo);
	}

	next(){
      	this.router.navigateByUrl("ent-mng/ent-est-mng/ent-est-cre-step-02");
	}

	cancel(){
		this.router.navigateByUrl('ent-mng/ent-est-mng/ent-est-mng');
	}

	showNotice(title, desc){

	}
}