import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PaginationComponent } from "../../../../architecture";

import { imageList } from "../model/images-mock.model"
import { Image } from "../model/image.model"
import { ImgMngService_my } from "../service/img-mng.service"

@Component({
    selector: "img-mng",
    templateUrl: "../template/img-mng-my.html",
    styleUrls: ["../style/img-mng.less"],
    providers: [ImgMngService_my]
})
export class ImgMngComponent_my implements OnInit {

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;
    
    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "提示";
        this.noticeMsg = msg;
        this.notice.open();
    }

    //service:ImgMngService_my;
    images:Image[];
    constructor(
        private service: ImgMngService_my,
        private layoutService: LayoutService,
        private router: Router,
        private activatedRouter: ActivatedRoute
    ) {

    }


    ngOnInit() {
        this.getImages();

    }
    
    getImages():void{
        this.layoutService.show();
        this.service.getImagesByMock().then(
            ret => {
                if(ret && 100 == ret.resultCode){
                    this.images = ret.resultContent;
                    this.layoutService.hide();
                }else{
                    this.showAlert('获取镜像列表失败');
                }
            }
        ).catch(
            reason => this.showAlert("错误："+ reason.statusText)
        );
    }

  updateImageName(image):void{
      //保存
      image.nameEditing = false;
  }
  updateImageDes(image):void{
      //保存
      image.desEditing = false;
  }
}