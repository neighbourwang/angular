import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService, NoticeComponent, SystemDictionaryService, SystemDictionary } from '../../../../architecture';
import { EntEst } from '../model'
import { EntEstCreService } from '../service/ent-est-cre.service'
import { CurrencyType } from "../model/currency";

@Component({
	selector:'ent-est-cre'
	,templateUrl:'../template/ent-est-cre.component.html'
	,styleUrls:[]
	,providers:[
		EntEstCreService
		]
})
export class EntEstCreComponent implements OnInit{
	@ViewChild('notice')
    notice: NoticeComponent;

	private entEst: EntEst = null;
	private currencyTypes : Array<SystemDictionary> = null;

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
	}


}