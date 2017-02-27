import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, ValidationService, NoticeComponent,dictPipe,ConfirmComponent} from "../../../../architecture";

import { CaseDetailService} from "../service/case-detail.service";

import { CaseListModel } from "../model/case-list.model";
import { CloseInfo,HandleInfo } from "../model/closeInfo.model";


@Component({
    selector: "case-closed",
    templateUrl: "../template/case-closed.html",
    styleUrls: [],
    providers: []
})
export class CaseClosedComponent implements OnInit {
    constructor(
        private activeRoute: ActivatedRoute,
        private route: Router,
        private service: CaseDetailService,
        private layoutService: LayoutService,
        private validationService: ValidationService,
        private dictPipe : dictPipe
    ) {
    }

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;
    @ViewChild("confirm")
    confirm: NoticeComponent;

    caseId:string;
    caseInfo:CaseListModel=new CaseListModel();
    closeInfo:CloseInfo=new CloseInfo;
    handleInfoes:Array<HandleInfo>;
  
    ngOnInit() {
         this.activeRoute.params.forEach((params: Params) => {          
            this.caseId = params["id"];            
        });

        this.getcaseHandleInfo();
        this.getcaseInfo();
        
    }
    //根据case id 获取工单的基本信息
    getcaseInfo(){
        this.layoutService.hide();
        this.service.getcaseInfo(this.caseId)
             .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.caseInfo = response["resultContent"];
                        console.log("工单基本信息",this.caseInfo);
                    } else {
                        alert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
        }
    
    //根据case id 获取工单的处理信息
    getcaseHandleInfo(){
        this.layoutService.hide();
        this.service.getcaseHandleInfo(this.caseId)
             .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.handleInfoes= response["resultContent"];
                        console.log("工单处理信息",this.handleInfoes);
                    } else {
                        alert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
        }
    

    //关闭工单
    closeCase(){
        if(!this.closeInfo.closeType){  
            this.showAlert("CASE_MNG.PLEASE_SELECT_CLOSE_TYPE");
            return;
        }
        if(!this.closeInfo.closeInfo){
             this.showAlert("CASE_MNG.PLEASE_INPUT_CLOSE_DESCRIPTION");
            return;
        }
        this.layoutService.hide();
        this.service.closeCase(this.closeInfo,this.caseId)
             .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();                     
                        console.log("关闭工单成功");
                        this.backtoList();
                    } else {
                        alert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
        }
    
    //返回工单列表
     backtoList(){
         this.route.navigate(['mtc-center/case-mng/case-list'])
     }

    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "PHYSICAL_MNG.NOTICE";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("PHYSICAL_MNG.ERROR");
    }
}