import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PaginationComponent, SystemDictionary,
    SystemDictionaryService } from "../../../../architecture";

import { Admin } from "../model/admin.model";

import { Enterprise } from "../model/enterprise.model";

import { EntAdminMngService } from "../service/ent-admin-mng.service";

import { EntAdminCreService } from "../service/ent-admin-cre.service";


@Component({
    selector: "ent-admin-mng",
    templateUrl: "../template/ent-admin-mng.html",
    styleUrls: [],
    providers: []
})
export class EntAdminMngComponent implements OnInit {
    pageIndex = 0;
    tp = 1; //totalPage
    pageSize = 10;

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("pager")
    pager: PaginationComponent;

    admins: Admin[]; //当前企业的所有管理员
    enterprise: Enterprise; //当前企业

    statusDic: Array<SystemDictionary>; //用户状态字典
    authDic: Array<SystemDictionary>; //认证模式字典
    eid: string; //企业ID

    constructor(
        private service: EntAdminMngService,
        private layoutService: LayoutService,
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private sysDicService: SystemDictionaryService,
    ) {
        if (activatedRouter.snapshot.params["id"]) {
            this.eid = activatedRouter.snapshot.params["id"] || "";
        } else {
            this.eid = "1";
        }
    }


    ngOnInit() {
        this.layoutService.show();
        //this.getStatusDic().
        //    then(() => {
        //        return this.getAuthDic();
        //    })
        //    .then(() => {
        //        this.getData();
        //        this.getEnterpriseById(this.eid);
        //    });
        this.sysDicService.getItems("USER", "STATUS")
            .then(
                (systemDictionarys) => {
                    this.statusDic = systemDictionarys;
                    return this.sysDicService.getItems("AUTHENTICATION", "MODE");
                }
            )
            .then(
                (systemDictionarys) => {
                    this.authDic = systemDictionarys;
                    this.getData();
                    this.getEnterpriseById(this.eid);
                });
    }

    ////获取用户状态字典
    //getStatusDic() {
    //    const p = new Promise((resolve, reject) => {
    //        this.sysDicService.sysDicOF(this,
    //            (sf: boolean, systemDictionarys: Array<SystemDictionary>) => {
    //                this.statusDic = systemDictionarys;
    //                resolve();
    //            },
    //            "USER",
    //            "STATUS");
    //    });
    //    return p;
    //}

    ////获取认证模式字典
    //getAuthDic() {
    //    const p = new Promise((resolve, reject) => {
    //        this.sysDicService.sysDicOF(this,
    //            (sf: boolean, systemDictionarys: Array<SystemDictionary>) => {
    //                this.authDic = systemDictionarys;
    //                resolve();
    //            },
    //            "AUTHENTICATION",
    //            "MODE");
    //    });
    //    return p;
    //}

    //根据value获取字典的txt
    getDicText(value: string, dic: Array<SystemDictionary>): String {
        const d = dic.find((e) => {
            return e.value == value;
        });
        if (d) {
            return d.displayValue;
        } else {
            return value;
        }

    }

    //根据企业id获取企业信息
    getEnterpriseById(id: string): void {
        //根据企业id获取企业信息
        this.layoutService.show();
        this.service.getEnterpriseById(id)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {

                        this.enterprise = response["resultContent"];

                        this.layoutService.hide();
                    } else {
                        this.showAlert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    //删除管理员
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
            names.push(admin.userName);
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

    //更改用户状态
    change2Status(status: number): void {
        const selectAdmin = this.admins.find((admin) => { return admin.isSelect });
        if (!selectAdmin) {
            this.showAlert(`请先选择需要${status == 1 ? "启用" : "禁用"}的管理员！`);
            return;
        }

        this.noticeTitle = "警告";

        if (selectAdmin.status == status) {
            this.showAlert(`该管理员已经是${this.getDicText(status.toString(), this.statusDic)}状态！`);
            return;
        }
        this.noticeMsg = `确认${status == 1 ? "启用" : "禁用"}'${selectAdmin.userName}' ?`;
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

    //获取管理员数据
    getData(pageIndex?: number): void {
        this.pageIndex = pageIndex || this.pageIndex;
        this.layoutService.show();
        this.service.getEnterpriseAdmins(this.eid, this.pageIndex, this.pageSize)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.setData(response);
                    } else {
                        alert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    //设置绑定变量
    setData(ret) {
        this.admins = ret.resultContent;
        this.tp = ret.pageInfo.totalPage;
    }

    //跳转至创建页面
    gotoCreatePage(): void {
        if (this.enterprise.authMode == "1") {
            this.router.navigateByUrl(`ent-mng/ent-admin-mng/ent-admin-cre-ad/enterprise/${this.eid}`);
        } else {
            this.router.navigateByUrl(`ent-mng/ent-admin-mng/ent-admin-cre/enterprise/${this.eid}`);
        }

    }

    //编辑管理员
    editAdmin() {
        const selectAdmin = this.admins.find((admin) => { return admin.isSelect; });
        if (!selectAdmin) {
            this.showAlert("请先选择需要编辑的管理员！");
            return;
        }
        if (this.enterprise.authMode == "1") {
            this.router
                .navigateByUrl(`ent-mng/ent-admin-mng/ent-admin-cre-ad/enterprise/${this.eid}/id/${selectAdmin.id}`);
        } else {
            this.router
                .navigateByUrl(`ent-mng/ent-admin-mng/ent-admin-cre/enterprise/${this.eid}/id/${selectAdmin.id}`);
        }
    }

    //返回企业列表
    gotoEnterpriseList(admin: Admin) {
        this.router.navigateByUrl(`ent-mng/ent-est-mng/ent-est-mng`);
    }

    //选中当前管理员
    selectAdmin(admin: Admin) {
        this.admins.forEach(e => { e.isSelect = false; });
        admin.isSelect = true;
    }

    resetPassword() {
        this.layoutService.show();
        const selectAdmin = this.admins.find((admin) => { return admin.isSelect; });
        if (!selectAdmin) {
            this.showAlert("请先选择需要重置密码的管理员！");
            return;
        }
        this.service.resetPassword(selectAdmin)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && "100" == response["resultCode"]) {
                        this.layoutService.hide();
                        this.showAlert("密码重置成功");
                    } else {
                        alert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
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

    nof() {}

    cof() {}

    ccf() {}
}