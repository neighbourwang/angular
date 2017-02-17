import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent  } from '../../../../architecture';

//model
import { CaseMngList } from '../model/case-mng-list.model';

//service
import { CaseMngService } from '../service/case-mng-list.service';

@Component({
    selector: 'case-mng-list',
    templateUrl: '../template/case-mng-list.html',
    styleUrls: ['../style/case-mng-list.less'],
    providers: []
})

export class CaseMngListComponent implements OnInit{

    constructor(
        private router : Router,
        private service : CaseMngService,
        private layoutService : LayoutService
    ) {

    }

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;
    @ViewChild("creCase")
    creCase: PopupComponent;
    @ViewChild("caseDetail")
    caseDetail: PopupComponent;
    @ViewChild("confirm")
    confirm: ConfirmComponent;

    ngOnInit (){
        console.log('init');
        //this.layoutService.show();

    }

    isEdit: boolean;

    create(){
        this.isEdit= false;
        this.creCase.open("创建工单");
    }

    edit(){
        this.isEdit= true;
        this.creCase.open("编辑工单");
    }

    delete(){
        this.confirm.open('删除工单','您选择删除工单，请确认。');
    }

    detail(){
        this.caseDetail.open("工单详细");
    }

    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "提示";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("获取数据失败");
    }

}
