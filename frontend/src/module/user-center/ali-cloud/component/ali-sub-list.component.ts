import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, SystemDictionary, PaginationComponent, ValidationService ,Validation, ValidationRegs } from '../../../../architecture';

//model
import { AliSubList } from '../model/ali-sub-list.model';
import { DepartList } from '../model/depart-list.model';

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
        private layoutService : LayoutService,
        private activatedRouter : ActivatedRoute
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
    data: Array<AliSubList>;
    id: string;
    subInfo: AliSubList= new AliSubList();
    departsList: Array<DepartList>;

    ngOnInit (){
        console.log('init');
        this.activatedRouter.params.forEach((params: Params) =>{
            this.id= params["id"];
        })
        this.getData();
    }

    getData() {
        this.layoutService.show();
        this.service.getData(this.id)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.data = response["resultContent"];
                        console.log(this.data,"this.data");
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
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
        this.getDepartsList();
        this.subMng.open("创建子账号");
    }

    getDetail(item){
        this.type= "info";
        this.layoutService.show();
        this.service.getDetail(item.id)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.subInfo = response["resultContent"];
                        this.subMng.open("子账号详情");
                        console.log("subInfo",this.subInfo);
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    getDepartsList(){
        this.layoutService.show();
        this.service.getDepartsList()
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.departsList = response["resultContent"];
                        console.log("departsList",this.departsList);
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }
    distriPage(item){
        this.type= "distribute";
        this.distriDepart.open("分配部门")
    }

    operate(){
        if(this.type== "info"){
            this.subMng.close();
        }else if(this.type== "create"){

        }else if(this.type== "edit"){

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
