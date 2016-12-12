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
                    this.showAlert("Res sync error");
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
                    this.showAlert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    createAndUpdate(): void {
        if (this.validationService.isBlank(this.admin.userName)) {
            this.showAlert("请输入管理员姓名");
            return;
        }

        if (this.validationService.isBlank(this.admin.loginName)) {
            this.showAlert("请输入管理员账户");
            return;
        }

        if (this.validationService.isBlank(this.admin.contactPhone)) {
            this.showAlert("请输入电话");
            return;
        }

        if (!this.validationService.isEmail(this.admin.loginName)) {
            this.showAlert("请在账号输入合法的邮箱;");
            return;
        }


        if (!this.validationService.isMoblie(this.admin.contactPhone) && !this.validationService.isTel(this.admin.contactPhone)) {
            this.showAlert("请输入合法的联系电话;");
            return;
        }
        this.layoutService.show();
        this.admin.enterpriseId = this.eid;
        if (this.aid == "") {
            this.service.createAdmin(this.admin)
                .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.showAlert("创建成功");
                        this.router.navigateByUrl("ent-mng/ent-admin-mng/ent-admin-mng/" + this.eid);
                    } else if (response && "10051101" == response["resultCode"]) {
                        this.showAlert("该账户已经被占用");
                    }else {
                        this.showAlert("Res sync error");
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
                        this.showAlert("更新成功");
                        this.router.navigateByUrl("ent-mng/ent-admin-mng/ent-admin-mng/" + this.eid);
                    } else {
                        this.showAlert("Res sync error");
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
        this.showAlert("获取数据失败！");
    }

    showAlert(msg: string): void {
        this.noticeTitle = "提示";
        this.noticeMsg = msg;
        this.notice.open();
    }

    nof() { }

    cof() { }

    ccf() { }
}