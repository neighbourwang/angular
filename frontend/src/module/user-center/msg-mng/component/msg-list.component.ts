import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

import { LayoutService, NoticeComponent, ConfirmComponent, CountBarComponent, PaginationComponent, PopupComponent } from "../../../../architecture";

//Model
import { MsgAlertModel, MsgModel } from "../model/msg-alert.model";

//Service
import { MsgMngService } from "../service/msg-mng.service";

//Mock
import { MsgModel_mock } from "../model/msg-alert.mock";

@Component({
    selector: "msgList",
    templateUrl: "../template/msg-list.html",
    styleUrls: [],
    providers: []
})
export class MsgListComponent implements OnInit {
    constructor(
        private layoutService: LayoutService,
        private router: Router,
        private service: MsgMngService,

    ) {
    }

    @ViewChild("pager")
    pager: PaginationComponent;
    
    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("deletemsgbox")
    deletemsgbox: PopupComponent;

    noticeTitle = "";
    noticeMsg = "";

    pageIndex = 1;
    pageSize = 2;
    totalPage = 1;

    paginationFlag: number = 1;

    msgAlert: MsgAlertModel = new MsgAlertModel();

    ngOnInit(): void {
        this.getMsgListAll();

    }

    getMsgListAll(pageIndex?): void {
        this.paginationFlag = 1;
        this.pageIndex = pageIndex || this.pageIndex;
        this.service.getMsgListAll(this.pageIndex, this.pageSize)
            .then(
            response => {
                if (response && 100 == response["resultCode"]) {
                    //this.msgAlert = response.resultContent;
                    //console.log(this.msgAlert, "this.msgAlert");
                    this.totalPage = 4;//response.pageInfo.totalPage;
                } else {
                    this.showMsg("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
                    this.msgAlert.edge = 0;
                    return;
                }
            }
            )
            .catch((e) => {
                this.onRejected(e);
            });
    }

    getMsgListUnRead(pageIndex?): void {
        this.paginationFlag = 2;
        this.pageIndex = pageIndex || this.pageIndex;
        this.service.getMsgListAll(this.pageIndex, this.pageSize)
            .then(
            response => {
                if (response && 100 == response["resultCode"]) {
                    //this.msgAlert = response.resultContent;
                    //console.log(this.msgAlert, "this.msgAlert");
                    this.totalPage = 4;//response.pageInfo.totalPage;
                } else {
                    this.showMsg("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
                    this.msgAlert.edge = 0;
                    return;
                }
            }
            )
            .catch((e) => {
                this.onRejected(e);
            });
    }

    getMsgListRead(pageIndex?): void {
        this.paginationFlag = 3;
        this.pageIndex = pageIndex || this.pageIndex;
        this.service.getMsgListAll(this.pageIndex, this.pageSize)
            .then(
            response => {
                if (response && 100 == response["resultCode"]) {
                    //this.msgAlert = response.resultContent;
                    //console.log(this.msgAlert, "this.msgAlert");
                    this.totalPage = 4;//response.pageInfo.totalPage;
                } else {
                    this.showMsg("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
                    this.msgAlert.edge = 0;
                    return;
                }
            }
            )
            .catch((e) => {
                this.onRejected(e);
            });
    }

    deleteMsgs() {
        this.deletemsgbox.open();
    }

    acceptDeleteMsgModify() {

    }

    cancelDeleteMsgModify() {
        
    }

    markMsgs() {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason, "onRejected");
        this.showAlert("COMMON.GETTING_DATA_FAILED");
    }

    showAlert(msg: string): void {
        console.log(msg, "showAlert");
        this.layoutService.hide();
        this.noticeTitle = "COMMON.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    
    showMsg(msg: string) {
        console.log(msg, "showMsg");
        this.notice.open("COMMON.SYSTEM_PROMPT", msg);
    }	

    showError(msg: any) {
        this.notice.open(msg.title, msg.desc);
    }
/*
    //根据value显示
    displayIt(value: any): any {
        if(this.validationService.isBlank(value)){
            //console.log(value, "In dispalyIt()1")
            //return "未设置";
            return "COMMON.UNSET";
        } else {
            //console.log(value, "In dispalyIt()2")
            return value.toString();            
        }
    }

    //选择行
    selectItem(index:number): void {
        this.phynets.map(n=> {n.checked = false;});
        this.phynets[index].checked = true;
        console.log(this.phynets, "=== Please see which one is selected ===");
    }

    UnselectItem(): void {
        this.phynets.map(n=> {n.checked = false;});
    }

    getSelected() {
        let item = this.phynets.find((n) => n.checked) as PhyNetListModel;
        if (item){
            return item;
        }
        else {
            this.showMsg("PHY_NET_MNG.PLEASE_CHOOSE_NETWORK");
            return null;
        }
    }
    */

}