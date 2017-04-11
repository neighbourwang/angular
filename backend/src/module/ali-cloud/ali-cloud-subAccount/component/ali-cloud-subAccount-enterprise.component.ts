import { Component, ViewChild, OnInit } from '@angular/core';

import { Router ,ActivatedRoute,Params} from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent  } from '../../../../architecture';

//model
//import{} from '../model/account.model';

//service
import { AliCloudSubAccountMngService} from '../service/ali-cloud-subAccount-mng.service'
@Component({
    selector: 'ali-cloud-subAccount-enterprise',
    templateUrl: '../template/ali-cloud-subAccount-enterprise.html',
    styleUrls: [],
    providers: []
})

export class AliCloudSubAccountEnterpriseComponent implements OnInit{

    constructor(
        private route : Router,
        private activeRoute:ActivatedRoute,
        private service : AliCloudSubAccountMngService,
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
           this.route.navigate([`ali-cloud/ali-cloud-subAccount/ali-cloud-subAccount-list`])
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
