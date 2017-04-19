import {Component, ViewChild, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, PaginationComponent, SystemDictionary, ValidationService} from "../../../../architecture";


import { MngServiceList } from '../service/mng-service-list.service';

@Component({
    selector:"mng-service-list",
    templateUrl:"../template/service-list.html",
    styleUrls:[],
    providers:[]
})

export class MngServiceListComponent implements OnInit{
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
    @ViewChild("popUnit")
    popUnit: PopupComponent;
    @ViewChild("setUnit")
    setUnit: PopupComponent;

    noticeTitle = "";
    noticeMsg = "";

    pageIndex= 1;
    pageSize= 10;
    totalPage= 1;

    type: string;

    ngOnInit() {

    }

    serviceUpdate(){
        this.type= "update";
        this.popUnit.open("服务状态更新");
    }

    servicefollow(){
        this.type= "follow";
        this.popUnit.open("服务跟进");
    }

    oneSet(){
        this.setUnit.open("一次性管理服务系统设置");
    }

    gotoDetail(){
        this.router.navigate([`mtc-center/mng-service/mng-service-detail`]);
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
