import { Component, OnInit, Input, ViewChild, Output } from "@angular/core";
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
    }

    //获取ad用户
    searchAdUser() {
        if (this.account.ldapId == "" || !this.filterStr || this.filterStr == "") {
            this.showAlert("请选择认证源并且输入查询字符串");
            return;
        }

        this.layoutService.show();
        this.service.getAdUser(this.account.ldapId, 1, 9999, this.filterStr)
            .then(response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.adUsers = response["resultContent"];
                } else {
                    this.showAlert("Res sync error");
                }
            })
            .catch((e) => this.onRejected(e));
    }


    createAccount(): Promise<any> {

        this.account.roles = this.service.roles.filter((r) => { return r.selected });
        this.account.organizations = this.service.orgs.filter((o) => { return o.selected });


        if (this.validationService.isBlank(this.account.userName)) {
            this.showAlert("请输入管理员姓名");
            return new Promise(resovle => setTimeout(resovle, 10)).then(()=>false);
        }

        if (this.validationService.isBlank(this.account.phone)) {
            this.showAlert("请输入电话");
            return new Promise(resovle => setTimeout(resovle, 10)).then(() => false);
        }

        if (!this.validationService.isMoblie(this.account.phone) &&
            !this.validationService.isTel(this.account.phone)) {
            this.showAlert("请输入合法的联系电话;");
            return new Promise(resovle => setTimeout(resovle, 10)).then(() => false);
        }

        if (!this.account.loginName || this.account.loginName == "") {
            this.showAlert("请选择ad用户");
            return new Promise(resovle => setTimeout(resovle, 10)).then(() => false);
        }

        if (this.account.roles.length === 0) {
            this.showAlert("至少选择一个角色");
            return new Promise(resovle => setTimeout(resovle, 10)).then(() => false);
        }

        if (this.account.organizations.length === 0) {
            this.showAlert("请选择所属机构");
            return new Promise(resovle => setTimeout(resovle, 10)).then(() => false);
        }

        this.layoutService.show();
        return this.service.createAccount(this.account)
            .then((res) => {
                this.layoutService.hide();
                return true;
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

}