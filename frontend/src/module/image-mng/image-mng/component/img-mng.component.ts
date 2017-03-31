import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
//import { RADIO_GROUP_DIRECTIVES } from "ng2-radio-group";
import { LayoutService, NoticeComponent, ConfirmComponent, PaginationComponent, ValidationService, SystemDictionary, SystemDictionaryService, PopupComponent } from "../../../../architecture";

import { Image } from '../model/img-mng.model';
import { Area } from '../model/area.model';
import { CriteriaQuery } from '../model/criteria-query.model';

import { ImgMngService } from '../service/img-mng.service';


@Component({
    selector: "img-mng",
    templateUrl: "../template/mpp-image.html",
    styleUrls: ["../style/img-mng.less"],
    providers: []
})
export class ImgMngComponent implements OnInit {
    constructor(
        private service: ImgMngService,
        private layoutService: LayoutService,
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private validationService: ValidationService,
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

    @ViewChild("editPopup")
    editPopup: PopupComponent;

    images: Array<Image> = [];
    typeDic: Array<SystemDictionary>;
    ownerDic: Array<SystemDictionary>;
    statusDic: Array<SystemDictionary>;
    bitDic: Array<SystemDictionary>;
    queryOpt: CriteriaQuery = new CriteriaQuery();
    editImage: Image = new Image();//用于编辑镜像
    areaList: Array<Area>;
    realQueryOpt: CriteriaQuery;
    temp2:Image = new Image();//用于修改镜像名称

    searchWay:number = 0;

    ngOnInit() {
        this.getAreaList();
        this.getImageList();
    }

    search() {
        console.log(">>>search");
        this.realQueryOpt = $.extend({}, this.queryOpt);
        this.pager.render(1);
        this.getImageList();
    }

    getImageList(pageIndex?): void {
        this.pageIndex = pageIndex || this.pageIndex;
        this.layoutService.show();
        this.service.getImages(this.realQueryOpt, this.pageIndex, this.pageSize)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.images = response.resultContent;
                    this.totalPage = response.pageInfo.totalPage;
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    getAreaList() {
        this.layoutService.show();
        this.service.getAreaList().then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.areaList = response.resultContent;
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
        )
            .catch((e) => this.onRejected(e));
    }



    //更新镜像
    updateImage() {
        this.layoutService.show();
        if (this.validationService.isBlank(this.editImage.name)) {
            this.showAlert("IMAGE.IMAGE_NAME_CAN_NOT_BE_BLANK");
            return;
        }
        this.service.updateImage(this.editImage)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.getImageList();
                    this.editPopup.close();
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //删除一个镜像
    deleteImage(image: Image) {
        //var deleteImage = this.images.find((image) => { return image.selected; });
        //if (!deleteImage) {
        //    this.showAlert("请先选择需要删除的镜像！");
        //    return;
        //}

        this.noticeMsg = `IMAGE.CONFIRM_DELETE_VALUE^^^${image.name}IMAGE.CONFIRM_DELETE_VALUE2`;

        this.confirm.cof = () => {
            this.layoutService.show();
            this.service.deleteImage(image)
                .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.editPopup.close();
                        this.getImageList();
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
                )
                .catch((e) => this.onRejected(e));
        };
        this.confirm.open();
    }

    //关闭所有的弹出窗口
    closeEditPanel() {
        this.images.map((image) => {
            image.nameEditing = image.desEditing = false;
        });
    }

    openEidtPanel(image): void {
        this.closeEditPanel();
        let cimage = new Image();
        cimage.id = image.id;
        cimage.name = image.name;
        cimage.type = image.type;
        cimage.os = image.os;
        cimage.bits = image.bits;
        cimage.createTime = image.createTime;
        cimage.status = image.status;
        cimage.progress = image.progress;
        cimage.description = image.description;
        cimage.imageOwner = image.imageOwner;
        this.editImage = cimage;
        this.editPopup.open("IMAGE.EDIT_IMAGE");
    }

//修改显示名称的弹出框
    openEidtDisplayName(image:Image){
        this.closeEditPanel();
        let cimage = new Image();
        cimage.id = image.id;
        cimage.name = image.name;
        cimage.type = image.type;
        cimage.os = image.os;
        cimage.bits = image.bits;
        cimage.createTime = image.createTime;
        cimage.status = image.status;
        cimage.progress = image.progress;
        cimage.description = image.description;
        cimage.imageOwner = image.imageOwner;

        cimage.nameEditing = image.nameEditing;
        cimage.selected = image.selected;
        this.temp2 = cimage;
        
    }
    //只更新镜像名称
    updateImageName() {
        this.layoutService.show();
        if (this.validationService.isBlank(this.temp2.name)) {
            this.showAlert("IMAGE.IMAGE_NAME_CAN_NOT_BE_BLANK");
            return;
        }
        this.service.updateImage(this.temp2)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.getImageList();
                    
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }
    //启用/禁用
    endisable(img:Image, status:string){
        if(status == img.status){
            this.editPopup.close();
            return;
        }

        if(status == '1'){
            this.noticeMsg = `IMAGE.CONFIRM_ENABLE^^^${img.name}`;
        }else if(status == '2'){
            this.noticeMsg = `IMAGE.CONFIRM_DISENABLE^^^${img.name}`;
        }
        
        this.confirm.cof = () => {
            this.layoutService.show();
            this.service.endisableImage(img.id, status)
                .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.editPopup.close();
                        this.getImageList();

                        if(status == '1'){
                            this.showAlert("IMAGE.ENABLE_SUCCESS");
                        }else if(status == '2') {
                            this.showAlert("IMAGE.DISENABLE_SUCCESS");
                        }

                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
                )
                .catch((e) => this.onRejected(e));
        };
        this.confirm.open();
            
    }

    resetQueryOpt() {
        this.queryOpt = new CriteriaQuery();
    }

    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "COMMON.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("COMMON.FAILED_TO_GET_DATA");
    }

    nof() { }

    cof() { }

    ccf() { }

}
