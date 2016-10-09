import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';
import { EntProdCreService } from '../service/ent-prod-cre.service';

//import {ServiceDetail,Region,Industry,Storage,Directory} from '../model';
import { ServiceDetail } from '../model/ServiceDetail.model';
import {Enterprise} from '../model/enterprise.model';
import {Region} from '../model/region.model';
import {Storage} from '../model/storage.model';
import {Directory} from '../model/directory.model';

@Component({
	selector:'ent-prod-cre-03'
	,templateUrl:'../template/ent-prod-cre-03.component.html'
	,styleUrls:[]
	,providers:[]
})
export class EntProdCre03Component implements OnInit{

@ViewChild('notice')
  private noticeDialog: NoticeComponent;

  serviceDetail: ServiceDetail;
  regions: Region[];
  page : number = 1;
  size : number = 300;
  platformId : string ;

  modalCategory: string = '';
  modalTitle: string = '';
  modalMessage: string = '';
  modalOKTitle: string = '';
  modalCancelTitle: string = '';

	constructor(
		private entProdCreService: EntProdCreService,
        private layoutService: LayoutService,
		private router: Router
		){

	}
	ngOnInit(){}

    cancel() {
        this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-mng");
    }

    next() {
        alert("创建产品");
    }

    prev() {
        this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-cre-02");
    }


 createProd() {
    this.layoutService.setLoading(true);
  
    this.entProdCreService
        .createProd(this.platformId, this.serviceDetail)
        .then(ret => {
            if (!ret) {
                this.showNotice('创建失败', '服务目录创建失败。');
            } else {
               // this.goBack();
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showNotice('创建失败', '服务目录创建失败。');
            this.layoutService.setLoading(false);
        });
  }
   showNotice(title: string, msg: string) {
    	this.modalTitle = title;
    	this.modalMessage = msg;
    	this.modalOKTitle = 'OK';
    	this.noticeDialog.open();
  }
}