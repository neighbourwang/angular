import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';
import { OrderDetailItem } from '../model';

@Component({
  // moduleId: module.id,
  selector: 'order-mng-searchDetail',
  templateUrl: '../template/order-mng-searchDetail.component.html',
  styleUrls: ['../style/order-mng-searchDetail.less'],
  providers: []
}) 
export class OrderMngSearchDetailComponent implements OnInit {
  

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private restApiCfg:RestApiCfg,
    private restApi:RestApi
  ) {
   
  }

  ngOnInit() {
   
  }

}