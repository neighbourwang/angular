import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NgForm } from "@angular/forms";

import { LayoutService, NoticeComponent, ConfirmComponent, CountBarComponent,
    PaginationComponent, PopupComponent } from "../../../../architecture";

import { StaticTooltipComponent } from "../../../../architecture/components/staticTooltip/staticTooltip.component";

//Model
import { MsgAlertModel, MsgModel } from "../model/msg-alert.model";

//Service
import { MsgMngService } from "../service/msg-mng.service";
import { unreadnumber } from "../service/msg-number.service";

//Mock
import { MsgModel_mock } from "../model/msg-alert.mock";

@Component({
    selector: "msgList",
    templateUrl: "../template/msg-list.html",
    styleUrls: ["../style/msg-alert.less"],
    providers: []
})
export class MsgListComponent implements OnInit {
    constructor(
        private layoutService: LayoutService,
        private router: Router,
        private service: MsgMngService,
        private activatedRouter : ActivatedRoute,

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
    pageSize = 10;
    totalPage = 1;

    paginationFlag: string = "2";

    msgAlert: MsgAlertModel = new MsgAlertModel();

    selectedmsglist: Array<MsgModel> = [];
    allSelected: boolean = false;

    unreadnumber = unreadnumber;

    private okCallback: Function = null;
    okClicked() {
        console.log('okClicked');
        if (this.okCallback) {
            console.log('okCallback()');
            this.okCallback();
            this.okCallback = null;
        }
    }

    private confirmedHandler: Function = null;
    onConfirmed() {
        if (this.confirmedHandler) {
            this.confirmedHandler();
            this.confirmedHandler = null;
        }
    }

    ngOnInit(): void {

        this.getMsgList(this.paginationFlag);

    }

    getMsgList(status:string, pageIndex?): void {
        this.paginationFlag = status;
        this.pageIndex = 1; 
        this.allSelected = false;

        this.layoutService.show();
        this.service.getMsgListStatus(this.pageIndex, this.pageSize, this.paginationFlag)
            .then(
            response => {
                this.layoutService.hide();
                console.log(response, "msgList response!");
                if (response && 100 == response["resultCode"]) {
                    this.msgAlert.edge = response.pageInfo.totalRecords;
                    this.msgAlert.list = response.resultContent;
                    this.totalPage = response.pageInfo.totalPage;
                    this.pager.render(1);
                    if(this.paginationFlag == "0") {
                        this.unreadnumber.num = this.msgAlert.edge;
                    }
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    this.msgAlert.edge = 0;
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });
    }



    getMsgNextPage(pageIndex?): void {
        this.pageIndex = pageIndex || this.pageIndex;
        this.allSelected = false;

        this.layoutService.show();
        this.service.getMsgListStatus(this.pageIndex, this.pageSize, this.paginationFlag)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.msgAlert.edge = response.pageInfo.totalRecords;
                    this.msgAlert.list = response.resultContent;
                    this.totalPage = response.pageInfo.totalPage;
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    this.msgAlert.edge = 0;
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });
    }

    deleteMsgs() {
        let ml = this.getSelectedItems();
        if (ml.length != 0) {
            this.selectedmsglist = ml;
            this.deletemsgbox.open();                   
        } else {
            this.showMsg("USER_CENTER.PLEASE_CHOOSE_MSG");
            return;
        }
        
    }

    acceptDeleteMsgModify() {
        let ml = this.getSelectedItems();
        if (ml.length != 0) {
            this.selectedmsglist = ml;
            let msg_id_array = this.selectedmsglist.map((msg) => {
                return <string>msg.id;
            });
            this.layoutService.show();
            this.service.deleteMsgList(msg_id_array)
                .then(
                    response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.showMsg("USER_CENTER.DELETE_MSG_SUCCESS");
                        console.log("Delete msg: ", msg_id_array, " successfully!");
                    } else {
                        this.showMsg("USER_CENTER.DELETE_MSG_FAILED");
                        return;
                    }
                })
                .then(()=>{                    
                    this.deletemsgbox.close();
                    this.getMsgList(this.paginationFlag);
                })
                .catch(err => {
                    console.log('USER_CENTER.DELETE_MSG_EXCEPTION', err);
                    this.layoutService.hide();
                    this.deletemsgbox.close();
                    this.showMsg("USER_CENTER.DELETE_MSG_EXCEPTION");
                    this.okCallback = () => { 
                        this.deletemsgbox.open();  };
                });

        }

    }

    cancelDeleteMsgModify() {
        console.log("click cancelDeleteMsgModify!");        
    }

    markMsgs() {
        let ml = this.getSelectedItems();
        this.selectedmsglist = ml.filter(n=> { return (n.status == '0');});  //select all unread msg
        if (this.selectedmsglist.length != 0) {            
            let msg_id_array = this.selectedmsglist.map((msg) => {
                return <string>msg.id;
            });
            this.layoutService.show();
            this.service.setMsgRead(msg_id_array)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    console.log("Set ", msg_id_array, " to READ!");
                    this.showMsg("USER_CENTER.MARK_MSG_READ_SUCCESS");
                    this.getMsgList(this.paginationFlag);
                } else {
                    this.showMsg("USER_CENTER.MARK_MSG_READ_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
                this.showMsg("USER_CENTER.MARK_MSG_READ_EXCEPTION");
            });
        } else {
            this.showMsg("USER_CENTER.PLEASE_CHOOSE_UNREAD_MSG");
            return;
        }
    }

    showAndMark(index: string) {
        if (this.msgAlert.list[index].status === '0') {
            this.layoutService.hide();
            this.service.setMsgRead([this.msgAlert.list[index].id])
                .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        console.log("Set ", this.msgAlert.list[index].id, " to READ!");
                        this.showMsg("USER_CENTER.MARK_MSG_READ_SUCCESS");
                        this.msgAlert.list[index].status = '1';
                    } else {
                        this.showMsg("USER_CENTER.MARK_MSG_READ_FAILED");
                        return;
                    }
                })
                .catch((e) => {
                    this.onRejected(e);
                    this.showMsg("USER_CENTER.MARK_MSG_READ_EXCEPTION");
                });
        } else {
            console.log("This message is already read!");
        }
    }

    showMsgDetails(title: string, msg: string) {
        this.notice.open(title, msg);
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


    //选择行
    selectItem(index:number): void {
        this.msgAlert.list[index].checked = !this.msgAlert.list[index].checked;
        console.log(this.msgAlert.list, "=== Please see which ones are selected ===");
        let selectedml = this.msgAlert.list.filter(n=> { return (n.checked == true);});
        if(selectedml.length == this.pageSize) {
            console.log("The latest one was selected, so all selected!");
            this.allSelected = true;
        } else {
            this.allSelected = false;
        }
    }

    selectOrUnSAllItems(): void {
        if (this.allSelected) {
            console.log("All checked before, so set them all unselected");
            this.allSelected = false;
            this.msgAlert.list.map(n=> { n.checked = false;});
        } else {
            console.log("All unchecked before, so set them all selected");
            this.allSelected = true;
            this.msgAlert.list.map(n=> { n.checked = true;});
        }
    }

    getSelectedItems() {
        this.selectedmsglist = this.msgAlert.list.filter(n=> { return (n.checked == true);});
        if (this.selectedmsglist.length != 0){
            return this.selectedmsglist;
        } else {
            return [];
        }
    }

}