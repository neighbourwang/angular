import { Component, OnInit, ViewChild, Input,Output,EventEmitter} from '@angular/core';
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

   @Output() onSuccess = new EventEmitter();

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

  checkOSInfo(id:string){
    //跳转到管理信息详情
    this.onSuccess.emit(id);
    // this.router.navigateByUrl(`cloud-host-service/management-services-list/${id}`);
    // alert("跳转");
  }
}