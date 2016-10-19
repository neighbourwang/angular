import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService, NoticeComponent, SystemDictionaryService, SystemDictionary } from '../../../../architecture';
import { EntEst, ResourceQuota } from '../model'
import { EntEstCreService, Paging } from '../service/ent-est-cre.service'

@Component({
	selector:'ent-est-cre'
	,templateUrl:'../template/ent-est-cre.component.html'
	,styleUrls:['../style/ent-est-mng.component.css']
	,providers:[
		EntEstCreService
		]
})
export class EntEstCreComponent implements OnInit{
	@ViewChild('notice')
    notice: NoticeComponent;

	private entEst: EntEst = null;
	private currencyTypes : Array<SystemDictionary> = null;
	private resourceQuotas: Paging<ResourceQuota> = new Paging<ResourceQuota>();
	private isLocal:boolean = true;

	constructor(
		private router: Router,
		private service: EntEstCreService,
		private sysDicService: SystemDictionaryService
		){

	}
	ngOnInit(){
		this.router
		.routerState
		.root
		.queryParams
		.subscribe(data=>{
			this.entEst = new EntEst();

		});

		this.service.loadResourceQuotas(this.resourceQuotas
			,this.showError
			,this);


	}

	showError(msg:any) {
	    this.notice.open(msg.title, msg.desc);
	}

	selectLocal(){
		this.isLocal = true;
		this.entEst.BasicInfo.certMethod = "local";
	}

	selectAD(){
		this.isLocal = false;
		this.entEst.BasicInfo.certMethod = "ad";
	}
}