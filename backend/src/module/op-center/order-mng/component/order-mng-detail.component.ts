import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, PopupComponent, ConfirmComponent, SystemDictionaryService, SystemDictionary } from '../../../../architecture';


@Component({
  // moduleId: module.id,
  selector: 'order-mng-detail',
  templateUrl: '../template/order-mng-detail.component.html',
  styleUrls: ['../style/order-mng-detail.less'],
  providers: []
}) 
export class OrderMngDetailComponent implements OnInit {
  @ViewChild("notice")
  notice: NoticeComponent;

  @ViewChild("editEnt")
  editEnt: PopupComponent;

  @ViewChild("editQuota")
  editQuota: PopupComponent;

  @ViewChild("setupCert")
  setupCert: PopupComponent;

  @ViewChild("confirm")
  confirm: ConfirmComponent;

  private totalPages: number = 0;
  private currentPage: number = 0;
  private selectAllField: boolean = false;
  private criteria: string = "";

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private sysDicService: SystemDictionaryService,
    private restApiCfg:RestApiCfg,
    private restApi:RestApi
  ) {
    
  }

   ngOnInit() {
   }
}