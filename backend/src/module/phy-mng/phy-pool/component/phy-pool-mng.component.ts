import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PaginationComponent  } from '../../../../architecture';

//model
import { PhyPoolList } from '../model/phy-pool-list.model.ts';
import {CriteriaQuery} from "../model/criteria-query.model";
import {PhyCreat} from "../model/phy-creat.model";

//service
import { PhyPoolMngService } from '../service/phy-pool-mng.service';
import {Criteria} from "../model/criteria.model";


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

    pageIndex= 1;
    pageSize= 20;
    totalPage= 1;

    data: Array<PhyPoolList>;
    criteriaQuery: CriteriaQuery= new CriteriaQuery();
    phy: PhyCreat= new PhyCreat();
    criteria: Criteria= new Criteria();

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

    phyEnable(){
        const selectedPhy= this.data.find((p) =>{
            return p.selected;
        });
        if(!selectedPhy){
            this.showAlert("请选择资源池");
        }else if(selectedPhy.status == "1"){
            this.showAlert("该资源池已处于启用状态");
        }else{
            this.enableConfirm.open('启用资源池','您选择启用'+selectedPhy.pmPoolName+'资源池，请确认；如果确认，用户将能够订购此资源池的资源。');
            this.enableConfirm.cof =() =>{
                this.layoutService.show();
            this.service.phyEnable(selectedPhy.pmPoolId, selectedPhy.status, this.criteriaQuery)
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            this.showAlert("启用成功");
                            this.getData();
                        } else {
                            alert("Res sync error");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
            }
        }
    }

    edit(){
        const selectedPhy= this.data.find((p) =>{
            return p.selected;
        });
        if(!selectedPhy){
            this.showAlert("请选择资源池");
        }else if(selectedPhy.status == "1"){
            this.showAlert("该资源池已处于启用状态");
        }else{
            this.phy.pmpoolId= selectedPhy.pmPoolId;
            this.layoutService.show();
            this.service.edit(selectedPhy.pmPoolId)
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            this.showAlert("启用成功");
                            this.getData();
                        } else {
                            alert("Res sync error");
                        }
                        }
                    )
                    .catch((e) => this.onRejected(e));
            }
        }

    selectedPhy(item: PhyPoolList){
        this.data.forEach((p) =>{
            p.selected= false;
        });
        item.selected= true;
    }

    creat(){
        this.router.navigate([`phy-mng/phy-pool/phy-creat`]);
    }

    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "提示";
        this.noticeMsg = msg;
        this.notice.open();
    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("获取数据失败");
    }

}
