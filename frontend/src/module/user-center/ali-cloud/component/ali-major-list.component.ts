import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, SystemDictionary, PaginationComponent  } from '../../../../architecture';

//model

//service
import { AliMajorService } from '../service/ali-major-list.service';

@Component({
    selector: 'ali-major-list',
    templateUrl: '../template/ali-major-list.html',
    styleUrls: ['../style/ali-major-list.less'],
    providers: []
})

export class AliMajorListComponent implements OnInit{

    constructor(
        private router : Router,
        private service : AliMajorService,
        private layoutService : LayoutService
    ) {

    }

    @ViewChild("pager")
    pager: PaginationComponent;
    @ViewChild("notice")
    notice: NoticeComponent;
    @ViewChild("majorMng")
    majorMng: PopupComponent;
    @ViewChild("distriDepart")
    distriDepart: PopupComponent;

    noticeTitle = "";
    noticeMsg = "";


    ngOnInit (){
        console.log('init');
    }

    editPage(item){
        this.majorMng.open("编辑登录信息");
    }

    getDetail(item){
        this.majorMng.open("主账号详情");
    }

    distriPage(item){
        this.distriDepart.open("分配部门")
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
