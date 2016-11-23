import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PaginationComponent, SystemDictionary,  SystemDictionaryService} from "../../../../architecture";

import { imageList } from "../model/images-mock.model"
import { Image } from "../model/image.model"
import { Area } from '../model/area.model';
import { ImgMngService_my } from "../service/img-mng.service"
import { CriteriaQuery } from '../model/criteria-query.model';

@Component({
    selector: "img-mng",
    templateUrl: "../template/img-mng-my.html",
    styleUrls: ["../style/img-mng.less"],
    providers: []
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

   
    constructor(
        private service: ImgMngService_my,
        private layoutService: LayoutService,
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private dicService: SystemDictionaryService
    ) {

    }


    pageIndex:number = 1;
    pageSize = 10;
    totalPage =1;
    images:Image[];
    areaList:Array<Area>;
    editImage:Image = new Image();
    typeDic: Array<SystemDictionary>;
    ownerDic: Array<SystemDictionary>;
    statusDic: Array<SystemDictionary>;
    bitDic: Array<SystemDictionary>;

    queryOpt: CriteriaQuery = new CriteriaQuery();
    ngOnInit() {
        this.getAreaList();
        this.getImages();
        this.dicService.getItems("IMAGES", "STATUS")
        .then(
            (dic) =>{
                this.statusDic = dic;
                return this.dicService.getItems("IMAGES","TYPE")
            })
        .then(
            (dic)=>{
                this.typeDic = dic;
                return this.dicService.getItems("IMAGES","BITS_TYPE");
        })
        .then(
            (dic)=>{
                this.bitDic = dic;
                return this.dicService.getItems("IMAGES","OWNER");
        })
        .then(
            (dic)=>{
                this.ownerDic = dic;
             
        });
    }
    
    //根据value获取字典的txt
    getDicText(value: string, dic: Array<SystemDictionary>): String {
        if (!$.isArray(dic)) {
            return value;
        }
        const d = dic.find((e) => {
            return e.value == value;
        });
        if (d) {
            return d.displayValue;
        } else {
            return value;
        }

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

    getImageList(pageIndex?):void{
        this.pageIndex = pageIndex || this.pageIndex;
        this.layoutService.show();
        this.service.getImages(this.queryOpt, this.pageIndex, this.pageSize)
        .then(
            response =>{
                this.layoutService.hide();
                if(response && 100 == response["resultCode"]){
                    this.images = response.resultContent;
                    this.totalPage = response.pageInfo.totalPage;
                }else{
                    alert("Res sync error");
                }
            }
        ).catch((e) =>this.onRejected(e));
    }

    setKeyword(type:string, value: string){
        if(type === "0"){
            this.queryOpt.imageName = value;
            this.queryOpt.os = "";
        }else{
            this.queryOpt.imageName = "";
            this.queryOpt.os = value;
        }
    }
    resetQueryOpt() {
        this.queryOpt = new CriteriaQuery();
    }
    getAreaList(){
        this.layoutService.show();
        this.service.getAreaList().then(
            response => {
                this.layoutService.hide();
                if(response && 100==response["resultCode"]){
                    this.areaList = response.resultContent;
                }else{
                    alert("Res sync error");
                }
            }
        )
        .catch((e)=>this.onRejected(e));
    }

    updateImageName(image:Image):void{
        //保存
        this.service.updateImage(this.editImage)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    
                    image.id = this.editImage.id;
                    image.name = this.editImage.name;
                    image.type = this.editImage.type;
                    image.os = this.editImage.os;
                    image.bits = this.editImage.bits;
                    image.createTime = this.editImage.createTime;
                    image.status = this.editImage.status;
                    image.progress = this.editImage.progress;
                    image.description = this.editImage.description;
                    image.desEditing = false;
                    image.nameEditing = false;

                } else {
                    alert("Res sync error");
                }
            }
            ) .catch((e) => this.onRejected(e));

    }
  updateImageDes(image:Image):void{
      //保存
      image.desEditing = false;
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
        cimage.id = image.id;
        cimage.name = image.name;
        cimage.type = image.type;
        cimage.os = image.os;
        cimage.bits = image.bits;
        cimage.createTime = image.createTime;
        cimage.status = image.status;
        cimage.progress = image.progress;
        cimage.description = image.description;
        this.editImage = cimage;
    }


    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("获取数据失败！");
    }

}