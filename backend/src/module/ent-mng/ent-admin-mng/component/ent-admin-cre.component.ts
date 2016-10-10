import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { LayoutService, NoticeComponent } from "../../../../architecture";

import { EntAdminCreService } from "../service/ent-admin-cre.service";

import { Enterprise } from "../model/enterprise.model";

import { Admin } from "../model/admin.model";


@Component({
    selector: "ent-admin-cre",
    templateUrl: "../template/ent-admin-cre.html",
    styleUrls: [],
    providers: []
})
export class EntAdminCreComponent implements OnInit {

    mngId = "";
    isEdit = false;
    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    constructor(
        private service: EntAdminCreService,
        private layoutService: LayoutService,
        private router: Router,
        private activatedRouter: ActivatedRoute
    ) {
        if (activatedRouter.snapshot.params["mng-id"]) {
            this.mngId = activatedRouter.snapshot.params["mng-id"] || "";
            this.isEdit = true;
            this.getAdminById(this.mngId);
        }
    }

    enterprises: Enterprise[];
    admin = new Admin();


    ngOnInit() {
        this.layoutService.show();
        this.service.getEnterprise()
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.enterprises = response["resultContent"];

                    if (this.enterprises.length > 0 && !(this.admin.enterpriseId === "")) {
                        this.admin.enterpriseId = this.enterprises[0].id;
                    }

                } else {
                    this.showAlert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
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
            .catch(() => (e) => this.onRejected(e));
    }

    createAndUpdate(): void {
        if (this.admin.contactorName === "") {
            this.showAlert("请输入管理员姓名");
            return;
        }

        if (this.admin.userName === "") {
            this.showAlert("请输入管理员账户");
            return;
        }

        if (this.admin.password === "") {
            this.showAlert("请输入管理员密码");
            return;
        }

        if (this.admin.contactPhone === "") {
            this.showAlert("请输入电话");
            return;
        }
        if (this.admin.email === "") {
            this.showAlert("请输入管理员邮箱");
            return;
        }

        const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const regMobilePhone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        const regTelPhone = /^(\(\d{3,4}\)-)|(\d{3,4}-)?\d{7,8}$/;

        if (!regEmail.test(this.admin.email)) {
            this.showAlert("请输入合法的电子邮箱;");
            return;
        }

        if (!regMobilePhone.test(this.admin.contactPhone) && !regTelPhone.test(this.admin.contactPhone)) {
            this.showAlert("请输入合法的联系电话;");
            return;
        }

        this.admin.enterpriseName = this.enterprises.filter((e) => { return e.id == this.admin.enterpriseId })[0].name;

        this.layoutService.show();

        if (this.mngId == "") {
            this.service.createAdmin(this.admin)
                .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.showAlert("创建成功");
                        this.router.navigateByUrl("ent-mng/ent-admin-mng/ent-admin-mng");
                    } else {
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
                        this.router.navigateByUrl("ent-mng/ent-admin-mng/ent-admin-mng");
                    } else {
                        this.showAlert("Res sync error");
                    }
                }
                )
                .catch((e) => this.onRejected(e));
        }
    }

    cancel(): void {
        this.router.navigateByUrl("ent-mng/ent-admin-mng/ent-admin-mng");
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
}