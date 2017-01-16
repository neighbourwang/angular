import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PaginationComponent, SystemDictionary  } from '../../../../architecture';

//model
import { PhyPoolList } from '../model/phy-pool-list.model';
import { Criteria } from "../model/criteria.model";

//service
import { PhyPoolMngService } from '../service/phy-pool-mng.service';


@Component({
    selector: 'phy-pool-mng',
    templateUrl: '../template/phy-pool-mng.html',
    styleUrls: [],
    providers: []
})

export class PhyPoolMngComponent implements OnInit{

    constructor(
        private router : Router,
        private service : PhyPoolMngService,
        private layoutService : LayoutService
    ) {

    }

    @ViewChild("pager")
    pager: PaginationComponent;

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild('enableConfirm')
    enableConfirm: ConfirmComponent;

    noticeTitle = "";
    noticeMsg = "";

    pageIndex= 0;
    pageSize= 10;
    totalPage= 1;

    statusDic: Array<SystemDictionary>;

    data: Array<PhyPoolList>;
    criteria: Criteria= new Criteria();
    default: string;
    region= "region";
    dataCenter= "dataCenter";
    search: string;
    query: string;
    selectedPhy: PhyPoolList= new PhyPoolList();

    ngOnInit (){
        console.log('init');
        //this.layoutService.show();
        this.getData();

    }

    getData(pageIndex?) {
        this.pageIndex= pageIndex || this.pageIndex;
        this.layoutService.show();
        this.service.getData(this.criteria, this.pageIndex, this.pageSize)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        console.log(response.resultContent, "response");
                        this.data = response["resultContent"];
                        this.totalPage= response.pageInfo.totalPage;
                    } else {
                        alert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    phyIfEnable(status: string){
        const selectedphy= this.data.find((p) =>{
            return p.selected;
        });
        if(!selectedphy){
            this.showAlert("PHY_MNG_POOL.PLEASE_CHOOSE_POOL");
        }else{
            this.selectedPhy= selectedphy;
            console.log(this.selectedPhy,"selectedPhy");
            if(this.selectedPhy.status == "1"){
                if(status == "1"){
                    this.showAlert("PHY_MNG_POOL.POOL_ALREADY_ENABLE");
                }else if(status == "0"){
                    this.disable(this.selectedPhy.pmPoolId);
                }else{
                    this.showAlert("PHY_MNG_POOL.ENABLE_CANNOT_DELETE");
                }
            }else{
                if(status == "1"){
                    this.enable(this.selectedPhy.pmPoolId);
                }else if(status == "0"){
                    this.showAlert("PHY_MNG_POOL.POOL_ALREADY_DISABLE");
                }else{
                    this.remove(this.selectedPhy.pmPoolId);
                }
            }
        }

    }

    enable(id: string){
        this.enableConfirm.open('PHY_MNG_POOL.ENABLE_POOL','PHY_MNG_POOL.ENABLE_POOL_WARNING^^^'+this.selectedPhy.pmPoolName);
        this.enableConfirm.cof =() =>{
            this.layoutService.show();
            this.service.phyIfEnable(this.selectedPhy.pmPoolId, '1')
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            console.log(response,"======");
                            this.getData();
                            this.showAlert("PHY_MNG_POOL.ENABLE_SUCCESS");
                        } else {
                            alert("Res sync error");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        }
    }

    disable (id: string){
        this.enableConfirm.open('PHY_MNG_POOL.DISABLE_POOL','PHY_MNG_POOL.DISABLE_POOL_WARNING^^^'+this.selectedPhy.pmPoolName);
        this.enableConfirm.cof =() =>{
            this.layoutService.show();
            this.service.phyIfEnable(this.selectedPhy.pmPoolId, '0')
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            console.log(response,"======");
                            this.getData();
                            this.showAlert("PHY_MNG_POOL.DISABLE_SUCCESS");
                        } else {
                            alert("Res sync error");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        }
    }

    remove (id: string){;
        this.enableConfirm.open("PHY_MNG_POOL.DELETE_POOL","PHY_MNG_POOL.DELETE_POOL_WARNING^^^"+this.selectedPhy.pmPoolName);
        this.enableConfirm.cof =() =>{
            this.layoutService.show();
            this.service.phyIfEnable(this.selectedPhy.pmPoolId, '2')
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            console.log(response,"======");
                            this.getData();
                            this.showAlert("PHY_MNG_POOL.DELETE_SUCCESS");
                        } else {
                            alert("Res sync error");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        }
    }

    selected(item: PhyPoolList){
        this.data.forEach((p) =>{
            p.selected= false;
        });
        item.selected= true;
    }

    creat(){
        this.router.navigate([`phy-mng/phy-pool/phy-creat`]);
    }

    gotoPhyList(item){
        this.router.navigate([`physical-mng/physical-mng/physical-list`,
            {   "pmpoolId": item.pmPoolId
            }
        ]);
    }

    gotoEdit(){
        const selectedphy= this.data.find((p) =>{
            return p.selected;
        });
        if(!selectedphy){
            this.showAlert("PHY_MNG_POOL.PLEASE_CHOOSE_POOL");
        }else if(selectedphy.status == "1"){
            this.showAlert("PHY_MNG_POOL.ENABLE_CANNOT_EDIT");
        }else{
            this.router.navigate([`phy-mng/phy-pool/phy-creat`,
                {
                    "pmpoolId": selectedphy.pmPoolId
                }
            ]);
        }
    }

    searchphy(){
        this.criteria= new Criteria();
        console.log(this.criteria,"criteria");
        if(this.search == "dataCenter"){
            this.criteria.dataCenter= this.query;
        }else if(this.search == "region"){
            this.criteria.region= this.query;
        }else{
            this.criteria.poolName= this.query;
        }
        console.log(this.criteria,"criteria");
        this.getData();
        this.pager.render(1);
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
