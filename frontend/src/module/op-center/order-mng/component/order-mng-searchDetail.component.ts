import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { Router } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ConfirmComponent,ItemLoader } from '../../../../architecture';
import { SearchOrderDetail } from '../model';
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
  
	// private _subinstanceLoader:ItemLoader<any>=null;

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private restApiCfg:RestApiCfg,
    private restApi:RestApi,
    private _dictServ:DictService
  ) {
   //加载实例详情
		// this._subinstanceLoader = new ItemLoader<any>(false, "加载实例详情失败", "op-center.order-search.subinstance.get", restApiCfg, restApi);
		// this._subinstanceLoader.MapFunc = (source:Array<any>, target:Array<any>)=>{
		// 	for(let item of source)
		// 	{
		// 		let obj = _.extendOwn(new SearchOrderDetail(), item) as any;
		// 		target.push(obj);
		//  	}
	  //   }

  }

  ngOnInit() {
     
  }

	// loadSubinstanceDetailById(subinstanceId:string){
	// 	this.layoutService.show();
  //   let detail= this._detail;
  //   $('#osPopover').modal('show');
	// 	this._subinstanceLoader.Go(null,[{key:'subid',value:subinstanceId}])
	// 	.then(success=>{
	// 		$('#osPopover').modal('show');
	// 		this.layoutService.hide();
	// 	})
	// 	.catch(err=>{
	// 		this.layoutService.hide();
	// 	})
		
	// }
}