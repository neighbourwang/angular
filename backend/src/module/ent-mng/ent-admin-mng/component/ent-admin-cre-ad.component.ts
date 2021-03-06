﻿import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PaginationComponent } from
    "../../../../architecture";

import { EntAdminCreService } from "../service/ent-admin-cre.service";

import { Enterprise } from "../model/enterprise.model";

import { Admin } from "../model/admin.model";
import { AdUser } from "../model/adUser.model";
import { Attest } from "../model/attest.model";

@Component({
    selector: "ent-admin-cre",
    templateUrl: "../template/ent-admin-cre-ad.component.html",
    styleUrls: [],
    providers: []
})
export class EntAdminCreADComponent implements OnInit {

    eid = ""; //企业id
    noticeTitle = "";
    noticeMsg = "";
    filterStr="";
    admin = new Admin();
    enterprise = new Enterprise();
    adUsers: Array<AdUser>;
    attests:Array<Attest>;
    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    constructor(
        private service: EntAdminCreService,
        private validationService: ValidationService,
        private layoutService: LayoutService,
        private router: Router,
        private activatedRouter: ActivatedRoute
    ) {
        if (activatedRouter.snapshot.params["eid"]) {
            this.eid = activatedRouter.snapshot.params["eid"] || "";
            this.getEnterpriseById(this.eid);
            this.admin.enterpriseId = this.eid;
            this.getAttest(this.eid);
        }
    }

    ngOnInit() {
       
    }

    //根据企业id获取企业的基本信息
    getEnterpriseById(id: string) {
        this.layoutService.show();
        this.service.getEnterpriseById(id)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.enterprise = response["resultContent"];
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch(() => (e) => this.onRejected(e));
    }

    //获取组织列表
    getAttest(id:string) {
        this.layoutService.show();
        this.service.getAttests(1, 9999,id)
            .then(response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.attests = response["resultContent"];
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            })
            .catch((e) => this.onRejected(e));
    }

    //获取ad用户
    searchAdUser() {
        if (this.admin.ldapId == "" || !this.filterStr || this.filterStr == "") {
            this.showAlert("ENT_MNG.AD_SOURCE_QUERY");
            return;
        }

        this.layoutService.show();
        this.service.getAdUser(this.admin.ldapId, 1, 9999, this.filterStr)
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

    //创建或者更新管理员信息
    create(): void {
        if (this.validationService.isBlank(this.admin.userName)) {
            this.showAlert("ENT_MNG.ENTER_ADMINISTRATOR_NAME");
            return;
        }

        if (this.validationService.isBlank(this.admin.contactPhone)) {
            this.showAlert("COMMON.INPUT_PHONE");
            return;
        }

        //if (!this.validationService.isMoblie(this.admin.contactPhone) &&
        //    !this.validationService.isTel(this.admin.contactPhone)) {
        //    this.showAlert("请输入合法的联系电话;");
        //    return;
        //}
        if (!this.admin.loginName || this.admin.loginName == "") {
            this.showAlert("COMMON.CHOOSE_AD_USER");
            return;
        }
        this.admin.authMode = "1";
        this.layoutService.show();
        this.service.createAdmin(this.admin)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.showAlert("COMMON.CREATE_SUCCESS");
                    this.router.navigateByUrl(`ent-mng/ent-admin-mng/ent-admin-mng/${this.eid}`);
                } else if (response && "10051101" == response["resultCode"]) {
                    this.showAlert("ENT_MNG.ACCOUNT_HAS_BEEN_OCCUPIED");
                }else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //取消返回到管理员列表
    cancel(): void {
        this.router.navigateByUrl(`ent-mng/ent-admin-mng/ent-admin-mng/${this.eid}`);
    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("COMMON.GETTING_DATA_FAILED");
    }

    showAlert(msg: string): void {
        this.noticeTitle = "COMMON.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }
}