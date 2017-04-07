import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, SystemDictionary, PaginationComponent  } from '../../../../architecture';

//model

//service
import { AliSharedService } from '../service/ali-shared-list.service';

@Component({
    selector: 'ali-shared-list',
    templateUrl: '../template/ali-shared-list.html',
    styleUrls: ['../style/ali-major-list.less'],
    providers: []
})

export class AliSharedListComponent implements OnInit{

    constructor(
        private router : Router,
        private service : AliSharedService,
        private layoutService : LayoutService
    ) {

    }

    @ViewChild("pager")
    pager: PaginationComponent;
    @ViewChild("notice")
    notice: NoticeComponent;
    @ViewChild("sharedMng")
    sharedMng: PopupComponent;
    @ViewChild("distriDepart")
    distriDepart: PopupComponent;

    noticeTitle = "";
    noticeMsg = "";

    ngOnInit (){
        console.log('init');
    }

    getDetail(item){
        this.sharedMng.open("账号详情");
    }

    distriPage(item){
        this.distriDepart.open("分配部门")
    }
    
    close(){
        this.sharedMng.close();
    }

    operate(){
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
        this.showAlert("COMMON.FAILED_TO_GET_DATA");
    }

}
