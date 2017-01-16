import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";

import { Role } from "../model/role.model";
import { Organization } from "../model/organization.model";
import { Account } from "../model/account";
import { AdUser } from "../model/adUser.model";
import { Attest } from "../model/attest.model";
//service
import { AccountMngCreAdService } from "../service/account-mng-cr-ad.service";


@Component({
    selector: "account-mng-cr-ad",
    templateUrl: "../template/account-mng-cr-ad.component.html",
    styleUrls: [],
    providers: []
})
export class AccountMngCrAd implements OnInit {
    constructor(
        private service: AccountMngCreAdService,
        private router: Router,
        private layoutService: LayoutService,
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
    adUsers: Array<AdUser>;
    attests: Array<Attest>;
    filterStr: string; //查询AD账户的查询条件

    ngOnInit() {
        this.getOrg();
        this.getRole();
        this.getAttest();
    }

    //获取角色列表0
    getRole() {
        this.layoutService.show();
        this.service.getRole()
            .then(response => {
                this.layoutService.hide();
                this.roles = response;
            })
            .catch((e) => this.onRejected(e));
    }

    //获取组织列表
    getOrg() {
        this.layoutService.show();
        this.service.getOrg(1, 9999)
            .then(response => {
                this.layoutService.hide();
                this.organizations = response;
            })
            .catch((e) => this.onRejected(e));
    }

    //获取组织列表
    getAttest() {
        this.layoutService.show();
        this.service.getAttests(1, 9999)
            .then(response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.attests = response["resultContent"];
                } else {
                    this.showAlert("Res sync error");
                }
            })
            .catch((e) => this.onRejected(e));
    }


    //获取ad用户
    searchAdUser() {
        if (this.account.ldapId == "" || !this.filterStr || this.filterStr == "") {
            this.showAlert("USER_CENTER.PLEASE_SELECT_AD_SOURCE_AND_INPUT_QUERY"); //USER_CENTER.PLEASE_SELECT_AD_SOURCE_AND_INPUT_QUERY=>请选择认证源并且输入查询字符串 

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


    createAccount() {

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

        if (!this.account.loginName || this.account.loginName == "") {
            this.showAlert("USER_CENTER.SELECT_AD_USER"); //USER_CENTER.SELECT_AD_USER=>请选择ad用户 

            return;
        }

        if (this.account.roles.length === 0) {
            this.showAlert("USER_CENTER.SELECT_AT_LEAST_ONE_ROLE"); //USER_CENTER.SELECT_AT_LEAST_ONE_ROLE=>至少选择一个角色 

            return;
        }

        if (this.account.organizations.length === 0) {
            this.showAlert("USER_CENTER.SELECT_ORG_WHICH_BELONG_TO"); //USER_CENTER.SELECT_ORG_WHICH_BELONG_TO=>请选择所属机构 

            return;
        }


        this.layoutService.show();
        this.service.createAccount(this.account)
            .then(response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    //this.showAlert("success");
                    this.router.navigateByUrl('user-center/account-mng/account-mng-list');
                } else if (response && "10051101" == response["resultCode"]) {
                    this.showAlert("USER_CENTER.ACCOUNT_IS_USED"); //USER_CENTER.ACCOUNT_IS_USED=>该账户已经被占用 

                } else {
                    this.showAlert("Res sync error");
                }
            })
            .catch((e) => this.onRejected(e));
    }

    clearSelectedOrg(org: Organization) {
        this.organizations.forEach((o) => {
            o.selected = false;
        });
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