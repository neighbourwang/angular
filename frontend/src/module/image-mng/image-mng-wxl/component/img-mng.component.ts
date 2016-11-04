import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PaginationComponent } from "../../../../architecture";

import { ImageListModule } from "../model/img-mng.model";

import { ImgMngService_wxl } from "../service/img-mng.service";


@Component({
    selector: "img-mng",
    templateUrl: "../template/img-mng.html",
    styleUrls: ["../style/img-mng.less"],
    providers: [ ImgMngService_wxl ]
})
export class ImgMngComponent_wxl implements OnInit {
    pageIndex = 0;
    tp = 1; //totalPage
    pageSize = 10;

    totalPages: number = 0;
    currPage: number = 1;

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("pager")
    pager: PaginationComponent;

    images: ImgMngService_wxl[] = []; //当前的镜像

    constructor(
        private service: ImgMngService_wxl,
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
            console.log(images,1111)
            this.images = images;
        }).catch(error => {
            // this.layoutService.hide();
        });
    }

    ngOnInit() {
        //this.layoutService.show();
        this.getImagesList();
        
    }
     
}