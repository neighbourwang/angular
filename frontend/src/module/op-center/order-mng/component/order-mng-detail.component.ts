import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';
import { OrderDetail} from '../model';

@Component({
  // moduleId: module.id,
  selector: 'order-mng-detail',
  templateUrl: '../template/order-mng-detail.component.html',
  styleUrls: ['../style/order-mng-detail.less'],
  providers: []
}) 
export class OrderMngDetailComponent implements OnInit {
  

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