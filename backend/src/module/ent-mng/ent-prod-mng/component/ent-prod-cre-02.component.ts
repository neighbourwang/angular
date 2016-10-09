import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent } from '../../../../architecture';

@Component({
	selector:'ent-prod-cre-02'
	,templateUrl:'../template/ent-prod-cre-02.component.html'
	,styleUrls:[]
	,providers:[]
})
export class EntProdCre02Component implements OnInit{
	constructor(
		private router: Router
		){

	}
	ngOnInit(){}
    cancel() {
        this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-mng");
    }

	next(){
      	this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-cre-03");
	}

	prev(){
      	this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-cre-01");
    }

    
   /* 
    所有可用区
    getZones() {
    this.layoutService.setLoading(true);
  
    this.directoryCreateService
        .getZones(PlatformId)
        .then(ret => {
            if (!ret) {
                this.showNotice('数据获取失败', '可用区数据获取失败。');
            } else {
                if (ret && ret.resultContent) {
                    this.zones = ret.resultContent;
                    this.directoryCreateService.cachedZones = ret.resultContent;
                    this.resetSelectStatus();
                }
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showNotice('数据获取失败', '可用区数据获取失败。');
            this.layoutService.setLoading(false);
        });
  }*/
}