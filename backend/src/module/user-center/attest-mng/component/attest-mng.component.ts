import { Component, ViewChild, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, ValidationService,  NoticeComponent, ConfirmComponent, PopupComponent} from '../../../../architecture';

@Component({
    selector: 'attest-mng',
    templateUrl: '../template/attest-mng.component.html',
    styleUrls: [],
    providers: []
})

export class AttestMngComponent implements OnInit {
    constructor(
        private router: Router,
        // private ProdDirDetailService: ProdDirDetailService,
        // private ProdListService : ProdListService,
        // private ProdDirListService: ProdDirListService,
        // private PostProduct:PostProduct
    ) { }
    @ViewChild('publishConfirm')
    publishConfirm: ConfirmComponent;

    @ViewChild('ccPublishConfirm')
    ccPublishConfirm: ConfirmComponent;

    @ViewChild('deleteConfirm')
    deleteConfirm: ConfirmComponent;

    @ViewChild('notice')
    notice: NoticeComponent;

    // enterpriseList = new Array();
    // prodDirList = new Array();
    // prodDir = new ProductDir();
    // prodDirId:string;
    // product=new Product();   
    ngOnInit() {}
    //  action(order) {
    //     // let prodDirList: Array<Proddir> = this.getProddir();
    //     if (prodDirList.length < 1) {
    //         this.notice.open('操作错误', '请选择产品目录');
    //     } else {
    //         let message: string = '';
    //         for (let dir of prodDirList) {
    //             message += dir.serviceName + ",";
    //         }
    //         console.log(message);
    //         message = message.substring(0, message.length - 1);
    //         switch (order) {
    //             case 'delete': this.deleteConfirm.open('删除产品目录', '您选择删除 ' + "'" + message + "'" + '产品,请确认；如果确认，此产品目录的数据将不能恢复。')
    //                 break;
    //             case 'publish': this.publishConfirm.open('发布产品目录', '您选择发布 ' + "'" + message + "'" + '产品,请确认。')
    //                 break;
    //             case 'ccPublish': this.ccPublishConfirm.open('取消发布产品目录', '您选择取消发布' + "'" + message + "'" + '产品,请确认。如果确认，此产品目录将不能用来创建产品。')
    //                 break;
    //         }

    //     }
    // };
    //编辑账号
    onEdit(){
        this.router.navigate(['user-center/attest-mng/attest-source-cre',2,'edit'])
    }
    //编辑认证源账户
    onEditAcc(){
        this.router.navigate(['user-center/attest-mng/attest-source-cre',3,'editAcc'])
    }
    creation(){
        this.router.navigate(['user-center/attest-mng/attest-source-cre',1,'new'])
    }    
    ccf(){

    }
}