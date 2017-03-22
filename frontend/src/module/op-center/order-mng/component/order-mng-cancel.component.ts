	
import { Input,Component, OnInit, ViewChild, EventEmitter,Output} from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import {OrderDetailItem, AdminListItem, DepartmentItem, Platform, ProductType, SubRegion, OrderMngParam,SubInstanceResp} from '../model'


@Component({
	selector: 'order-mng-cancel',
	templateUrl: '../template/order-mng-cancel.component.html',
	styleUrls: ['../style/order-mng-renew.less'],
	providers: []}
	)
export class OrderMngCancelComponent implements OnInit{

	@Input()
	private orderItem : SubInstanceResp = new SubInstanceResp();
	@Input()
	private detail : OrderDetailItem = new OrderDetailItem();

	 @Output()  complete=new EventEmitter(); 

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

	selectedCancelItem(item:OrderDetailItem){
      item.isChecked=!item.isChecked;
	}
	selectedSubItem(item:SubInstanceResp){
		item.isChecked=!item.isChecked;
	}
	cancel() {
		// alert("cancel页面");
		this.complete.emit([this.orderItem,this.detail]);
	}
}