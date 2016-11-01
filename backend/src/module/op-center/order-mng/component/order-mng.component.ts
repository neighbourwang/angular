import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, PopupComponent, ConfirmComponent, SystemDictionaryService, SystemDictionary } from '../../../../architecture';

@Component({
	selector: 'order-mng',
	templateUrl: '../template/order-mng.component.html',
	styleUrls: [],
	providers: []	
}
	)
export class OrderMngComponent implements OnInit{
	ngOnInit(){

	}
}