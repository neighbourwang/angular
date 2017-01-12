import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PaginationComponent, SystemDictionary  } from '../../../../architecture';

//model
import { PhyPoolList } from '../model/phy-pool-list.model.ts';
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

    pageIndex= 1;
    pageSize= 20;
    totalPage= 1;

    statusDic: Array<SystemDictionary>;

    data: Array<PhyPoolList>;
    criteria: Criteria= new Criteria();
    default: string;
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
            this.showAlert("请选择资源池");
        }else{
            this.selectedPhy= selectedphy;
            console.log(this.selectedPhy,"selectedPhy");
            if(this.selectedPhy.status == "1"){
                if(status == "1"){
                    this.showAlert("该资源池已处于启用状态");
                }else if(status == "0"){
                    this.disable(this.selectedPhy.pmPoolId);
                }else{
                    this.showAlert("启用状态下不能删除");
                }
            }else{
                if(status == "1"){
                    this.enable(this.selectedPhy.pmPoolId);
                }else if(status == "0"){
                    this.showAlert("该资源池已处于禁用状态");
                }else{
                    this.remove(this.selectedPhy.pmPoolId);
                }
            }
        }

    }

    enable(id: string){
        this.enableConfirm.open('启用资源池','您选择启用'+this.selectedPhy.pmPoolName+'资源池，请确认；如果确认，用户将能够订购此资源池的资源。');
        this.enableConfirm.cof =() =>{
            this.layoutService.show();
            this.service.phyIfEnable(this.selectedPhy.pmPoolId, '1')
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            console.log(response,"======");
                            this.getData();
                            this.showAlert("启用成功");
                        } else {
                            alert("Res sync error");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        }
    }

    disable (id: string){
        this.enableConfirm.open('禁用资源池','您选择禁用'+this.selectedPhy.pmPoolName+'资源池，请确认；如果确认，用户将不能够订购此资源池的资源。');
        this.enableConfirm.cof =() =>{
            this.layoutService.show();
            this.service.phyIfEnable(this.selectedPhy.pmPoolId, '0')
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            console.log(response,"======");
                            this.getData();
                            this.showAlert("禁用成功");
                        } else {
                            alert("Res sync error");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        }
    }

    remove (id: string){
        this.enableConfirm.open('删除资源池','您选择删除'+this.selectedPhy.pmPoolName+'资源池，请确认；如果确认，此资源池的数据将不能恢复。');
        this.enableConfirm.cof =() =>{
            this.layoutService.show();
            this.service.phyIfEnable(this.selectedPhy.pmPoolId, '2')
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            console.log(response,"======");
                            this.getData();
                            this.showAlert("删除成功");
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

    gotoCreat(){
        const selectedphy= this.data.find((p) =>{
            return p.selected;
        });
        if(!selectedphy){
            this.showAlert("请选择资源池");
        }else if(selectedphy.status == "1"){
            this.showAlert("启用状态下不能编辑！");
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
        if(this.search == "资源池名称"){
            this.criteria.poolName= this.query;
        }else if(this.search == "所属地域"){
            this.criteria.region= this.query;
        }else{
            this.criteria.dataCenter= this.query;
        }
        console.log(this.criteria,"criteria");
        this.getData();
        this.pager.render(1);
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
