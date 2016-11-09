import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PaginationComponent } from "../../../../architecture";

import {ImageAttr_gcy} from "../model/img-mng"

import {ImageData_gcy} from "../model/img-mng.mock";

import {ImgMngService_gcy } from "../service/img-mng.service";

@Component({
    selector: "img-mng",
    templateUrl: "../template/img-mng.html",
    styleUrls: ["../style/img-mng.less"],
    providers: []
})
export class ImgMngComponent_gcy implements OnInit {
    pageIndex = 0;
    tp = 1; //totalPage
    pageSize = 10;

    totalPages = 0;
    currPage = 1;

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("pager")
    pager: PaginationComponent;

    images: Array<ImageAttr_gcy>;

    constructor(
	    private service: ImgMngService_gcy,
        private layoutService: LayoutService,
        private router: Router,
        private activatedRouter: ActivatedRoute
    ) {
    }

    getImagesList(): void {

        this.service.getImages(this.currPage, this.pageSize).then(res => {
            if (res.resultCode !== "100") {
                throw "";
            }
            this.totalPages = res.pageInfo.totalPage;
            return res.resultContent;
        }).then(images => {
            console.log(images, 1111)
            this.images = images;
        }).catch(error => {
            this.layoutService.hide();
        });
        
    }
	
    ngOnInit() {
        //this.layoutService.show();
        this.getImagesList();
    }
     
}