import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PaginationComponent, SystemDictionary, SystemDictionaryService } from "../../../../architecture";

import { Image } from '../model/img-mng.model';
import { CriteriaQuery } from '../model/criteria-query.model';

import { ImgMngService } from '../service/img-mng.service';


@Component({
    selector: "img-mng",
    templateUrl: "../template/img-mng.html",
    styleUrls: ["../style/img-mng.less"],
    providers: []
})
export class ImgMngComponent implements OnInit {
    constructor(
        private service: ImgMngService,
        private layoutService: LayoutService,
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private dicService: SystemDictionaryService
    ) {

    }
    pageIndex = 1;
    pageSize = 10;
    totalPage = 1;
    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("pager")
    pager: PaginationComponent;

    images: Array<Image> = [];
    typeDic: Array<SystemDictionary>;
    ownerDic: Array<SystemDictionary>;
    statusDic: Array<SystemDictionary>;
    queryOpt: CriteriaQuery = new CriteriaQuery();
    ngOnInit() {
        this.dicService.getItems("IMAGES", "STATUS")
            .then(
            (dic) => {
                this.statusDic = dic;
                return this.dicService.getItems("IMAGES", "TYPE");
            })
            .then((dic) => {
                this.typeDic = dic;
                return this.dicService.getItems("IMAGES", "OWNER");
            })
            .then((dic) => {
                this.ownerDic = dic;
                this.getImageList();
            });
    }

    getImageList(pageIndex?): void {
        this.pageIndex = pageIndex || this.pageIndex;
        this.layoutService.show();
        this.service.getImages(this.queryOpt, this.pageIndex, this.pageSize).then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.images = response.resultContent;
                    this.totalPage = response.pageInfo.totalPage;
                } else {
                    alert("Res sync error");
                }
            }
        )
            .catch((e) => this.onRejected(e));
    }

    //根据value获取字典的txt
    getDicText(value: string, dic: Array<SystemDictionary>): String {
        const d = dic.find((e) => {
            return e.value == value;
        });
        if (d) {
            return d.displayValue;
        } else {
            return value;
        }

    }

    //更新镜像
    updateImage(image: Image) {
        this.layoutService.show();
        this.service.updateImage(image).then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                } else {
                    alert("Res sync error");
                }
            }
        )
            .catch((e) => this.onRejected(e));
    }

    //删除一个镜像
    deleteImage(image: Image) {
        this.layoutService.show();
        this.service.deleteImage(image).then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                } else {
                    alert("Res sync error");
                }
            }
        )
            .catch((e) => this.onRejected(e));
    }

    //关闭所有的弹出窗口
    closeEditPanel() {
        this.images.map((image) => {
            image.nameEditing = image.desEditing = false;
        });
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

    nof() { }

    cof() { }

    ccf() { }

}