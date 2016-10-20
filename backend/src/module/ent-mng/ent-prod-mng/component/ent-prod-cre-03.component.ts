import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';
import { EntProdCreService } from '../service/ent-prod-cre.service';

import { EntProdMngServiceDetail, Enterprise, Region, Directory } from '../model';



@Component({
    selector: 'ent-prod-cre-03',
    templateUrl: '../template/ent-prod-cre-03.component.html',
    styleUrls: [],
    providers: []
})

export class EntProdCre03Component implements OnInit{
    @ViewChild('notice')
    private noticeDialog: NoticeComponent;

    regions: Region[];
    page : number = 1;
    size : number = 300;

    modalTitle: string = '';
    modalMessage: string = '';

	constructor(
        private entProdCreService: EntProdCreService,
        private serviceDetail: EntProdMngServiceDetail,
        private layoutService: LayoutService,
        private router: Router
    ) { }

	ngOnInit(){
    }

    // 取消
    cancel() {
        this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-mng");
    }

    // 创建产品
    next() {
        this.createProd();
    }

    // 上一步
    prev() {
        this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-cre-02");
    }

    // 切换计价周期
    periodType(type: String) {
        this.serviceDetail.periodType = type;
    }

    // 创建产品
    createProd() {
        this.layoutService.show();
  
        this.entProdCreService.createProd(this.serviceDetail).then(ret => {
            if (!ret) {
                this.showNotice('创建失败', '产品创建失败。');
            } else {
                this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-mng");
            }

            this.layoutService.hide();
        }).catch(error => {
            this.showNotice('创建失败', '产品创建失败。');
            this.layoutService.hide();
        });
        
    }

    // 显示错误信息
    showNotice(title: string, msg: string) {
        this.modalTitle = title;
        this.modalMessage = msg;

        this.noticeDialog.open();
    }
}