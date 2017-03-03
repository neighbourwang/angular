import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ValidationService, 
    PaginationComponent, ConfirmComponent, SystemDictionary,PopupComponent } from '../../../../architecture';

import { PhyImg } from '../model/phy-img.model';
import { PhyImgListService } from '../service/phy-imglist.service';
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
        this.showAlert("获取数据失败");
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
            this.showAlert("请选择一个镜像");
        }
        
    }
    //提交编辑
    commitEdit(){
        this.layoutService.show();
        this.service.commitEdit(this.tempEdit).then(
            response=>{
                if(response && 100==response["resultCode"]){
                    this.layoutService.hide();
                    this.showAlert("编辑成功");
                    this.editPopup.close();
                    this.getPhyImgList();
                }else{
                    alert("Res.sync error");
                }
            }
        )
        .catch((e)=>this.onRejected(e));
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
                        this.showAlert("启用成功");
                    }else{
                        alert("Res.sync error");
                    }
                }
            ).catch((e)=> this.onRejected(e));
            }else{
            this.showAlert("请选择一个镜像");
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
                        this.showAlert("禁用成功");
                    }else{
                        alert("Res.sync error");
                    }
                }
            ).catch((e)=> this.onRejected(e));
        }else{
            this.showAlert("请选择一个镜像");
        }
    }
    //删除
    delete(){
        if(this.selectedPhyImage){
            let id = this.selectedPhyImage.id;
            this.layoutService.show();
            this.service.changeStatus(id, 2).then(
                response=>{
                    this.layoutService.hide();
                    if(response && 100 == response["resultCode"]){
                        this.getPhyImgList();
                        this.showAlert("删除成功");
                    }else{
                        alert("Res.sync error");
                    }
                }
            ).catch((e)=> this.onRejected(e));
        }else{
            this.showAlert("请选择一个镜像");
        }
    }
    

    //查看镜像
    showImgDetail(id:string){
        this.router.navigate(['phy-img-mng/imglist/showimg', {"imageId": id,"pmImagePoolId":this.sourceId, "sourceName":this.sourceName}]);
    }
    backToSource(){
        this.router.navigateByUrl('phy-mng/phy-img/phy-img-mng');
    }
    //同步镜像
    syncImg(){
        this.router.navigate(['phy-img-mng/imglist/sync', {"pmImagePoolId":this.sourceId, "sourceName":this.sourceName}]);

    }

    //分配企业
    allocateEnt(){
        if(this.selectedPhyImage){
            if(this.selectedPhyImage.imageTypeId != 0){//如果是私有镜像类型才能点分配企业按钮（注：0是公共镜像）
                this.router.navigate(['phy-img-mng/imglist/setent', {"imgId":this.selectedPhyImage.id, "pmImagePoolId":this.sourceId, "sourceName":this.sourceName}]);
            }else{
                this.showAlert("只有非公共镜像类型才能分配企业");
            }
        }else{
            this.showAlert("请选择镜像");
        }
    }

    cancelEdit(){

    }
}