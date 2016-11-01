import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { ItemLoader, RestApi, RestApiCfg, LayoutService, PopupComponent, ConfirmComponent, SystemDictionaryService, SystemDictionary } from '../../../../architecture';



@Component({
	selector: 'order-mng',
	templateUrl: '../template/order-mng.component.html',
	styleUrls: [],
	providers: []}
	)
export class OrderMngComponent implements OnInit{
	

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){
	}
	ngOnInit(){
	}

	showDetail(){
		let orderId:string = "1";
		this.router.navigateByUrl(`op-center/order-mng/order-mng-detail/${orderId}`);
	}
}