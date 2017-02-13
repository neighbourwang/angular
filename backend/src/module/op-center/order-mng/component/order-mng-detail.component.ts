import { Component, OnInit, ViewChild} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ItemLoader
  , RestApi
  , RestApiCfg
  , LayoutService
  , NoticeComponent
  , PopupComponent
  , ConfirmComponent
  , SystemDictionaryService
  , SystemDictionary } from '../../../../architecture';
  import {DictService} from '../../../../architecture/core/service/dict-service';
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
    private activatedRoute: ActivatedRoute,
    private _dictServ:DictService,
    private restApi:RestApi
  ) {
    this._detailLoader = new ItemLoader<OrderDetailItem>(null,"ORDER_MNG.PURCHASED_SERVICE_DETAILS_ERROR","op-center.order-mng.subinstance-detail.post",restApiCfg,restApi);
    
    this._detailLoader.MapFunc = (source:Array<any>, target:Array<OrderDetailItem>)=>{
			for(let item of source)
			{
				let obj:OrderDetailItem = _.extendOwn(new OrderDetailItem(), item)
				target.push(obj);
			}
		};

    this._detailLoader.FirstItem = new OrderDetailItem();
  }
  ngOnInit() {
    if(this.activatedRoute.snapshot.params["orderId"] as string)
    {
      this.orderId = this.activatedRoute.snapshot.params["orderId"] as string;
      this.showDetail(this.orderId);
    }
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