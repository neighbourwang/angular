import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from "../../../../architecture";

import { AccountMngCrAdComponent } from "./account-mng-cr-ad.component";
import { AccountMngCrLocalComponent } from "./account-mng-cr-local.component";
import { AccountMngEditAdComponent } from "./account-mng-edit-ad.component";

import { AccountMngService } from "../service/account-mng.service";

import { Account } from "../model/account.model";

@Component({
    // selector: 'account-mng-list',
    templateUrl: "../template/account-mng-list.component.html",
    styleUrls: [],
    providers: []
})
export class AccountMngListComponent implements OnInit {

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("crLocal")
    private crLocal: AccountMngCrLocalComponent;

    @ViewChild("crAdCount")
    private crAd: AccountMngCrAdComponent;

    @ViewChild("editAd")
    private editAd: AccountMngEditAdComponent;

    @ViewChild("confirm")
    private confirm: ConfirmComponent;


    @ViewChild("creAccount")
    private createAccountPopUp: PopupComponent;


    @ViewChild("crLocalAccount")
    private createLocalAccountPopUp: PopupComponent;

    @ViewChild("crAdAccount")
    private createAdAccountPopUp: PopupComponent;


    @ViewChild("editAdAccount")
    private editAdAccountPopUp: PopupComponent;

    constructor(
        private layoutService: LayoutService,
        private router: Router,
        private service: AccountMngService
    ) {
    }

    ngOnInit() {
        this.getAccountList(1, this.pp);
        this.getRole();
        this.getOrg();
        if (this.service.userInfo.isAD) {
            this.getAttest();
        }
    }

    //关键字搜索
    keyword: string;
    //判断 修改 还是 新建
    isEdit: boolean;
    //confirm得title
    confirmTitle = "";
    //confirm得信息
    confirmMessage = "";
    //获取当前得confirm类型 判断操作
    confirmType: number;

    accounts = new Array<Account>();

    accountId: string;

    //获取账户列表
    getAccountList(page: number, size: number) {
        this.layoutService.show();
        this.service.getAccountList(page, size)
            .then(
            res => {
                console.log(res);
                this.accounts = res.resultContent;
                this.tp = res.pageInfo.totalPage;
                this.isMybody();
                this.layoutService.hide();
            }
            )
            .catch(
            err => {
                console.error(err);
                this.layoutService.hide();
            }
            );
    }
    //判断是否是本人账户
    isMybody(){
        let myId=JSON.parse(sessionStorage['userInfo']).userId;
        console.log(myId);
        for(let acc of this.accounts){
            if(acc.id==myId){
             acc.isMybody=true;
             console.log(this.accounts);             
            }
        }
    }

    //获取角色列表0
    getRole() {
        this.layoutService.show();
        this.service.getRoleList()
            .then(response => {
                this.layoutService.hide();
            })
            .catch((e) => this.onRejected(e));
    }

    //获取组织列表
    getOrg() {
        this.layoutService.show();
        this.service.getOrgList(1, 9999)
            .then(response => {
                this.layoutService.hide();
            })
            .catch((e) => this.onRejected(e));
    }

    //获取组织列表
    getAttest() {
        this.layoutService.show();
        this.service.getAttests(1, 9999)
            .then(response => {
                this.layoutService.hide();
            })
            .catch((e) => this.onRejected(e));
    }

    //保存本地账号
    save() {
        this.crLocal.save()
            .then(
            res => {
                console.log(res);
                this.accounts = [];
                this.createLocalAccountPopUp.close();
                this.getAccountList(1, this.pp);
            }
            )
            .catch(
            err => {
                console.error("err");
            }
            );
    }

    //搜索
    search() {
        console.log("seach", this.keyword);
        this.service.searchAccountByName(1, 9999, this.keyword).then(
            res => {
                console.log(res);
                this.accounts = res.resultContent;
                if(this.accounts.length==0){
                    this.notice.open('',"未找到跟 '"+this.keyword+"' 相关的账户信息");
                }else{
                    this.isMybody();                                    
                }
                this.tp = res.pageInfo.totalPage;
            }
        )
            .catch(
            err => {
                console.error(err);
            }
            );
    }
    accountType = "1";
    isActive: boolean = false;
    //创建
    create() {
        if (this.service.userInfo && this.service.userInfo.isAD) {
            this.crAd.clearData();
            this.createAdAccountPopUp.open("USER_CENTER.CREATE_MANAGER_ACCOUNT");
        } else {
            this.isEdit = false;            
            
            this.isActive = false;
            window.setTimeout(() => {
                
                this.isActive = true;
                this.createLocalAccountPopUp.open("USER_CENTER.CREAT_A_LOCAL_ACCOUNT");
            }, 0);
        }
        //this.createAccountPopUp.open("创建帐号");
    }

    //
    
    // otCreate() {

    //     this.createAccountPopUp.close();
    //     console.log(this.accountType);
    //     if (this.accountType == "1") {
    //         this.isEdit = false;
    //         this.createLocalAccountPopUp.open("创建本地账号");
           

    //     } else {
    //         window.setTimeout(() => {
    //             this.crAd.clearData();
    //             this.createAdAccountPopUp.open("创建AD账号");
    //         },
    //             510);
    //     }


    // }

    //修改
    editId: string;

    edit(account) {
        console.log(account);
        this.isEdit = true;
        if (account.type == 0) { //0 本地  ,1 AD            
            this.isActive = false;
            window.setTimeout(() => {
                this.isActive = true;
                this.editId = account.id;
                this.createLocalAccountPopUp.open("USER_CENTER.EDIT_LOCAL_ACCOUNT");
                
            }, 0);
        } else {
            this.editId = "";
            window.setTimeout(() => {
                this.editId = account.id;
                this.editAdAccountPopUp.open("USER_CENTER.EDIT_MANAGER_ACCOUNT");
            }, 0);
           
        }
    }

    //启用
    enable(account, index) {
        if(account.status==1){
            this.notice.open('COMMON.OPERATION_ERROR','USER_CENTER.ACCOUNT_STATUS_IS_ENABLED');
            return;
        }
        this.confirmTitle = "USER_CENTER.ENABLE_ACCOUNT";
        const accountName = account.userName;
        this.accountId = account.id;
        this.confirmMessage = `USER_CENTER.YOU_SELECT_ENABLE_PLEASE_CONFIRM^^^${accountName}`;
        this.confirmType = 1;
        this.confirm.open();
    }

    //禁用
    disable(account, index) {
        if(account.status==5){
            this.notice.open('COMMON.OPERATION_ERROR','USER_CENTER.ACCOUNT_STATUS_IS_DISABKED');
            return;
        }
        this.confirmTitle = "USER_CENTER.DISABKE_ACCOUNT";
        const accountName = account.userName;
        this.accountId = account.id;
        this.confirmMessage = `USER_CENTER.YOU_SELECT_DISENABLE_PLEASE_CONFIRM_INSTITUTIONAL_MEMBERS_WILL_NOT_BE_ABLE_TO_OPERATE_RELATED_RESOURCES^^^${accountName}`;
        this.confirmType = 2;
        this.confirm.open();

    }

    //删除
    delete(account, index) {
        if(account.status==1){
            this.notice.open('COMMON.OPERATION_ERROR','USER_CENTER.UNABLE_TO_DELETE_ENABLED_ACCOUNT');
            return;
        }
        this.confirmTitle = "USER_CENTER.DELETE_ACCOUNT";
        const accountName = account.userName;
        this.accountId = account.id;
        this.confirmMessage = `USER_CENTER.YOU_SELECT_DELETE_USER_WILL_BE_DELETE${accountName}`;
        this.confirmType = 3;
        this.confirm.open();
    }

    confirmOk() {
        switch (this.confirmType) {
            case 1:
                console.log("启用");
                this.enableAcc();
                break;
            case 2:
                console.log("禁用");
                this.disableAcc();
                break;
            case 3:
                console.log("删除");
                this.deleteAcc();
                break;
        }
    }

    enableAcc() {
        this.service.enableAcc(this.accountId)
            .then(
            res => {
                console.log(res);
                this.getAccountList(1, this.pp);
            }
            )
            .catch(
            err => {
                console.error(err);
            }
            );
    }

    disableAcc() {
        this.service.disableAcc(this.accountId)
            .then(
            res => {
                console.log(res);
                this.getAccountList(1, this.pp);
            }
            )
            .catch(
            err => {
                console.error(err);
            }
            );
    }

    deleteAcc() {
        this.service.deleteAcc(this.accountId)
            .then(
            res => {
                console.log(res);
                this.getAccountList(1, this.pp);
            }
            )
            .catch(
            err => {
                console.error(err);
            }
            );
    }
    //创建AD账户
    createAdAccount() {
        this.crAd.createAccount()
            .then(response => {
                console.log(response);
                if (response && 100 == response["resultCode"]) {
                    this.createAdAccountPopUp.close();
                    this.getAccountList(1, this.pp);
                } else if (response && "10051101" == response["resultCode"]) {
                    this.showAlert("USER_CENTER.THE_ACCOUNT_HAS_BEEN_OCCUPIED");
                }
            });
    }

    editAdAccountM() {
        this.editAd.editAccount()
            .then(response => {
                console.log(response);
                if (response && 100 == response["resultCode"]) {
                    this.editAdAccountPopUp.close();
                    this.getAccountList(1, this.pp);
                } else if (response && "10051101" == response["resultCode"]) {
                    this.showAlert("USER_CENTER.THE_ACCOUNT_HAS_BEEN_OCCUPIED");
                } else {
                }
            }
            ).catch(err => {
                console.error(err);
            });
    }

    //分页
    tp = 0;
    pp = 10;

    paging(page) {
        console.log(page);
        this.getAccountList(page, this.pp);
    }

    ccf() { }

    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "COMMON.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("COMMON.FAILED_TO_GET_DATA");
    }
    nof(){}

}