import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PaginationComponent } from "../../../../architecture";

import { Image_wxl } from "../model/img-mng.model";

import { ImgMngService_wxl } from "../service/img-mng.service";

@Component({
    selector: "img-mng",
    templateUrl: "../template/img-mng.html",
    styleUrls: ["../style/img-mng.less"],
    providers: []
})
export class ImgMngComponent_wxl implements OnInit {
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

    images: Array<Image_wxl>=[]; //当前的镜像
    selectedimage: Image_wxl; //当前选中的镜像

    constructor(
        private service: ImgMngService_wxl,
        private layoutService: LayoutService,
        private router: Router,
        private activatedRouter: ActivatedRoute
    ) {
    }

    onSelect(image: Image_wxl): void {
      this.selectedimage = image;
      console.log(this.selectedimage);
    }

    getImagesList(): void {

        this.service.getImages(this.currPage, this.pageSize).then(res => {
            if (res.resultCode !== "100") {
                throw "";
            }
            this.totalPages = res.pageInfo.totalPage;
            return res.resultContent;
        }).then(images => {
            console.log(images,1111);
            console.log(images.length);
            this.images = images;
        }).catch(error => {
            this.layoutService.hide();
            });
        //this.layoutService.show();

        
        //this.service.getImages(this.currPage, this.pageSize)
        //    .then(response => {
        //        this.layoutService.hide();
        //        if (response && 100 == response["resultCode"]) {
        //            //删除成功
        //            this.images = response["resultContent"];
        //        } else {
        //            alert("Res sync error");
        //        }
        //    })
        //    .catch((e) => this.onRejected(e));
    }

    ngOnInit() {
        this.getImagesList();
    }
/*
    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("获取数据失败！");
    }


    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "提示";
        this.noticeMsg = msg;
        this.notice.open();
    }
*/
}