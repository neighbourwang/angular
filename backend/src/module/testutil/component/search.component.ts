import { Component, ViewChild, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent} from "../../../architecture";

import { FirstService } from'../service/first.service';
import { FirstModel } from'../model/first.model';

@Component({
    selector: "search",
    templateUrl: "../template/search.html",
    styleUrls: [],
    providers: []
})
export class SearchComponent implements OnInit {
    constructor(
        private router: Router,
        private layoutService: LayoutService,
        private service: FirstService,
    ) {
    }

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("notice")
    notice: ConfirmComponent;

    noticeTitle = "";
    noticeMsg = "";

    entry: FirstModel = new FirstModel();
      
    ngOnInit() {     

    }

    searchGroupName:string;
    searchGroupFun:string;
    bearer:string;

    resultList:Array<FirstModel> = new Array<FirstModel>();

    doSearch(){
        if(this.searchGroupName == null){
            this.showAlert("名称不能为空");
            return;
        }
        if(this.searchGroupFun == null){
            this.showAlert("二级功能不能为空");
            return;
        }
        this.layoutService.show();
        this.service.search(this.searchGroupName, this.searchGroupFun).then(
            response =>{
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {                    
                        this.resultList = response.resultContent;
                    } else {
                        this.showAlert("Failed");
                    }
                }
            )
            .catch((e) => this.onRejected(e));

    }
    toInsertPage(){
        this.router.navigateByUrl('testutil/first');
    }

    delete(id:string){
        this.layoutService.show();
        this.service.delete(id).then(
            response =>{
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {   
                        this.doSearch();
                    } else {
                        this.showAlert("Failed");
                    }
                }
        )
        .catch((e) => this.onRejected(e));
    }

    excute(){
        this.layoutService.show();
        this.service.excute(this.searchGroupName, this.searchGroupFun, this.bearer).then(
            response =>{
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {   
                            this.showAlert("response:"+response.resultContent);
                        } else {
                            this.showAlert("Failed");
                        }
                    }
            )
            .catch((e) => this.onRejected(e));
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
