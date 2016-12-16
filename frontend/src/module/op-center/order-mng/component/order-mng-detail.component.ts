import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { Router } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';
import { OrderDetailItem } from '../model';
import {DictService} from '../../../../architecture/core/service/dict-service';

@Component({
  // moduleId: module.id,
  selector: 'order-mng-detail',
  templateUrl: '../template/order-mng-detail.component.html',
  styleUrls: ['../style/order-mng-detail.less'],
  providers: []
}) 
export class OrderMngDetailComponent implements OnInit {
  @Input('orderDetail')
  private _orderDetail:OrderDetailItem;

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private restApiCfg:RestApiCfg,
    private restApi:RestApi,
    private _dictServ:DictService
  ) {
   
  }

  ngOnInit() {
   console.log('_dictServ ngOnInit', this._dictServ);
  }

}