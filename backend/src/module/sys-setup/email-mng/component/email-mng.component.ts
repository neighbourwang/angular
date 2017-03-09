import { Component, ViewChild, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent ,dictPipe} from "../../../../architecture";

@Component({
    selector: "email-mng",
    templateUrl: "../template/email-mng.html",
    styleUrls: [],
    providers: []
})
export class EmailMngComponent implements OnInit {
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

    editEmial()
    {
        //检测是否选中一行
        this.editemailbox.open();
    }

    acceptEditEmailModify() {

    }

    cancelEditEmailModify() {
        
    }

    mngEmailTemplate() {
        this.router.navigate([`sys-setup/email-mng/email-template-list`]);
    }

}
