import { Component, ViewChild, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, dictPipe, SystemDictionary } from "../../../../architecture";

import { EmailTemplateModel } from "../model/email-mng.model";

import { EmailMngService } from "../service/email-mng.service";
import { EmailMngDictService } from "../service/email-mng-dict.service";

@Component({
    selector: "email-template-list",
    templateUrl: "../template/email-template-list.html",
    styleUrls: [],
    providers: []
})
export class EmailTemplateListComponent implements OnInit {
    constructor(
        private router: Router,
        private layoutService: LayoutService,
        private dictPipe: dictPipe,
        private dictService: EmailMngDictService,
        private service: EmailMngService
    ) {
    }

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("notice")
    notice: ConfirmComponent;

    noticeTitle: string = "";
    noticeMsg: string = "";

    typeDictArray: Array<SystemDictionary> = [];
    temptypeDictArray: Array<SystemDictionary> = [];

    emailtemps: Array<EmailTemplateModel> = [];    //首页emailsetup列表
    selectedtemp: EmailTemplateModel = new EmailTemplateModel();

    
    ngOnInit() {
        this.dictService.typeDict
        .then((items) => {
            this.typeDictArray = items;
            console.log(this.typeDictArray, "this.typeDictArray");
        });

        this.dictService.temptypeDict
        .then((items) => {
            this.temptypeDictArray = items;
            console.log(this.temptypeDictArray, "this.temptypeDictArray");
        });

        this.getEmailTemplateList();
    }

    getEmailTemplateList() {
        this.layoutService.show();
        this.service.getEmailTemplateList()
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {                    
                    this.emailtemps = response.resultContent;                    
                    console.log(this.emailtemps, "emailtemps!!!", this.emailtemps[0].name);
                } else {
                    this.showAlert("COMMON.GETTING_DATA_FAILED");
                }
            }
            )
            .catch((e) => this.onRejected(e));

    }

    //Menu: 查看Email模板的详细信息
    emailTemplateDetailsPage() {
        let temp = this.getSelected();
        if(temp){
            this.selectedtemp = temp;
            this.router.navigate([`sys-setup/email-mng/email-template-details`, {"temp_id": this.selectedtemp.id}]);
        }
    }

    //Menu: 返回Email设置页面
    emailMngPage() {
        this.router.navigate([`sys-setup/email-mng/email-list`]);
    }

    //选择行
    selectItem(index:number): void {
        this.emailtemps.map(n=> {n.checked = false;});
        this.emailtemps[index].checked = true;
        console.log(this.emailtemps, "=== Please see which one is selected ===");
    }

    UnselectItem(): void {
        this.emailtemps.map(n=> {n.checked = false;});
    }

    getSelected() {
        let item = this.emailtemps.find((n) => n.checked) as EmailTemplateModel;
        if (item){
            return item;
        }
        else {
            this.showMsg("SYS_SETUP.PLEASE_CHOOSE_EMAIL_TEMPLATE");
            return null;
        }
    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason, "onRejected");
        this.showAlert("COMMON.GETTING_DATA_FAILED");
    }

    showMsg(msg: string) {
        console.log(msg, "showMsg");
        this.notice.open("COMMON.SYSTEM_PROMPT", msg);
    }

	showAlert(msg: string): void {
        console.log(msg, "showAlert");
        this.layoutService.hide();
        this.noticeTitle = "COMMON.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showError(msg: any) {
        this.notice.open(msg.title, msg.desc);
    }

}
