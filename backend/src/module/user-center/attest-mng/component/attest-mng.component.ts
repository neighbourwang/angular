import { Component, ViewChild, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { LayoutService, ValidationService, NoticeComponent, PaginationComponent, ConfirmComponent, SystemDictionary,
    SystemDictionaryService } from "../../../../architecture";

import { Attest } from "../model/attest.model";
import { AttMngService } from "../service/attest-mng.service"

@Component({
    selector: "attest-mng",
    templateUrl: "../template/attest-mng.component.html",
    styleUrls: [],
    providers: []
})
export class AttestMngComponent implements OnInit {
    constructor(
        private router: Router,
        private dicService: SystemDictionaryService,
        private layoutService: LayoutService,
        private service: AttMngService
    ) {
    }

    noticeTitle = "";
    noticeMsg = "";
    totalPage = 1;
    pageIndex =1;
    pageSize = 20;
    attests: Attest[];
    statusDic: Array<SystemDictionary>;

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("pager")
    pager: PaginationComponent;

    ngOnInit() {
        this.dicService.getItems("USER", "STATUS")
            .then((dic) => {
                this.statusDic = dic;
                this.getAttests();
            });
    }

    getAttests(index?: number) {
        this.pageIndex = index || this.pageIndex;
        this.layoutService.show();
        this.service.getAttests(this.pageIndex, this.pageSize)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.attests = response["resultContent"];
                        this.totalPage = response.pageInfo.totalPage;
                    } else {
                        alert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    onCreate() {
        this.gotoEditPage("create");
    }

    onEdit() {
        const attest = this.getSelectAttest();
        if (!attest) {
            this.showAlert("请先选择需要编辑的认证源");
            return;
        }
        this.gotoEditPage("edit", attest);
    }

    onEditAcc() {
        const attest = this.getSelectAttest();
        if (!attest) {
            this.showAlert("请先选择需要编辑的认证源");
            return;
        }
        this.gotoEditPage("editAcc", attest);
    }

    gotoEditPage(type: string, attest?: Attest) {
        attest = attest || new Attest();
        this.router.navigate(["user-center/attest-mng/attest-source-cre", { "type": type, id: attest.id }]);
    }

    updateStatus(status: string) {

        var attest = this.getSelectAttest();
        if (!attest) {
            this.showAlert("请先选择需要启用或者禁用的认证源");
            return;
        }

        if (attest.status == status) {
            this.showAlert(`该认证源已经是${this.getDicText(status.toString(), this.statusDic)}状态！`);
            return;
        }
        this.noticeMsg = `确认${status == "1" ? "启用" : "禁用"}'${attest.name}' ?`;
        this.confirm.ccf = () => {
        };
        this.confirm.cof = () => {
            this.layoutService.show();
            this.service.upateStatus(attest, status)
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            this.getAttests();
                        } else {
                            alert("Res sync error");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        };
        this.confirm.open();
    }

    onDelete() {
        var attest = this.getSelectAttest();
        if (!attest) {
            this.showAlert("请先选择需要删除的认证源");
            return;
        }

        this.noticeMsg = `确认删除认证源'${attest.name}' ?`;
        this.confirm.ccf = () => {
        };
        this.confirm.cof = () => {
            this.layoutService.show();
            this.service.deleteAttest(attest)
                .then(response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            this.getAttests();
                        } else {
                            alert("Res sync error");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        };
        this.confirm.open();
    }

    //获取当前选中的认证源
    getSelectAttest(): Attest {
        const attest = this.attests.find((o) => { return o.isSelect });
        return attest;
    }

    //根据value获取字典的txt
    getDicText(value: string, dic: Array<SystemDictionary>): String {
        let d: SystemDictionary;
        if ($.isArray(dic)) {
            d = dic.find((e) => {
                return e.value == value;
            });
        }
        if (d) {
            return d.displayValue;
        } else {
            return value;
        }

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
}