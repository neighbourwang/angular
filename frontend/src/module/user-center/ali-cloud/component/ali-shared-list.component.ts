import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, SystemDictionary, PaginationComponent  } from '../../../../architecture';

//model
import { AliSharedList } from '../model/ali-shared-list.model';
import { DepartList } from '../model/depart-list.model';

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
    @ViewChild("distriDepart")
    distriDepart: PopupComponent;
    @ViewChild('confirm')
    confirm: ConfirmComponent;

    noticeTitle = "";
    noticeMsg = "";

    data: Array<AliSharedList>;
    departsList: Array<DepartList>;
    selectedDepartment: string;
    selectedDepartmentId: string;
    id: string;
    tempDepartmentId: string;
    tempDepartsList: Array<DepartList>;

    ngOnInit (){
        console.log('init');
        this.getData();
    }

    getData() {
        this.layoutService.show();
        this.service.getData()
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

    distriPage(item){
        this.id= item.id;
        this.selectedDepartment= item.departmentName;
        this.selectedDepartmentId= item.departId;
        this.tempDepartmentId= item.departId;
        this.layoutService.show();
        this.service.getDepartsList()
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.departsList = response["resultContent"];
                        this.tempDepartsList= this.departsList.reverse();
                        console.log("departsharesList",this.departsList);
                        console.log("tempDepartsList",this.tempDepartsList);
                        this.distriDepart.open("USER_CENTER.DISTRI_SUB_DEPARTMENT^^^"+item.loginName);
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    selected(item: DepartList){
        this.departsList.forEach((p) =>{
            p.selected= false;
        });
        item.selected= true;
        this.selectedDepartment= item.departmentName;
        this.selectedDepartmentId= item.id;
    }

    reset(){
/*        this.departsList.forEach((p) =>{
           p.selected= false;
           p.visible= "true";
        });*/
        this.selectedDepartment= "";
        this.selectedDepartmentId= "";
        this.layoutService.show();
        this.service.getDepartsList()
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.departsList = response["resultContent"];
                        this.tempDepartsList= this.departsList.reverse();
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));

    }

    editDepart(){
        this.layoutService.show();
        this.service.editDepart(this.id, this.selectedDepartmentId)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.getData();
                        this.distriDepart.close();
                        console.log("editDepart", this.id, this.selectedDepartmentId);
                    }else if(response && 90011 == response["resultCode"]){
                        this.showAlert("USER_CENTER.CANNOT_DISTRI_DEPARTMENT");
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    operate() {
        if (this.selectedDepartmentId != this.tempDepartmentId) {
            this.confirm.open("USER_CENTER.DISTRI_DEPARTMENT", "USER_CENTER.DISTRI_DEPARTMENT_PROMOTINFO");
            this.confirm.ccf = ()=> {
                this.editDepart();
            }
        }else {
            this.editDepart();
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
