import { Component, ViewChild, OnInit } from '@angular/core';

import { Router,ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent  } from '../../../../architecture';

//model
//import{AccountModel} from '../model/account.model';

//service
//import { AliCloudMainAccountEditService} from '../service/ali-cloud-mainAccount-edit.service'

@Component({
    selector: 'ali-cloud-subAccount-edit',
    templateUrl: '../template/ali-cloud-subAccount-edit.html',
    styleUrls: [],
    providers: []
})

export class AliCloudMainAccountEditComponent implements OnInit{

    constructor(
        private route : Router,
        private activeRoute:ActivatedRoute,
        //private service : AliCloudMainAccountEditService,
        private layoutService : LayoutService
    ) {

    }

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    //account:AccountModel=new AccountModel();

    editMode:string;
    title:string;

    ngOnInit (){
        this.activeRoute.params.forEach((params: Params) => {
            this.editMode = params["type"];  
            console.log(this.editMode);   
             switch (this.editMode) {
                case "edit":
                    this.title = "编辑主账号";
                    break;
                case "view":
                    this.title = "主账号详情";
                    break;
                case "create":
                    this.title = "添加主账号";
                    break;
            } 
        }); 
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
