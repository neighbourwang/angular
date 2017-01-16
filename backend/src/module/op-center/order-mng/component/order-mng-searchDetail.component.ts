	
import { Input,Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import { AdminListItem, SearchOrderDetail,DepartmentItem, Platform, ProductType, SubRegion, OrderMngParam,SubInstanceResp} from '../model'
import {DictService} from '../../../../architecture/core/service/dict-service';

@Component({
	selector: 'order-mng-searchDetail',
	templateUrl: '../template/order-mng-searchDetail.component.html',
	styleUrls: ['../style/order-mng-searchDetail.less'],
	providers: []}
	)
export class OrderMngSearchDetailComponent implements OnInit{

      @Input('detail')
      private _detail:SearchOrderDetail;

	private _orderId:string = null;
	
	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi,
		 private _dictServ:DictService){
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