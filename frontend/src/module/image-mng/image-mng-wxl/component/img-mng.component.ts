import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { LayoutService, ValidationService, NoticeComponent, ConfirmComponent, PaginationComponent, SystemDictionary, SystemDictionaryService } from "../../../../architecture";

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

    constructor(
        private service: ImgMngService_wxl,
        private layoutService: LayoutService,
        private sysdictService: SystemDictionaryService,
        private validateService: ValidationService,
        private router: Router,
        private activatedRouter: ActivatedRoute
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

    images: Array<Image_wxl>=[]; //当前的镜像
    areas: Array<ImageArea_wxl>=[]; //镜像区域

    belongdicts: Array<SystemDictionary>=[];
    statusdicts: Array<SystemDictionary>=[];
    typedicts: Array<SystemDictionary>=[];
    bitdicts: Array<SystemDictionary>=[];

    imagequery: ImageQuery_wxl = new ImageQuery_wxl();  //查询JSON string    

    selectedimage: Image_wxl = new Image_wxl(); //当前选中的镜像



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

    ngOnInit() {
        this.getImageAreasList();
        this.sysdictService.getItems("IMAGES", "STATUS")
        .then((dicts) => {
            this.statusdicts = dicts;
            console.log(this.statusdicts, "statusdicts!!!")
            return this.sysdictService.getItems("IMAGES", "TYPE");
        }).then((dicts) => {
            this.typedicts = dicts;
            console.log(this.typedicts, "typedicts!!!")
            return this.sysdictService.getItems("IMAGES", "OWNER");
        }).then((dicts) => {
            this.belongdicts = dicts;
            console.log(this.belongdicts, "belongdicts!!!")
            return this.sysdictService.getItems("IMAGES", "BITS_TYPE");
        }).then((dicts) => {
            this.bitdicts = dicts;
            console.log(this.bitdicts, "bitdicts!!!")
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
            this.areas = areas;
            console.log(areas,"Areas!!!");
            this.layoutService.hide();
        }).catch(error => {
            console.log("getImageAreasList error!");
            this.layoutService.hide();
        });
    }

    getImagesList(pageIndex?): void {
        this.pageIndex = pageIndex || this.pageIndex;
        this.layoutService.show();
        this.service.getImages(this.imagequery, this.pageIndex, this.pageSize).then(res => {
            if (res.resultCode !== "100") {
                throw "";
            }
            this.totalPage = res.pageInfo.totalPage;
            return res.resultContent;
        }).then( images => {
            this.images = images;
            console.log(images,"Images!!!");
            console.log(images.length);
            this.layoutService.hide();
        }).catch(error => {
            this.layoutService.hide();
            console.log("getImagesList error!");            
            });
    }

    setKeyword(type: string, keyword: string): void {
        if(type == "0"){
            this.imagequery.imageos = "";
            this.imagequery.imagename = keyword;
        } else{
            this.imagequery.imageos = keyword;
            this.imagequery.imagename = "";
        }

    }

    onSelect(image: Image_wxl): void {
        let tmpimage = new Image_wxl();
        tmpimage.id = image.id;
        tmpimage.name = image.name;
        tmpimage.type = image.type;
        tmpimage.os = image.os;
        tmpimage.bits = image.bits;
        tmpimage.createTime = image.createTime;
        tmpimage.status = image.status;
        tmpimage.progress = image.progress;
        tmpimage.imageOwner = image.imageOwner;
        tmpimage.areaId = image.areaId;
        tmpimage.areaName = image.areaName;        
        tmpimage.creatorId = image.creatorId;
        tmpimage.creatorName = image.creatorName;
        tmpimage.orgId = image.orgId;
        tmpimage.orgName = image.orgName;
        tmpimage.description = image.description;
        this.selectedimage = tmpimage;
        console.log(this.selectedimage);
    }

    imageSearch(): void {
        this.getImagesList();
    }

    queryClean(): void {        
        this.imagequery = new ImageQuery_wxl();
    }

    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "提示";
        this.noticeMsg = msg;
        this.notice.open();
    }

    onSave(image: Image_wxl): void {
        this.layoutService.show();
        //this.service.updateImage(image);   //selectedimage.id and selectedimage.name
        if(this.validateService.isBlank(this.selectedimage.name)){
            this.showAlert("镜像名称不能为空");
            return;
        }

        this.service.updateImage(this.selectedimage)
        .then(
            response => {
                if(response && 100 == response["resultCode"])
                {
                    this.layoutService.hide();
                    let cimage = this.selectedimage;
                    image.id = cimage.id;
                    image.name = cimage.name;
                    image.type = cimage.type;
                    image.os = cimage.os;
                    image.bits = cimage.bits;
                    image.createTime = cimage.createTime;
                    image.status = cimage.status;
                    image.progress = cimage.progress;
                    image.description = cimage.description;
                    image.desEditing = false;
                    image.nameEditing = false;
                } else {
                    this.showAlert("update image failed!");
                }
            }
        ).catch(e=>{
            this.showAlert(e);
        })


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