	
import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi
	, RestApiCfg
	, LayoutService
	, NoticeComponent
	, PopupComponent
	, ConfirmComponent
	, SystemDictionaryService
	, SystemDictionary
	, DicLoader
	, ItemLoader } from '../../../architecture';


@Component({
	selector: 'order-mng-cancel',
	templateUrl: '../template/check-mng-set.component.html',
	styleUrls: ['../style/check-mng-set.less'],
	providers: []}
	)
export class CheckMngSetComponent implements OnInit{

	  @ViewChild("setPoup")
      setPoup: PopupComponent;
	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){
	}
	ngOnInit(){
	
	}

 //编辑
  set(){
	  this.setPoup.open();
    console.log('ent-est-mng/edit');

  }
	
}