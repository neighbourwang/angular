import { Component, ViewChild, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from "../../../../architecture";

//service
import { AccountMngService } from "../service/account-mng-list.service";

//model
import { Account } from "../model/account";

@Component({
    selector: "account-mng-list",
    templateUrl: "../template/account-mng-list.component.html",
    styleUrls: [],
    providers: []
})
export class AccountMngComponent implements OnInit {
    constructor(
        private service: AccountMngService,
        private router: Router,
        private layoutService: LayoutService
    ) {
    }

    @ViewChild("crAccountModel")
    crAccountModel: PopupComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("notice")
    notice: ConfirmComponent;

    //用来判断 confirm确定执行的方法 1 重置密码 2 启用 3 禁用 4 删除
    confirmType: number;

    // 平台数据总页数
    tp = 1;
    // 每页显示的数据条数
    pp = 10;

    accounts = new Array<Account>();

    chooseAccount = new Account();

    ngOnInit() {
        this.getAccount();
    }

    getAccount(index?, kw?) {
        this.chooseAccount=new Account();
        this.tp = index || 1;
        this.keyup = kw || '';
        this.layoutService.show();
        this.service.searchAccountByName(this.tp, this.pp, this.keyup)
            .then(
            res => {
                console.log(res);
                this.accounts = res.resultContent;
                this.tp = res.pageInfo.totalPage;
                for (let item of this.accounts) {
                    item.selected = false;
                }
                this.layoutService.hide();
            }
            )
            .catch(
            error => {
                this.layoutService.hide();
                console.error(error);
            }
            );
    }

    //搜索关键字
    keyup: string;

    authenticationSourceList = [
        {
            id: 1,
            name: "本地"
        },
        {
            id: 2,
            name: "AD"
        }
    ];

    authenticationSource = 1;

    openCrAccountPop() {
        this.crAccountModel.open();
    }

    crAccount() {
        console.log(this.authenticationSource);
        if (this.authenticationSource == 1) {
            this.router.navigate(["/user-center/account-mng/account-mng-cr-local"]);
        } else {
            this.router.navigate(["/user-center/account-mng/account-mng-cr-ad"]);
        }
    }

    //关键得搜索
    search() {
        console.log(this.keyup);
        this.service.searchAccountByName(0, this.pp, this.keyup).then(
            res => {
                this.layoutService.hide();
                console.log(res);
                this.accounts = res.resultContent;
                this.tp = res.pageInfo.totalPage;
                for (let item of this.accounts) {
                    item.selected = false;
                }
            }
        )
            .catch(
            error => {
                this.layoutService.hide();
                console.error(error);
            }
            );
    }

    //编辑
    edit() {
        //判断当前帐号的type跳转  demo演示 先跳转到本地编辑
        if (this.chooseAccount.id) {
            if (this.chooseAccount.type == "0") {
                this.router.navigate([`/user-center/account-mng/account-mng-cr-local/${this.chooseAccount.id}`]);
            } else {
                this.router.navigate([`/user-center/account-mng/account-mng-edit-ad/${this.chooseAccount.id}`]);
            }
        } else {
            this.notice.open('操作错误', '请选择账号')
        }

    }

    //重置密码
    resetPassword() {
        if (this.chooseAccount.id) {
            if (this.chooseAccount.id) {
                this.confirmType = 1;
                this.confirm.open("重置密码", "您选择重置账号 "+this.chooseAccount.loginName+"的密码,请确认");
            }
        } else {
            this.notice.open('操作错误', '请选择账号')
        }

    }

    //启用
    enable() {
        if(this.chooseAccount.status==1){
            this.notice.open('操作错误','账号状态为已启用')
            return 
        }
        if (this.chooseAccount.id) {
            this.confirmType = 2;
            this.confirm.open("启用帐号", "您选择启用帐号 "+this.chooseAccount.loginName+"，请确认");
        } else {
            this.notice.open('操作错误', '请选择账号')
        }

    }

    //禁用
    disable() {
        if(this.chooseAccount.status==5){
            this.notice.open('操作错误','账户状态为已禁用');
            return ;
        }
        if (this.chooseAccount.id) {
            this.confirmType = 3;
            this.confirm.open("禁用帐号", "您选择禁用帐号 "+this.chooseAccount.loginName+"，请确认");
        } else {
            this.notice.open('操作错误', '请选择账号')
        }

    }

    //删除
    delete() {
        
        if(this.chooseAccount.status==1){
            this.notice.open('操作错误','不能删除启用状态的账户');
            return;
        }
        if (this.chooseAccount.id) {
            this.confirmType = 4;
            this.confirm.open("删除帐号", "您选择删除帐号 "+this.chooseAccount.loginName+"，请确认");
        } else {
            this.notice.open('操作错误', '请选择账号')
        }

    }

    //弹出框 确认
    ok() {
        switch (this.confirmType) {
            case 1:
                console.log("重置密码");
                this.ressetPasswordAccount()
                break;
            case 2:
                console.log("启用帐号");
                this.enableAccount();
                break;
            case 3:
                console.log("禁用帐号");
                this.disableAccount();
                break;
            case 4:
                console.log("删除帐号");
                this.deleteAccount();
                break;
        }
    }

    chooseItem(index) {
        this.chooseAccount = this.accounts[index];
        console.log(this.chooseAccount);
    }

    disableAccount() {
        this.service.disableAccount(this.chooseAccount.id)
            .then(
            res => {
                console.log(res);
                this.getAccount();

            }
            )
            .catch(
            err => {
                console.error(err);
            }
            );
    }

    enableAccount() {
        this.service.enableAccount(this.chooseAccount.id)
            .then(
            res => {
                console.log(res);
                this.getAccount();
            }
            )
            .catch(
            err => {
                console.error(err);
            }
            );
    }

    ressetPasswordAccount() {
        this.service.resetPasswordAccount(this.chooseAccount.id)
            .then(
            res => {
                console.log(res);
                this.getAccount();
            }
            )
            .catch(
            err => {
                console.error(err);
            }
            );
    }

    deleteAccount() {
        this.service.deleteAccount(this.chooseAccount.id)
            .then(
            res => {
                console.log(res);
                this.getAccount();
            }
            )
            .catch(
            err => {
                console.error(err);
            }
            );
    }
    nof() {

    }

}