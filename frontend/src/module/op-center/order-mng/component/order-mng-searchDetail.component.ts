import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { Router } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ConfirmComponent,ItemLoader } from '../../../../architecture';
import { SearchOrderDetail,VMItem,DiskInstanceItem,PMServiceItem,SuperviseNoInstanceItem,ServiceInstanceItem} from '../model';
import {DictService} from '../../../../architecture/core/service/dict-service';

import * as _ from 'underscore';

@Component({
  // moduleId: module.id,
  selector: 'order-mng-searchDetail',
  templateUrl: '../template/order-mng-searchDetail.component.html',
  styleUrls: ['../style/order-mng-searchDetail.less'],
  providers: []
}) 
export class OrderMngSearchDetailComponent implements OnInit {
  @Input('detail')
  private _detail:SearchOrderDetail;
  private showInstance : boolean = true;
  
	private _subinstanceLoader:ItemLoader<ServiceInstanceItem>=null;
  
  private VMItems:Array<VMItem>=[];//云主机
  private DiskInstanceItems:Array<DiskInstanceItem>=[];//云硬盘
  private PMServiceItems:Array<PMServiceItem>=[];//物理机
  private SuperviseNoInstanceItems:Array<SuperviseNoInstanceItem>=[];//其他

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private restApiCfg:RestApiCfg,
    private restApi:RestApi,
    private _dictServ:DictService
  ) {
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

  ngOnInit() {
  
  }

	loadSubinstanceDetailById(){
		this.layoutService.show();
    let subinstanceId= this._detail.subinstanceId;
   
		this._subinstanceLoader.Go(null,[{key:'subId',value:subinstanceId}])
		.then(success=>{

      if(this._subinstanceLoader.FirstItem.VMItems){
        this.VMItems = this._subinstanceLoader.FirstItem.VMItems;
      }
      if(this._subinstanceLoader.FirstItem.DiskInstanceItems){
        this.DiskInstanceItems = this._subinstanceLoader.FirstItem.DiskInstanceItems;
      }
      if(this._subinstanceLoader.FirstItem.PMServiceItems){
        this.PMServiceItems = this._subinstanceLoader.FirstItem.PMServiceItems;
      }
      if(this._subinstanceLoader.FirstItem.SuperviseNoInstanceItems){
        this.SuperviseNoInstanceItems = this._subinstanceLoader.FirstItem.SuperviseNoInstanceItems;
      }

			this.layoutService.hide();
		})
		.catch(err=>{
			this.layoutService.hide();
		})
		
	}
}