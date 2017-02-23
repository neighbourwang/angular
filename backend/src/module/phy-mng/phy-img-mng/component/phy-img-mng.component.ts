import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ValidationService, 
    PaginationComponent, ConfirmComponent, SystemDictionary, SelectboxComponent,PopupComponent } from '../../../../architecture';

//model
import { PhyImgSource } from '../model/phy-img-source.model';
import { Pool } from'../model/pool.model';
//service
import { PhyImgSourceService } from'../service/phy-img-source.service';

@Component({
    selector: "phy-img-mng",
    templateUrl: "../template/physical_image.html",
    styleUrls: [],
    providers: []
}
)
export class PhyImgMngComponent implements OnInit {

    constructor(
        private router: Router,
        private layoutService: LayoutService,
        private validationService: ValidationService,
        private activatedRouter : ActivatedRoute,
        private service: PhyImgSourceService
    ){ }

    @ViewChild("pager")
    pager: PaginationComponent;

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;
    
    @ViewChild("createPopup")
    createPopup:PopupComponent;

    @ViewChild("editPopup")
    editPopup:PopupComponent;

    @ViewChild("alloPopup")
    alloPopup:PopupComponent;

    noticeTitle = "";
    noticeMsg = "";

    

    sourceList:Array<PhyImgSource>;
    pageIndex = 1;
    pageSize = 10;
    totalPage = 1;

    selectedPhyImageSources: PhyImgSource = null;
    tempEdit: PhyImgSource = new PhyImgSource();

    tempCreate : PhyImgSource = new PhyImgSource();

    inUsedPools:Array<Pool>;
    noUsedPools:Array<Pool>;

    ngOnInit() {
        this.getPhyImageSources();
        /*
        if (activatedRouter.snapshot.params["platformId"]) {
            this.platformId = activatedRouter.snapshot.params["platformId"];
        } else {
            this.showMsg('HOST_VMWARE_MNG.MUST_CHOOSE_PLATFORM');
        }
        */
    }

    selectSource(source:PhyImgSource){
        this.sourceList.forEach((e)=>{e.selected = false});
        source.selected = true;
        this.selectedPhyImageSources = source;
    }
    //镜像源列表
    getPhyImageSources(pageIndex?):void{
        this.pageIndex = pageIndex || this.pageIndex;
        this.layoutService.show();
        this.selectedPhyImageSources = null;
        this.service.getSourceList(this.pageIndex, this.pageSize)
        .then(
            response =>{
                this.layoutService.hide();
                if(response && 100 == response["resultCode"]){
                    this.sourceList = response.resultContent;
                    this.totalPage = response.pageInfo.totalPage;
                    this.selectedPhyImageSources = null;
                }else{
                    alert("Res.sync error");
                }
            }
        )
        .catch((e)=>this.onRejected(e));
    }
    //创建
    createPhyImgSource(){
        this.createPopup.open();
    }
    commitCreate(){
        if(this.tempCreate.imageName==null){
            this.showAlert("名称不能为空");
        }else if(this.tempCreate.imageURL==null){
            this.showAlert("地址不能为空");
        }else if(this.tempCreate.imageName && this.tempCreate.imageURL){
            this.layoutService.show();
            this.service.commitCreate(this.tempCreate).then(
                response=>{
                    this.layoutService.hide();
                    if(response && 100 == response["resultCode"]){

                        this.showAlert("创建成功");
                    }else{
                    alert("Res.sync error");
                }
            }
        )
        .catch((e)=>this.onRejected(e));
            
        }
    }

    //分配
    allocatePool(){
        if(!this.selectedPhyImageSources){
            this.showAlert("请选择一个镜像源");
        }else{
            this.layoutService.show();
            this.service.getAllo(this.selectedPhyImageSources.id)
                .then(
                    response=>{
                        this.layoutService.hide();
                        if(response && 100== response["resultCode"]){
                            this.inUsedPools = response["resultContent"].inUsedPools;
                            this.noUsedPools = response["resultContent"].noUsedPools;

                            this.alloPopup.open();
                        }else{
                            alert("Res.sync error");
                        }
                })
            .catch((e)=>this.onRejected(e));
        }

    }

    commitAllo(){
        let idlist:string;
        this.inUsedPools.forEach((e)=>{
            idlist = idlist + e.pmPoolId+","
        })
        idlist.slice(0, idlist.length-1);

        console.log("idlist="+idlist);
        this.layoutService.show();
        this.service.commitAllo(this.selectedPhyImageSources.id, idlist)
            .then(
                response=>{
                    this.layoutService.hide();
                    if(response && 100== response["resultCode"]){
                        this.showAlert("分配成功");
                        this.alloPopup.close();
                    }else{
                        alert("Res.sync error");
                    }
                })
                .catch((e)=>this.onRejected(e));
        
    }
    cancelAllo(){
        
    }
    //编辑
    editPhyImgSource(){
        if(this.selectedPhyImageSources){

            this.tempEdit.description = this.selectedPhyImageSources.description;
            this.tempEdit.id = this.selectedPhyImageSources.id;
            this.tempEdit.imageName = this.selectedPhyImageSources.imageName;
            this.tempEdit.imageURL = this.selectedPhyImageSources.imageURL;
            this.tempEdit.status = this.selectedPhyImageSources.status;

            this.editPopup.open();
        }else{
            this.showAlert("请选择一个镜像源");
        }
        
    }
    commitEdit(){

    }

    //启用
    enable(){
        let id = this.selectedPhyImageSources.id;
        this.layoutService.show();
        this.service.changeStatus(id, 1).then(
            response=>{
                this.layoutService.hide();
                if(response && 100 == response["resultCode"]){
                     this.showAlert("启用成功");
                }else{
                    alert("Res.sync error");
                }
            }
        ).catch((e)=> this.onRejected(e));
    }
    //禁用
    disable(){
        let id = this.selectedPhyImageSources.id;
        this.layoutService.show();
        this.service.changeStatus(id, 0).then(
            response=>{
                this.layoutService.hide();
                if(response && 100 == response["resultCode"]){
                     this.showAlert("禁用成功");
                }else{
                    alert("Res.sync error");
                }
            }
        ).catch((e)=> this.onRejected(e));
    }
    //删除
    delete(){
        let id = this.selectedPhyImageSources.id;
        this.layoutService.show();
        this.service.changeStatus(id, 2).then(
            response=>{
                this.layoutService.hide();
                if(response && 100 == response["resultCode"]){
                     this.showAlert("删除成功");
                }else{
                    alert("Res.sync error");
                }
            }
        ).catch((e)=> this.onRejected(e));
    }
    //测试创建
    testPhyImgSource(temp:PhyImgSource){
        this.layoutService.show();
        this.service.testPhyImgSource(temp)
        .then(
            response=>{
                this.layoutService.hide();
                if(response && 100==response["resultCode"]){
                    this.showAlert("测试成功");
                }else{
                     alert("Res.sync error");
                }
            }
        ).catch((e)=> this.onRejected(e));
    }
    

    gotoPhyImageList(){

    }







    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("获取数据失败");
    }
    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "HOST_OPENSTACK_MNG.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }
}