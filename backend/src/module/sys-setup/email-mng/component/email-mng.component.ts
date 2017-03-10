import { Component, ViewChild, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, dictPipe, SystemDictionary} from "../../../../architecture";

import { EmailSetupModel } from "../model/email-mng.model";

import { EmailMngService } from "../service/email-mng.service";
import { EmailMngDictService } from "../service/email-mng-dict.service";

@Component({
    selector: "email-mng",
    templateUrl: "../template/email-mng.html",
    styleUrls: [],
    providers: []
})
export class EmailMngComponent implements OnInit {
    constructor(
        private router: Router,
        private layoutService: LayoutService,
        private dictPipe: dictPipe,
        private dictService: EmailMngDictService,
        private service: EmailMngService,
    ) {
    }

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("notice")
    notice: ConfirmComponent;

    @ViewChild("editemailbox")
    editemailbox: PopupComponent;

    noticeTitle = "";
    noticeMsg = "";

    typeDictArray: Array<SystemDictionary> = [];
    sendDictArray: Array<SystemDictionary> = [];
    receiverDictArray: Array<SystemDictionary> = [];

    emailsetups: Array<EmailSetupModel> = [];
    selectedemail: EmailSetupModel = new EmailSetupModel();
    changedemail: EmailSetupModel = new EmailSetupModel();

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

    
    ngOnInit() {
        this.getEmailSetup();

        this.dictService.typeDict
        .then((items) => {
            this.typeDictArray = items;
            console.log(this.typeDictArray, "this.typeDictArray");
        });

        this.dictService.sendDict
        .then((items) => {
            this.sendDictArray = items;
            console.log(this.sendDictArray, "this.sendDictArray");
        });

        this.dictService.receiverDict
        .then((items) => {
            this.receiverDictArray = items;
            console.log(this.receiverDictArray, "this.receiverDictArray");
        });
    }

    getEmailSetup() {
        this.layoutService.show();
        this.service.getEmailSetup()
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {                    
                    this.emailsetups = response.resultContent;
                    console.log(this.emailsetups, "emailsetups!!!");
                    this.showReceivers(this.emailsetups[0].receivers);
                } else {
                    this.showAlert("COMMON.GETTING_DATA_FAILED");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    showReceivers(receivers:Array<string>):string {
        if(receivers.length != 0){
            for(let i=0; i<receivers.length; i++) {
                console.log(this.receiverDictArray.find((n) => n.value == receivers[i]).displayValue);
            }
            return receivers.join(",");
        } else {
            return "";
        }       

    }

    editEmial()
    {
        let emailitem = this.getSelected();
        if (emailitem) {
            this.selectedemail = emailitem;
            this.changedemail.noticeType = this.selectedemail.noticeType;
            this.changedemail.id = this.selectedemail.id;
            this.changedemail.name = this.selectedemail.name;
            this.changedemail.send = this.selectedemail.send;
            this.changedemail.receivers = this.selectedemail.receivers;
            this.changedemail.description = this.selectedemail.description;
            this.editemailbox.open();
        } else {
            this.showMsg("PHY_NET_MNG.PLEASE_CHOOSE_NETWORK");
            return;
        }
    }

    acceptEditEmailModify() {
        
        if (true) {
            this.layoutService.show();
            this.service.editEmailSetup(this.changedemail)
                .then(res => {
                    this.layoutService.hide();
                    if (res && res.resultCode == "100") {
                        console.log(res, "PHY_NET_MNG.EDIT_PHY_NET_SUCCESS");
                    } else {
                        this.editemailbox.close();
                        this.showMsg("PHY_NET_MNG.EDIT_PHY_NET_FAILED");
                        return;
                    }
                })
                .then(() => {
                    this.getEmailSetup();
                    this.editemailbox.close();
                })
                .catch(err => {
                    console.log('PHY_NET_MNG.EDIT_PHY_NET_EXCEPTION', err);
                    this.layoutService.hide();
                    this.editemailbox.close();
                    this.showMsg("PHY_NET_MNG.EDIT_PHY_NET_EXCEPTION");
                    this.okCallback = () => {
                        this.editemailbox.open();
                    };
                });
        }

    }

    cancelEditEmailModify() {
        this.changedemail.noticeType = "";
        this.changedemail.id = "";
        this.changedemail.name = "";
        this.changedemail.send = "";
        this.changedemail.receivers = [];
        this.changedemail.description = "";
    }

    mngEmailTemplate() {
        this.router.navigate([`sys-setup/email-mng/email-template-list`]);
    }

    //选择行
    selectItem(index:number): void {
        this.emailsetups.map(n=> {n.checked = false;});
        this.emailsetups[index].checked = true;
        console.log(this.emailsetups, "=== Please see which one is selected ===");
    }

    UnselectItem(): void {
        this.emailsetups.map(n=> {n.checked = false;});
    }

    getSelected() {
        let item = this.emailsetups.find((n) => n.checked) as EmailSetupModel;
        if (item){
            return item;
        }
        else {
            this.showMsg("PHY_NET_MNG.PLEASE_CHOOSE_NETWORK");
            return null;
        }
    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason, "onRejected");
        this.showAlert("COMMON.GETTING_DATA_FAILED");
    }

    showMsg(msg: string) {
        console.log(msg, "showMsg");
        this.notice.open("COMMON.SYSTEM_PROMPT", msg);
    }

	showAlert(msg: string): void {
        console.log(msg, "showAlert");
        this.layoutService.hide();
        this.noticeTitle = "COMMON.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showError(msg: any) {
        this.notice.open(msg.title, msg.desc);
    }

}
