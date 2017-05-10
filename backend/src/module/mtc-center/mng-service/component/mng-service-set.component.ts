import {Component, ViewChild, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, PaginationComponent, SystemDictionary, ValidationService} from "../../../../architecture";

//model

//service
import { MngService } from '../service/mng-service.service';

@Component({
    selector:"mng-service-set",
    templateUrl:"../template/service-set.html",
    styleUrls:[],
    providers:[]
})

export class MngServiceSetComponent implements OnInit{
    constructor(
        private router : Router,
        private service : MngService,
        private layoutService : LayoutService,
        private validationService: ValidationService
    ){

    }

    @ViewChild("notice")
    notice: NoticeComponent;
    @ViewChild('confirm')
    confirm: ConfirmComponent;

    noticeTitle = "";
    noticeMsg = "";


    ngOnInit() {

    }

    showAlert(msg: string): void {
        this.layoutService.hide();
        this.noticeTitle = "COMMON.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("COMMON.GETTING_DATA_FAILED");
    }
}
