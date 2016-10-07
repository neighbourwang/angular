import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../../../architecture';
import { EntEstBasicInfo } from '../model/ent-est-basic-info'
import { EntEstCreService } from '../service/ent-est-cre.service'

@Component({
	selector:'ent-est-cre-step-01'
	,templateUrl:'../template/ent-est-cre-step-01.component.html'
	,styleUrls:[]
	,providers:[EntEstCreService]
})
export class EntEstCreStep01Component implements OnInit{
	private entEstBasicInfo:EntEstBasicInfo = new EntEstBasicInfo();
	constructor(
		private router: Router,
		private entEstCreService: EntEstCreService
		){

	}
	ngOnInit(){
		this.entEstCreService.loadEntEstBasicInfo(this.entEstBasicInfo);
	}

	next(){
      	this.router.navigateByUrl("pf-mng/ent-est-mng/ent-est-cre-step-02");
	}

	cancel(){
		this.router.navigateByUrl('pf-mng/ent-est-mng/ent-est-mng');
	}
}