import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';
import { EntProdCreService } from '../service/ent-prod-cre.service';

//import {ServiceDetail,Region,Industry,Storage,Directory} from '../model';
import { ServiceDetail } from '../model/ServiceDetail.model';
import {Industry} from '../model/industry.model';
import {Region} from '../model/region.model';
import {Storage} from '../model/storage.model';
import {Directory} from '../model/directory.model';

@Component({
	selector:'ent-prod-cre-01'
	,templateUrl:'../template/ent-prod-cre-01.component.html'
	,styleUrls:[]
	,providers:[]
})
export class EntProdCre01Component implements OnInit{

	
  @ViewChild('notice')
  private noticeDialog: NoticeComponent;

  serviceDetail: ServiceDetail;
  regions: Region[];

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

	next(){
      	this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-cre-02");
	}

	
  	/*getRegions() {
    	this.layoutService.setLoading(true);
  
    	this.entProdCreService
        .getRegions("a")
        .then(ret => {
            if (!ret) {
                this.showNotice('数据获取失败', '地区数据获取失败。');
            } else {
                if (ret && ret.resultContent) {
                  this.regions = ret.resultContent;
                  this.entProdCreService.cachedRegions = ret.resultContent;
                  if (this.serviceDetail.regionId == '') {
                      this.serviceDetail.regionId = this.regions[0] ? this.regions[0].id : '';
                  }
                }
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showNotice('数据获取失败', '地区数据获取失败。');
            this.layoutService.setLoading(false);
        });
  }

    getIndustry(){
		this.layoutService.setLoading(true);
  
    	this.entProdCreService
        .getRegions()
        .then(ret => {
            if (!ret) {
                this.showNotice('数据获取失败', '地区数据获取失败。');
            } else {
                if (ret && ret.resultContent) {
                  this.regions = ret.resultContent;
                  this.entProdCreService.cachedRegions = ret.resultContent;
                  if (this.serviceDetail.regionId == '') {
                      this.serviceDetail.regionId = this.regions[0] ? this.regions[0].id : '';
                  }
                }
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showNotice('数据获取失败', '地区数据获取失败。');
            this.layoutService.setLoading(false);
        });
    }

    getDirectory(){

    }*/
        showNotice(title: string, msg: string) {
    	this.modalTitle = title;
    	this.modalMessage = msg;
    	this.modalOKTitle = 'OK';
    	this.noticeDialog.open();
  }

}