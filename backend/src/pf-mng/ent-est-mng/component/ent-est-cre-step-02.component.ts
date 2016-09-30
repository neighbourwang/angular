import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../../core/service/layout.service';

@Component({
	selector:'ent-est-cre-step-02'
	,templateUrl:'../template/ent-est-cre-step-02.component.html'
	,styleUrls:[]
	,providers:[]
})
export class EntEstCreStep02Component implements OnInit{
	constructor(private router: Router){}
	ngOnInit(){}

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