import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent ,PopupComponent } from '../../../../architecture';

//service
import { AccountMngService } from '../service/account-mng-list.service';

//model
import { Account } from '../model/account';

@Component({
    selector: 'account-mng-list',
    templateUrl: '../template/account-mng-list.component.html',
    styleUrls: [],
    providers: []
})
export class AccountMngComponent implements OnInit{
    constructor(
        private service: AccountMngService,
        private router : Router
        ) { }

    @ViewChild('crAccountModel')
    crAccountModel: PopupComponent;

    @ViewChild('confirm')
    confirm : ConfirmComponent;

    //用来判断 confirm确定执行的方法 1 重置密码 2 启用 3 禁用 4 删除
    confirmType : number;

    // 平台数据总页数
    tp:number = 0;
    // 每页显示的数据条数
    pp:number = 10;

    accounts : Array<Account> = new Array<Account>();

    chooseAccount : Account = new Account();

    ngOnInit() {
        this.service.getAccount(this.tp , this.pp).then(
            res => {
                console.log(res);
                this.accounts = res.resultContent;
                for(let item of this.accounts){
                    item.selected = false;
                }
            }
        ).catch(
            error => {
                console.error(error);
            }
        )
    }
    

    //搜索关键字
    keyup : string;

    authenticationSourceList = [
        {
            id : 1,
            name : '本地'
        },
        {
            id : 2,
            name : 'AD'
        }
    ];

    authenticationSource : number = 1;

    openCrAccountPop(){
        this.crAccountModel.open();
    }

    crAccount(){
        console.log(this.authenticationSource);
        if(this.authenticationSource == 1){
            this.router.navigate(['/user-center/account-mng/account-mng-cr-local']);
        }else{
            this.router.navigate(['/user-center/account-mng/account-mng-cr-ad'])
        }  
    }
    //关键得搜索
    search(){
        console.log(this.keyup);
    }

    //编辑
    edit(){
        //判断当前帐号的type跳转  demo演示 先跳转到本地编辑
         this.router.navigate(['/user-center/account-mng/account-mng-cr-local/'+this.chooseAccount.id]);
    }

    //重置密码
    resetPassword(){
        this.confirmType = 1;
        this.confirm.open('重置密码','您将想要重置机构xxx的密码,请确认');
    }
    //启用
    enable (){
        this.confirmType = 2;
        this.confirm.open('启用帐号',"您选择启用 机构xxx，xxx'xxx@hpe.com'帐号，请确认");
    }
    //禁用
    disable (){
        this.confirmType = 3;
        this.confirm.open('禁用帐号',"您选择禁用 机构xxx，xxx'xxx@hpe.com'帐号，请确认");
    }
    //删除
    delete (){
        this.confirmType = 4;
        this.confirm.open('删除帐号',"您选择删除 机构xxx，xxx'xxx@hpe.com'帐号，请确认");
    }
    //弹出框 确认
    ok (){
        switch(this.confirmType){
            case 1:
                console.log('重置密码');
                break;
            case 2:
                console.log('启用帐号');
                this.enableAccount();
                break;
            case 3:
                console.log('禁用帐号');
                this.disableAccount();
                break;
            case 4:
                console.log('删除帐号');
                break;
        }
    }

    chooseItem(index){
        this.chooseAccount = this.accounts[index];
        console.log(this.chooseAccount);
    }

    disableAccount(){
        this.service.disableAccount(this.chooseAccount.id).then(
            res => {
                console.log(res);
            }
        ).catch(
            err => {
                console.error(err);
            }
        )
    }

    enableAccount(){
        this.service.enableAccount(this.chooseAccount.id).then(
            res => {
                console.log(res);
            }
        ).catch(
            err => {
                console.error(err);
            }
        )
    }

    
} 