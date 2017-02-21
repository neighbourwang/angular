import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, ValidationService, NoticeComponent,dictPipe,ConfirmComponent,PaginationComponent} from "../../../../architecture";

import { CaseMngService} from "../service/case-mng.service";

import { CaseListModel } from "../model/case-list.model";
import { Enterprise } from "../model/enterprise.model";
// import { Brand, Model } from "../model/brand.model";
//import { IpmiInfo } from "../model/physical-ipmi.model";

@Component({
    selector: "case-mng",
    templateUrl: "../template/case-mng.html",
    styleUrls: [],
    providers: []
})
export class CaseMngComponent implements OnInit {
    constructor(
        private activeRoute: ActivatedRoute,
        private route: Router,
        private service: CaseMngService,
        private layoutService: LayoutService,
        private validationService: ValidationService,
        private dictPipe : dictPipe
    ) {
    }


    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("page")
    page:PaginationComponent;

    noticeTitle = "";
    noticeMsg = "";

    totalPage = 1;
    pageIndex =0;
    pageSize = 10;
    
    caseList:Array< CaseListModel>;
    enterpriseList:Array<Enterprise>;

   
  
    ngOnInit() {
        this.getEnterprise;
         this.getCaseList();
    }

    //获取工单列表
     getCaseList(index?: number) {
        this.pageIndex = index || this.pageIndex;       
        this.layoutService.show();       
        this.service.getCases(this.pageIndex, this.pageSize)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.caseList = response["resultContent"];
                        console.log("工单列表",this.caseList);
                        this.totalPage = response.pageInfo.totalPage;
                    } else {
                        alert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    //获取企业列表
    getEnterprise(){  
        this.layoutService.show();       
        this.service.getEnterprises()
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.enterpriseList = response["resultContent"];
                        console.log("企业列表",this.enterpriseList);
                    } else {
                        alert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

     //选取工单
    getSelectCase(selectedCase: CaseListModel) {
        this.caseList.forEach((selectedCase) => {
            selectedCase.isSelect = false;
        });
        selectedCase.isSelect= true;
    }

    //跳转关闭工单
    closeCase(){     
        const selectCase = this.caseList.find((c) => { return c.isSelect });
        if(!selectCase){
            this.showAlert("请选择需要关闭的工单");
            return;
        }
        this.route.navigate(['mtc-center/case-mng/case-closed',{id:selectCase.id}])
       
    }

    //跳转处理工单
    handleCase(){
        const selectCase = this.caseList.find((c) => { return c.isSelect });
        if(!selectCase){
            this.showAlert("请选择需要处理的工单");
            return;
        }
        this.route.navigate(['mtc-center/case-mng/case-operated',{id:selectCase.id}])
        
    }

    //跳转工单详情
    gotoCaseView(viewCase:CaseListModel){
        this.route.navigate(['mtc-center/case-mng/case-detail',{id:viewCase.id}])
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