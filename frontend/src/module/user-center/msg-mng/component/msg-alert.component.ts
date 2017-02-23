import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

import { LayoutService, NoticeComponent, ConfirmComponent, CountBarComponent } from "../../../../architecture";
//service
import { MsgAlertModel, MsgModel } from "../model/msg-alert.model";
import { MsgAlertService } from "../service/msg-alert.service";

@Component({
    selector: "msgAlert",
    templateUrl: "../template/msg-alert.component.html",
    styleUrls: ["../style/msg-alert.less"],
    providers: [],
    host: {
        '(document:click)': 'onClick($event)',
    }
})
export class MsgAlertComponent implements OnInit {
    constructor(
        private layoutService: LayoutService,
        private router: Router,
        private service: MsgAlertService,

    ) {
        document.addEventListener('click', this.offClickHandler.bind(this));
    }
    @ViewChild('container') container;
    msgAlert: MsgAlertModel = new MsgAlertModel();
    expand: boolean = false;
    ngOnInit(): void {



    }

    offClickHandler(event) {
        if (!this.container.nativeElement.contains(event.target)){ 
            this.expand = false;
        }
    }

    open() {
        this.expand = !this.expand;
    }
}