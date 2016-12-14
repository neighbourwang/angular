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
        this.service.getAccountList(page, size)
            .then(
            res => {
                console.log(res);
                this.accounts = res.resultContent;
                this.tp = res.pageInfo.totalPage;
            }
            )
            .catch(
            err => {
                console.error(err);
            }
            );
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
            this.createAdAccountPopUp.open("创建AD账号");
        } else {
            this.isEdit = false;            
            
            this.isActive = false;
            window.setTimeout(() => {
                
                this.isActive = true;
                this.createLocalAccountPopUp.open("创建本地账号");
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
        this.editId = account.id;
        if (account.type == 0) { //0 本地  ,1 AD            
            
            this.isActive = false;
            window.setTimeout(() => {
                this.isActive = true;
                this.createLocalAccountPopUp.open("编辑本地账号");
                
            }, 0);
        } else {
            this.editAdAccountPopUp.open("编辑AD账号");
        }
    }

    //启用
    enable(account, index) {
        if(account.status==1){
            this.notice.open('操作错误','账号状态已启用');
            return;
        }
        this.confirmTitle = "启用帐号";
        const accountName = account.userName;
        this.accountId = account.id;
        this.confirmMessage = `您选择启用${accountName}，请确认`;
        this.confirmType = 1;
        this.confirm.open();
    }

    //禁用
    disable(account, index) {
        if(account.status==5){
            this.notice.open('操作错误','账号状态已禁用');
            return;
        }
        this.confirmTitle = "禁用帐号";
        const accountName = account.userName;
        this.accountId = account.id;
        this.confirmMessage = `您选择禁用${accountName}，请确认。如果确认，机构成员将无法操作相关资源`;
        this.confirmType = 2;
        this.confirm.open();

    }

    //删除
    delete(account, index) {
        if(account.status==1){
            this.notice.open('操作错误','不能删除启用状态下的账号');
            return;
        }
        this.confirmTitle = "删除帐号";
        const accountName = account.userName;
        this.accountId = account.id;
        this.confirmMessage = `您选择删除${accountName}，请确认。如果确认，部门将被删除且该部门中的用户将被移除。`;
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
                    this.showAlert("该账户已经被占用");
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
                    this.showAlert("该账户已经被占用");
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

        this.noticeTitle = "提示";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("获取数据失败！");
    }
    nof(){}

}