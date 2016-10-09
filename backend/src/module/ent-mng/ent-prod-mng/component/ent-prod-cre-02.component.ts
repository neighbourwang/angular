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
	selector:'ent-prod-cre-02'
	,templateUrl:'../template/ent-prod-cre-02.component.html'
	,styleUrls:[]
	,providers:[]
})
export class EntProdCre02Component implements OnInit{

  @ViewChild('notice')
  private noticeDialog: NoticeComponent;

  platformId : string;
  storages : Storage[];
     modalCategory: string = '';
  modalTitle: string = '';
  modalMessage: string = '';
  modalOKTitle: string = '';
  modalCancelTitle: string = '';

	constructor(
		 private entProdCreService: EntProdCreService,
        private layoutService: LayoutService,
        private serviceDetail: ServiceDetail,
		private router: Router
		){

	}
	ngOnInit(){

        this.getStorages(this.platformId);
    }
    cancel() {
        this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-mng");
    }

	next(){
      	this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-cre-03");
	}

	prev(){
      	this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-cre-01");
    }

    
   getStorages(platformId:string) {
    	this.layoutService.setLoading(true);
  
    	this.entProdCreService
        .getStorages(platformId)
        .then(ret => {
            if (!ret) {
                this.showNotice('数据获取失败', '所有可用区数据获取失败。');
            } else {
                if (ret && ret.resultContent) {
                  this.storages = ret.resultContent;
                  this.serviceDetail = ret.resultContent;
                  //this.entProdCreService.cachedStorages = ret.resultContent;
                }
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showNotice('数据获取失败', '所有可用区数据获取失败。');
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