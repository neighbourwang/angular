import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../../../architecture';

@Component({
	selector:'ent-est-cre-step-01'
	,templateUrl:'../template/ent-est-cre-step-01.component.html'
	,styleUrls:[]
	,providers:[]
})
export class EntEstCreStep01Component implements OnInit{
	constructor(
		private router: Router
		){

	}
	ngOnInit(){}

	next(){
      	this.router.navigateByUrl("pf-mng/ent-est-mng/ent-est-cre-step-02");
	}

	cancel(){
		this.router.navigateByUrl('pf-mng/ent-est-mng/ent-est-mng');
	}
}