import { Component, ViewChild, OnInit } from '@angular/core';

import { Router,ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, ValidationService  } from '../../../../architecture';

//model
import { Criteria } from '../model/criteria.model.ts';
import { Region } from '../model/region.model.ts';

//service
import { PhyCreatMngService } from '../service/phy-creat-mng.service.ts';

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

    regions: Array<Region>= new Array<Region>();
    regionlist: Region= new Region();

    ngOnInit (){
        console.log('init');
        this.activatedRouter.params.forEach((params: Params) =>{
            this.pmPoolId= params["pmpoolId"];
        });
        console.log(this.pmPoolId,"this.pmPoolId");

        this.getRegionList();
        if(this.pmPoolId){
            this.getData();
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
                    } else {
                        alert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }


    creatOredit(){
        if(this.validationService.isBlank(this.data.poolName)){
            this.showAlert("请输入资源池名称");
            return;
        }
        if(this.validationService.isBlank(this.data.dataCenter)){
            this.showAlert("请输入数据中心");
            return;
        }
        if(!this.pmPoolId){
            this.layoutService.show();
            this.service.creat(this.data)
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
            this.service.edit(this.data,this.pmPoolId)
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

    getRegionList() {
        this.layoutService.show();
        this.service.getRegionList()
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.regions = response["resultContent"];
                        this.data.regionId= this.regions[1].id;
                        console.log(response.resultContent, "response");
                        console.log( this.data.regionId, " this.data.regionId");
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
