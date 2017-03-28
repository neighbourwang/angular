import { Input, Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import { SubInstanceResp, AdminListItem, DepartmentItem, Platform, ProductType, SubRegion, OrderMngParam} from '../model'
import {DictService} from '../../../../architecture/core/service/dict-service';

@Component({
	selector: 'order-renew-complete',
	templateUrl: '../template/order-renew-complete.component.html',
	styleUrls: ['../style/order-mng-renew.less'],
	providers: []}
	)
export class OrderRenewCompleteComponent implements OnInit{
	@ViewChild("notice")
  	private _notice: NoticeComponent;
	@Input()
	private orderItem: SubInstanceResp = new SubInstanceResp();

	private _param:OrderMngParam = new OrderMngParam();

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi,
		private _dictServ:DictService){

		

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