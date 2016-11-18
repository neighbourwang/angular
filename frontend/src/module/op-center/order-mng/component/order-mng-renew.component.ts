import { Input, Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import { SubInstanceResp, AdminListItem, DepartmentItem, Platform, ProductType, SubRegion, OrderMngParam} from '../model'


@Component({
	selector: 'order-mng-renew',
	templateUrl: '../template/order-mng-renew.component.html',
	styleUrls: ['../style/order-mng-renew.less'],
	providers: []}
	)
export class OrderMngRenewComponent implements OnInit{
	@ViewChild("notice")
  	private _notice: NoticeComponent;
	@Input()
	private orderItem: SubInstanceResp = new SubInstanceResp();

	private _param:OrderMngParam = new OrderMngParam();

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){

		

	}
	ngOnInit(){
	
	}

	renew(){
		/*
{
        "desc": "订单续订",
        "method": "GET",
        "id": "op-center.order-mng.order-renew.get",
        "url": "/marketplace/authsec/subscription/instance/{_subId}/renew"        
    }
		*/
	}
	
}