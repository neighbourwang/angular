	
import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { DicLoader, ItemLoader, NoticeComponent, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import { AdminListItem, DepartmentItem, Platform, ProductType, SubRegion, OrderMngParam} from '../model'


@Component({
	selector: 'order-mng-cancel',
	templateUrl: '../template/order-mng-cancel.component.html',
	styleUrls: ['../style/order-mng-renew.less'],
	providers: []}
	)
export class OrderMngCancelComponent implements OnInit{
	@ViewChild("notice")
  	private _notice: NoticeComponent;
	private _orderId:string = null;
	private _cancel:ItemLoader<any> = null;
	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){

		this._cancel = new ItemLoader<any>(false, "退订",  "op-center.order-mng.order-cancel.get", restApiCfg, restApi);
	}
	ngOnInit(){
	
	}

	cancel(){
		this.layoutService.show();
		this._cancel.Go(null, [{key:"_subId", value:this._orderId}])
		.then(success=>{
			this.layoutService.hide();
		})
		.catch(err=>{
			this.layoutService.hide();
			this.showMsg(err);
		});
	}

	showMsg(msg: string)
	{
		this._notice.open("系统提示", msg);
	}

	
}
