import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService } from "../../../../architecture";

import { EntAdminCreService } from "../service/ent-admin-cre.service";

import { EntAdminMngService } from "../service/ent-admin-mng.service";

import { Enterprise } from "../model/enterprise.model";

import { Admin } from "../model/admin.model";


@Component({
    selector: "ent-admin-cre",
    templateUrl: "../template/ent-admin-cre.html",
    styleUrls: [],
    providers: []
})
export class EntAdminCreComponent implements OnInit {

    eid = "";//企业id
    aid = ""; //管理员id
    isEdit = false;
    noticeTitle = "";
    noticeMsg = "";
    admin = new Admin();
    @ViewChild("notice")
    notice: NoticeComponent;
    enterprise = new Enterprise();
    constructor(
        private service: EntAdminCreService,
        private mngService: EntAdminMngService,
        private layoutService: LayoutService,
        private validationService: ValidationService,
        private router: Router,
        private activatedRouter: ActivatedRoute
    ) {
        if (activatedRouter.snapshot.params["eid"]) {
            this.eid = activatedRouter.snapshot.params["eid"] || "";
            this.aid = activatedRouter.snapshot.params["aid"] || "";
            if (this.aid != "") {
                this.isEdit = true;
                this.getAdminById(this.aid);
            }
            this.getEnterpriseById(this.eid);
        }
    }

    ngOnInit() {
    }

    getEnterpriseById(id: string) {
        this.layoutService.show();
        this.mngService.getEnterpriseById(id)
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
            .catch( (e) => this.onRejected(e));
    }

    getAdminById(id: string) {
        this.layoutService.show();
        this.service.getAdminById(id)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.admin = response["resultContent"];
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    createAndUpdate(): void {
        if (this.validationService.isBlank(this.admin.userName)) {
            this.showAlert("ENT_MNG.ENTER_ADMINISTRATOR_NAME");
            return;
        }

        if (this.validationService.isBlank(this.admin.loginName)) {
            this.showAlert("ENT_MNG.ENTER_ADMINISTRATOR_ACCOUNT");
            return;
        }

        if (this.validationService.isBlank(this.admin.contactPhone)) {
            this.showAlert("COMMON.INPUT_PHONE");
            return;
        }

        if (!this.validationService.isEmail(this.admin.loginName)) {
            this.showAlert("ENT_MNG.ENTER_EMAIL_IN_ACCOUNT");
            return;
        }


        //if (!this.validationService.isMoblie(this.admin.contactPhone) && !this.validationService.isTel(this.admin.contactPhone)) {
        //    this.showAlert("请输入合法的联系电话;");
        //    return;
        //}
        this.layoutService.show();
        this.admin.enterpriseId = this.eid;
        if (this.aid == "") {
            this.service.createAdmin(this.admin)
                .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.showAlert("COMMON.CREATE_SUCCESS");
                        this.router.navigateByUrl("ent-mng/ent-admin-mng/ent-admin-mng/" + this.eid);
                    } else if (response && "10001001" == response["resultCode"]) {
                        this.showAlert("ENT_MNG.ACCOUNT_HAS_BEEN_OCCUPIED");
                    }else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
                )
                .catch((e) => this.onRejected(e));
        } else {
            this.service.updateAdmin(this.admin)
                .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.showAlert("COMMON.UPDATE_SUCCESS");
                        this.router.navigateByUrl("ent-mng/ent-admin-mng/ent-admin-mng/" + this.eid);
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
                )
                .catch((e) => this.onRejected(e));
        }
    }

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

    nof() { }

    cof() { }

    ccf() { }
}