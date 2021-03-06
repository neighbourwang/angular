﻿import { Component, OnInit, Input, ViewChild, Output } from "@angular/core";
import { Router } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, ValidationService } from "../../../../architecture";

import { Account, Role, Organization } from "../model/account.model";
import { Attest } from "../model/attest.model";
import { AdUser } from "../model/adUser.model";

import { AccountMngService } from "../service/account-mng.service";

@Component({
    selector: "account-mng-cr-ad",
    templateUrl: "../template/account-mng-cr-ad.component.html",
    styleUrls: [],
    providers: []
})
export class AccountMngCrAdComponent implements OnInit {

    constructor(
        private layoutService: LayoutService,
        private router: Router,
        public service: AccountMngService,
        private validationService: ValidationService
    ) {
    }

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;
    account = new Account();
    adUsers: Array<AdUser>;
    filterStr: string; //查询AD账户的查询条件

    ngOnInit() {

    }

    clearData() {
        this.account = new Account();
        this.filterStr = "";
        this.clearSelectedOrg();
        this.clearSelectedRole();
        this.clearAdUser();
    }

    //获取ad用户
    searchAdUser() {
        if (this.account.ldapId == "" || !this.filterStr || this.filterStr == "") {
            this.showAlert("USER_CENTER.SELECT_THE_AUTHENTICATION_SOURCE_AND_ENTER_THE_QUERY_STRING");
            return;
        }

        this.layoutService.show();
        this.service.getAdUser(this.account.ldapId, 1, 9999, this.filterStr)
            .then(response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.adUsers = response["resultContent"];
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            })
            .catch((e) => this.onRejected(e));
    }


    createAccount(): Promise<any> {

        this.account.roles = this.service.roles.filter((r) => { return r.selected });
        this.account.organizations = this.service.orgs.filter((o) => { return o.selected });
        this.account.tenantId = this.service.userInfo.enterpriseId;

        if (this.validationService.isBlank(this.account.userName)) {
            this.showAlert("USER_CENTER.PLEASE_ENTER_YOUR_ADMINISTRATOR_NAME");
            return new Promise(resovle => setTimeout(resovle, 10)).then(()=>false);
        }

        if (this.validationService.isBlank(this.account.phone)) {
            this.showAlert("USER_CENTER.PLEASE_ENTER_YOUR_PHONE");
            return new Promise(resovle => setTimeout(resovle, 10)).then(() => false);
        }

        if (!this.validationService.isMoblie(this.account.phone) &&
            !this.validationService.isTel(this.account.phone)) {
            this.showAlert("USER_CENTER.PLEASE_ENTER_A_VALID_PHONE_NUMBER");
            return new Promise(resovle => setTimeout(resovle, 10)).then(() => false);
        }

        if (!this.account.loginName || this.account.loginName == "") {
            this.showAlert("USER_CENTER.PLEASE_SELECT_A_ADMINISTRATOR");
            return new Promise(resovle => setTimeout(resovle, 10)).then(() => false);
        }

        if (this.account.roles.length === 0) {
            this.showAlert("USER_CENTER.SELECT_AT_LEAST_ONE_ROLE");
            return new Promise(resovle => setTimeout(resovle, 10)).then(() => false);
        }

        if (this.account.organizations.length === 0) {
            this.showAlert("USER_CENTER.PLEASE_SELECT_THE_INSTITUTION");
            return new Promise(resovle => setTimeout(resovle, 10)).then(() => false);
        }

        this.layoutService.show();
        return this.service.createAdAccount(this.account)
            .then((res) => {
                this.layoutService.hide();
                return res;
            })
            .catch((e) => { this.onRejected(e); });
    }

    clearSelectedOrg() {
        this.service.orgs.forEach((o) => {
            o.selected = false;
        });
    }

    clearSelectedRole() {
        this.service.roles.forEach((r) => {
            r.selected = false;
        });
    }

    clearAdUser() {
        this.adUsers = [];
    }


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

}