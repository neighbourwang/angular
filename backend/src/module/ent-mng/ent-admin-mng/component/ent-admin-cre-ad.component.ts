import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PaginationComponent } from "../../../../architecture";

import { EntAdminCreADService } from "../service/ent-admin-cre-ad.service";

import { EntAdminMngService } from "../service/ent-admin-mng.service";

import { Enterprise } from "../model/enterprise.model";

import { Admin } from "../model/admin.model";
import { AdminAD } from "../model/admin-ad.model";

@Component({
    selector: "ent-admin-cre",
    templateUrl: "../template/ent-admin-cre-ad.html",
    styleUrls: [],
    providers: []
})
export class EntAdminCreADComponent implements OnInit {

    eid = "";//企业id
    aid = ""; //管理员id
    isEdit = false;
    noticeTitle = "";
    noticeMsg = "";
    admin = new Admin();

    enterprise = new Enterprise();
    adminAds: Array<AdminAD>;
    pageIndex = 0;
    tp = 1; //totalPage
    pageSize = 10;

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("pager")
    pager: PaginationComponent;
    constructor(
        private service: EntAdminCreADService,
        private mngService: EntAdminMngService,
        private validationService: ValidationService,
        private layoutService: LayoutService,
        private router: Router,
        private activatedRouter: ActivatedRoute
    ) {
        if (activatedRouter.snapshot.params["eid"]) {
            this.eid = activatedRouter.snapshot.params["eid"] || "";
            this.aid = activatedRouter.snapshot.params["aid"] || "";
            this.getADEnterpriseUser().then(() => {
                if (this.aid != "") {
                    this.isEdit = true;
                    this.getAdminById(this.aid);
                }
            });
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

                    //如果编辑则让列表中相应的选项选中，如果有的话，因为存在分页的情况
                    this.adminAds.forEach((adminad) => {
                        if (adminad.loginName ===this. admin.loginName) {
                            adminad.isSelect = true;
                        }
                    })
                } else {
                    this.showAlert("Res sync error");
                }
            }
            )
            .catch(() => (e) => this.onRejected(e));
    }

    //获取管理员数据
    getADEnterpriseUser(pageIndex?: number): Promise<any> {
        this.pageIndex = pageIndex || this.pageIndex;
        this.layoutService.show();
        return this.service.getEnterpriseADAdmins(this.eid, this.pageIndex, this.pageSize)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.adminAds = response.resultContent;
                    this.tp = response.pageInfo.totalPage;
                } else {
                    alert("Res sync error");
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

        if (this.aid == "") {
            this.service.createAdmin(this.admin)
                .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.showAlert("创建成功");
                        this.router.navigateByUrl("ent-mng/ent-admin-mng/ent-admin-mng/" + this.eid);
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


    selectAdminAd(adminad: AdminAD) {
        this.admin.loginName = adminad.loginName;
        this.admin.userName = adminad.userName;
        this.admin.contactPhone = adminad.phone;
        this.admin.description = adminad.description;
        this.adminAds.forEach((e) => {
            e.isSelect = false;
        });
        adminad.isSelect = true;

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