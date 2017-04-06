import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent  } from '../../../../architecture';

//model

//service
import { AliCloudMainAccountMngService} from '../service/ali-cloud-mainAccount-list.service'

@Component({
    selector: 'ali-cloud-mainAccount-list',
    templateUrl: '../template/ali-cloud-mainAccount-list.html',
    styleUrls: [],
    providers: []
})

export class AliCloudMainAccountListComponent implements OnInit{

    constructor(
        private router : Router,
        private service : AliCloudMainAccountMngService,
        private layoutService : LayoutService
    ) {

    }

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    ngOnInit (){
        console.log('init');
        //this.layoutService.show();


    }
     //跳转管理子账号
     gotoSubAccountList(){
        this.router.navigate([`ali-cloud/ali-cloud-subAccount/ali-cloud-subAccount-list`])
    }

    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "NET_MNG_VM_DBT_PORT.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("NET_MNG_VM_DBT_PORT.GETTING_DATA_FAILED");
    }

}
