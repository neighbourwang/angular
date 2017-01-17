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
import{OrderDetailItem} from '../model';
  
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


  private _detailLoader:ItemLoader<OrderDetailItem> = null;
  private orderId:string;

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private restApiCfg:RestApiCfg,
    private restApi:RestApi
  ) {
    this._detailLoader = new ItemLoader<OrderDetailItem>(null,"已购服务详情加载失败！","op-center.order-mng.subinstance-detail.post",restApiCfg,restApi);

  }
  ngOnInit() {
   //  this.activatedRoute.snapshot.params["orderId"]
    if(this.router.routerState.snapshot["orderId"])
    {
      this.orderId = this.router.routerState.snapshot["orderId"];
      this.showDetail(this.orderId);
    }
    this.showDetail('48f9ff71-4c32-4457-ba4d-8987ff5a939d');
  }

  showMsg(msg: string)
  {
    this._notice.open("COMMON.SYSTEM_PROMPT", msg);
  }

  showDetail(orderId:string)
  {
    this.layoutService.show();
    this._detailLoader.Go(null,[{key:"subinstanceCode",value:orderId}])
    .then(success=>{
      this.layoutService.hide();
    })
    .catch(err=>{
      this.layoutService.hide();
    })
  }

  back(){
    this.router.navigateByUrl('op-center/order-mng/order-mng');
  }
}