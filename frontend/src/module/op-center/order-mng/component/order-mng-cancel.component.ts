	
import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import { AdminListItem, DepartmentItem, Platform, ProductType, SubRegion, OrderMngParam} from '../model'


@Component({
	selector: 'order-mng-cancel',
	templateUrl: '../template/order-mng-cancel.component.html',
	styleUrls: ['../style/order-mng-renew.less'],
	providers: []}
	)
export class OrderMngCancelComponent implements OnInit{

	private _param:OrderMngParam = new OrderMngParam();
	private _orderId:string = null;
	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){
	}
	ngOnInit(){
	
	}

	cancel(){
/*
{
        "desc": "订单退订",
        "method": "GET",
        "id": "op-center.order-mng.order-cancel.get",
        "url": " /marketplace/authsec/subscription/instance/{_subId}/cancel"        
    }
*/
	}
	
}