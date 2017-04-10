import { Component, ViewChild, OnInit } from '@angular/core';

import { Router,ActivatedRoute,Params } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent  } from '../../../../architecture';

//model
import{AccountListModel} from '../model/account-list.model';
//service
import { AliCloudSubAccountMngService} from '../service/ali-cloud-subAccount-mng.service'

@Component({
    selector: 'ali-cloud-subAccount-list',
    templateUrl: '../template/ali-cloud-subAccount-list.html',
    styleUrls: [],
    providers: []
})

export class AliCloudSubAccountListComponent implements OnInit{

    constructor(
        private route : Router,
        private service : AliCloudSubAccountMngService,
        private layoutService : LayoutService
    ) {

    }

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

     type: string;
     accountList:Array<AccountListModel>;

    ngOnInit (){
        console.log('init');
        


    }

    //获取子账号列表
    getAccountList(){
        this.layoutService.hide();
        this.service.getSubAccounts() 
        .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.accountList=response["resultContent"];
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));      
    }

    //跳转添加子账号
    createAccount(){
        this.route.navigate([`ali-cloud/ali-cloud-subAccount/ali-cloud-mainAccount-edit`,{type:this.type}])
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
