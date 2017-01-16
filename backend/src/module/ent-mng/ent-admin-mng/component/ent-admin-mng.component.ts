import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import {
    LayoutService, NoticeComponent, ConfirmComponent,
    PaginationComponent, PopupComponent, SystemDictionary,
    dictPipe
} from "../../../../architecture";

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
    authenticationSource = 1;
    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("pager")
    pager: PaginationComponent;


    @ViewChild("crAccountModel")
    crAccountModel: PopupComponent;


    admins: Admin[]; //当前企业的所有管理员
    enterprise: Enterprise = new Enterprise(); //当前企业

    statusDic: Array<SystemDictionary>; //用户状态字典
    authDic: Array<SystemDictionary>; //认证模式字典
    eid: string; //企业ID

    constructor(
        private service: EntAdminMngService,
        private layoutService: LayoutService,
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private dictPipe: dictPipe,
    ) {
        if (activatedRouter.snapshot.params["id"]) {
            this.eid = activatedRouter.snapshot.params["id"] || "";
        } else {
            this.eid = "1";
        }
    }


    ngOnInit() {
        this.getData();
        this.getEnterpriseById(this.eid);

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

    ////根据value获取字典的txt
    //getDicText(value: string, dic: Array<SystemDictionary>): String {
    //    const d = dic.find((e) => {
    //        return e.value == value;
    //    });
    //    if (d) {
    //        return d.displayValue;
    //    } else {
    //        return value;
    //    }

    //}

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
            this.showAlert("ENT_MNG.SELECT_ADMIN_TO_DELETE");
            return;
        }

        if (selectAdmin[0].status == 1) {
            //只有禁用状态才可以被删除
            this.showAlert("ENT_MNG.ONLY_DELETE_DISABLED_ADMIN");
            return;
        } 

        this.noticeTitle = "COMMON.WARNING";
        const names: string[] = [];
        const ids: string[] = [];
        selectAdmin.forEach(admin => {
            names.push(admin.userName);
            ids.push(admin.id);
        });
        this.noticeMsg = `ENT_MNG.CONFIRM_DELETE_VALUE^^^'${names.join("','")}' ?`;
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
            this.showAlert(`${status == 1 ? "ENT_MNG.SELECT_ADMIN_TO_ENABLE" : "ENT_MNG.SELECT_ADMIN_TO_DISENABLE"}`);
            return;
        }

        this.noticeTitle = "COMMON.WARNING";

        if (selectAdmin.status == status) {
            this.dictPipe.transform(selectAdmin.status, this.service.statusDic)
                .then((x) => {
                    this.showAlert(`ENT_MNG.THE_ADMIN_STATUS_IS^^^${x}`);
                });
            return;
        }
        this.noticeMsg = `${status == 1 ? "COMMON.ENABLE_VALUE^^^" : "COMMON.DISENABLE_VALUE^^^"}'${selectAdmin.userName}' ?`;
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



    //编辑管理员
    editAdmin() {
        const selectAdmin = this.admins.find((admin) => { return admin.isSelect; });
        if (!selectAdmin) {
            this.showAlert("ENT_MNG.CHOOSE_ADMIN_TO_EDIT");
            return;
        }
        
        if (selectAdmin.authMode == "1") {
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
            this.showAlert("ENT_MNG.CHOOSE_ADMIN_TO_RESET_PASSWORD");
            return;
        }
        if (selectAdmin.status != 1) {
            //只有启用状态才可以重置密码
            this.showAlert("ENT_MNG.ONLY_ENABLED_ADMIN_CAN_RESET_PASSWORD");
            return;
        }

        this.service.resetPassword(selectAdmin)
            .then(
            response => {
                this.layoutService.hide();
                if (response && "100" == response["resultCode"]) {
                    this.layoutService.hide();
                    this.showAlert("COMMON.RESET_PASSWORD_SUCCESS");
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    openCrAccountPop() {
        if (this.enterprise.authMode == "1") {
            this.router.navigateByUrl(`ent-mng/ent-admin-mng/ent-admin-cre-ad/enterprise/${this.eid}`);
        } else {
            this.router.navigateByUrl(`ent-mng/ent-admin-mng/ent-admin-cre/enterprise/${this.eid}`);
        }

        //this.crAccountModel.open();
    }

    //跳转至创建页面
    crAccount(): void {
        if (this.authenticationSource == 1) {
            this.router.navigateByUrl(`ent-mng/ent-admin-mng/ent-admin-cre-ad/enterprise/${this.eid}`);
        } else {
            this.router.navigateByUrl(`ent-mng/ent-admin-mng/ent-admin-cre/enterprise/${this.eid}`);
        }

    }

    authenticationSourceList = [
        {
            id: 0,
            name: "COMMON.LOCAL"
        },
        {
            id: 1,
            name: "AD"
        }
    ];


    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "COMMON.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("COMMON.GETTING_DATA_FAILED");
    }

    nof() { }

    cof() { }

    ccf() { }
}