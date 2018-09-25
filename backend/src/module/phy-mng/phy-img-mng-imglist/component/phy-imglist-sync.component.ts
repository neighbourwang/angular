import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {  LayoutService, NoticeComponent, ValidationService, 
    PaginationComponent, ConfirmComponent, SystemDictionary } from '../../../../architecture';

import { PhyImg } from '../model/phy-img.model';
import { PhyImgListService } from '../service/phy-imglist.service';

@Component({
    selector: "phy-img-mng/imglist/sync",
    templateUrl: "../template/physical-image-syn.html",
    styleUrls: [],
    providers: []
})
export class PhyImgListSyncComponent implements OnInit{
    constructor(
        private layoutService: LayoutService,
        private router2: ActivatedRoute,
        private router: Router,
        private service: PhyImgListService
    ) {}
    noticeTitle = "";
    noticeMsg = "";
    @ViewChild("notice")
    notice: NoticeComponent;

    sourceId: string;
    sourceName : string;
    phyImgList : Array<PhyImg>;

    imgTypeChangedList : Array<number> = new Array<number>();

    ngOnInit(){
        this.router2.params.forEach((params: Params) => {
            this.sourceId = params['pmImagePoolId'];
            this.sourceName = params['sourceName'];
			console.log("接收的sourceId:" + this.sourceId);
            console.log("sourceName:" + this.sourceName);
			
		});
        this.getSyncInfoList();
    }

    getSyncInfoList(){
        this.layoutService.show();
        this.service.getSyncInfo(this.sourceId).then(
            response=>{
                if(response && 100==response["resultCode"]){
                    this.layoutService.hide();
                    this.phyImgList = response.resultContent;
                }
            }
        )
        .catch((e)=>this.onRejected(e));
    }

    clearOther(index:number){
        this.phyImgList.forEach(e => {
            e.selected = false;
        });
        this.phyImgList[index].selected = true;
    }

    doSave(id:string, imgList:Array<PhyImg>){
        this.service.saveSyncInfo(id, imgList).then(
                response=>{
                    if(response && 100 == response["resultCode"]){
                        this.showAlert("保存成功");
                        this.getSyncInfoList();
                    }else{
                        alert("Res.sync error");
                    }
                }
            ).catch((e)=>this.onRejected(e));
    }

    
    saveSyncInfo(){
        //选中的镜像
        let selectedList : Array<PhyImg> = new Array<PhyImg>();
        this.phyImgList.forEach(e => {
            if(e.selected){
                selectedList.push(e);
            }
        });
        if(selectedList.length>0){
            this.layoutService.show();
            this.phyImgList.forEach((e)=>{
                if(e.selected == true ){
                    let i = this.phyImgList.indexOf(e);
                    //被选中的镜像改变了类型的情况
                    if(this.imgTypeChangedList.indexOf(i) != -1){
                        if(e.imageTypeId==1){
                        //公有改为私有
                        console.log("公有改为私有镜像，需要手动重新分配企业");
                        //this.showAlert("公有改为私有镜像，需要重新分配企业");
                        this.doSave(this.sourceId, selectedList);
                        }
                        else if(e.imageTypeId==0){
                            //私有改为公有，先把所属企业设为空，再同步
                            let list = "";
                            this.service.commitAllo(e.id, list).then(
                                response=>{
                                    if(response && 100==response["resultCode"]){
                                        console.log("公有改为私有-完成");
                                        this.doSave(this.sourceId, selectedList);
                                    }else{
                                        alert("Res.sync error");
                                    }
                                }
                            ).catch((e)=>this.onRejected(e));
                        }else{

                        }
                    }
                    //被选中的镜像没改变类型
                    else{
                        this.doSave(this.sourceId, selectedList);
                    }
                }
            });
        }else{
            this.showAlert("请选择镜像");
        }
    }

//私有镜像改为公有镜像时
    changeImageType(imgId:string){
        let list = "";
        this.service.commitAllo(imgId, list).then(
            response=>{
                this.layoutService.hide();
                if(response && 100==response["resultCode"]){
                    console.log("私有镜像->已改为公有");
                }else{
                    alert("Res.sync error");
                }
            }
        ).catch((e)=>this.onRejected(e));
    }

    backToList(){
        this.router.navigate(['phy-mng/phy-img-mng/imglist', {"pmImagePoolId":this.sourceId, "sourceName":this.sourceName}])
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

    //编辑框中是否改了“私有镜像”->“公有镜像”,每次改变选择都会调用此方法
    ischangedType:boolean;
    ischangeType(index:number){
        if(this.imgTypeChangedList.indexOf(index)==-1){
            this.imgTypeChangedList.push(index);
            this.ischangedType = true;
        } else{
            let t = this.imgTypeChangedList.indexOf(index);
            this.imgTypeChangedList.splice(t,1);
            this.ischangedType =  false;
        }
    }
    
}