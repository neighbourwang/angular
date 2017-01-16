import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { ItemLoader
  , RestApi
  , RestApiCfg
  , LayoutService
  , NoticeComponent
  , PopupComponent
  , ConfirmComponent
  , SystemDictionaryService
  , SystemDictionary } from '../../../../architecture';
  
import * as _ from 'underscore';
@Component({
  // moduleId: module.id,
  selector: 'order-mng-detail',
  templateUrl: '../template/order-mng-detail.component.html',
  styleUrls: ['../style/order-mng-detail.less'],
  providers: []
}) 
export class OrderMngDetailComponent implements OnInit {

  @ViewChild("notice")
  private _notice: NoticeComponent;

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private restApiCfg:RestApiCfg,
    private restApi:RestApi
  ) {
  }
  ngOnInit() {
    if(this.router.routerState.snapshot["orderId"])
    {
      this.showDetail(this.router.routerState.snapshot["orderId"]);
    }
  }

  showMsg(msg: string)
  {
    this._notice.open("COMMON.SYSTEM_PROMPT", msg);
  }

  showDetail(orderId:string)
  {
    this.layoutService.show();
  }
}