import { Component, ViewChild, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent ,dictPipe} from "../../../../architecture";

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
    ) {
    }

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("notice")
    notice: ConfirmComponent;

    @ViewChild("editemailbox")
    editemailbox: PopupComponent;

    
    ngOnInit() {
    }
    
    emailTemplatePage() {
        this.router.navigate([`sys-setup/email-mng/email-template-list`]);
    }

}
