import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { LayoutService, SystemDictionaryService, SystemDictionary, NoticeComponent, ConfirmComponent, PaginationComponent } from "../../../../architecture";

import { Image_wxl } from "../model/img-mng.model";
import { ImageArea_wxl } from "../model/area.model";
import { ImageQuery_wxl } from "../model/imagequery.model";

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

    areas: Array<ImageArea_wxl>=[]; //镜像区域

    belongdicts: Array<SystemDictionary>=[];
    statusdicts: Array<SystemDictionary>=[];
    typedicts: Array<SystemDictionary>=[];

    imagequery: ImageQuery_wxl = new ImageQuery_wxl();  //查询JSON string    

    selectedimage: Image_wxl; //当前选中的镜像

    constructor(
        private service: ImgMngService_wxl,
        private layoutService: LayoutService,
        private sysdictService: SystemDictionaryService,
        private router: Router,
        private activatedRouter: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.getImageAreasList();
        this.sysdictService.getItems("IMAGES", "STATUS")
        .then((dicts) => {
            this.statusdicts = dicts;
            console.log(this.statusdicts, "statusdicts")
            return this.sysdictService.getItems("IMAGES", "TYPE");
        }).then((dicts) => {
            this.typedicts = dicts;
            console.log(this.typedicts, "typedicts")
            return this.sysdictService.getItems("IMAGES", "OWNER");
        }).then((dicts) => {
            this.belongdicts = dicts;
            console.log(this.belongdicts, "belongdicts")
            return this.getImagesList();
        })
    }

    getImageAreasList(): void {
        this.layoutService.show();
        this.service.getAreas().then(res =>{
            if(res.resultCode !== "100") {
                throw "";
            }
            return res.resultContent;
        }).then( (areas) =>{
            console.log(areas,22222);
            this.areas = areas;
            this.layoutService.hide();
        }).catch(error => {
            console.log("getImageAreasList error!");
            this.layoutService.hide();
        });
    }

    getImagesList(): void {
        this.layoutService.show();
        this.service.getImages(this.imagequery, this.currPage, this.pageSize).then(res => {
            if (res.resultCode !== "100") {
                throw "";
            }
            this.totalPages = res.pageInfo.totalPage;
            return res.resultContent;
        }).then(images => {
            console.log(images,1111);
            console.log(images.length);
            this.images = images;
            this.layoutService.hide();
        }).catch(error => {
            console.log("getImagesList error!");
            this.layoutService.hide();
            });
    }

    setKeyword(): void {
        if(this.imagequery.nameOros == "0"){
            this.imagequery.imageos = this.imagequery.str;
            this.imagequery.imagename = "";
        } else{
            this.imagequery.imageos = "";
            this.imagequery.imagename = this.imagequery.str;
        }

    }

    onSelect(image): void {
        let tmpimage = new Image_wxl();
        tmpimage.areaId = image.areaId;
        tmpimage.areaName = image.areaName;
        tmpimage.bits = image.bits;
        tmpimage.createTime = image.createTime;
        tmpimage.creatorId = image.creatorId;
        tmpimage.creatorName = image.creatorName;
        tmpimage.description = image.description;
        tmpimage.desEditing = image.desEditing;
        tmpimage.id = image.id;
        tmpimage.imageOwner = image.imageOwner;
        tmpimage.name = image.name;
        tmpimage.nameEditing = image.nameEditing;
        this.selectedimage = tmpimage;
        console.log(this.selectedimage);
    }

    imageSearch(): void {
        this.getImagesList();
    }

    queryClean(): void {
        /*
        this.imagequery.imagearea = "";
        this.imagequery.imagebelong = "";
        this.imagequery.imagename = "";
        this.imagequery.imageos = "";
        this.imagequery.imagestatus = "";
        this.imagequery.imagetype = "";
        this.imagequery.nameOros = "";
        this.imagequery.str = "";
        */
        this.imagequery = new ImageQuery_wxl();
    }

    onSave(image: Image_wxl): void {
        this.service.updateImage();

    }

    onCancel(): void {


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