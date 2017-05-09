import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent  } from '../../../../architecture';

//service
import { AlarmNoticeListService } from '../service/alarm-notice-list.service';

@Component({
    selector: 'alarm-notice-list',
    templateUrl: '../template/alarm-notice-list.html',
    styleUrls: [],
    providers: []
})

export class AlarmNoticeListComponent implements OnInit{

    constructor(
        private router : Router,
        private service : AlarmNoticeListService,
        private layoutService : LayoutService
    ) {

    }

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    ngOnInit (){
        console.log('init');
        //this.layoutService.show();


    }

    gotoSet(){
        this.router.navigate([`mtc-center/alarm-notice/host-memory-use`]);
    }

    showAlert(msg: string): void {
        this.layoutService.hide();
        this.noticeTitle = "NET_MNG_VM_DBT_PORT.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("NET_MNG_VM_DBT_PORT.GETTING_DATA_FAILED");
    }

}
