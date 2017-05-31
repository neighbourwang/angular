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
    @ViewChild("popup")
    edit: PopupComponent;

    noticeTitle = "";
    noticeMsg = "";

    entry: FirstModel = new FirstModel();
      
    ngOnInit() {     

    }

    searchGroupName:string;
    searchGroupFun:string;
    bearer:string;

    resultList:Array<FirstModel> = new Array<FirstModel>();

    tempEdit:FirstModel = new FirstModel();

    doSearch(){
        if(this.searchGroupName == null){
            this.showAlert("名称不能为空");
            return;
        }
        if(this.searchGroupFun == null || ""==this.searchGroupFun ){
            this.searchGroupFun = "0";
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

    excuteGroup(){
        this.layoutService.show();
        this.service.excuteGroup(this.searchGroupName, this.searchGroupFun, this.bearer).then(
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
    //执行一个
    excuteOne(id:string){
        this.layoutService.show();
        let one: FirstModel;
        this.resultList.forEach((e)=>{
            if(e.id==id){
                one=e;
                return;
            }
        })

        this.service.excuteOne(one).then(
            response=>{
                this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {   
                        this.showAlert("response:"+response.resultContent);
                }
            }
        )
        .catch((e) => this.onRejected(e));
    }

    //修改一个
    modify(id:string){
        this.layoutService.show();
        let one: FirstModel;
        this.resultList.forEach((e)=>{
            if(e.id==id){
                one=e;
                return;
            }
        })

        this.service.updateOne(one).then(
             response=>{
                this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {   
                        this.showAlert("修改成功");
                        this.doSearch();
                }
             }
        )
        .catch((e) => this.onRejected(e));
    }

    openModify(id:string){
        let one: FirstModel = new FirstModel();
        this.resultList.forEach((e)=>{
            if(e.id==id){
                one=e;
                return;
            }
        })
        this.tempEdit = one;
        this.edit.open();
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
