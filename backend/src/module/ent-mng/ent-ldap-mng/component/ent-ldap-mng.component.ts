import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PaginationComponent, SystemDictionary,
    SystemDictionaryService } from "../../../../architecture";
 
@Component({
    selector: "ent-ladp-mng",
    templateUrl: "../template/ent-ldap-mng.html",
    styleUrls: [],
    providers: []
})
export class EntLdapMngComponent implements OnInit {
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
 

    constructor(
        private layoutService: LayoutService,
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private sysDicService: SystemDictionaryService,
    ) {
        
    }


    ngOnInit() {
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