import { Component, ViewChild, OnInit } from '@angular/core';

import { Router,ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, ValidationService  } from '../../../../architecture';

//model
import { Criteria } from '../model/criteria.model.ts';
import { Region } from '../model/region.model.ts';

//service
import { PhyCreatMngService } from '../service/phy-creat-mng.service.ts';
import {PhyPoolMngService} from "../service/phy-pool-mng.service";

@Component({
    selector: 'phy-pool-creat',
    templateUrl: '../template/phy-creat.html',
    styleUrls: [],
    providers: []
})

export class PhyCreatComponent implements OnInit{

    constructor(
        private router : Router,
        private service : PhyCreatMngService,
        private Poolservice : PhyPoolMngService,
        private layoutService : LayoutService,
        private validationService: ValidationService,
        private activatedRouter : ActivatedRoute
    ) {

    }

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    phy: Criteria= new Criteria();
    selectedlist: Criteria= new Criteria();
    dataCenter: string;
    description: string;
    poolName: string;
    region: string;
    pmPoolId: string;

    regions: Array<Region>;

    ngOnInit (){
        console.log('init');
        //this.layoutService.show();
        this.activatedRouter.params.forEach((params: Params) =>{
            this.dataCenter= params["dataCenter"];
            this.description= params["description"];
            this.poolName= params["poolName"];
            this.region= params["region"];
            this.pmPoolId= params["pmpoolId"];
        });
        console.log(this.dataCenter,"this.dataCenter");
        console.log(this.description,"this.description");
        console.log(this.poolName,"this.poolName");
        console.log(this.region,"this.region");
        console.log(this.pmPoolId,"this.pmPoolId");

        if(this.pmPoolId){
            this.selectedlist.dataCenter= this.dataCenter;
            this.selectedlist.description= this.description;
            this.selectedlist.poolName= this.poolName;
            this.selectedlist.region= this.region;
        }
        this.regionList();
    }


    creatOredit(){
        if(this.validationService.isBlank(this.selectedlist.poolName)){
            this.showAlert("请输入资源池名称");
            return;
        }
        if(this.validationService.isBlank(this.selectedlist.region)){
            this.showAlert("请输入所属地域");
            return;
        }
        if(this.validationService.isBlank(this.selectedlist.dataCenter)){
            this.showAlert("请输入数据中心");
            return;
        }
        if(!this.pmPoolId){
            this.layoutService.show();
            this.service.creat(this.selectedlist)
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            console.log(response.resultContent, "response");
                        } else {
                            alert("Res sync error");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        }else{
            this.layoutService.show();
            this.service.edit(this.selectedlist,this.pmPoolId)
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            console.log(response.resultContent, "response");
                        } else {
                            alert("Res sync error");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        }
        this.gotoPoolMng();
    }

    regionList(){
        this.layoutService.show();
        this.service.regionList()
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.regions = response["resultContent"];
                        console.log(response.resultContent, "response");
                    } else {
                        alert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    gotoPoolMng() {
        this.router.navigate([`phy-mng/phy-pool/phy-pool-mng`]);
    }

    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "提示";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("获取数据失败");
    }

}
