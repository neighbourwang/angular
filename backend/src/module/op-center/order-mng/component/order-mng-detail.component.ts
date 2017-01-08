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
import { OrderDetailItem,DetaiItem} from '../model';
import * as _ from 'underscore';
@Component({
  // moduleId: module.id,
  selector: 'order-mng-detail',
  templateUrl: '../template/order-mng-detail.component.html',
  styleUrls: ['../style/order-mng-detail.less'],
  providers: []
}) 
export class OrderMngDetailComponent implements OnInit {
  private _orderDetail:ItemLoader<DetaiItem> = null;
  @ViewChild("notice")
  private _notice: NoticeComponent;

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private restApiCfg:RestApiCfg,
    private restApi:RestApi
  ) {
    //配置订单详情加载信息
    this._orderDetail = new ItemLoader<DetaiItem>(false, "ORDER_MNG.ORDER_DETAIL_DATA_ERROR", "op-center.order-mng.order-detail.get", this.restApiCfg, this.restApi);
    this._orderDetail.MapFunc = (source:Array<any>, target:Array<DetaiItem>):void=>{
          let obj = new DetaiItem();
          for(let item of source){
             target.push(obj);
            _.extendOwn(obj, item);
            obj.orderCode = item.oorderCode;

            //关联订单
           let relatedOrders : DetaiItem[] = [];
           for(let relatedOrder of relatedOrders){
             //orderCode,实例名称？？，productType,配置？？，productBillingItem.billingMode，orderStatus，productBillingItem.basePrice,.productBillingItem.basicPrice,completeDate
              relatedOrder.orderCode = item.relatedOrders.orderCode;
              relatedOrder.instanceName = item.relatedOrders.name;//实例名称??
              //relatedOrder.status = item.relatedOrders.orderStatu;//配置
              relatedOrder.billingMode = item.relatedOrders.productBillingItem.billingMode;//计费模式
              relatedOrder.oneTimePrice = item.relatedOrders.productBillingItem.basePrice;//一次性费用
              relatedOrder.price = item.relatedOrders.productBillingItem.basicPrice;//费用
              relatedOrder.exireDate = item.relatedOrders.completeDate;//到期时间
            }
            obj.relatedOrders = relatedOrders;
          }
         
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
    this.layoutService.show();
    this._orderDetail.Go(null, [{key:"orderId", value:orderId}])
    .then(success=>{
      this.layoutService.hide();
    }, err=>{
      this.layoutService.hide();
      this.showMsg(err);
    })
  }
}