import { Component, ViewChild, OnInit } from '@angular/core';

import { Router,ActivatedRoute, Params } from '@angular/router';

import { LayoutService,NoticeComponent,ConfirmComponent,Validation,ValidationRegs  } from '../../../../architecture';

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
        private layoutService : LayoutService,
        private v:Validation
    ) {
       this.v.result = {};
    }

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    account:AccountListModel=new AccountListModel();

    editMode:string;
    title:string;
    testResult:string;
    changebt=true;
   
    //accountId:string;

    ngOnInit (){
        this.activeRoute.params.forEach((params: Params) => {
            this.editMode = params["type"]; 
            this.account.id = params["id"];   
            console.log(this.editMode);   
             switch (this.editMode) {
                case "edit":
                    this.title = "ALI_CLOUD.EDIT_MAIN_ACCOUNT";
                    break;
                case "view":
                    this.title = "ALI_CLOUD.MAIN_ACCOUNT_DETAIL";
                    break;
                case "create":
                    this.title = "ALI_CLOUD.CREATE_MAIN_ACCOUNT";
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
        this.layoutService.hide();
        this.service.getAccount(id)
             .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.account = response["resultContent"];
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
        // if(!this.account.accessUrl){
        //     this.showAlert("请填写阿里云访问地址!");
        //     return;
        // }
        if(!this.account.accessKey){
            this.showAlert("ALI_CLOUD.PLEASE_INPUT_ACCESS_KEY");
            return;
        }
        if(!this.account.accessSecret){
            this.showAlert("ALI_CLOUD.PLEASE_INPUT_ACCESS_SECRET");
            return;
        }
        if((!this.changebt &&this.testResult=="1")  || this.changebt){      
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
        else{
            this.showAlert("ALI_CLOUD.ACCESS_INFO_ERROR");
            return;
        }
    }

    //添加账号
    createAccount(){
        if(!this.account.loginName){
            this.showAlert("ALI_CLOUD.PLEASE_INPUT_LOGIN_NAME");
            return;
        }
        // if(!this.account.accessUrl){
        //     this.showAlert("请填写阿里云访问地址!");
        //     return;
        // }
        if(!this.account.accessKey){
            this.showAlert("ALI_CLOUD.PLEASE_INPUT_ACCESS_KEY");
            return;
        }
        if(!this.account.accessSecret){
            this.showAlert("ALI_CLOUD.PLEASE_INPUT_ACCESS_SECRET");
            return;
        }
       if(!this.account.mainAccountType){
            this.showAlert("ALI_CLOUD.PLEASE_SELECT_ACCOUNT_TYPE");
            return;
        }    
        this.layoutService.show();
        if (this.testResult=="1") {
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
        else{
            this.showAlert("ALI_CLOUD.ACCESS_INFO_ERROR");
            return;
        }
    }

    changebtn():boolean{
      this.changebt=false;
     // this.changebt=true;
        return this.changebt;
    }

    //测试access信息
    testAccessInfo(){
        this.layoutService.hide();
        this.service.testAccessInfo(this.account)
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
                console.log("测试结果",this.testResult)
            }
        )
    }

    //跳转到账号列表
     gotoAccountList(){
           this.route.navigate([`ali-cloud/ali-cloud-mainAccount/ali-cloud-mainAccount-list`])
     }

     checkForm(key?:string) {
        let regs:ValidationRegs = {  //regs是定义规则的对象         
            username: [this.account.loginName, [this.v.isUnBlank, this.v.isBase], "用户名输入格式不正确"],
            url: [this.account.accessUrl, [this.v.isUnBlank, this.v.isUrl], "阿里云访问地址输入不正确"],
            accessKey: [this.account.accessKey, [this.v.isUnBlank, this.v.isBase], "access key id不正确"],
            accessSecret: [this.account.accessSecret, [this.v.isUnBlank,this.v.isBase], "access key secret不正确"],
            type: [this.account.mainAccountType, [this.v.isUnBlank], "账号类型不能为空"],
        }
        return this.v.check(key, regs);
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
