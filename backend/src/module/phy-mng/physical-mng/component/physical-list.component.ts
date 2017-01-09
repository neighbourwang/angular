import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, ValidationService, NoticeComponent } from "../../../../architecture";

import { PhysicalListService } from "../service/physical-list.service";

import { PhysicalListModel } from "../model/physical-list.model";

@Component({
    selector: "physical-list",
    templateUrl: "../template/physical-list.html",
    styleUrls: [],
    providers: []
})
export class PhysicalListComponent implements OnInit {
    constructor(
        private activeRoute: ActivatedRoute,
        private route: Router,
        private service: PhysicalListService,
        private layoutService: LayoutService,
        private validationService: ValidationService
    ) {
    }

    noticeTitle = "";
    noticeMsg = "";
   
    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("page")
    page: NoticeComponent;

    totalPage = 1;
    pageIndex =1;
    pageSize = 20;


    physicalList:Array< PhysicalListModel>;
    type: string;
    poolId:string;

    title: string;
    ngOnInit() {
        // console.log(this.router.params);
        this.activeRoute.params.forEach((params: Params) => {
            const id = params["id"];
            this.poolId=id;         
            this.getPhysicalList();
             //}

        });
    }

   //获取物理机列表
     getPhysicalList(index?: number) {
        this.pageIndex = index || this.pageIndex;
        this.layoutService.show();
        this.service.getPhysicals(this.pageIndex, this.pageSize,)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.physicalList = response["resultContent"];
                        this.totalPage = response.pageInfo.totalPage;
                    } else {
                        alert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    
 
   


    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "提示";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("获取数据失败！");
    }
}