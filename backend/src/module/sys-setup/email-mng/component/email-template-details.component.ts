import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, dictPipe, SystemDictionary} from "../../../../architecture";

import { EmailTemplateDetailsModel } from "../model/email-mng.model";

import { EmailMngService } from "../service/email-mng.service";
import { EmailMngDictService } from "../service/email-mng-dict.service";

@Component({
    selector: "email-template-detals",
    templateUrl: "../template/email-template-details.html",
    styleUrls: [],
    providers: []
})
export class EmailTemplateDetailsComponent implements OnInit {
    constructor(
        private router: Router,
        private layoutService: LayoutService,
        private dictPipe: dictPipe,
        private activatedRouter : ActivatedRoute,
        private service: EmailMngService,
        private dictService: EmailMngDictService,
    ) {
    }

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("notice")
    notice: ConfirmComponent;

    noticeTitle: string = "";
    noticeMsg: string = "";

    typeDictArray: Array<SystemDictionary> = [];

    temp_id: string = "";

    temp_details: EmailTemplateDetailsModel = new EmailTemplateDetailsModel();
    
    ngOnInit() {
        this.activatedRouter.params.forEach((params: Params) => {
            if (params["temp_id"] != null) {
                this.temp_id = params["temp_id"];
                console.log(this.temp_id);
            }
        });

        this.dictService.typeDict
        .then((items) => {
            this.typeDictArray = items;
            console.log(this.typeDictArray, "this.typeDictArray");
        });

        this.getEmailTemplateDetails();
    }
    
    emailTemplatePage() {
        this.router.navigate([`sys-setup/email-mng/email-template-list`]);
    }

    getEmailTemplateDetails() {
        this.layoutService.show();
        this.service.getEmailTemplateDetails(this.temp_id)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.temp_details = response.resultContent;
                    //console.log(this.temp_details.content, "temp_details.content!!!");
                    let re = /\r\n/gi;
                    this.temp_details.content = this.temp_details.content.replace(re, "<br />");
                    //console.log(this.temp_details.content, "temp_details.content!!!");
                    console.log(this.temp_details, "temp_details!!!");
                } else {
                    this.showAlert("COMMON.GETTING_DATA_FAILED");
                }
            }
            )
            .catch((e) => this.onRejected(e));
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
