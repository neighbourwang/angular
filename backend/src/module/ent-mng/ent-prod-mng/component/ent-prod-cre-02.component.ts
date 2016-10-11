import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';
import { EntProdCreService } from '../service/ent-prod-cre.service';

//import {ServiceDetail,Region,Industry,Storage,Directory} from '../model';
import { ServiceDetail,StorageInfo } from '../model/ServiceDetail.model';
import {Enterprise} from '../model/enterprise.model';
import {Region} from '../model/region.model';
import {Storage} from '../model/storage.model';
import {Directory} from '../model/directory.model';



const testStorages: any = [
    {
    "name":"标准小型云主机",
    "id":"1",
    "description":"上海A区",
    "disk":"标准云主机_普通存储",
    "selected":false,
    "added":false
    },{
    "name":"标准小型云主机",
    "id":"2",
    "description":"上海A区",
    "disk":"标准云主机_普通存储",
     "selected":false,
    "added":false
    },{
    "name":"标准小型云主机",
    "id":"3",
    "description":"上海A区",
    "disk":"标准云主机_普通存储",
     "selected":false,
    "added":false
    },{
    "name":"标准小型云主机",
    "id":"4",
    "description":"上海A区",
    "disk":"标准云主机_普通存储",
     "selected":false,
    "added":false
    }];

@Component({
	selector:'ent-prod-cre-02'
	,templateUrl:'../template/ent-prod-cre-02.component.html'
	,styleUrls:[
     '../style/product.css'
  ]
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
          this.storages = [];
          this.platformId = this.serviceDetail.platformId;
         //this.getStorages(this.platformId);

        if (this.entProdCreService.cachedStorages && this.entProdCreService.cachedStorages.length > 0) {
            this.storages = this.entProdCreService.cachedStorages;
    } else {
          this.getStorages(this.platformId);
    }
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
             alert("企业Id"+this.serviceDetail.enterpriseId);
      	this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-cre-03");
	}

	prev(){
      	this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-cre-01");
    }

    
   getStorages(platformId:string) {
     this.storages = testStorages;
     //this.serviceDetail.storages = testStorages;
   
    	/*this.layoutService.setLoading(true);
  
    	this.entProdCreService
        .getStorages(platformId)
        .then(ret => {
            if (!ret) {
                this.showNotice('数据获取失败', '所有可用区数据获取失败。');
            } else {
                if (ret && ret.resultContent) {
                  this.storages = ret.resultContent;
                  this.storages.map(n=>
                  {n.selected = false;
                    n.added = false;
                    });
                  this.serviceDetail = ret.resultContent;
                  //this.entProdCreService.cachedStorages = ret.resultContent;
                }
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showNotice('数据获取失败', '所有可用区数据获取失败。');
            this.layoutService.setLoading(false);
        });*/
  }

  
  
   showNotice(title: string, msg: string) {
    	this.modalTitle = title;
    	this.modalMessage = msg;
    	this.modalOKTitle = 'OK';
    	this.noticeDialog.open();
  }

   getOrgStorages(): Storage[] {
     //alert("getOrgStorages");
    //  return testStorages;
    return this.getStoragesByType(false);
  }

  getAddedStorages(): Storage[] {
     //a//lert("getAddedStorages");
     //return testStorages;
       return this.getStoragesByType(true);
  }

  getStoragesByType(addFlg: boolean): Storage[] {
    let list = [];

    for (let storage of this.storages) {
      if (storage.added == addFlg) {
        list.push(storage);
      }
    }

    return list;
  }

  selectStorage(storage: Storage, index: number) {
    this.storages.map(n=>{n.selected = false;});
   // testStorages2.map(n=>{n.selected = false;});//数据源设置选中设置为false
    storage.selected = true;
  }


  addStorage() {
    alert("addStorage");
    let storage2 ;
     for (let storage of this.storages) {
      if (storage.selected == true) {
            storage.added = true;
            storage.selected = false;
            storage2 = storage;
      }
    }


    let storageInfo = new StorageInfo();
    storageInfo.storageId = storage2.id;
    storageInfo.name = storage2.name;
    storageInfo.description = storage2.description;

    this.serviceDetail.storages.push(storageInfo);
  }

  removeStorage() {
     // alert("removeStorage");
    let storage2 ;
     for (let storage of this.storages) {
      if (storage.selected == true) {
            storage.added = false;
            storage.selected = false;
            storage2 = storage;
      }
    }


    for (let j=0; j<this.serviceDetail.storages.length; j++){
      let storageInfo = this.serviceDetail.storages[j];

      if (storageInfo.storageId == storage2.id) {
        this.serviceDetail.storages.splice(j, 1);
        break;
      }
    }
  }
}