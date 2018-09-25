import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LayoutService, NoticeComponent, ValidationService, 
    PaginationComponent, ConfirmComponent, SystemDictionary } from '../../../../architecture';

import { PhyImg } from '../model/phy-img.model';
import { PhyImgListService } from '../service/phy-imglist.service';
import { Enterprise } from'../model/enterprise.model';

@Component({
    selector: "phy-img-mng/imglist/setent",
    templateUrl: "../template/physical-image-set-ent.html",
    styleUrls: [],
    providers: []
})
export class PhyImgListSetentComponent implements OnInit{
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
    imgId:string;
    img:PhyImg = new PhyImg();

    selectedEnterprise:Array<Enterprise>;
    unselectedEnterprise:Array<Enterprise>;
    ngOnInit(){
        this.router2.params.forEach((params: Params) => {
            this.sourceId = params['pmImagePoolId'];
            this.sourceName = params['sourceName'];
			console.log("接收的sourceId:" + this.sourceId);
            console.log("sourceName:" + this.sourceName);
			this.imgId = params['imgId'];
            console.log("imgId:"+ this.imgId);
		});
        this.getEntList();
    }

    backToList(){
        this.router.navigate(['phy-mng/phy-img-mng/imglist', {"pmImagePoolId":this.sourceId, "sourceName":this.sourceName}])
    }

    getEntList(){
        this.layoutService.show();
        this.service.getAllo(this.imgId).then(
            response=>{
                this.layoutService.hide();
                if(response && 100==response["resultCode"]){
                    this.img = response.resultContent;
                    this.unselectedEnterprise = response.resultContent.noUsedEnterpriseList;
                    this.selectedEnterprise = response.resultContent.inUsedEnterpriseList;
                }else{
                    alert("Res.sync error");
                }
            }
        ).catch((e)=>this.onRejected(e));
    }

    saveEntList(){
        this.layoutService.show();
        let list:string="";
        this.selectedEnterprise.forEach((e)=>{
            list = list + e.id + ','
        })
        list = list.slice(0, list.length-1);
        console.log("after list="+list);
        this.service.commitAllo(this.imgId, list).then(
            response=>{
                this.layoutService.hide();
                if(response && 100==response["resultCode"]){
                    this.layoutService.hide();
                    this.showAlert("PHY_IMG_MNG.SAVE_SUCCESS",this.backToList);
                    //this.getEntList();
                    
                }else{
                    alert("Res.sync error");
                }
            }
        ).catch((e)=>this.onRejected(e));
    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("PHY_IMG_MNG.ERROR", this.error);
    }
    showAlert(msg: string, fun:Function): void {
        this.layoutService.hide();

        this.noticeTitle = "HOST_OPENSTACK_MNG.PROMPT";
        this.noticeMsg = msg;
         this.notice.nof=()=>{
            console.log("function");
            fun.bind(this)();
        }
        this.notice.open();
    }

    error(){

    }
}