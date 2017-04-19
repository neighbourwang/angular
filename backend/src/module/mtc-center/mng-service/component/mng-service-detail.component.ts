import {Component, ViewChild, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, PaginationComponent, SystemDictionary, ValidationService} from "../../../../architecture";


import { MngServiceList } from '../service/mng-service-list.service';

@Component({
    selector:"mng-service-detail",
    templateUrl:"../template/service-detail.html",
    styleUrls:[],
    providers:[]
})

export class MngServiceDetailComponent implements OnInit{
    constructor(
        private router : Router,
        //private service : MngServiceList,
        private layoutService : LayoutService,
        private validationService: ValidationService
    ){

    }

    @ViewChild("pager")
    pager: PaginationComponent;
    @ViewChild("notice")
    notice: NoticeComponent;
    @ViewChild('confirm')
    confirm: ConfirmComponent;

    noticeTitle = "";
    noticeMsg = "";

    pageIndex= 1;
    pageSize= 10;
    totalPage= 1;

    type: string;

    ngOnInit() {

    }

    goBack(){
        this.router.navigate([`mtc-center/mng-service/mng-service-list`]);
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
