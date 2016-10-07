import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../../../architecture';
import { EntEstCreService } from "../service/ent-est-cre.service";
import { ResourceQuota } from "../model/resourcequota";

@Component({
	selector:'ent-est-cre-step-02'
	,templateUrl:'../template/ent-est-cre-step-02.component.html'
	,styleUrls:[]
	,providers:[EntEstCreService]
})
export class EntEstCreStep02Component implements OnInit{
	private resourceQuotas: ResourceQuota[] = [];
	constructor(private router: Router,
		private service: EntEstCreService){}
	ngOnInit(){
		this.service.loadResourceQuotas(this.resourceQuotas, null);
	}

	next(){
      	this.router.navigateByUrl("ent-mng/ent-est-mng/ent-est-cre-step-03");
	}

	prev(){
      	this.router.navigateByUrl("ent-mng/ent-est-mng/ent-est-cre-step-01");
    }

	cancel(){
		this.router.navigateByUrl('ent-mng/ent-est-mng/ent-est-mng');
	}

}