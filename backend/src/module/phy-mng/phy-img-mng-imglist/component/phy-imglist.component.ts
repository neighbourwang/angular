import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ValidationService, 
    PaginationComponent, ConfirmComponent, SystemDictionary,PopupComponent } from '../../../../architecture';

import { PhyImg } from '../model/phy-img.model';
import { PhyImgListService } from '../service/phy-imglist.service';
import { Enterprise } from '../model/enterprise.model';
@Component({
    selector: "phy-img-mng/imglist",
    templateUrl: "../template/physical-image-list.html",
    styleUrls: [],
    providers: []
})
export class PhyImgListComponent implements OnInit{
    constructor(
        private layoutService: LayoutService,
        private router2: ActivatedRoute,
        private router: Router,
        private service: PhyImgListService
    ) {
        
    }
    noticeTitle = "";
    noticeMsg = "";
    @ViewChild("notice")
    notice: NoticeComponent;
    @ViewChild("pager")
    pager: PaginationComponent;
    @ViewChild("editPopup")
    editPopup: PopupComponent;


    sourceId: string;
    sourceName : string;
    phyImgList : Array<PhyImg> = new Array<PhyImg>();

    pageIndex = 1;
    pageSize = 10;
    totalPage = 1;

    selectedPhyImage: PhyImg = null;
    tempEdit: PhyImg = new PhyImg();

    ngOnInit() {
        this.router2.params.forEach((params: Params) => {
			this.sourceId = params['pmImagePoolId'];
            this.sourceName = params['sourceName'];
			console.log("接收的sourceId:" + this.sourceId);
            console.log("sourceName:" + this.sourceName);
			
		});
        this.getPhyImgList();
    }

    //获取镜像列表
    getPhyImgList(pageIndex?):void{
        this.pageIndex = pageIndex || this.pageIndex;
        this.layoutService.show();
        this.selectedPhyImage = null;
        this.service.getPhyImgList(this.sourceId,this.pageIndex, this.pageSize)
        .then(
            response =>{
                this.layoutService.hide();
                if(response && 100 == response["resultCode"]){
                    this.phyImgList = response.resultContent;
                    this.totalPage = response.pageInfo.totalPage;
                    console.log("totalPage=" + this.totalPage);
                    this.selectedPhyImage = null;
                    this.service.refreshList(this.phyImgList);
                }else{
                    alert("Res.sync error");
                }
            }
        )
        .catch((e)=>this.onRejected(e));
    }
    
    selectImg(img:PhyImg){
        this.phyImgList.forEach((e)=>{e.selected = false});
        img.selected = true;
        this.selectedPhyImage = img;
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
    

    //编辑
    editPhyImgSource(){
        if(this.selectedPhyImage){

            this.tempEdit.id = this.selectedPhyImage.id;
            this.tempEdit.destImageName = this.selectedPhyImage.destImageName;
            this.tempEdit.origImageName = this.selectedPhyImage.origImageName;
            this.tempEdit.osTypeId = this.selectedPhyImage.osTypeId;
            this.tempEdit.osTypeName = this.selectedPhyImage.osTypeName;
            this.tempEdit.bitId = this.selectedPhyImage.bitId;
            this.tempEdit.bitName = this.selectedPhyImage.bitName;
            this.tempEdit.imageTypeId = this.selectedPhyImage.imageTypeId;
            this.tempEdit.imageTypeName = this.selectedPhyImage.imageTypeName;
            this.tempEdit.enterpriseSelectedList = this.tempEdit.enterpriseSelectedList;

            this.editPopup.open();
        }else{
            this.showAlert("PHY_IMG_MNG.PLEASE_CHOOSE_ONE_SOURCE");
        }
        
    }
    //提交编辑
    commitEdit(){
        this.layoutService.show();
        // this.service.commitEdit(this.tempEdit).then(
        //     response=>{
        //         if(response && 100==response["resultCode"]){
        //             this.layoutService.hide();
        //             this.showAlert("PHY_IMG_MNG.EDIT_SUCCESS");
        //             this.editPopup.close();
        //             this.getPhyImgList();
        //         }else{
        //             alert("Res.sync error");
        //         }
        //     }
        // )
        // .catch((e)=>this.onRejected(e));
        
        if(this.ischangedType){
            //如果改了私有镜像->公有镜像，要把所属企业清空
            console.log("私有镜像->改为公有-开始");
            this.tempEdit.enterpriseSelectedList = new Array<Enterprise>();
            this.changeImageType(this.tempEdit.id);
        }else{
            this.service.commitEdit(this.tempEdit).then(
            response=>{
                if(response && 100==response["resultCode"]){
                    this.layoutService.hide();
                    this.showAlert("PHY_IMG_MNG.EDIT_SUCCESS");
                    this.editPopup.close();
                    this.getPhyImgList();
                }else{
                    alert("Res.sync error");
                }
            }
        )
        .catch((e)=>this.onRejected(e));
        }
    }

    //启用
    enable(){
        if(this.selectedPhyImage){
            let id = this.selectedPhyImage.id;
            this.layoutService.show();
            this.service.changeStatus(id, 1).then(
                response=>{
                    this.layoutService.hide();
                    if(response && 100 == response["resultCode"]){
                        this.getPhyImgList();
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
        if(this.selectedPhyImage){
            let id = this.selectedPhyImage.id;
            this.layoutService.show();
            this.service.changeStatus(id, 0).then(
                response=>{
                    this.layoutService.hide();
                    if(response && 100 == response["resultCode"]){
                        this.getPhyImgList();
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
        
        if(this.selectedPhyImage){
            if(this.selectedPhyImage.status == 1){
                this.showAlert("PHY_IMG_MNG.DELETE_CANNOT");
                return;
            }

            let id = this.selectedPhyImage.id;
            this.layoutService.show();
            this.service.changeStatus(id, 2).then(
                response=>{
                    this.layoutService.hide();
                    if(response && 100 == response["resultCode"]){
                        this.getPhyImgList();
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
    

    //查看镜像
    showImgDetail(id:string){
        this.router.navigate(['phy-mng/phy-img-mng/imglist/showimg', {"imageId": id,"pmImagePoolId":this.sourceId, "sourceName":this.sourceName}]);
    }
    backToSource(){
        this.router.navigateByUrl('phy-mng/phy-img/phy-img-mng');
    }
    //同步镜像
    syncImg(){
        this.router.navigate(['phy-mng/phy-img-mng/imglist/sync', {"pmImagePoolId":this.sourceId, "sourceName":this.sourceName}]);

    }

    //分配企业
    allocateEnt(){
        if(this.selectedPhyImage){
            if(this.selectedPhyImage.imageTypeId != 0){//如果是私有镜像类型才能点分配企业按钮（注：0是公共镜像）
                this.router.navigate(['phy-mng/phy-img-mng/imglist/setent', {"imgId":this.selectedPhyImage.id, "pmImagePoolId":this.sourceId, "sourceName":this.sourceName}]);
            }else{
                this.showAlert("PHY_IMG_MNG.JUST_NONE_PUBLIC");
            }
        }else{
            this.showAlert("PHY_IMG_MNG.PLEASE_CHOOSE_ONE_SOURCE");
        }
    }

    cancelEdit(){

    }
    //私有镜像改为公有镜像时
    changeImageType(imgId:string){
        let list = "";
        this.service.commitAllo(imgId, list).then(
            response=>{
                if(response && 100==response["resultCode"]){
                    console.log("私有镜像->改为公有-完成");
                    this.service.commitEdit(this.tempEdit).then(
                        response=>{
                            if(response && 100==response["resultCode"]){
                                this.layoutService.hide();
                                this.showAlert("PHY_IMG_MNG.EDIT_SUCCESS");
                                this.editPopup.close();
                                this.getPhyImgList();
                            }else{
                                alert("Res.sync error");
                            }
                        }
                    )
                    .catch((e)=>this.onRejected(e));
                }else{
                    alert("Res.sync error");
                }
            }
        ).catch((e)=>this.onRejected(e));
    }
    //编辑框中是否改了“私有镜像”->“公有镜像”,每次改变选择都会调用此方法
    ischangedType:boolean;
    ischangeType(typeId:number){
        console.log("改变类型:"+typeId);
        if(this.tempEdit.imageTypeId == 0){
            this.ischangedType = false;
        }else{
            this.ischangedType = true;
        }
    }
}