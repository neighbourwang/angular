	
import { Input,Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import { AdminListItem, DepartmentItem, Platform, ProductType, SubRegion, OrderMngParam,SubInstanceResp} from '../model'


@Component({
	selector: 'order-mng-searchDetail',
	templateUrl: '../template/order-mng-searchDetail.component.html',
	styleUrls: ['../style/order-mng-searchDetail.less'],
	providers: []}
	)
export class OrderMngSearchDetailComponent implements OnInit{

	@Input()
	private orderItem : SubInstanceResp = new SubInstanceResp();

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