import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';

import { AccountMngCrAdComponent } from './account-mng-cr-ad.component';
import { AccountMngCrLocalComponent } from './account-mng-cr-local.component';

import { AccountMngService } from '../service/account-mng.service';

import { Account } from '../model/account';

@Component({
    // selector: 'account-mng-list',
    templateUrl: '../template/account-mng-list.component.html',
    styleUrls: [],
    providers: []
})
export class AccountMngListComponent implements OnInit {

    @ViewChild('crLocal')
    private crLocal: AccountMngCrLocalComponent;

    @ViewChild('crAdCount')
    private crAd: AccountMngCrAdComponent;

    @ViewChild('confirm')
    private confirm: ConfirmComponent;

    @ViewChild('creAccount')
    private createAccountPopUp: PopupComponent;


    @ViewChild('crAdAccount')
    private createAdAccountPopUp: PopupComponent;


    @ViewChild('editAdAccount')
    private editAdAccountPopUp: PopupComponent;

    constructor(
        private layoutService: LayoutService,
        private router: Router,
        private service: AccountMngService
    ) { }

    ngOnInit() {
        this.getAccountList(1, this.pp);
    }
    //关键字搜索
    keyword: string;
    //判断 修改 还是 新建
    isEdit: boolean;
    //confirm得title
    confirmTitle: string = '';
    //confirm得信息
    confirmMessage: string = '';
    //获取当前得confirm类型 判断操作
    confirmType: number;

    accounts: Array<Account> = new Array<Account>();

    accountId: string;
    //获取账户列表
    getAccountList(page: number, size: number) {
        this.service.getAccountList(page, size).then(
            res => {
                console.log(res);
                this.accounts = res.resultContent;
                this.tp = res.pageInfo.totalPage
            }
        ).catch(
            err => {
                console.error(err);
            }
            )
    }
    //保存
    save() {
        this.crLocal.save().then(
            res => {
                console.log(res);
                $('#crModel').modal('hide');
            }
        ).catch(
            err => {
                console.error('err');
            }
            )

    }
    //搜索
    search() {
        console.log('seach', this.keyword);
    }

    //创建
    create() {
        this.createAccountPopUp.open('创建帐号');
    }
    //
    accountType: string = '1';
    otCreate() {
        this.createAccountPopUp.close();
        console.log(this.accountType);
        if (this.accountType == '1') {
            this.isEdit = false;
            window.setTimeout(function () {
                $('#crModel').modal('show');
            },
                510);

        } else {
            this.createAdAccountPopUp.open("创建AD账号");
        }
    }

    //修改
    editId: string;
    edit(account) {
        console.log(account);
        this.isEdit = true;
        this.editId = account.id;
        $('#crModel').modal('show');
    }
    //启用
    enable(accountId, index) {
        this.confirmTitle = '启用帐号';
        let accountName = this.accounts[index].userName;
        this.accountId = this.accounts[index].id;
        this.confirmMessage = '您选择启用' + accountName + '，请确认';
        this.confirmType = 1;
        this.confirm.open();
    }

    //禁用
    disable(accountId, index) {
        this.confirmTitle = '禁用帐号';
        let accountName = this.accounts[index].userName;
        this.accountId = this.accounts[index].id;
        this.confirmMessage = '您选择禁用' + accountName + '，请确认。如果确认，机构成员将无法操作相关资源';
        this.confirmType = 2;
        this.confirm.open();

    }
    //删除
    delete(accountId, index) {
        this.confirmTitle = '删除帐号';
        let accountName = this.accounts[index].userName;
        this.accountId = this.accounts[index].id;
        this.confirmMessage = '您选择删除' + accountName + '，请确认。如果确认，部门将被删除且该部门中的用户将被移除。';
        this.confirmType = 3;
        this.confirm.open();
    }

    confirmOk() {
        switch (this.confirmType) {
            case 1:
                console.log('启用');
                this.enableAcc();
                break;
            case 2:
                console.log('禁用');
                this.disableAcc();
                break;
            case 3:
                console.log('删除');
                this.deleteAcc();
                break;
        }
    }

    enableAcc() {
        this.service.enableAcc(this.accountId).then(
            res => {
                console.log(res);
                this.getAccountList(1, this.pp);
            }
        ).catch(
            err => {
                console.error(err);
            }
            )
    }

    disableAcc() {
        this.service.disableAcc(this.accountId).then(
            res => {
                console.log(res);
                this.getAccountList(1, this.pp);
            }
        ).catch(
            err => {
                console.error(err);
            }
            )
    }

    deleteAcc() {
        this.service.deleteAcc(this.accountId).then(
            res => {
                console.log(res);
                this.getAccountList(1, this.pp);
            }
        ).catch(
            err => {
                console.error(err);
            }
            )
    }

    //创建AD账户
    createAdAccount() {
        this.crAd.createAccount()
            .then(res => {
                console.log(res);
                this.createAdAccountPopUp.close();
                this.getAccountList(1, this.pp);
            });
    }


    //分页
    tp: number = 0;
    pp: number = 10;
    paging(page) {
        console.log(page);
        this.getAccountList(page, this.pp);
    }
    ccf() { }
}
