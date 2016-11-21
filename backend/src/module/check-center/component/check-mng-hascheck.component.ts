import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi
	, RestApiCfg
	, LayoutService
	, NoticeComponent
	, PopupComponent
	, ConfirmComponent
	, SystemDictionaryService
	, SystemDictionary } from '../../../architecture';


@Component({
	selector: 'check-mng-list',
	templateUrl: '../template/check-mng-hascheck.component.html',
	styleUrls: ['../style/check-mng-list.less'],
	providers: []	
})
export class CheckMngHascheckComponent implements OnInit{
	
	
	ngOnInit(){

	}

}