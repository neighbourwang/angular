import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, ValidationService } from "../../../../architecture";
//service
import { AccountMngService } from "../service/account-mng.service";
import { PutLocalAccService } from "../../person-acc-mng/service/person-acc-put.service";
//model
import { Account, Role, Organization } from "../model/account.model"

@Component({
    selector: "account-mng-cr-local",
    templateUrl: "../template/account-mng-cr-local.component.html",
    styleUrls: [],
    providers: []
})
export class AccountMngCrLocalComponent implements OnInit, OnChanges {

    constructor(
        private layoutService: LayoutService,
        private router: Router,
        private service: AccountMngService,
        private putLocalAccService: PutLocalAccService,
        private validService: ValidationService,
    ) {
    }

    @Input()
    isEdit: boolean;
    @Input()
    editId: string;

    @ViewChild("accountForm")
    'accountForm': NgForm;

    account = new Account();
    active: boolean;

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.service.roles.forEach(ele => {
            ele.selected = false;
        });
        this.service.orgs.forEach(ele => {
            ele.selected = false;
        });
        console.log(this.editId);
        if (this.isEdit) {
            this.service.getLocalAcc(this.editId)
                .then(
                res => {
                    console.log("账号", res);
                    this.account = res.resultContent;
                    this.account.roles.forEach(ele => {
                        this.service.roles.forEach(e => {
                            if (ele.id == e.id) {
                                e.selected = true;
                            }
                        })
                    })
                    this.service.orgs.forEach((ele) => {
                        if (ele.id == this.account.organizations[0].id) {
                            ele.selected = true;
                        }
                    })
                }
                )
                .catch(err => {
                    console.error(err);
                });
        }
    }
    //验证账号唯一性
    loginNameIsOnly: boolean = true;
    isEmail: boolean=true;
    checkOnly(value) {
        console.log(this.validService.isEmail(value));
        if (value) {
            if (this.validService.isEmail(value)) {
                this.isEmail = true;
                return;
            } else {
                this.isEmail = false;
            }
            this.service.loginNameValid(value).then(res => {
                console.log(res);
                if (res.resultCode == '10001001') {
                    this.loginNameIsOnly = false;
                } else {
                    this.loginNameIsOnly = true;
                }
            }).catch(err => {
                console.error(err);
            })
        }
    }
    //验证手机号
    isPhone: boolean=true;
    phoneValid(val) {
        if (val) {
            this.isPhone =
                this.validService.isMoblie(val) ? true : false;
        }
        console.log('phone', this.isPhone)
    }
    //选择角色
    selectRole(idx) {
        console.log(idx);

        this.service.roles[idx].selected = !this.service.roles[idx].selected;
        this.account.roles = this.service.roles.filter(ele => {
            if (ele.selected) {
                return ele;
            }
        });
        console.log(this.account.roles);
    }

    //选择部门
    selectOrg(idx) {
        console.log(idx);
        this.service.orgs.forEach(ele => {
            ele.selected = false;
        });
        this.service.orgs[idx].selected = true;
        this.account.organizations = this.service.orgs.filter(ele => {
            if (ele.selected) {
                return ele;
            }
        });
        console.log(this.account.organizations);
    }

    save() {
        console.log(this.account);
        if (this.accountForm.invalid || !this.loginNameIsOnly || !this.isEmail || !this.isPhone) {
            return Promise.reject("error");
        } else if (this.isEdit) {
            this.layoutService.show();
            return this.service.editAccount(this.editId, this.account).then(res=>{
                this.layoutService.hide();
            }).catch(err=>{
                console.log(err);
                this.layoutService.hide();
            });
        } else {
            this.layoutService.show();
            return this.service.createAccount(this.account).then(res=>{
                this.layoutService.hide();
            }).catch(err=>{
                console.log(err);
                this.layoutService.hide();
            });
        }

    }
}