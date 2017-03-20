import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, SystemDictionary, PaginationComponent, ValidationService ,Validation, ValidationRegs } from '../../../../architecture';

//model
import { CaseMngList } from '../model/case-mng-list.model';
import { CaseClosed } from '../model/case-closed.model';
import { CaseHandle } from '../model/case-handle.model';

//service
import { CaseMngService } from '../service/case-mng-list.service';
import { CaseDepartService } from '../service/case-depart-list.service';

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
        private servicedepart : CaseDepartService,
        private layoutService : LayoutService,
        private v:Validation,
        private validationService: ValidationService
    ) {

    }

    @ViewChild("pager")
    pager: PaginationComponent;
    @ViewChild("notice")
    notice: NoticeComponent;
    @ViewChild("creCase")
    creCase: PopupComponent;
    @ViewChild("caseDetail")
    caseDetail: PopupComponent;
    @ViewChild("confirm")
    confirm: ConfirmComponent;
    @ViewChild("orgForm")
    orgForm: NgForm;

    noticeTitle = "";
    noticeMsg = "";

    pageIndex= 1;
    pageSize= 10;
    totalPage= 1;

    statusDic: Array<SystemDictionary>;
    typeDic: Array<SystemDictionary>;
    emergencyDic: Array<SystemDictionary>;

    isEdit: boolean;
    data: Array<CaseMngList>;
    basicInfo: CaseMngList= new CaseMngList();
    handledInfo: Array<CaseHandle>;
    closedInfo: CaseClosed= new CaseClosed();
    search: "";
    subject: string;
    type: string;
    status: string;
    emergency: string;
    defaultType= "";
    defaultStatus= "";
    defaultEmergency= "";
    selectedEmergency= this.defaultEmergency;
    selectedType= this.defaultType;
    selectedStatus= this.defaultStatus;
    id: string;

    criteria: CaseMngList= new CaseMngList();

    ngOnInit (){
        console.log('init');
        //this.layoutService.show();
        this.getData();
    }

    getData(pageIndex?) {
        this.subject = this.search || "";
        this.type= this.selectedType || "";
        this.status= this.selectedStatus|| "";
        this.emergency= this.selectedEmergency|| "";
        this.pageIndex= pageIndex || this.pageIndex;
        this.layoutService.show();
        this.service.getData(this.pageIndex, this.pageSize, this.subject, this.type, this.status, this.emergency)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.data= response["resultContent"];
                        this.totalPage= response.pageInfo.totalPage;
                        console.log("data",response["resultContent"]);
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
}

    editPage(item){
        if(item.status == 0){
            this.isEdit= true;
            let editcase= new CaseMngList();
            editcase.subject= item.subject;
            editcase.type= item.type;
            editcase.emergency= item.emergency;
            editcase.contact= item.contact;
            editcase.contactNo=item.contactNo;
            editcase.details= item.details;
            this.criteria= editcase;
            this.id= item.id;
            console.log("id1",this.id);
            this.creCase.open("USER_CENTER.EDIT_CASE");
        }else{
            this.showAlert("USER_CENTER.EDIT_CONTOR");
        }

    }

    crePage(){
        this.criteria= new CaseMngList();
        this.criteria.emergency= "";
        this.criteria.type= "";
        this.criteria.contact= this.servicedepart.userInfo.userName;
        this.criteria.contactNo=this.servicedepart.userInfo.phone;
        this.isEdit= false;
        this.creCase.open("USER_CENTER.CREATE_CASE");
    }

    creOredit(){
        this.selectedEmergency= "";
        this.selectedStatus= "";
        this.selectedType= "";
        this.search= "";
        if(this.validationService.isBlank(this.criteria.subject) || this.validationService.isBlank(this.criteria.type)
            ||this.validationService.isBlank(this.criteria.emergency) ||this.validationService.isBlank(this.criteria.contact)
            ||this.validationService.isBlank(this.criteria.contactNo)){

        }else if(!this.isEdit){
            this.layoutService.show();
            this.service.creat(this.criteria)
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            this.getData();
                            this.creCase.close();
                            console.log("创建",response["resultContent"]);
                        } else {
                            this.showAlert("COMMON.OPERATION_ERROR");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        }else{
            this.layoutService.show();
            this.service.edit(this.id,this.criteria)
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            this.getData();
                            this.creCase.close();
                            console.log("idEdit",this.id);
                        } else {
                            this.showAlert("COMMON.OPERATION_ERROR");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        }

    }

    delete(item){
        if(item.status == 0){
            this.id= item.id;
            this.subject= item.subject;
            this.confirm.open('USER_CENTER.DELETE_CASE',"USER_CENTER.DELETE_CASE_WARNING^^^"+this.id+"^^^"+this.subject );
            this.confirm.ccf=()=>{
                this.layoutService.show();
                this.service.delete(this.id)
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
            this.showAlert("USER_CENTER.DELETE_CONTOR");
        }
    }

    getDetail(item){
        this.id= item.id;
        this.layoutService.show();
        Promise.all([this.service.getBasicInfo(this.id), this.service.getHandelInfo(this.id), this.service.getClosedInfo(this.id)])
            .then((arr) =>{
                this.layoutService.hide();
                this.basicInfo= arr[0];
                this.handledInfo= arr[1];
                this.closedInfo= arr[2];
                this.caseDetail.open("USER_CENTER.CASE_DETAIL");
            }).catch((e) => this.onRejected(e));
    }

    checkForm(key?:string){
        const regs:ValidationRegs = {
            phone: [this.criteria.contactNo, [this.v.isMoblie,this.v.isUnBlank], "USER_CENTER.CONTACNO_WRONG"],
            contactor: [this.criteria.contact, [this.v.isBase, this.v.isUnBlank], "USER_CENTER.CONTACTOR_WRONG"],
            subject: [this.criteria.subject, [this.v.isUnBlank], "USER_CENTER.SUBJECT_CANNOT_EMPTY"],
            type: [this.criteria.type, [this.v.isUnBlank], "USER_CENTER.TYPE_CANNOT_EMPTY"],
            emergency: [this.criteria.emergency, [this.v.isUnBlank], "USER_CENTER.EMERGENCY_CANNOT_EMPTY"],
        }

        return this.v.check(key, regs);
    }

    departCase(){
        this.router.navigate([`user-center/case-mng/case-depart-list`]);
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
