import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';
import { EntProdMngService } from '../service/ent-prod-mng.service';

import { EntProdMngTemplate } from '../model/ent-prod-mng.model';

@Component({
	selector:'ent-prod-mng'
	,templateUrl:'../template/ent-prod-mng.component.html'
	,styleUrls:[]
	,providers:[]
})
export class EntProdMngComponent implements OnInit{

  @ViewChild('confirm')
  private confirmDialog: ConfirmComponent;

  @ViewChild('notice')
  private noticeDialog: NoticeComponent;

	datas: EntProdMngTemplate[];

	modalCategory: string = '';
    modalTitle: string = '';
    modalMessage: string = '';
    modalOKTitle: string = '';
   	modalCancelTitle: string = '';

	constructor(
    private entProdMngService: EntProdMngService,
    private layoutService: LayoutService,
    private router: Router 
  ) {}

  
	ngOnInit(){

	 this.getDatas();
	}
       //页面上的操作

    creation() {
        this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-cre-01");
    }

   getDatas() {
    	this.layoutService.setLoading(true);
  
    	this.entProdMngService
        .getDatas()
        .then(ret => {
            if (!ret) {
                this.showNotice('数据获取失败', '服务模板数据获取失败。');
            } else {
                if (ret && ret.resultContent) {
                  this.datas = ret.resultContent;
                }
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showNotice('数据获取失败', '服务模板数据获取失败。');
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