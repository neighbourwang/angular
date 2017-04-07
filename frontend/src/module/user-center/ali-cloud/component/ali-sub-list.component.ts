import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, SystemDictionary, PaginationComponent, ValidationService ,Validation, ValidationRegs } from '../../../../architecture';

//model

//service
import { AliSubService } from '../service/ali-sub-list.service';

@Component({
    selector: 'ali-sub-list',
    templateUrl: '../template/ali-sub-list.html',
    styleUrls: ['../style/ali-sub-list.less'],
    providers: []
})

export class AliSubListComponent implements OnInit{

    constructor(
        private router : Router,
        private service : AliSubService,
        private layoutService : LayoutService
    ) {

    }

    @ViewChild("pager")
    pager: PaginationComponent;
    @ViewChild("notice")
    notice: NoticeComponent;
    @ViewChild("subMng")
    subMng: PopupComponent;
    @ViewChild("distriDepart")
    distriDepart: PopupComponent;

    noticeTitle = "";
    noticeMsg = "";

    type: string;

    ngOnInit (){
        console.log('init');
    }

    gotoMajorMng(){
        this.router.navigate([`user-center/ali-cloud/ali-major-list`]);
    }

    editPage(item){
        this.type= "edit";
        this.subMng.open("编辑子账号");
    }
    crePage(){
        this.type= "create";
        this.subMng.open("创建子账号");
    }
    getDetail(item){
        this.type= "info";
        this.subMng.open("子账号详情");
    }
    distriPage(item){
        this.distriDepart.open("分配部门")
    }

    creOredit(){
        if(this.type== "info"){
            this.subMng.close();
        }else if(this.type== "create"){

        }else{

        }
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
