import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../../../architecture';
import { EntEstCreService } from "../service/ent-est-cre.service";
import { ResourceQuota } from "../model/resourcequota";
import { EntEstResourceQuota } from "../model/ent-est-resourcequota";

@Component({
	selector:'ent-est-cre-step-02'
	,templateUrl:'../template/ent-est-cre-step-02.component.html'
	,styleUrls:[]
	,providers:[EntEstCreService]
})
export class EntEstCreStep02Component implements OnInit{
	private resourceQuotas: ResourceQuota[] = [];
	private entEstResourceQuotas : EntEstResourceQuota[];
	
	constructor(private router: Router,
		private service: EntEstCreService){}
	ngOnInit(){
		this.service.loadResourceQuotas(this.resourceQuotas, null);
		this.entEstResourceQuotas = this.service.getEntEst().ResourceQuotas;
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