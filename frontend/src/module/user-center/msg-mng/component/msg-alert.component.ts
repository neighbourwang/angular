import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

import { LayoutService, NoticeComponent, ConfirmComponent, CountBarComponent } from "../../../../architecture";

//Model
import { MsgAlertModel, MsgModel } from "../model/msg-alert.model";

//Service
import { MsgMngService } from "../service/msg-mng.service";

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
    @ViewChild('container') container;
    msgAlert: MsgAlertModel = new MsgAlertModel();
    expand: boolean = false;
    ngOnInit(): void {
        window.setInterval(() => {
            this.getMsgAlert();
        }, 10000);
        
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
        this.service.getMsgAlert()
            .then(
            response => {
                if (response && 100 == response["resultCode"]) {
                    this.msgAlert = response.resultContent;
                    console.log(this.msgAlert, "this.msgAlert");
                } else {
                    //this.showMsg("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
                    this.msgAlert.edge = 0;
                    return;
                }
            }
            )
            .catch((e) => {
                //this.onRejected(e);
                this.msgAlert.edge = 0;
            });
    }

    openMsgListPage() {
        this.router.navigate([`user-center/msg-mng/msg-list`,]);
    }
}