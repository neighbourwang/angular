import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, SystemDictionary, PaginationComponent  } from '../../../../architecture';

//model
import { AliMajorList } from '../model/ali-major-list.model';
import { DepartList } from '../model/depart-list.model';

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

    pageIndex= 1;
    pageSize= 10;
    totalPage= 1;

    type: string;
    data: Array<AliMajorList>;
    majorInfo: AliMajorList= new AliMajorList();
    testInfo: boolean;
    id: string;
    departs: Array<DepartList>;


    ngOnInit (){
        console.log('init');
        this.getData();
    }

    getData(pageIndex?) {
        this.pageIndex= pageIndex || this.pageIndex;
        this.layoutService.show();
        this.service.getData(this.pageIndex, this.pageSize)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.data = response["resultContent"];
                        this.totalPage= response.pageInfo.totalPage;
                        console.log(this.data,"this.data");
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    editPage(item){
        this.type= "edit";
        this.id= item.id;
        this.layoutService.show();
        this.service.updateInfo(this.id)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.majorInfo = response["resultContent"];
                        this.majorMng.open("编辑登录信息");
                        console.log("editInfo",this.majorInfo);
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    getDetail(item){
        this.type= "info";
        this.id= item.id;
        this.layoutService.show();
        this.service.getDetail(this.id)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.majorInfo = response["resultContent"];
                        this.majorMng.open("主账号详情");
                        console.log("majorInfo",this.majorInfo);
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    testMajor(){
        this.layoutService.show();
        this.service.testMajor()
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.testInfo= true;
                    }else if(response.resultCode == 500){
                        this.testInfo= false;
                    }else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    distriPage(item){
        this.type= "distribute";
        this.layoutService.show();
        this.service.departMajor()
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.departs= response["resultContent"];
                        this.distriDepart.open("分配部门");
                    }else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    gotoSubMng(){
        this.router.navigate([`user-center/ali-cloud/ali-sub-list`]);
    }

    operate(){
        if(this.type== "info"){
            this.majorMng.close();
        }else if(this.type== "edit"){
            this.layoutService.show();
            this.service.edit(this.id)
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            this.getData();
                            this.majorMng.close();
                        }else {
                            this.showAlert("COMMON.OPERATION_ERROR");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
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
