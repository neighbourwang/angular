import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, SystemDictionary, PaginationComponent  } from '../../../../architecture';

//model
import { CaseMngList } from '../model/case-mng-list.model';
import { CaseClosed } from '../model/case-closed.model';
import { CaseHandle } from '../model/case-handle.model';
import { User } from '../model/user.model';

//service
import { CaseMngService } from '../service/case-mng-list.service';
import { CaseDepartService } from '../service/case-depart-list.service';

@Component({
    selector: 'case-depart-list',
    templateUrl: '../template/case-depart-list.html',
    styleUrls: ['../style/case-mng-list.less'],
    providers: []
})

export class CaseDepartListComponent implements OnInit{

    constructor(
        private router : Router,
        private service : CaseDepartService,
        private servicemng : CaseMngService,
        private layoutService : LayoutService
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

    noticeTitle = "";
    noticeMsg = "";

    pageIndex= 1;
    pageSize= 10;
    totalPage= 1;

    statusDic: Array<SystemDictionary>;
    typeDic: Array<SystemDictionary>;
    emergencyDic: Array<SystemDictionary>;

    data: Array<CaseMngList>;
    basicInfo: CaseMngList= new CaseMngList();
    handledInfo: Array<CaseHandle>;
    closedInfo: CaseClosed= new CaseClosed();
    userList: Array<User>;
    search: "";
    subject: string;
    type: string;
    status: string;
    emergency: string;
    defaultType= "";
    defaultStatus= "";
    defaultEmergency= "";
    defaultUser= "";
    selectedEmergency= this.defaultEmergency;
    selectedType= this.defaultType;
    selectedStatus= this.defaultStatus;
    id: string;
    creatorId: string;

    ngOnInit (){
        console.log('init');
        //this.layoutService.show();
        this.getData();
        this.getUserList();
    }

    getData(pageIndex?) {
        this.subject = this.search || "";
        this.type= this.selectedType || "";
        this.status= this.selectedStatus|| "";
        this.emergency= this.selectedEmergency|| "";
        this.creatorId= this.creatorId || "";
        this.pageIndex= pageIndex || this.pageIndex;
        this.layoutService.show();
        this.service.getData(this.pageIndex, this.pageSize, this.creatorId, this.subject, this.type, this.status, this.emergency)
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

    getUserList(){
        this.layoutService.show();
        this.service.getUserList()
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.userList= response["resultContent"];
                        console.log("userList",response["resultContent"]);
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    getDetail(item){
        this.id= item.id;
        this.layoutService.show();
        Promise.all([this.servicemng.getBasicInfo(this.id), this.servicemng.getHandelInfo(this.id), this.servicemng.getClosedInfo(this.id)])
            .then((arr) =>{
                this.layoutService.hide();
                this.basicInfo= arr[0];
                this.handledInfo= arr[1];
                this.closedInfo= arr[2];
                this.caseDetail.open("USER_CENTER.CASE_DETAIL");
            }).catch((e) => this.onRejected(e));
    }

    myCase(){
        this.router.navigate([`user-center/case-mng/case-mng-list`]);
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
