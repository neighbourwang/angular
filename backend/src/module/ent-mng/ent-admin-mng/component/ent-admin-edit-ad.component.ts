import { Component, OnInit, ViewChild } from "@angular/core";
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
    templateUrl: "../template/ent-admin-edit-ad.component.html",
    styleUrls: [],
    providers: []
})
export class EntAdminEditADComponent implements OnInit {
    eid = ""; //企业id
    aid = ""; //管理员id
    noticeTitle = "";
    noticeMsg = "";
    filterStr = "";
    admin = new Admin();
    enterprise = new Enterprise();
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
            this.aid = activatedRouter.snapshot.params["aid"] || "";
            if (this.aid != "") {
                this.getAdminById(this.aid);
            }
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
                    this.showAlert("Res sync error");
                }
            }
            )
            .catch(() => (e) => this.onRejected(e));
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
                    this.showAlert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //创建或者更新管理员信息
    saveAccount(): void {
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
       
        this.admin.authMode = "1";
        this.layoutService.show();
        this.service.updateAdmin(this.admin)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.showAlert("COMMON.CREATE_SUCCESS");
                    this.router.navigateByUrl(`ent-mng/ent-admin-mng/ent-admin-mng/${this.eid}`);
                } else {
                    this.showAlert("Res sync error");
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