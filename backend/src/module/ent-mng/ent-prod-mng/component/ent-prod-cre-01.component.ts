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


const testData: any = [
    {
    "name":"标准小型云主机",
    "enterpriseName":"上海慧于有限公司",
    "regionName":"上海A区",
    "serviceName":"标准云主机_普通存储",
    "description":""
    },{
    "name":"标准小型云主机",
    "enterpriseName":"上海慧于有限公司",
    "regionName":"上海A区",
    "serviceName":"标准云主机_普通存储",
    "description":""
    }];

const testEnterprise: any = [
    {
     "name" : "上海慧于有限公司",
            "id": '0'
    },{
     "name" : "中国惠普有限公司",
            "id": '1'
    }];

const testRegion: any = [
    {
     "name" : "上海A区",
            "id": '0',
            "platformId":"0"
    },{
     "name" : "上海B区",
            "id": '1',
             "platformId":"0"
    },{
     "name" : "上海C区",
            "id": '2', 
            "platformId":"0"
    }];
    
const testService: any = [
    {
     "name" : "标准云主机_普通存储",
            "id": '0'
    },{
     "name" : "标准云主机_高级存储",
            "id": '1'
    }];

@Component({
	selector:'ent-prod-cre-01'
	,templateUrl:'../template/ent-prod-cre-01.component.html'
	,styleUrls:[]
	,providers:[]
})
export class EntProdCre01Component implements OnInit{	
  @ViewChild('notice')
  private noticeDialog: NoticeComponent;

  datas: ServiceDetail[];
  enterprises : Enterprise[];
  regions: Region[];
  serviceItems : Directory[];

  page : number = 1;
  size : number = 1000;
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

       if(this.serviceDetail.regionId == null){
          this.regionId = '2';
       }else{
          this.regionId = this.serviceDetail.regionId;
       }
      
        this.layoutService.setLoading(true);

    
        this.enterprises = testEnterprise;
        this.regions = testRegion;
        this.serviceItems = testService;
        
        this.layoutService.setLoading(false);
        //this.getEnterprises(this.page,this.size);
        //this.getRegions();
        //this.getDirectories(this.regionId);

    }

    cancel() {
        this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-mng");
    }

	next(){
        /*alert(this.serviceDetail.name);
        alert(this.serviceDetail.enterpriseId); 
         alert(this.serviceDetail.platformId); 
          alert(this.serviceDetail.serviceId);     
        alert(this.serviceDetail.description); */ 
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
            this.showNotice('数据获取失败', '企业数据获取失败。');
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
            this.showNotice('数据获取失败', '区域数据获取失败。');
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
            this.showNotice('数据获取失败', '服务目录数据获取失败。');
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