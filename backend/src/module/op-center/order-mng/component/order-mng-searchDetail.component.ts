	
import { Input,Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent, RestApi, RestApiCfg, LayoutService, ConfirmComponent,ItemLoader } from '../../../../architecture';
import { AdminListItem, SearchOrderDetail,DepartmentItem, Platform, ProductType, SubRegion, OrderMngParam,SubInstanceResp,ServiceInstanceItem,VMItem,DiskInstanceItem,PMServiceItem,SuperviseNoInstanceItem} from '../model'
import {DictService} from '../../../../architecture/core/service/dict-service';

import * as _ from 'underscore';

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

		private _subinstanceLoader:ItemLoader<ServiceInstanceItem>=null;
  
		private VMItem:VMItem=null;//云主机
		private DiskInstanceItem:DiskInstanceItem=null;//云硬盘
		private PMServiceItem:PMServiceItem=null;//物理机
		private SuperviseNoInstanceItem:SuperviseNoInstanceItem=null;//其他
	
	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi,
		 private _dictServ:DictService){
			 // 加载实例详情
		this._subinstanceLoader = new ItemLoader<ServiceInstanceItem>(false, "加载实例详情失败", "op-center.order-search.subinstance.get", restApiCfg, restApi);
		this._subinstanceLoader.MapFunc = (source:Array<any>, target:Array<ServiceInstanceItem>)=>{
			for(let item of source)
			{
				let obj = _.extendOwn(new SearchOrderDetail(), item) as any;
				target.push(obj);
		 	}
	    }
	}
	ngOnInit(){
	
	}

	loadSubinstanceDetailById(){
		this.layoutService.show();
		let subinstanceId= this._detail.subinstanceId;
		this.VMItem = null;
		this.DiskInstanceItem = null;
		this.PMServiceItem = null;
		this.SuperviseNoInstanceItem = null;
	
			this._subinstanceLoader.Go(null,[{key:'subId',value:subinstanceId}])
			.then(success=>{

		if(this._subinstanceLoader.FirstItem.vmItem){
			this.VMItem = this._subinstanceLoader.FirstItem.vmItem;
		}
		if(this._subinstanceLoader.FirstItem.diskInstanceItem){
			this.DiskInstanceItem = this._subinstanceLoader.FirstItem.diskInstanceItem;
		}
		if(this._subinstanceLoader.FirstItem.pmServiceItem){
			this.PMServiceItem = this._subinstanceLoader.FirstItem.pmServiceItem;
		}
		if(this._subinstanceLoader.FirstItem.superviseNoInstanceItem){
			this.SuperviseNoInstanceItem = this._subinstanceLoader.FirstItem.superviseNoInstanceItem;
		}

				this.layoutService.hide();
			})
			.catch(err=>{
				this.layoutService.hide();
			})
			
		}
	
}