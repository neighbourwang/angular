import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

import { LayoutService, NoticeComponent, ConfirmComponent, CountBarComponent } from "../../../../architecture";

//Model
import { MsgAlertModel, MsgModel } from "../model/msg-alert.model";

//Service
import { MsgMngService } from "../service/msg-mng.service";
import { unreadnumber } from "../service/msg-number.service";

//Mock
import { MsgModel_mock } from "../model/msg-alert.mock";

@Component({
    selector: "msgAlert",
    templateUrl: "../template/msg-alert.component.html",
    styleUrls: ["../style/msg-alert.less"],
    providers: []
})
export class MsgAlertComponent implements OnInit {
    constructor(
        private layoutService: LayoutService,
        private router: Router,
        private service: MsgMngService,

    ) {
        document.addEventListener('click', this.offClickHandler.bind(this));
    }

    pageIndex = 1;
    pageSize = 4;
    totalPage = 1;

    @ViewChild('container') container;
    msgAlert: MsgAlertModel = new MsgAlertModel();
    expand: boolean = false;
    ngOnInit(): void {
        this.getMsgAlert();
        unreadnumber.num = this.msgAlert.edge;
        console.log(unreadnumber.num, "unreadnumber.num");
        
        window.setInterval(() => {
            this.getMsgAlert();
            unreadnumber.num = this.msgAlert.edge;
            console.log(unreadnumber.num, "unreadnumber.num");
        }, 30000);
    }

    offClickHandler(event) {
        if (!this.container.nativeElement.contains(event.target)){ 
            this.expand = false;
        }
    }

    open() {
        this.expand = !this.expand;
    }

    getMsgAlert(): void {
        this.service.getMsgListStatus(1,4,'0')
            .then(
            response => {
                console.log(response, "msgAlert response");
                if (response && 100 == response["resultCode"]) {
                    this.msgAlert.edge = response.pageInfo.totalRecords;
                    this.msgAlert.list = response.resultContent;
                    this.totalPage = response.pageInfo.totalPage;
                    //console.log(this.msgAlert, "this.msgAlert");
                } else {
                    this.msgAlert.edge = 0;
                    console.log("getMsgAlert Failed!!!");
                    return;
                }
            })
            .catch((e) => {
                this.msgAlert.edge = 0;
                console.log("getMsgAlert Exception!!!");
            });
    }

    openMsgListPage() {
        this.router.navigate([`user-center/msg-mng/msg-list`]);
    }
}