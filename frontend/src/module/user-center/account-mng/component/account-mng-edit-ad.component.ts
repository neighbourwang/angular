import { Component, OnInit, Input, ViewChild, Output } from "@angular/core";
import { Router } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, ValidationService } from "../../../../architecture";

import { Account, Role, Organization } from "../model/account.model";
import { Attest } from "../model/attest.model";
import { AdUser } from "../model/adUser.model";

import { AccountMngAdService } from "../service/account-ad.service";

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
        private service: AccountMngAdService,
        private validationService: ValidationService
    ) {
    }

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;
    account = new Account();
    roles: Array<Role>;
    organizations: Array<Organization>;
    filterStr: string; //查询AD账户的查询条件

    ngOnInit() {
        this.getRole();
        this.getOrg();
    }

    //获取角色列表0
    getRole() {
        this.layoutService.show();
        this.service.getRoleList()
            .then(response => {
                this.layoutService.hide();
                this.roles = response;
            })
            .catch((e) => this.onRejected(e));
    }

    //获取组织列表
    getOrg() {
        this.layoutService.show();
        this.service.getOrgList(1, 9999)
            .then(response => {
                this.layoutService.hide();
                this.organizations = response;
            })
            .catch((e) => this.onRejected(e));
    }

     

    editAccount(): Promise<any> {

        this.account.roles = this.roles.filter((r) => { return r.selected });
        this.account.organizations = this.organizations.filter((o) => { return o.selected });

        if (this.validationService.isBlank(this.account.userName)) {
            this.showAlert("请输入管理员姓名");
            return null;
        }

        if (this.validationService.isBlank(this.account.phone)) {
            this.showAlert("请输入电话");
            return null;
        }

        if (!this.validationService.isMoblie(this.account.phone) &&
            !this.validationService.isTel(this.account.phone)) {
            this.showAlert("请输入合法的联系电话;");
            return null;
        }


        if (this.account.roles.length === 0) {
            this.showAlert("至少选择一个角色");
            return null;
        }

        if (this.account.organizations.length === 0) {
            this.showAlert("请选择所属机构");
            return null;
        }

        this.layoutService.show();
        return this.service.createAccount(this.account).then((res) => {
            this.layoutService.hide();
            return res;
        }).catch((e) => {this.onRejected(e);});
    }

    clearSelectedOrg(org: Organization) {
        this.organizations.forEach((o) => {
            o.selected = false;
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