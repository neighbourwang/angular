import { Component, ViewChild, OnInit } from '@angular/core';

import { Router,ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent  } from '../../../../architecture';

//model
import{AccountModel} from '../model/account.model';
import{AccountListModel} from '../model/account-list.model';
//service
import { AliCloudMainAccountEditService} from '../service/ali-cloud-mainAccount-edit.service'

@Component({
    selector: 'ali-cloud-mainAccount-edit',
    templateUrl: '../template/ali-cloud-mainAccount-edit.html',
    styleUrls: [],
    providers: []
})

export class AliCloudMainAccountEditComponent implements OnInit{

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

    account:AccountListModel=new AccountListModel();

    editMode:string;
    title:string;
    //accountId:string;

    ngOnInit (){
        this.activeRoute.params.forEach((params: Params) => {
            this.editMode = params["type"]; 
            this.account.id = params["id"];   
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
        if (this.account.id) {
                    this.getAccount(this.account.id);
                } else {
                    this.account=new AccountListModel();
                }
    }
    //获取账号信息
    getAccount(id:string){
        this.layoutService.hide();
        this.service.getAccount(id)
             .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.account = response["resultContent"].find((e)=>{return e.id ==this.account.id});
                        console.log("主账号信息",this.account);
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    //编辑账号
    editAccount(){
        this.layoutService.hide();
        this.service.editAccount(this.account)
        .then(
            response=>{ 
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.gotoAccountList();
                } 
                else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
        )
        .catch((e) => this.onRejected(e));
    }

    //添加账号
    createAccount(){
        this.layoutService.hide();
        if (!this.account.loginName) {
            this.showAlert("");
            return false;
        }
        if (!this.account.loginName) {
            this.showAlert("");
            return false;
        }
        if (!this.account.loginName) {
            this.showAlert("");
            return false;
        }
        if (!this.account.loginName) {
            this.showAlert("");
            return false;
        }
        if (!this.account.loginName) {
            this.showAlert("");
            return false;
        }
        this.service.createAccount(this.account)
        .then(
            response=>{ 
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.gotoAccountList();
                } 
                else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
        )
        .catch((e) => this.onRejected(e));
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
