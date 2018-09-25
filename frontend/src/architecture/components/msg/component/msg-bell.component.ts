import { Component, OnInit, ViewChild, } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

//Model
import { MsgAlertModel, MsgModel } from "../model/msg-bell.model";

//Service
import { MsgMngService } from "../service/msg-mng.service";
import { unreadnumber } from "../../../../module/user-center/msg-mng/service/msg-number.service";


@Component({
    selector: "msgBell",
    templateUrl: "../template/msg-bell.component.html",
    styleUrls: ["../style/msg-bell.less"],
    providers: []
})
export class MsgBellComponent implements OnInit {
    constructor(
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
        if (!this.container.nativeElement.contains(event.target)) {
            this.expand = false;
        }
    }

    open() {
        this.expand = !this.expand;
    }

    getMsgAlert(): void {
        this.service.getMsgListStatus(1, 4, '0')
            .then(
            response => {
                console.log(response, "msgAlert response");
                if (response && 100 == response["resultCode"]) {
                    this.msgAlert.edge = response.pageInfo.totalRecords;
                    this.msgAlert.list = response.resultContent;
                    this.totalPage = response.pageInfo.totalPage;
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