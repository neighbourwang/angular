import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { DicLoader, ItemLoader, NoticeComponent, RestApi, RestApiCfg, LayoutService, PopupComponent, ConfirmComponent, SystemDictionaryService, SystemDictionary } from '../../../../architecture';
import { AdminListItem, DepartmentItem, Platform, ProductType, SubRegion, OrderMngParam} from '../model'


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
	private _productTypeLoader:ItemLoader<ProductType> = null;
	private _platformLoader:ItemLoader<Platform> = null;
	private _subregionLoader:ItemLoader<SubRegion> = null;
	private _orderStatus:DicLoader = null;

	private _param:OrderMngParam = new OrderMngParam();

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){

		//配置企业列表加载
		this._adminLoader = new ItemLoader<AdminListItem>(false, "企业列表", "op-center.order-mng.ent-list.get", this.restApiCfg, this.restApi);

		//配置部门列表加载
		this._departmentLoader = new ItemLoader<DepartmentItem>(false, '部门列表', "op-center.order-mng.department-list.get", this.restApiCfg, this.restApi);

		//配置产品类型加载
		this._productTypeLoader = new ItemLoader<ProductType>(true, '产品类型', "op-center.order-mng.product-type-list.get", this.restApiCfg, this.restApi);

		//配置区域加载
		this._platformLoader = new ItemLoader<Platform>(false, '区域', "op-center.order-mng.region-list.get", this.restApiCfg, this.restApi);

		//配置可用区加载
		this._subregionLoader = new ItemLoader<SubRegion>(false, '可用区', "op-center.order-mng.avail-region-list.get", this.restApiCfg, this.restApi);

		//配置订单状态
		this._orderStatus = new DicLoader(this.restApiCfg, this.restApi, "ORDER", "STATUS");

	}
	ngOnInit(){
		this._orderStatus.Go();
		this.loadAdmin()
		.then(success=>{
			this.loadDepartment();
		}, err=>{
			this.showMsg(err);
		})

		this.loadProductType();
		this.loadPlatform()
		.then(success=>{
			this.loadSubregion();
		}, err=>{
			this.showMsg(err);
		});

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

	loadProductType(){
		this._productTypeLoader.Go(1, [{key:"_size", value:1000}]);
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

	showDetail(){
		let orderId:string = "1";
		this.router.navigateByUrl(`op-center/order-mng/order-mng-detail/${orderId}`);
	}

	resetParam(){
		this._param.createTime = null;
		this._param.enterpriseId = "0";
		this._param.expireTime = null;
		this._param.organization = "0";
		this._param.region = "0";
	}
}