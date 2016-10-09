import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent } from '../../../../architecture';
import { EntProdCreService } from '../service';

import {ServiceDetail,Region,Industry,Storage,Directory} from '../model';


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
	    private EntProdCreService: entProdCreService,
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

	
  	getRegions() {
    	this.layoutService.setLoading(true);
  
    	this.directoryService
        .getRegions()
        .then(ret => {
            if (!ret) {
                this.showNotice('数据获取失败', '地区数据获取失败。');
            } else {
                if (ret && ret.resultContent) {
                  this.regions = ret.resultContent;
                  this.directoryCreateService.cachedRegions = ret.resultContent;
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
  
    	this.directoryService
        .getRegions()
        .then(ret => {
            if (!ret) {
                this.showNotice('数据获取失败', '地区数据获取失败。');
            } else {
                if (ret && ret.resultContent) {
                  this.regions = ret.resultContent;
                  this.directoryCreateService.cachedRegions = ret.resultContent;
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

    }

}