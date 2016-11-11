import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { DicLoader, ItemLoader, NoticeComponent, RestApi, RestApiCfg, LayoutService, PopupComponent, ConfirmComponent, SystemDictionaryService, SystemDictionary } from '../../../../architecture';
import { SubInstanceAttrPair, ProductBillingItem, SubInstanceResp, SubInstanceItemResp, AdminListItem, DepartmentItem, Platform, ProductType, SubRegion, OrderMngParam} from '../model'


@Component({
	selector: 'order-mng',
	templateUrl: '../template/order-mng.component.html',
	styleUrls: ['../style/order-mng-list.less'],
	providers: []}
	)
export class OrderMngComponent implements OnInit{
	@ViewChild("notice")
  	private _notice: NoticeComponent;

	private _adminLoader:ItemLoader<AdminListItem> = null;
	private _departmentLoader:ItemLoader<DepartmentItem> = null;
	private _productTypeLoader: DicLoader = null;
	private _platformLoader:ItemLoader<Platform> = null;
	private _subregionLoader:ItemLoader<SubRegion> = null;
	private _orderStatus:DicLoader = null;
	private _orderLoader:ItemLoader<SubInstanceResp> = null;

	private _param:OrderMngParam = new OrderMngParam();
	private initDate:string = null;

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){

		//配置企业列表加载
		this._adminLoader = new ItemLoader<AdminListItem>(false, "企业列表", "op-center.order-mng.ent-list.get", this.restApiCfg, this.restApi);

		//配置部门列表加载
		this._departmentLoader = new ItemLoader<DepartmentItem>(false, '部门列表', "op-center.order-mng.department-list.get", this.restApiCfg, this.restApi);

		//产品类型配置
		this._productTypeLoader = new DicLoader(restApiCfg, restApi, "GLOBAL", "SERVICE_TYPE");

		//配置区域加载
		this._platformLoader = new ItemLoader<Platform>(false, '区域', "op-center.order-mng.region-list.get", this.restApiCfg, this.restApi);

		//配置可用区加载
		this._subregionLoader = new ItemLoader<SubRegion>(false, '可用区', "op-center.order-mng.avail-region-list.get", this.restApiCfg, this.restApi);

		//配置订单状态
		this._orderStatus = new DicLoader(this.restApiCfg, this.restApi, "ORDER", "STATUS");

		//配置订单加载
		this._orderLoader = new ItemLoader<SubInstanceResp>(true, "订单列表", "op-center.order-mng.order-list.post", restApiCfg, restApi);
		this._orderLoader.FakeDataFunc = (target:Array<SubInstanceResp>)=>{
			let obj = new SubInstanceResp();
			target.push(obj);

			obj.orderNo = "1234";
			let subItem = new SubInstanceItemResp();
			obj.itemList = [];
			obj.itemList.push(subItem);

			subItem.quantity = 1;


			subItem.billingInfo = new ProductBillingItem();
			subItem.billingInfo.basePrice = 5;
			subItem.billingInfo.basicPrice = 6;

			subItem.specList = [];
			let spec = new SubInstanceAttrPair();
			subItem.specList.push(spec);
			spec.attrDisplayName = "区域";
			spec.attrDisplayValue = "东1区";


		};
	}
	ngOnInit(){
		this._orderStatus.Go()
		.then(success=>{
			return this._productTypeLoader.Go();
		})
		.then(success=>{

		})
		.catch(err=>{
			this.showMsg(err);
		});
		// this.loadAdmin()
		// .then(success=>{
		// 	this.loadDepartment();
		// }, err=>{
		// 	this.showMsg(err);
		// })

		// this.loadPlatform()
		// .then(success=>{
		// 	this.loadSubregion();
		// }, err=>{
		// 	this.showMsg(err);
		// });
	}

	loadAdmin():Promise<any>{
		return new Promise((resolve, reject)=>{
			this._adminLoader.Go(null, [{key:"userId", value:"37d3dfca-064c-4077-879c-75ecf9c6725c "}])
			.then(success=>{
				resolve(success);
			},err=>{
				reject(err);
			})
		});
	}

	loadDepartment(){
		this._departmentLoader.Go(null, [{key:"enterpriseId", value:this._param.enterpriseId}])
		.then(success=>{
			this._param.organization = "0";
		}, err=>{
			this._param.organization = "0";
		});
	}

	loadPlatform():Promise<any>{
		return new Promise((resolve, reject)=>{
			this._platformLoader.Go()
			.then(success=>{
				resolve(success);
			}),err=>{
				reject(err);
			}

		});
	}

	loadSubregion(){
		this._subregionLoader.Go(null, [{key:'_id', value:this._param.region}])
		.then(success=>{
			this._param.zoneId = "0";
		},err=>{
			this._param.zoneId = "0";
		});
	}

	showMsg(msg: string)
	{
		this._notice.open("系统提示", msg);
	}

	showDetail(orderItemId:string){
		this.router.navigateByUrl(`op-center/order-mng/order-mng-detail/${orderItemId}`);
	}
	
	renew(orderId:string){

	}

	search(){
		this.layoutService.show();
		this._orderLoader.Go(1, null, this._param)
		.then(success=>{
			this.layoutService.hide();
		},err=>{
			this.layoutService.hide();
		});
	}

	onCreateTimeChange($event){
		this._param.createTime = $event.formatted;
	}

	onExpireTimeChange($event){
		this._param.expireTime = $event.formatted;
	}
}