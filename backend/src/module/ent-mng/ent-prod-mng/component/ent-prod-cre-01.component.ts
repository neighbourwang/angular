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
	selector:'ent-prod-cre-01'
	,templateUrl:'../template/ent-prod-cre-01.component.html'
	,styleUrls:[]
	,providers:[]
})
export class EntProdCre01Component implements OnInit{

	
  @ViewChild('notice')
  private noticeDialog: NoticeComponent;

  enterprises : Enterprise[];
  regions: Region[];
  serviceItems : Directory[];

  page : number = 1;
  size : number = 300;
  regionId : string ;

  modalCategory: string = '';
  modalTitle: string = '';
  modalMessage: string = '';
  modalOKTitle: string = '';
  modalCancelTitle: string = '';

	constructor(
	    private entProdCreService: EntProdCreService,
        private serviceDetail: ServiceDetail,
        private layoutService: LayoutService,
		private router: Router
		){

	}
	ngOnInit(){
        this.getEnterprises(this.page,this.size);
        this.getRegions();
        this.getDirectories(this.regionId);

    }

    cancel() {
        this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-mng");
    }

	next(){
      	this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-cre-02");
	}



    //企业
    getEnterprises(page:number,size:number){

		this.layoutService.setLoading(true);
  
    	this.entProdCreService.
        getEnterprises(page,size)
        .then(ret => {
            if (!ret) {
                this.showNotice('数据获取失败', '企业数据获取失败。');
            } else {
                if (ret && ret.resultContent) {
                  this.enterprises = ret.resultContent;
                  this.serviceDetail = ret.resultContent;
                  //this.entProdCreService.cashedEnterprise = ret.resultContent;
                }
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showNotice('数据获取失败', '地区数据获取失败。');
            this.layoutService.setLoading(false);
        });
    }
    //区域
    getRegions() {
    	this.layoutService.setLoading(true);
  
    	this.entProdCreService
        .getRegions()
        .then(ret => {
            if (!ret) {
                this.showNotice('数据获取失败', '区域数据获取失败。');
            } else {
                if (ret && ret.resultContent) {
                  this.regions = ret.resultContent;
                  this.serviceDetail = ret.resultContent;
                  //this.entProdCreService.cachedRegions = ret.resultContent;
                  
                }
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showNotice('数据获取失败', '地区数据获取失败。');
            this.layoutService.setLoading(false);
        });
  }
	
  	
   //服务目录
    getDirectories(regionId:string) {
    	this.layoutService.setLoading(true);
  
    	this.entProdCreService
        .getDirectories(regionId)
        .then(ret => {
            if (!ret) {
                this.showNotice('数据获取失败', '服务目录数据获取失败。');
            } else {
                if (ret && ret.resultContent) {
                  this.serviceItems = ret.resultContent;
                  this.serviceDetail = ret.resultContent;
                  //this.entProdCreService.cashedDirectory = ret.resultContent
                }
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showNotice('数据获取失败', '地区数据获取失败。');
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