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
	private entEstBasicInfo:EntEstBasicInfo;
	private currencyTypes : CurrencyType[] = [];
	constructor(
		private router: Router,
		private service: EntEstCreService
		){

	}
	ngOnInit(){
		this.entEstBasicInfo = this.service.getEntEst().BasicInfo;
		console.log('this.entEstBasicInfo load:', this.entEstBasicInfo);
		this.service.loadCurrencyTypes(this.currencyTypes, this.showNotice);
	}

	next(){
		console.log('this.entEstBasicInfo save:', this.entEstBasicInfo);
      	this.router.navigateByUrl("ent-mng/ent-est-mng/ent-est-cre-step-02");
	}

	cancel(){
		this.router.navigateByUrl('ent-mng/ent-est-mng/ent-est-mng');
	}

	showNotice(title, desc){

	}
}