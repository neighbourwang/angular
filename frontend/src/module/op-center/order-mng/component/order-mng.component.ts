import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import { AdminListItem, DepartmentItem, Platform, ProductType, SubRegion, OrderMngParam} from '../model'


@Component({
	selector: 'order-mng',
	templateUrl: '../template/order-mng.component.html',
	styleUrls: ['../style/order-mng-list.less'],
	providers: []}
	)
export class OrderMngComponent implements OnInit{

	private _param:OrderMngParam = new OrderMngParam();

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){

		

	}
	ngOnInit(){
	
	}

	
}