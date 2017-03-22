import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NgForm } from "@angular/forms";

import { LayoutService, NoticeComponent, ConfirmComponent, CountBarComponent,
    PaginationComponent, PopupComponent } from "../../../../architecture";

//import { StaticTooltipComponent } from "../../../../architecture/components/staticTooltip/staticTooltip.component";

//Model
//import { MsgAlertModel, MsgModel } from "../model/msg-alert.model";

//Service
//import { MsgMngService } from "../service/msg-mng.service";


@Component({
    selector: "alics_vmorder",
    templateUrl: "../template/cloud-vm-order.html",
    styleUrls: [],
    providers: []
})
export class AliCloudVmOrderComponent implements OnInit {
    constructor(
        private layoutService: LayoutService,
        private router: Router,
        //private service: MsgMngService,
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

        //this.getMsgList(this.paginationFlag);

    }
    /*

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
    */

}