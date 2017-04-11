import { Component, ViewChild, OnInit } from '@angular/core';

import { Router ,ActivatedRoute,Params} from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent  } from '../../../../architecture';

//model
//import{} from '../model/account.model';

//service
import { AliCloudMainAccountEditService} from '../service/ali-cloud-mainAccount-edit.service'
@Component({
    selector: 'ali-cloud-mainAccount-enterprise',
    templateUrl: '../template/ali-cloud-mainAccount-enterprise.html',
    styleUrls: [],
    providers: []
})

export class AliCloudMainAccountEnterpriseComponent implements OnInit{

    constructor(
        private route : Router,
        private activeRoute:ActivatedRoute,
        private service : AliCloudMainAccountEditService,
        private layoutService : LayoutService
    ) {

    }

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    ngOnInit (){
       
    }

    //跳转到账号列表
     gotoAccountList(){
           this.route.navigate([`ali-cloud/ali-cloud-mainAccount/ali-cloud-mainAccount-list`])
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
