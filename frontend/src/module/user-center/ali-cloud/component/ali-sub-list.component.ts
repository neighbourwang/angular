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
        private activatedRouter : ActivatedRoute,
        private v:Validation,
        private validationService: ValidationService
    ) {
        if (activatedRouter.snapshot.params["loginName"]) {
            this.name = activatedRouter.snapshot.params["loginName"] || "";
        } else {
            this.name = "";
        }
    }

    @ViewChild("pager")
    pager: PaginationComponent;
    @ViewChild("notice")
    notice: NoticeComponent;
    @ViewChild("subMng")
    subMng: PopupComponent;
    @ViewChild("distriDepart")
    distriDepart: PopupComponent;
    @ViewChild('confirm')
    confirm: ConfirmComponent;

    noticeTitle = "";
    noticeMsg = "";
    ot= "";

    name: string;
    type: string;
    data: Array<AliSubList>;
    Majorid: string;
    subInfo: AliSubList= new AliSubList();
    departsList: Array<DepartList>;
    selectedDepartment: string;
    selectedDepartmentId: string;
    testInfo: string;
    id: string;
    tempDepartmentId: string;

    ngOnInit (){
        console.log('init');
        this.activatedRouter.params.forEach((params: Params) =>{
            this.Majorid= params["id"];
        })
        this.getData();
    }

    getData() {
        this.layoutService.show();
        this.service.getData(this.Majorid)
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

    getDetail(item){
        this.type= "info";
        this.ot= "DIALOG.CLOSE";
        this.layoutService.show();
        this.service.getDetail(item.id)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.subInfo = response["resultContent"];
                        this.subMng.open("USER_CENTER.SUB_DETAIL");
                        console.log("subInfo",this.subInfo);
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    crePage(){
        this.type= "create";
        this.ot= "COMMON.CREATE";
        this.testInfo= "";
        this.subInfo= new AliSubList();
        this.getDepartsList();
        this.subMng.open("USER_CENTER.CREATE_SUBACCOUNT");
    }

    create(){
        this.layoutService.show();
        this.service.create(this.Majorid, this.subInfo)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.getData();
                        this.subMng.close();
                    }else if(response && 90011 == response["resultCode"]){
                        this.showAlert("USER_CENTER.SUCESSTEST_CAN_CREATE");
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    editPage(item){
        this.type= "edit";
        this.ot= "COMMON.SAVE";
        this.id= item.id;
        this.testInfo= "";
        this.layoutService.show();
        this.service.getDetail(item.id)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.subInfo = response["resultContent"];
                        this.subMng.open("USER_CENTER.EDIT_LOGININFO");
                        console.log("subInfo",this.subInfo);
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    edit(){
        this.layoutService.show();
        this.service.edit(this.id, this.subInfo)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.getData();
                        this.subMng.close();
                        console.log("edit后",this.subInfo);
                    }else if(response && 90011 == response["resultCode"]){
                        this.showAlert("USER_CENTER.SUCESSTEST_CAN_SAVE");
                    }else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    testSub(){
        this.layoutService.show();
        this.service.testSub(this.Majorid,this.subInfo)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.testInfo= "success";
                    }else{
                        this.testInfo= "failed";
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    distriPage(item){
        this.type= "distribute";
        this.ot= "COMMON.SAVE";
        this.selectedDepartment= item.departmentName;
        this.tempDepartmentId= item.departId;
        this.selectedDepartmentId= item.departId;
        this.id= item.id;
        this.layoutService.show();
        this.service.getDepartsList()
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.departsList = response["resultContent"];
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
                        console.log("editDepart",this.id, this.selectedDepartmentId);
                    }else if(response && 90011 == response["resultCode"]){
                        this.showAlert("USER_CENTER.CANNOT_DISTRI_DEPARTMENT");
                    }else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    enable(item){
        this.confirm.open("USER_CENTER.ENABLE_ALIACCOUNT","USER_CENTER.YOU_SELECT_ENABLE_ALIACCOUNT^^^"+item.loginName);
        this.confirm.ccf= ()=>{
            this.layoutService.show();
            this.service.enable(item.id)
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            this.getData();
                        } else {
                            this.showAlert("COMMON.OPERATION_ERROR");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        }

    }

    disable(item){
        this.confirm.open("USER_CENTER.DISABKE_ALIACCOUNT","USER_CENTER.YOU_SELECT_DISABLE_ALIACCOUNT^^^"+item.loginName);
        this.confirm.ccf= ()=>{
            this.layoutService.show();
            this.service.disable(item.id)
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            this.getData();
                        } else {
                            this.showAlert("COMMON.OPERATION_ERROR");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        }
    }

    delete(item){
        if(item.status == 2 && item.departId== ""){
            this.confirm.open("USER_CENTER.DELETE_ALIACCOUNT","USER_CENTER.YOU_SELECT_DELETE_ALIACCOUNT^^^"+item.loginName);
            this.confirm.ccf= ()=>{
                this.layoutService.show();
                this.service.delete(item.id)
                    .then(
                        response => {
                            this.layoutService.hide();
                            if (response && 100 == response["resultCode"]) {
                                this.getData();
                            } else {
                                this.showAlert("COMMON.OPERATION_ERROR");
                            }
                        }
                    )
                    .catch((e) => this.onRejected(e));
            }
        }else{
            this.showAlert("USER_CENTER.DELETE_WARNINGINFO");
        }
    }


    operate(){
        if(this.type== "info"){
            this.subMng.close();
        }else if(this.type== "create"){
            if(this.validationService.isBlank(this.subInfo.accessKey) || this.validationService.isBlank(this.subInfo.accessSecret)
                || this.validationService.isBlank(this.subInfo.loginName)){
                return;
            }
            let selectedDepart= this.departsList.find((p)=>{
                return p.id == this.subInfo.departId;
            });
            this.subInfo.departmentName= selectedDepart && selectedDepart.departmentName || "";
            this.create();
        }else if(this.type== "edit"){
            if(this.validationService.isBlank(this.subInfo.accessKey) || this.validationService.isBlank(this.subInfo.accessSecret)){
                return;
            }
            this.edit();
        }else{
            if(this.selectedDepartmentId != this.tempDepartmentId){
                this.confirm.open("USER_CENTER.DISTRI_DEPARTMENT","USER_CENTER.DISTRI_DEPARTMENT_PROMOTINFO");
                this.confirm.ccf= ()=>{
                    this.editDepart();
                }
            }else{
                this.editDepart();
            }

        }
    }

    checkForm(key?:string){
        const regs:ValidationRegs = {
            loginName: [this.subInfo.loginName, [this.v.isUnBlank], "USER_CENTER.LOGINNAME_CANNOT_EMPTY"],
            accessKey: [this.subInfo.accessKey, [this.v.isUnBlank], "USER_CENTER.ACCESSKEY_CANNOT_EMPTY"],
            accessSecret: [this.subInfo.accessSecret, [this.v.isUnBlank], "USER_CENTER.ACCESSSECRET_CANNOT_EMPTY"],
        }
        return this.v.check(key, regs);
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
