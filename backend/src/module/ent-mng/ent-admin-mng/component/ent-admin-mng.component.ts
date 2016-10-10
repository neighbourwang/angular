import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PaginationComponent } from "../../../../architecture";

import { Admin } from "../model/admin.model";

import { Enterprise } from "../model/enterprise.model";

import { EntAdminMngService } from "../service/ent-admin-mng.service";

import { EntAdminCreService } from "../service/ent-admin-cre.service";


@Component({
    selector: "ent-admin-cre",
    templateUrl: "../template/ent-admin-mng.html",
    styleUrls: [],
    providers: []
})
export class EntAdminMngComponent implements OnInit {
    pageIndex=0;
    tp = 1;
    pageSize = 10;
    noticeTitle = "";
    noticeMsg = "";
    reset=true;
    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("pager")
    pager: PaginationComponent;

    constructor(
        private service: EntAdminMngService,
        private creService: EntAdminCreService,
        private layoutService: LayoutService,
        private router: Router,
        private activatedRouter: ActivatedRoute
    ) {
    }

    admins: Admin[];
    enterprises: Enterprise[];
    selectEnterprise: Enterprise;

    ngOnInit() {

        this.layoutService.show();
        this.creService.getEnterprise()
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {

                        this.enterprises = response["resultContent"];

                    } else {
                        this.showAlert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));

        this.getData();
    }


    deleteAdmins() {
        const selectAdmin = this.admins.filter((admin) => { return admin.isSelect; });
        if (selectAdmin.length == 0) {
            this.showAlert("请先选择需要删除的管理员！");
            return;
        }

        this.noticeTitle = "警告";
        const names: string[] = [];
        const ids: string[] = [];
        selectAdmin.forEach(admin => {
            names.push(admin.contactorName);
            ids.push(admin.id);
        });
        this.noticeMsg = `确认删除'${names.join("','")}' ?`;
        this.confirm.ccf = () => {

        };
        this.confirm.cof = () => {
            this.layoutService.show();
            if (selectAdmin.length == 1) {
                this.service.deleteAdmin(selectAdmin[0].id)
                    .then(response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            //删除成功
                            this.getData();
                        } else {
                            alert("Res sync error");
                        }
                    }
                    )
                    .catch((e) => this.onRejected(e));
            } else {
                this.service.deleteAdmins(selectAdmin)
                    .then(response => {
                            this.layoutService.hide();
                            if (response && 100 == response["resultCode"]) {
                                //删除成功
                                this.getData();
                            } else {
                                alert("Res sync error");
                            }
                        }
                    )
                    .catch((e) => this.onRejected(e));
            }
        };
        this.confirm.open();
    }


    change2Status(status: number): void {
        const selectAdmin = this.admins.filter((admin) => { return admin.isSelect && admin.status != status; });
        if (selectAdmin.length == 0) {
            this.showAlert(`请先选择需要${status == 0 ? "取消激活" : "激活"}的管理员！`);
            return;
        }

        this.noticeTitle = "警告";
        const names = [];
        const ids: string[] = [];
        selectAdmin.forEach(admin => {
            names.push(admin.contactorName);
            ids.push(admin.id);
        });
        this.noticeMsg = `确认${status == 0 ? "取消激活" : "激活"}'${names.join("','")}' ?`;
        this.confirm.ccf = () => {
        };
        this.confirm.cof = () => {
            this.layoutService.show();
            this.service.updateAdminStatus(selectAdmin, status)
                .then(response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            this.getData();
                        } else {
                            alert("Res sync error");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        };
        this.confirm.open();
    }

    changEnterpriseFilter(enterprise: Enterprise) {
        this.selectEnterprise = enterprise;
        this.pageIndex = 0;
        this.pager.render(1);
        this.getData();
    }

    getData(pageIndex?: number): void {
        this.pageIndex = pageIndex || this.pageIndex;
        this.layoutService.show();
        if (this.selectEnterprise) {
            this.service.getEnterpriseAdmins(this.selectEnterprise.id, this.pageIndex, this.pageSize)
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            this.setData(response);
                        } else {
                            alert("Res sync error");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        } else {
            this.layoutService.show();
            this.service.getAdmins(this.pageIndex, this.pageSize)
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            this.setData(response);
                        } else {
                            alert("Res sync error");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        }
    }


    setData(ret) {
        this.admins = ret.resultContent;
        this.tp = ret.pageInfo.totalPage;
    }


    gotoCreatePage(): void {
        this.router.navigateByUrl("ent-mng/ent-admin-mng/ent-admin-cre");
    }

    eidtAdmin(admin: Admin) {
        this.router.navigateByUrl(`ent-mng/ent-admin-mng/ent-admin-cre/${admin.id}`);
    }

    selectAll($event: any): void {
        console.log($event);
        const checked = $event.target.checked;
        this.admins.forEach(admin => {
            admin.isSelect = checked;
        });
    }

    showAlert(msg: string): void {
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

    nof() {

    }

    cof() {}

    ccf() {}
}