import { Component, ViewChild, OnInit } from '@angular/core';

import { Router,ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, ValidationService  } from '../../../../architecture';

//model
import { Criteria } from '../model/criteria.model';
import { Region } from '../model/region.model';

//service
import { PhyCreatMngService } from '../service/phy-creat-mng.service';

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
        private layoutService : LayoutService,
        private validationService: ValidationService,
        private activatedRouter : ActivatedRoute
    ) {

    }

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    data: Criteria= new Criteria();
    pmPoolId: string;
    title: string;
    save: string;

    regions: Array<Region>= new Array<Region>();

    ngOnInit (){
        console.log('init');
        this.activatedRouter.params.forEach((params: Params) =>{
            this.pmPoolId= params["pmpoolId"];
        });
        console.log(this.pmPoolId,"this.pmPoolId");

        this.getRegionList();
        if(this.pmPoolId){
            this.getData();
            this.title= "PHY_MNG_POOL.EDIT_POOL";
            this.save= "PHY_MNG_POOL.SAVE";
        }else{
            this.title= "PHY_MNG_POOL.CREATE_POOL";
            this.save= "PHY_MNG_POOL.CREATE";
        }
    }

    getData(){
        this.layoutService.show();
        this.service.getData(this.pmPoolId)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.data= response.resultContent;
                        console.log(response.resultContent, "data");
                        console.log(this.regions, "regions");
                    } else {
                        alert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }


    creatOredit(){
        if(this.validationService.isBlank(this.data.poolName)){
            this.showAlert("PHY_MNG_POOL.PLEASE_INPUT_POOLNAME");
            return;
        }
        if(this.validationService.isBlank(this.data.dataCenter)){
            this.showAlert("PHY_MNG_POOL.PLEASE_INPUT_DIGIT_CENTER");
            return;
        }

         let selectedRegion= this.regions.find((r)=>{
            return r.id== this.data.regionId;
        });
        this.data.region =selectedRegion &&selectedRegion.name || "";
        if(!this.pmPoolId){
            this.layoutService.show();
            this.service.creat(this.data)
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                             console.log(response.resultContent, "response");
                            this.gotoPoolMng();
                        } else {
                            alert("Res sync error");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        }else{
            this.layoutService.show();
            this.service.edit(this.data,this.pmPoolId)
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            console.log(response.resultContent, "response");
                            this.gotoPoolMng();
                        } else {
                            alert("Res sync error");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        }

    }

    getRegionList() {
        this.layoutService.show();
        this.service.getRegionList()
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.regions = response["resultContent"];
                        this.data.regionId= this.regions[0].id;
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
        this.noticeTitle = "PHY_MNG_POOL.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("PHY_MNG_POOL.GETTING_DATA_FAILED");
    }

}
