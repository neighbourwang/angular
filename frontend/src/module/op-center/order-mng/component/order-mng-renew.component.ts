import { Input, Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { ItemLoader, NoticeComponent, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import { SubInstanceResp, AdminListItem, DepartmentItem, Platform, ProductType, SubRegion, OrderMngParam} from '../model'


@Component({
	selector: 'order-mng-renew',
	templateUrl: '../template/order-mng-renew.component.html',
	styleUrls: ['../style/order-mng-renew.less'],
	providers: []}
	)
export class OrderMngRenewComponent implements OnInit{
	@ViewChild("notice")
	@Input()
	private orderItem: SubInstanceResp;
  	private _notice: NoticeComponent;

	private _renew:ItemLoader<any> = null;
	private _orderId:string = null;

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){

		this._renew = new ItemLoader<any>(false, "续订", "op-center.order-mng.order-renew.get", restApiCfg, restApi);

	}
	ngOnInit(){
	
	}

	showMsg(msg: string)
	{
		this._notice.open("系统提示", msg);
	}

	renew(){
		this.layoutService.show();
		this._renew.Go(null, [{key:"_subId", value:this._orderId}])
		.then(success=>{
			this.layoutService.hide();
		})
		.catch(err=>{
			this.layoutService.hide();
			this.showMsg(err);
		})
	}
	
}