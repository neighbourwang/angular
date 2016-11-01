import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { ItemLoader, RestApi, RestApiCfg, LayoutService, NoticeComponent, PopupComponent, ConfirmComponent, SystemDictionaryService, SystemDictionary } from '../../../../architecture';
import { OrderDetail} from '../model';

@Component({
  // moduleId: module.id,
  selector: 'order-mng-detail',
  templateUrl: '../template/order-mng-detail.component.html',
  styleUrls: ['../style/order-mng-detail.less'],
  providers: []
}) 
export class OrderMngDetailComponent implements OnInit {
  private _orderDetail:ItemLoader<OrderDetail> = null;
  @ViewChild("notice")
  private _notice: NoticeComponent;

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private restApiCfg:RestApiCfg,
    private restApi:RestApi
  ) {
    //配置订单详情加载信息
    this._orderDetail = new ItemLoader<OrderDetail>(false, "订单详情", this.restApiCfg, this.restApi);
    this._orderDetail.Api = this.restApiCfg.getRestApi("op-center.order-mng.order-detail.get");
    this._orderDetail.MapFunc = (source:Array<any>, target:Array<OrderDetail>):void=>{

    };
  }

  ngOnInit() {
    if(this.router.routerState.snapshot["orderId"])
    {
      this.showDetail(this.router.routerState.snapshot["orderId"]);
    }
  }

   showMsg(msg: string)
  {
    this._notice.open("系统提示", msg);
  }

  showDetail(orderId:string)
  {
    this._orderDetail.Go(null, [{key:"orderId", value:orderId}])
    .then(success=>{}, err=>{
      this.showMsg(err);
    })
  }
}