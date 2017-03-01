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
            this.service.saveSyncInfo(this.sourceId, selectedList).then(
                response=>{
                    if(response && 100 == response["resultCode"]){
                        this.showAlert("保存成功");
                        this.getSyncInfoList();
                    }else{
                        alert("Res.sync error");
                    }
                }
            ).catch((e)=>this.onRejected(e));
        }else{
            this.showAlert("请选择镜像");
        }
    }

    backToList(){
        this.router.navigate(['phy-img-mng/imglist', {"pmImagePoolId":this.sourceId, "sourceName":this.sourceName}])
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