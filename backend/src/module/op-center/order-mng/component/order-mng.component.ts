import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { DicLoader, ItemLoader, NoticeComponent, RestApi, RestApiCfg, LayoutService, PopupComponent, ConfirmComponent, SystemDictionaryService, SystemDictionary } from '../../../../architecture';
import { SubInstanceAttrPair, ProductBillingItem, SubInstanceResp, SubInstanceItemResp, AdminListItem, DepartmentItem, Platform, ProductType, SubRegion, OrderMngParam} from '../model'
import * as _ from 'underscore';

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
	private _renewHanlder:ItemLoader<any> = null;
	private _billinModeDic:DicLoader = null;

	private _param:OrderMngParam = new OrderMngParam();
	private initDate:string = null;

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){

		this._billinModeDic = new DicLoader(restApiCfg, restApi, "BILLING_MODE", "TYPE");
		//续订
		this._renewHanlder = new ItemLoader<any>(false, "订单续订", "op-center.order-mng.order-renew.get", restApiCfg, restApi);
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
		this._orderStatus = new DicLoader(this.restApiCfg, this.restApi, "SUBINSTANCE", "STATUS");

		//配置订单加载
		this._orderLoader = new ItemLoader<SubInstanceResp>(true, "订单列表", "op-center.order-mng.order-list.post", restApiCfg, restApi);
		/*
		this._orderLoader.FakeDataFunc = (target:Array<SubInstanceResp>)=>{
			let obj = new SubInstanceResp();
			target.push(obj);

			obj.orderNo = "1234";
			obj.orderId = "123432223";
			obj.purchaseDate = "2016-11-11";
			let subItem = new SubInstanceItemResp();
			obj.itemList = [];
			obj.itemList.push(subItem);

			subItem.quantity = 1;

			subItem.specList = [];
			let spec = new SubInstanceAttrPair();
			subItem.specList.push(spec);
			spec.attrDisplayName = "区域";
			spec.attrDisplayValue = "东1区";
	 
	        let spec2 = new SubInstanceAttrPair();
			subItem.specList.push(spec2);
			spec2.attrDisplayName = '可用区';
			spec2.attrDisplayValue = '可用区B';

			  let spec3 = new SubInstanceAttrPair();
			subItem.specList.push(spec3);
			spec3.attrDisplayName = '实例规格';
			spec3.attrDisplayValue = 'CPU 2赫/内存 4GB/启动盘 70G';

			 let spec4 = new SubInstanceAttrPair();
			subItem.specList.push(spec4);
			spec4.attrDisplayName = 'IP地址';
			spec4.attrDisplayValue = '10.1.1.1(内部) 192.168.1.1(外部)';

			let spec5 = new SubInstanceAttrPair();
			subItem.specList.push(spec5);
			spec5.attrDisplayName = '操作系统';
			spec5.attrDisplayValue = '******';

			let spec6 = new SubInstanceAttrPair();
			subItem.specList.push(spec6);
			spec6.attrDisplayName = '密码';
			spec6.attrDisplayValue = '已设置';

			let spec7 = new SubInstanceAttrPair();
			subItem.specList.push(spec7);
			spec7.attrDisplayName = '实例名称';
			spec7.attrDisplayValue = 'abcabc';


			subItem.billingInfo = new ProductBillingItem();
			subItem.billingInfo.basePrice = 5;
			subItem.billingInfo.basicPrice = 6;
			subItem.billingInfo.billingMode = '包年包月';
			
			subItem.period = 1;
			subItem.quantity = 1;
			subItem.serviceType = '云主机';
			subItem.statusName = '成功';
			subItem.createDate = '2016-11-11';
			subItem.expireDate = '2017-11-11';

				
		};
		*/
	}
	ngOnInit(){
		this.layoutService.show();
		this._orderStatus.Go()
		.then(success=>{
			return this._productTypeLoader.Go();
		})
		.then(success=>{
			return this._billinModeDic.Go();
		})
		.then(success=>{
			return this.loadPlatform();
		})
		.then(success=>{
			return this.loadAdmin();
		})
		.then(success=>{
			this.layoutService.hide();
		})
		.catch(err=>{
			this.layoutService.hide();
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
			this._param.organization = null;
		}, err=>{
			this._param.organization = null;
		});
	}

	loadPlatform():Promise<any>{
		return new Promise((resolve, reject)=>{
			this._platformLoader.Go()
			.then(success=>{
				resolve(success);
			},err=>{
				reject(err);
			});

		});
	}

	loadSubregion(){
		this._subregionLoader.Go(null, [{key:'_id', value:this._param.platformId}])
		.then(success=>{
			this._param.zoneId = null;
		},err=>{
			this._param.zoneId = null;
		});
	}

	showMsg(msg: string)
	{
		this._notice.open("系统提示", msg);
	}

	showDetail(orderItemId:string){
		this.router.navigateByUrl(`op-center/order-mng/order-mng-detail/${orderItemId}`);
	}
	
	renew(orderItem:SubInstanceResp){
		if(orderItem.itemList.filter(n=>n.status == "2").length == orderItem.itemList.length)
		{
			let param = [{
				attrCode: "",
				attrDisplayName: "",
				attrDisplayValue: "",
				attrId: "",
				attrValue: "",
				attrValueCode: "",
				attrValueId: "",
				description: "",
				valueType: "",
				valueUnit: ""
			}];
			this.layoutService.show();
			this._renewHanlder.Go(null, [{key:"orderId", value:orderItem.orderId}], param)
			.then(success=>{
				this.layoutService.hide();
				this.search();
			})
			.catch(err=>{
				this.layoutService.hide();
				this.showMsg(err);
			});
		}
		else
		{
			this.showMsg(`只有"已激活"订单才能续订`);
		}


	}

	search(pageNumber:number = 1){
		this.layoutService.show();

		let param = _.extend({}, this._param);

		//匹配后台搜索框参数
        param.searchText = this._param.queryParam;

		
		param.pageParameter = {
			currentPage:pageNumber
			,size:10
		};
		this._orderLoader.Go(pageNumber, null, param)
		.then(success=>{
			this.layoutService.hide();

			//翻译状态
			this.updateStatusName();
		},err=>{
			this.layoutService.hide();
		});
	}

	//翻译订单状态
	updateStatusName(){
		let list:Array<SubInstanceItemResp> = []
		this._orderLoader.Items.map(n=>list = list.concat(n.itemList));
		list.map(n=>{
			let item = this._orderStatus.Items.find(m=>m.value == n.status);
			if(item) n.statusName = item.displayValue as string;

			item = this._productTypeLoader.Items.find(m=>m.value == n.serviceType);
			if(item) n.serviceTypeName = item.displayValue as string;

			item = this._billinModeDic.Items.find(m=>m.value == n.billingMode);
			if(item) n.billingModeName = item.displayValue as string;
		});

	}

	onCreateTimeChange($event){
		this._param.createDate = $event.formatted;
	}

	onExpireTimeChange($event){
		this._param.expireDate = $event.formatted;
	}

	//翻页
	changePage(pageNumber:number)
	{
		this.search(pageNumber);
	}
}