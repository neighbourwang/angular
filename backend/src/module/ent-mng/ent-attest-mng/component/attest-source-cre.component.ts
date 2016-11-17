import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, ValidationService, NoticeComponent } from "../../../../architecture";

import { AttMngCreService } from "../service/attest-source-cre.service";

import { Attest } from "../model/attest.model";

@Component({
    selector: "attest-source-cre",
    templateUrl: "../template/attest-source-cre.component.html",
    styleUrls: [],
    providers: []
})
export class AttestSourceCreComponent implements OnInit {
    constructor(
        private router: ActivatedRoute,
        private route: Router,
        private service: AttMngCreService,
        private layoutService: LayoutService,
        private activatedRouter: ActivatedRoute,
        private validationService: ValidationService
    ) {
        if (activatedRouter.snapshot.params["eid"]) {
            this.eid = activatedRouter.snapshot.params["eid"] || "";
        } else {
            this.eid = "1";
        }
    }

    eid: string;
    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;
    attest = new Attest();
    edit = false;
    editAcc = false;
    testResult?: boolean;
    type: string;

    ngOnInit() {
        // console.log(this.router.params);
        this.router.params.forEach((params: Params) => {
            const id = params["id"];
            this.type = params["type"];
            console.log(this.type);
            switch (this.type) {
                case "edit":
                    this.edit = true;
                    break;
                case "editAcc":
                    this.editAcc = true;
                    break;
            }
            if (id) {
                this.getAttestById(id);
            }
        });
    }

    getAttestById(id: string) {
        this.layoutService.show();
        this.service.getAttest(id)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.attest = response["resultContent"];
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //编辑账号
    onEdit() {
        if ($.trim(this.attest.name) === "") {
            this.showAlert("必须先填写认证源名称！");
            return false;
        }
        this.layoutService.show();
        this.service.editAttest(this.attest)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.showAlert("保存成功！");
                    this.gotoList();
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    onEditAcc() {
        if ($.trim(this.attest.userName) === "") {
            this.showAlert("必须先填写用户名！");
            return false;
        }
        if (!this.validationService.isEmail(this.attest.userName)) {
            this.showAlert("用户名必须是邮箱！");
            return false;
        }

        if ($.trim(this.attest.password) === "") {
            this.showAlert("必须先填写密码！");
            return false;
        }

        if ($.trim(this.attest.loginProp) === "") {
            this.showAlert("必须先填写登录账户名属性！");
            return false;
        }
        this.layoutService.show();
        this.service.editAcc(this.attest)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.showAlert("保存成功！");
                    this.gotoList();
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    onCreate() {
        if ($.trim(this.attest.name) === "") {
            this.showAlert("必须先填写认证源名称！");
            return false;
        }

        if ($.trim(this.attest.url) === "") {
            this.showAlert("必须先填写URL地址！");
            return false;
        }

        if ($.trim(this.attest.userName) === "") {
            this.showAlert("必须先填写用户名！");
            return false;
        }

        if (!this.validationService.isEmail(this.attest.userName)) {
            this.showAlert("用户名必须是邮箱！");
            return false;
        }

        if ($.trim(this.attest.password) === "") {
            this.showAlert("必须先填写密码！");
            return false;
        }

        if ($.trim(this.attest.loginProp) === "") {
            this.showAlert("必须先填写登录账户名属性！");
            return false;
        }
        this.layoutService.show();
        this.service.create(this.attest, this.eid)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.showAlert("保存成功！");
                    this.gotoList();
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    testSource() {

        if ($.trim(this.attest.url) === "") {
            this.showAlert("必须先填写URL地址！");
            return false;
        }

        if ($.trim(this.attest.userName) === "") {
            this.showAlert("必须先填写用户名！");
            return false;
        }

        if (!this.validationService.isEmail(this.attest.userName)) {
            this.showAlert("用户名必须是邮箱！");
            return false;
        }

        if ($.trim(this.attest.password) === "") {
            this.showAlert("必须先填写密码！");
            return false;
        }

        this.layoutService.show();
        this.service.testAttest(this.attest)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.testResult = true;
                } else {
                    this.testResult = false;
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    cancel() {
        this.gotoList();
    }

    gotoList() {
        this.route.navigate([`ent-mng/attest-mng/attest-mng/${this.eid}`]);
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