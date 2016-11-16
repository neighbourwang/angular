import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, ValidationService } from '../../../../architecture';

//model 
import { IpMngModel } from '../model/ip-mng.model';
import { IpMngQuery } from '../model/ipquery.model';
import { IpUsageQuery } from '../model/ipusagequery.model';

//service
import { IpMngListService } from '../service/ip-mng-list.service';

@Component({
    selector: 'ip-mng-list',
    templateUrl: '../template/ip_addr_mng.html',
    styleUrls: [],
    providers: []
})

export class IpMngListComponent implements OnInit{

    constructor(
        private router : Router,
        private service : IpMngListService,
        private layoutService : LayoutService,
        private validationService: ValidationService,
        private activatedRouter: ActivatedRoute
    ){
        if (activatedRouter.snapshot.params["dc_id"]) {
            this.dc = activatedRouter.snapshot.params["dc_id"] || "";
        } else {
            this.dc = "dc_all";
        }
    }

	/*
    @ViewChild("pager")
    pager: PaginationComponent;
	pageIndex = 1;
    pageSize = 10;
    totalPage = 1;
    */

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("setsubnet")
    setsubnet: PopupComponent;

    @ViewChild("setips")
    setips: PopupComponent;
	
	noticeTitle = "";
    noticeMsg = "";

    query: IpMngQuery = new IpMngQuery();
    ipmngs: Array<IpMngModel>;
    ipusagequery: IpUsageQuery;
    cluster = "";
    dc: string;

    ngOnInit (){
        console.log('init');
        this.getIpMngList(this.dc);
    }

    getIpMngList(dc:string, cluster?): void {
        //this.pageIndex = pageIndex || this.pageIndex;
        if (this.validationService.isBlank(dc)){
            this.showAlert("请选择相应的dataCenter");
            return;
        }
        console.log("DC: " + dc);
        this.query.dataCenter = dc;
        this.query.cluster = cluster || this.cluster;
        console.log(this.query, "Query!!!");
        this.layoutService.show();
        //this.service.getIpMngList(this.query, this.pageIndex, this.pageSize)
        this.service.getIpMngList(this.query)
        .then(
            response => {
                this.layoutService.hide();
                console.log(response, "IPmngS!!!");
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.ipmngs = response.resultContent;
                    console.log(this.ipmngs, "IPmngS!!!");
                    //this.totalPage = response.pageInfo.totalPage;
                } else {
                    alert("Res sync error");
                    this.layoutService.hide();                   
                }
        }).catch((e) => this.onRejected(e));

    }

    filterIpMng() {
        //attest = attest || new Attest();
        this.router.navigate([`net-mng/ipusage-mng-list/${this.dc}`]);
    }

    ipUsageMngPage() {
        //attest = attest || new Attest();
        this.router.navigate([`net-mng/ipusage-mng-list/${this.dc}`]);
    }

	onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("获取数据失败！");
    }

	showAlert(msg: string): void {
        this.layoutService.hide();
        this.noticeTitle = "提示";
        this.noticeMsg = msg;
        this.notice.open();
    }

    acceptIPsModify(): void {

    }
    cancelIPsModify(): void {
        
    }

    acceptIpSubnetModify(): void {
        
    }
    cancelIpSubnetModify(): void {
        
    }

}
