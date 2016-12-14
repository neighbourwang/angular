import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from "../../../../architecture";

//service
import { AccountMngService } from "../service/account-mng-list.service";

//model
import {Account}  from "../model/account"

@Component({
    selector: "account-mng-cr-local",
    templateUrl: "../template/account-mng-cr-local.component.html",
    styleUrls: ['../style/account-mng.style.less'],
    providers: []
})
export class AccountMngCrLocal implements OnInit {
    constructor(
        private service: AccountMngService,
        private layoutservice:LayoutService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    //判断是否是创建 还是 编辑
    isCreate = false;
    // 标题 根据 isCreate 修改
    title = "";
    // 按钮的名字 根据 isCreate 修改
    btnTitle = "";

    page = 0;
    size = 10;

    role = new Array<any>();
    org = new Array<any>();

    loadMode = true;

    accountId: string;
    account: Account=new Account();
    ngOnInit() {
        // this.role=[
        //     {displayValue:'bt1',selected:false},
        //      {displayValue:'bt1',selected:true},
        //       {displayValue:'bt1',selected:false},
        //        {displayValue:'bt1',selected:false},
        // ]
        console.log(this.route.params, 2123123123);
        this.route.params.forEach((params: Params) => {
            if (params["id"]) {
                console.log("params", params["id"]);
                this.accountId = params["id"];

                //编辑
                this.isCreate = false;
                this.title = "编辑帐号";
                this.btnTitle = "编辑";
                this.layoutservice.show();
                this.service.getRole()
                    .then(
                        role => {
                            this.role = role.resultContent;                            
                            this.role.forEach(ele=>ele.selected=false)
                            console.log('role',this.role);
                        }
                    )
                    .then(
                        role => {
                            return this.service.getOrg(this.page, this.size)
                                .then(org => {
                                    this.org = org.resultContent;
                                });
                        }
                    )
                    .then(
                        res => {
                            this.service.getAccountById(params["id"])
                                .then(
                                    res => {
                                        this.account = res.resultContent;
                                        console.log(this.account);
                                        for (let role of this.role) {
                                            for (let account of this.account.roles) {
                                                if (role.id == account.id) {
                                                    role.selected = true;
                                                    continue;                                                    
                                                }
                                            }
                                        }
                                        console.log('role',this.role);
                                        for (let org of this.org) {
                                            for (let organizations of this.account.organizations) {
                                                if (org.id == organizations.id) {
                                                    org.selected = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                );
                                this.layoutservice.hide();
                        }                        
                    )
                    .catch(
                        err => {
                            console.error(err);
                            this.layoutservice.hide();
                        }
                    );
            } else {
                //创建
                this.isCreate = true;
                this.title = "创建帐号";
                this.btnTitle = "创建";
                this.layoutservice.show();
                this.service.getRole()
                    .then(
                        role => {
                            this.role = role.resultContent;
                        }
                    )
                    .then(
                        role => {
                            return this.service.getOrg(this.page, this.size)
                                .then(org => {
                                    this.org = org.resultContent;
                                    this.layoutservice.hide();
                                });
                        }
                    )
                    .catch(
                        err => {
                            console.error(err);
                            this.layoutservice.hide();

                        }
                    );
            }
        });
    }


    //创建
    create() {
        if (!this.isCreate) {
            this.service.editAccount(this.accountId, this.account)
                .then(
                    res => {
                        console.log(res);
                        this.router.navigateByUrl('user-center/account-mng/account-mng-list');
                    }
                )
                .catch(
                    err => {
                        console.error(err);
                    }
                );
        } else {
            this.service.createAccount(this.account)
                .then(
                    res => {
                        console.log(res);
                        this.router.navigateByUrl('user-center/account-mng/account-mng-list');
                    }
                )
                .catch(
                    err => {
                        console.error(err);
                    }
                );
        }
    }

    //点击更多
    loadModeOrg() {
        if (this.loadMode) {
            this.size += 10;
            this.service.getOrg(this.page, this.size)
                .then(
                    org => {
                        this.org = org.resultContent;
                        for (let org of this.org) {
                            for (let organizations of this.account.organizations) {
                                if (org.id == organizations.id) {
                                    org.selected = true;
                                    break;
                                }
                            }
                        }
                        if (org.pageInfo.totalRecords <= this.size) {
                            this.loadMode = false;
                        }
                    }
                );
        } else {
            console.error("没有更多");
        }

    }

    isLeader() {
        this.account.isLeader=
            this.account.isLeader==true?false:true;
        // if (this.account.isLeader == 0) {
        //     this.account.isLeader = 1;
        // } else {
        //     this.account.isLeader = 0;
        // }
    }

    addRole(item,idx) {
        
        item.selected=!item.selected
        // this.role[idx].selected=!this.role[idx].selected;
        console.log(item);
        // const obj = {
        //     id: item
        // };
        // if (this.account.roles.includes(obj)) {
        //     this.remove(this.account.roles, obj);
        // } else {
        //     this.account.roles.push(obj);
        // }
        this.account.roles=this.role.filter((ele)=>{
            if(ele.selected==true){
                return ele;
            }
        })
        console.log(this.account.roles);
    }

    addOrg(item) {
        // const obj = {
        //     id: item.id,
        //     name: item.name
        // };
        // if (!(this.account.organizations.includes(obj))) {
        //     this.account.organizations[0] = obj;
        // }
        this.org.forEach(ele=>ele.selected=false)
        item.selected=true;
        // item.selected=!item.selected;
         this.account.organizations=this.org.filter((ele)=>{
            if(ele.selected==true){
                return ele;
            }
        })
        console.log(this.account.organizations);
    }

    remove(arr, obj) {
        for (let i = 0; i < arr.length; i++) {
            let temp = arr[i];
            if (!isNaN(obj)) {
                temp = i;
            }
            if (temp == obj) {
                for (let j = i; j < arr.length; j++) {
                    arr[j] = arr[j + 1];
                }
                arr.length = arr.length - 1;
            }
        }
    }
    //取消
    cancel(){
        this.router.navigateByUrl('user-center/account-mng/account-mng-list');
    }
}