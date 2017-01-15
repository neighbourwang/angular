import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService,ConfirmComponent, PopupComponent } from "../../../../architecture";

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
        private activatedRouter: ActivatedRoute,
        private validationService: ValidationService

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

        if (this.validationService.isBlank(this.account.userName)) {
            this.showAlert("USER_CENTER.INPUT_ADMIN_USERNAME"); //USER_CENTER.INPUT_ADMIN_USERNAME=>请输入管理员姓名 

            return;
        }

        if (this.validationService.isBlank(this.account.phone)) {
            this.showAlert("USER_CENTER.INPUT_PHONE_NUMBER"); //USER_CENTER.INPUT_PHONE_NUMBER=>请输入电话 

            return;
        }

        //if (!this.validationService.isMoblie(this.account.phone) &&
        //    !this.validationService.isTel(this.account.phone)) {
        //    this.showAlert("请输入合法的联系电话;");
        //    return;
        //}

        if (this.account.roles.length === 0) {
            this.showAlert("USER_CENTER.SELECT_AT_LEAST_ONE_ROLE"); //USER_CENTER.SELECT_AT_LEAST_ONE_ROLE=>至少选择一个角色 

            return;
        }

        if (this.account.organizations.length === 0) {
            this.showAlert("USER_CENTER.SELECT_ORG_WHICH_BELONG_TO"); //USER_CENTER.SELECT_ORG_WHICH_BELONG_TO=>请选择所属机构 

            return;
        }

        this.layoutService.show();
        this.service.editAccount(this.aid,this.account)
            .then(response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.showAlert("success");
                    this.router.navigateByUrl('user-center/account-mng/account-mng-list');
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

    cancel() {
        this.router.navigateByUrl('user-center/account-mng/account-mng-list');
    }

    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "NET_MNG_VM_PORT.PROMPT"; //NET_MNG_VM_PORT.PROMPT=>提示 

        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("NET_MNG_VM_DBT_PORT.GETTING_DATA_FAILED"); //NET_MNG_VM_DBT_PORT.GETTING_DATA_FAILED=>获取数据失败！ 
    }

}