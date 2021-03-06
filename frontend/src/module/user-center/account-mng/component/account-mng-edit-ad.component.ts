﻿import { Component, OnInit, Input, ViewChild, Output, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, ValidationService } from "../../../../architecture";

import { Account, Role, Organization } from "../model/account.model";
import { Attest } from "../model/attest.model";
import { AdUser } from "../model/adUser.model";

import { AccountMngService } from "../service/account-mng.service";

@Component({
    selector: "account-mng-edit-ad",
    templateUrl: "../template/account-mng-edit-ad.component.html",
    styleUrls: [],
    providers: []
})
export class AccountMngEditAdComponent implements OnInit {

    constructor(
        private layoutService: LayoutService,
        private router: Router,
        public service: AccountMngService,
        private validationService: ValidationService
    ) {
    }


    @Input()
    accountId: string;

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;
    account = new Account();
    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(this.accountId);
        if (!this.accountId || this.accountId == "")
            return;
        this.clearData();
        this.layoutService.show();
        this.service.getLocalAcc(this.accountId)
            .then(
            res => {
                this.layoutService.hide();
                console.log("账号", res);
                this.account = res.resultContent;
                this.setDefaultSelect();
            }
            )
            .catch(e => {
                this.onRejected(e);
            });
    }

    clearData() {
        this.clearSelectedRole();
        this.clearSelectedOrg();
        this.account = new Account();
        this.setDefaultSelect();
     
    }

    setDefaultSelect() {
        this.service.roles.forEach((role) => {
            this.account.roles.forEach((o) => {
                if (!role.selected)
                    role.selected = o.id == role.id;
            });
        });

        this.service.orgs.forEach((org) => {
            this.account.organizations.forEach((o) => {
                if (!org.selected)
                    org.selected = o.id == org.id;
            });
        });

    }

    editAccount(): Promise<any> {

        this.account.roles = this.service.roles.filter((r) => { return r.selected });
        this.account.organizations = this.service.orgs.filter((o) => { return o.selected });
        this.account.tenantId = this.service.userInfo.enterpriseId;
        if (this.validationService.isBlank(this.account.userName)) {
            this.showAlert("COMMON.PLEASE_ENTER_YOUR_ADMINISTRATOR_NAME");
            return new Promise(resovle => setTimeout(resovle, 10)).then(() => false);
        }

        if (this.validationService.isBlank(this.account.phone)) {
            this.showAlert("COMMON.PLEASE_ENTER_A_PHONE");
            return new Promise(resovle => setTimeout(resovle, 10)).then(() => false);
        }

        if (!this.validationService.isMoblie(this.account.phone) &&
            !this.validationService.isTel(this.account.phone)) {
            this.showAlert("COMMON.PLEASE_ENTER_A_VALID_PHONE_NUMBER");
            return new Promise(resovle => setTimeout(resovle, 10)).then(() => false);
        }


        if (this.account.roles.length === 0) {
            this.showAlert("COMMON.SELECT_AT_LEAST_ONE_ROLE");
            return new Promise(resovle => setTimeout(resovle, 10)).then(() => false);
        }

        if (this.account.organizations.length === 0) {
            this.showAlert("COMMON.PLEASE_SELECT_THE_INSTITUTION");
            return new Promise(resovle => setTimeout(resovle, 10)).then(() => false);
        }

        this.layoutService.show();
        return this.service.editAdAccount(this.account).then((res) => {
            this.layoutService.hide();
            return res;
        }).catch((e) => {this.onRejected(e);});
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