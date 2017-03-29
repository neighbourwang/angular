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
        if(this.tempCreate.imageName==null || ""==this.tempCreate.imageName){
            this.showAlert("PHY_IMG_MNG.NAME_NOT_NULL");
        }else if(this.tempCreate.imageURL==null || ""==this.tempCreate.imageURL){
            this.showAlert("PHY_IMG_MNG.ADDRESS_NOT_NULL");
        }else if(this.tempCreate.imageName && this.tempCreate.imageURL){
            this.layoutService.show();
            this.service.commitCreate(this.tempCreate).then(
                response=>{
                    this.layoutService.hide();
                    if(response && 100 == response["resultCode"]){
                        this.createPopup.close();
                        this.showAlert("PHY_IMG_MNG.CREATE_SUCCESS");
                        this.getPhyImageSources();
                    }else{
                    alert("Res.sync error");
                }
            }
        )
        .catch((e)=>this.onRejected(e));
            
        }
    }
    cancelCreate(){

    }
    //分配
    allocatePool(){
        if(!this.selectedPhyImageSources){
            this.showAlert("PHY_IMG_MNG.PLEASE_CHOOSE_ONE_SOURCE");
        }else{
            this.router.navigate(['phy-mng/phy-img/phy-img-mng-allocate', {"pmImagePoolId": this.selectedPhyImageSources.id}]);
            
        }

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
            this.showAlert("PHY_IMG_MNG.PLEASE_CHOOSE_ONE_SOURCE");
        }
        
    }
    commitEdit(){
        if(this.tempEdit.imageName==null || ""==this.tempEdit.imageName){
            this.showAlert("PHY_IMG_MNG.NAME_NOT_NULL");
        }else if(this.tempEdit.imageURL==null || ""==this.tempEdit.imageURL){
            this.showAlert("PHY_IMG_MNG.ADDRESS_NOT_NULL");
        }else if(this.tempEdit.imageName && this.tempEdit.imageURL){
            this.layoutService.show();
            this.service.commitEdit(this.tempEdit).then(
                response=>{
                    this.layoutService.hide();
                    if(response && 100 == response["resultCode"]){
                        this.editPopup.close();
                        this.showAlert("PHY_IMG_MNG.EDIT_SUCCESS");
                        this.getPhyImageSources();
                        
                    }else{
                    alert("Res.sync error");
                }
            }
        )
        .catch((e)=>this.onRejected(e));
            
        }
    }
    cancelEdit(){

    }
    //启用
    enable(){
        if(this.selectedPhyImageSources){
            let id = this.selectedPhyImageSources.id;
            this.layoutService.show();
            this.service.changeStatus(id, 1).then(
                response=>{
                    this.layoutService.hide();
                    if(response && 100 == response["resultCode"]){
                        this.getPhyImageSources();
                        this.showAlert("PHY_IMG_MNG.ENABLE_SUCCESS");
                    }else{
                        alert("Res.sync error");
                    }
                }
            ).catch((e)=> this.onRejected(e));
         }else{
            this.showAlert("PHY_IMG_MNG.PLEASE_CHOOSE_ONE_SOURCE");
        }
    }
    //禁用
    disable(){
        if(this.selectedPhyImageSources){
            let id = this.selectedPhyImageSources.id;
            this.layoutService.show();
            this.service.changeStatus(id, 0).then(
                response=>{
                    this.layoutService.hide();
                    if(response && 100 == response["resultCode"]){
                        this.getPhyImageSources();
                        this.showAlert("PHY_IMG_MNG.DISABLE_SUCCESS");
                    }else{
                        alert("Res.sync error");
                    }
                }
            ).catch((e)=> this.onRejected(e));
        }else{
        this.showAlert("PHY_IMG_MNG.PLEASE_CHOOSE_ONE_SOURCE");
        }
    }
    //删除
    delete(){
        if(this.selectedPhyImageSources){
            let id = this.selectedPhyImageSources.id;
            this.layoutService.show();
            this.service.changeStatus(id, 2).then(
                response=>{
                    this.layoutService.hide();
                    if(response && 100 == response["resultCode"]){
                        this.getPhyImageSources();
                        this.showAlert("PHY_IMG_MNG.DELETE_SUCCESS");
                    }else{
                        alert("Res.sync error");
                    }
                }
            ).catch((e)=> this.onRejected(e));
        }else{
            this.showAlert("PHY_IMG_MNG.PLEASE_CHOOSE_ONE_SOURCE");
        }
    }
    //测试创建
    testPhyImgSource(temp:PhyImgSource){
        if(temp.imageName==null || ""==temp.imageName){
            this.showAlert("PHY_IMG_MNG.NAME_NOT_NULL");
        }else if(temp.imageURL==null || ""==temp.imageURL){
            this.showAlert("PHY_IMG_MNG.ADDRESS_NOT_NULL");
        }else if(temp.imageName && temp.imageURL){
            this.layoutService.show();
            this.service.testPhyImgSource(temp)
            .then(
                response=>{
                    this.layoutService.hide();
                    this.createPopup.close();
                    this.editPopup.close();
                    if(response && 100==response["resultCode"]){
                        this.showAlert("PHY_IMG_MNG.TEST_SUCCESS");
                    }else{
                        alert("Res.sync error");
                    }
                }
            ).catch((e)=> this.onRejected(e));
        }
    }
    

    gotoPhyImageList(source:PhyImgSource){
        this.router.navigate(['phy-mng/phy-img-mng/imglist', {"pmImagePoolId": source.id,"sourceName": source.imageName}]);
    }


    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("PHY_IMG_MNG.ERROR");
    }
    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "HOST_OPENSTACK_MNG.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }
}