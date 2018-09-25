import { Component, ViewChild, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, dictPipe, SystemDictionary} from "../../../../architecture";

import { EmailSetupModel, EmailTypeTemplateModel } from "../model/email-mng.model";

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

    emailsetups: Array<EmailSetupModel> = [];    //首页emailsetup列表
    changedemail: EmailSetupModel = new EmailSetupModel();   //用于编辑按钮的emailsetup

    tempList: Array<EmailTypeTemplateModel> = [];
    selectedtemp: EmailTypeTemplateModel = new EmailTypeTemplateModel();

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
            
            this.getEmailSetup();
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
                    console.log(this.emailsetups, response.resultContent, "emailsetups!!!");
                } else {
                    this.showAlert("COMMON.GETTING_DATA_FAILED");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    showReceivers(receivers:Array<string>):string {
        //console.log(receivers, "showReceiver: receivers");
        if(receivers.length != 0){
            let recs: Array<String> = [];            
            for (let i = 0; i < receivers.length; i++) {
                for (let j = 0; j < this.receiverDictArray.length; j++) {
                    //console.log(this.receiverDictArray[j].value, <String>receivers[i]);
                    if( this.receiverDictArray[j].value == <String>receivers[i] ) {
                        //console.log(this.receiverDictArray[j].value, <String>receivers[i], "==");
                        recs.splice(0, 0, this.receiverDictArray[j].displayValue);
                    }
                }
            }
            //console.log(recs, "recs");
            return recs.join(", ");
        } else {
            return "";
        }

    }

    changeReceivers(id:string): void {
        if(this.changedemail.receivers.some(n => {return n === id;})) {
            this.changedemail.receivers.splice(this.changedemail.receivers.indexOf(id),1);
            console.log(this.changedemail.receivers, '-');
        } else {
            this.changedemail.receivers.splice(0,0,id);
            console.log(this.changedemail.receivers, '+');
        }
    }

    editEmial() {
        let emailitem = this.getSelected();
        if (emailitem) {
            this.changedemail.noticeType = emailitem.noticeType;
            this.changedemail.id = emailitem.id;
            this.changedemail.name = emailitem.name;
            this.changedemail.send = emailitem.send;
            this.changedemail.receivers = [].concat(emailitem.receivers);
            this.changedemail.description = emailitem.description;

            this.layoutService.show();
            this.service.getEmailTemplates(this.changedemail.noticeType)
                .then(res => {
                    this.layoutService.hide();
                    if (res && res.resultCode == "100") {
                        this.tempList = res.resultContent;
                        console.log(res, "SYS_SETUP.GET_EMAIL_TYPE_TEMPLATES_SUCCESS");
                        this.editemailbox.open();
                    } else {
                        this.showAlert("COMMON.GETTING_DATA_FAILED");
                        return;
                    }
                })
                .catch((e) => this.onRejected(e));
        } else {
            this.showMsg("SYS_SETUP.PLEASE_CHOOSE_EMAIL_SETUP");
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
                        console.log(res, "SYS_SETUP.EDIT_EMAIL_SETUP_SUCCESS");
                    } else {
                        this.editemailbox.close();
                        this.showMsg("SYS_SETUP.EDIT_EMAIL_SETUP_FAILED");
                        return;
                    }
                })
                .then(() => {
                    this.getEmailSetup();
                    this.editemailbox.close();
                })
                .catch(err => {
                    console.log('SYS_SETUP.EDIT_EMAIL_SETUP_EXCEPTION', err);
                    this.layoutService.hide();
                    this.editemailbox.close();
                    this.showMsg("SYS_SETUP.EDIT_EMAIL_SETUP_EXCEPTION");
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
            this.showMsg("SYS_SETUP.PLEASE_CHOOSE_EMAIL_SETUP");
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
