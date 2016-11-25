import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from "../../../../architecture";

import { Role } from "../model/role.model";
import { Organization } from "../model/organization.model";
import { Account } from "../model/account";
import { AdUser } from "../model/adUser.model";
import { Attest } from "../model/attest.model";
//service
import { AccountMngCreAdService } from "../service/account-mng-cr-ad.service";


@Component({
    selector: "account-mng-cr-ad",
    templateUrl: "../template/account-mng-edit-ad.component.html",
    styleUrls: [],
    providers: []
})
export class AccountMngEditAd implements OnInit {
    constructor(
        private service: AccountMngCreAdService,
        private router: Router,
        private layoutService: LayoutService,
        private activatedRouter: ActivatedRoute
    ) {
        this.aid = activatedRouter.snapshot.params["id"] || "";
    }

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;
    aid: string;
    account = new Account();
    roles: Array<Role>;
    organizations: Array<Organization>;

    ngOnInit() {
        this.layoutService.show();
        Promise.all([this.service.getRole(), this.service.getOrg(1, 9999), this.service.getAccountById(this.aid)])
            .then((arr) => {
                this.layoutService.hide();
                this.roles = arr[0];
                this.organizations = arr[1];
                this.account = arr[2];
                this.setDefaultSelect();
            }).catch((e) => this.onRejected(e));
        //this.getOrg();
        //this.getRole();
        //this.getAccount(this.aid);
    }

    //获取ad用户
    saveAccount() {

        this.account.roles = this.roles.filter((r) => { return r.selected });
        this.account.organizations = this.organizations.filter((o) => { return o.selected });
        this.layoutService.show();
        this.service.editAccount(this.aid,this.account)
            .then(response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.showAlert("success");
                } else {
                    this.showAlert("Res sync error");
                }
            })
            .catch((e) => this.onRejected(e));
    }

    setDefaultSelect() {
        this.roles.forEach((role) => {
            this.account.roles.forEach((o) => {
                if (!role.selected)
                    role.selected = o.id == role.id;

            });
        });

        this.organizations.forEach((org) => {
            this.account.organizations.forEach((o) => {
                if (!org.selected)
                    org.selected = o.id == org.id;
            });
        });

    }

    clearSelectedOrg(org:Organization) {
        this.organizations.forEach((o) => {
            o.selected = false;
        });
        org.selected = true;
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