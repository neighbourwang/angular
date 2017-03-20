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
        private validationService: ValidationService
    ) {
    }

    noticeTitle = "";
    noticeMsg = "";
    new: boolean = false;
    @ViewChild("notice")
    notice: NoticeComponent;
    attest = new Attest();
    edit = false;
    editAcc = false;
    testResult?: boolean;
    type: string;

    title: string;
    ngOnInit() {
        // console.log(this.router.params);
        this.router.params.forEach((params: Params) => {
            const id = params["id"];
            this.type = params["type"];
            console.log(this.type);
            switch (this.type) {
                case "edit":
                    this.title = "USER_CENTER.EDIT_AD_SOURCE"; //USER_CENTER.EDIT_AD_SOURCE=>编辑认证源 

                    this.edit = true;
                    break;
                case "editAcc":
                    this.title = "USER_CENTER.EDIT_AD_SOURCE"; //USER_CENTER.EDIT_AD_SOURCE=>编辑认证源 

                    this.editAcc = true;
                    break;
                case "create":
                    this.title = "USER_CENTER.CREATE_AD_SOURCE"; //USER_CENTER.CREATE_AD_SOURCE=>创建认证源 

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
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //编辑账号
    onEdit() {
        if ($.trim(this.attest.name) === "") {
            this.showAlert("USER_CENTER.AD_SOURCE_NAME_FIRST"); //USER_CENTER.AD_SOURCE_NAME_FIRST=>必须先填写认证源名称！ 

            return false;
        }
        this.layoutService.show();
        this.service.editAttest(this.attest)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.showAlert("NET_MNG_VM_PORT.SAVE_SUCCESS"); //NET_MNG_VM_PORT.SAVE_SUCCESS=>保存成功！ 

                    this.gotoList();
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    onEditAcc() {
        if ($.trim(this.attest.userName) === "") {
            this.showAlert("USER_CENTER.USERNAME_IS_MUST"); //USER_CENTER.USERNAME_IS_MUST=>必须先填写用户名！ 

            return false;
        }
        if (!this.validationService.isEmail(this.attest.userName)) {
            this.showAlert("USER_CENTER.USERNAME_MUST_BE_EMAIL"); //USER_CENTER.USERNAME_MUST_BE_EMAIL=>用户名必须是邮箱！ 

            return false;
        }
        if ($.trim(this.attest.password) === "") {
            this.showAlert("USER_CENTER.EMAIL_FIRST"); //USER_CENTER.EMAIL_FIRST=>必须先填写密码！ 

            return false;
        }

        if ($.trim(this.attest.loginProp) === "") {
            this.showAlert("USER_CENTER.ACCOUNT_NAME_ATTR_FIRST"); //USER_CENTER.ACCOUNT_NAME_ATTR_FIRST=>必须先填写登录账户名属性！ 

            return false;
        }
        this.layoutService.show();
        this.service.editAcc(this.attest)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.showAlert("NET_MNG_VM_PORT.SAVE_SUCCESS"); //NET_MNG_VM_PORT.SAVE_SUCCESS=>保存成功！ 

                    this.gotoList();
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    onCreate() {
        if ($.trim(this.attest.name) === "") {
            this.showAlert("USER_CENTER.AD_SOURCE_NAME_FIRST"); //USER_CENTER.AD_SOURCE_NAME_FIRST=>必须先填写认证源名称！ 

            return false;
        }

        if ($.trim(this.attest.url) === "") {
            this.showAlert("USER_CENTER.URL_ADDRESS_FIRST"); //USER_CENTER.URL_ADDRESS_FIRST=>必须先填写URL地址！ 

            return false;
        }

        if ($.trim(this.attest.userName) === "") {
            this.showAlert("USER_CENTER.USERNAME_IS_MUST"); //USER_CENTER.USERNAME_IS_MUST=>必须先填写用户名！ 

            return false;
        }
        if (!this.validationService.isEmail(this.attest.userName)) {
            this.showAlert("USER_CENTER.USERNAME_MUST_BE_EMAIL"); //USER_CENTER.USERNAME_MUST_BE_EMAIL=>用户名必须是邮箱！ 

            return false;
        }
        if ($.trim(this.attest.password) === "") {
            this.showAlert("USER_CENTER.EMAIL_FIRST"); //USER_CENTER.EMAIL_FIRST=>必须先填写密码！ 

            return false;
        }

        if ($.trim(this.attest.loginProp) === "") {
            this.showAlert("USER_CENTER.ACCOUNT_NAME_ATTR_FIRST"); //USER_CENTER.ACCOUNT_NAME_ATTR_FIRST=>必须先填写登录账户名属性！ 

            return false;
        }
        this.layoutService.show();
        this.service.create(this.attest)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.showAlert("NET_MNG_VM_PORT.SAVE_SUCCESS"); //NET_MNG_VM_PORT.SAVE_SUCCESS=>保存成功！ 

                    this.gotoList();
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    testSource() {

        if ($.trim(this.attest.url) === "") {
            this.showAlert("USER_CENTER.URL_ADDRESS_FIRST"); //USER_CENTER.URL_ADDRESS_FIRST=>必须先填写URL地址！ 

            return false;
        }


        if ($.trim(this.attest.userName) === "") {
            this.showAlert("USER_CENTER.USERNAME_IS_MUST"); //USER_CENTER.USERNAME_IS_MUST=>必须先填写用户名！ 

            return false;
        }

        if (!this.validationService.isEmail(this.attest.userName)) {
            this.showAlert("USER_CENTER.USERNAME_MUST_BE_EMAIL"); //USER_CENTER.USERNAME_MUST_BE_EMAIL=>用户名必须是邮箱！ 

            return false;
        }

        if ($.trim(this.attest.password) === "") {
            this.showAlert("USER_CENTER.EMAIL_FIRST"); //USER_CENTER.EMAIL_FIRST=>必须先填写密码！ 

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
        this.route.navigate(["user-center/attest-mng/attest-mng"]);
    }

    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "NET_MNG_VM_PORT.PROMPT"; //NET_MNG_VM_PORT.PROMPT=>提示 

        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("NET_MNG_VM_DBT_PORT.GETTING_DATA_FAILED"); //NET_MNG_VM_DBT_PORT.GETTING_DATA_FAILED=>获取数据失败！ 

    }
}