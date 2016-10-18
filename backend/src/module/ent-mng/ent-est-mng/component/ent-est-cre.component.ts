import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService, NoticeComponent, SystemDictionaryService, SystemDictionary } from '../../../../architecture';
import { EntEstBasicInfo } from '../model/ent-est-basic-info'
import { EntEstCreService } from '../service/ent-est-cre.service'
import { CurrencyType } from "../model/currency";

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

	private entEstBasicInfo:EntEstBasicInfo;
	private currencyTypes : Array<SystemDictionary> = null;

	constructor(
		private router: Router,
		private service: EntEstCreService,
		private sysDicService: SystemDictionaryService
		){

	}
	ngOnInit(){
	
	}


}