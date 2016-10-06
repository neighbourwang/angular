import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../../../architecture';
import { CurrencyType } from "../model/currency";
import { EntEstCreService } from "../service/ent-est-cre.service";

@Component({
	selector:'ent-est-cre-step-02'
	,templateUrl:'../template/ent-est-cre-step-02.component.html'
	,styleUrls:[]
	,providers:[EntEstCreService]
})
export class EntEstCreStep02Component implements OnInit{
	currencyTypes : CurrencyType[] = [];
	constructor(private router: Router,
		private service: EntEstCreService){}
	ngOnInit(){
		this.service.loadCurrencyTypes(this.currencyTypes);
	}

	next(){
      	this.router.navigateByUrl("pf-mng/ent-est-mng/ent-est-cre-step-03");
	}

	prev(){
      	this.router.navigateByUrl("pf-mng/ent-est-mng/ent-est-cre-step-01");
    }

	cancel(){
		this.router.navigateByUrl('pf-mng/ent-est-mng/ent-est-mng');
	}

}