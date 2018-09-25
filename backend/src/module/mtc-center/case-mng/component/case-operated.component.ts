import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, ValidationService, NoticeComponent,dictPipe,ConfirmComponent} from "../../../../architecture";

import { CaseDetailService} from "../service/case-detail.service";

import { CaseListModel } from "../model/case-list.model";
import { CloseInfo,HandleInfo } from "../model/closeInfo.model";


@Component({
    selector: "case-operated",
    templateUrl: "../template/case-operated.html",
    styleUrls: [],
    providers: []
})
export class CaseOperatedComponent implements OnInit {
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
    handleInfo:HandleInfo=new HandleInfo();
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
                        if(this.caseInfo.status=="2"){
                            this.notice.open("PHYSICAL_MNG.NOTICE","CASE_MNG.CASE_HAS_CLOSED");
                            this.notice.nof=()=>{
                               this. backtoList();
                            }
                        }
                        console.log("工单基本信息",this.caseInfo);
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
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
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
        }
    
    //处理工单
    handleCase(){  
         if(this.caseInfo.status=="2"){
            this.backtoList();
            return;
        }
        else {
            if(!this.handleInfo.emergency){  
            this.showAlert("CASE_MNG.PLEASE_SELECT_EMERGENCY");
            return;
        }
        if(!this.handleInfo.handleInfo){
             this.showAlert( "CASE_MNG.PLEASE_INPUT_HANDLE_RECORD");
            return;
        }  

        }
       
        this.layoutService.hide();
        this.service.handleCase(this.handleInfo,this.caseId)
             .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();                     
                        console.log("关闭工单成功");
                        this.backtoList();
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
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