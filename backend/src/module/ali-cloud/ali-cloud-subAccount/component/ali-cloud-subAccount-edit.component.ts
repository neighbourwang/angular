import { Component, ViewChild, OnInit } from '@angular/core';

import { Router,ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent,Validation,ValidationRegs } from '../../../../architecture';

//model
import{AccountListModel} from '../model/account-list.model';

//service
import { AliCloudSubAccountEditService} from '../service/ali-cloud-subAccount-edit.service'

@Component({
    selector: 'ali-cloud-subAccount-edit',
    templateUrl: '../template/ali-cloud-subAccount-edit.html',
    styleUrls: [],
    providers: []
})

export class AliCloudSubAccountEditComponent implements OnInit{

    constructor(
        private route : Router,
        private activeRoute:ActivatedRoute,
        private service : AliCloudSubAccountEditService,
        private layoutService : LayoutService,
         private v:Validation
    ) { this.v.result = {};}

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    account:AccountListModel=new AccountListModel();

    editMode:string;
    mainAccountId:string;
    title:string;
    testResult:string;
    changebt=true;

    ngOnInit (){
        this.activeRoute.params.forEach((params: Params) => {
            this.editMode = params["type"]; 
            this.account.id = params["id"];
            this.mainAccountId = params["mainId"];   
            console.log(this.editMode);   
             switch (this.editMode) {
                case "edit":
                    this.title = "ALI_CLOUD.EDIT_SUB_ACCOUNT";
                    break;
                case "view":
                    this.title = "ALI_CLOUD.SUB_ACCOUNT_DETAIL";
                    break;
                case "create":
                    this.title = "ALI_CLOUD.ADD_SUB_ACCOUNT";
                    break;
            } 
        }); 
         if (this.account.id) {
             this.getAccount(this.account.id);
        } 
        else {
            this.account=new AccountListModel();
        }
    }

    //获取账号信息
    getAccount(id:string){
        this.layoutService.show();
        this.service.getAccount(id)
             .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.account = response["resultContent"];
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

     //编辑账号
    editAccount(){
        if(!this.account.accessKey){
             this.showAlert("ALI_CLOUD.PLEASE_INPUT_ACCESS_KEY");
            return;
        }
        if(!this.account.accessSecret){
            this.showAlert("ALI_CLOUD.PLEASE_INPUT_ACCESS_SECRET");
            return;
        }
        this.layoutService.show();
         if((!this.changebt &&this.testResult=="1")  || this.changebt){                 
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
        else{
            this.showAlert("ALI_CLOUD.ACCESS_INFO_ERROR");
            return false;
        }
    }

    //添加账号
    createAccount(){
        if(!this.account.loginName){
            this.showAlert("ALI_CLOUD.PLEASE_INPUT_SUB_ACCOUNT_LOGIN_NAME");
            return;
        }
        if(!this.account.accessKey){
             this.showAlert("ALI_CLOUD.PLEASE_INPUT_ACCESS_KEY");
            return;
        }
        if(!this.account.accessSecret){
           this.showAlert("ALI_CLOUD.PLEASE_INPUT_ACCESS_SECRET");
            return;
        }
        this.layoutService.show();
        if (this.testResult=="1") {
            this.service.createAccount(this.account,this.mainAccountId)
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
        else{
             this.showAlert("ALI_CLOUD.ACCESS_INFO_ERROR");
            return false;
        }
    }

    //测试access信息
    testAccessInfo(){
         this.testResult ="";
        this.layoutService.show();
        this.service.testAccessInfo(this.account,this.mainAccountId)
        .then(
            response=>{
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.testResult="1";
                } 
                else {
                   this.testResult="0";
                }
            }
        )
    }
      changebtn():boolean{
        this.changebt=false;
        return this.changebt;
    }

     checkForm(key?:string) {
        let regs:ValidationRegs = {  //regs是定义规则的对象         
            username: [this.account.loginName, [this.v.isUnBlank, this.v.isBase], "用户名输入格式不正确"],
            accessKey: [this.account.accessKey, [this.v.isUnBlank, this.v.isBase], "access key id不正确"],
            accessSecret: [this.account.accessSecret, [this.v.isUnBlank,this.v.isBase], "access key secret不正确"],
        }
        return this.v.check(key, regs);
    }


    //跳转到账号列表
     gotoAccountList(){
           this.route.navigate([`ali-cloud/ali-cloud-subAccount/ali-cloud-subAccount-list`,{id:this.mainAccountId}])
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
