import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, SystemDictionary, PaginationComponent,  ValidationService ,Validation, ValidationRegs } from '../../../../architecture';

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
        private layoutService : LayoutService,
        private v:Validation,
        private validationService: ValidationService
    ) {

    }

    @ViewChild("pager")
    pager: PaginationComponent;
    @ViewChild("notice")
    notice: NoticeComponent;
    @ViewChild('confirm')
    confirm: ConfirmComponent;
    @ViewChild("majorMng")
    majorMng: PopupComponent;
    @ViewChild("distriDepart")
    distriDepart: PopupComponent;

    noticeTitle = "";
    noticeMsg = "";

    type: string;
    data: Array<AliMajorList>;
    majorInfo: AliMajorList= new AliMajorList();
    testInfo: string;
    id: string;
    departs: Array<DepartList>;
    selectedDepartment: string;
    selectedDepartmentId: string;
    tempDepartmentId: string;


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

    editPage(item){
        this.type= "edit";
        this.id= item.id;
        this.testInfo= "";
        this.layoutService.show();
        this.service.getDetail(this.id)
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

    edit(){
        this.layoutService.show();
        this.service.edit(this.id, this.majorInfo)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.getData();
                        this.majorMng.close();
                        console.log("edit后",this.majorInfo);
                    }else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    testMajor(){
        this.layoutService.show();
        this.service.testMajor(this.majorInfo)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.testInfo= "success";
                    }else{
                        this.testInfo= "failed";
                    }
                    console.log("testMajor",this.majorInfo);
                }
            )
            .catch((e) => this.onRejected(e));
    }

    distriPage(item){
        this.type= "distribute";
        this.selectedDepartment= item.departmentName;
        this.selectedDepartmentId= "";
        this.tempDepartmentId= item.departmentId;
        this.id= item.id;
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

    selected(item: DepartList){
        this.departs.forEach((p) =>{
            p.selected= false;
        });
        item.selected= true;
        this.selectedDepartment= item.departmentName;
        this.selectedDepartmentId= item.id;
    }

    reset(){
        this.departs.forEach((p) =>{
            p.selected= false;
            p.visible= "true";
        });
        this.selectedDepartment= "";
        this.selectedDepartmentId= "";
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
                    }else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    gotoSubMng(item){
        this.router.navigate([`user-center/ali-cloud/ali-sub-list/${item.loginName}`,{"id": item.id }]);
    }

    operate(){
        if(this.type== "info"){
            this.majorMng.close();
        }else if(this.type== "edit"){
            if(this.validationService.isBlank(this.majorInfo.accessKey) || this.validationService.isBlank(this.majorInfo.accessSecret)){
                return;
            }
            if(this.testInfo != 'success'){
                this.showAlert("测试成功才能保存");
                //this.majorMng.close();
                return;
            }
            this.edit();
        }else{
            if(this.selectedDepartmentId != this.tempDepartmentId){
                this.confirm.open("设置部门","部门发生改变,请确认");
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
            accessKey: [this.majorInfo.accessKey, [this.v.isUnBlank], "accessKey不能为空"],
            accessSecret: [this.majorInfo.accessSecret, [this.v.isUnBlank], "accessSecret不能为空"],
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
