import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../../../architecture';

@Component({
	selector:'ent-est-cre-step-04'
	,templateUrl:'../template/ent-est-cre-step-04.component.html'
	,styleUrls:[]
	,providers:[]
})
export class EntEstCreStep04Component implements OnInit{
	constructor(private router: Router){}
	ngOnInit(){}

	prev(){
      	this.router.navigateByUrl("ent-mng/ent-est-mng/ent-est-cre-step-03");
    }

	cancel(){
		this.router.navigateByUrl('ent-mng/ent-est-mng/ent-est-mng');
	}

}