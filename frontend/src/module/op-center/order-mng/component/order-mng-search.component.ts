import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';
import { OrderDetailItem } from '../model';

@Component({
  // moduleId: module.id,
  selector: 'order-mng-search',
  templateUrl: '../template/order-mng-search.component.html',
  styleUrls: ['../style/order-mng-search.less'],
  providers: []
}) 
export class OrderMngSearchComponent implements OnInit {
  

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private restApiCfg:RestApiCfg,
    private restApi:RestApi
  ) {
   
  }

  ngOnInit() {
   
  }

  	onCreateTimeChange($event){
		
	}

	onExpireTimeChange($event){
		
	}


}