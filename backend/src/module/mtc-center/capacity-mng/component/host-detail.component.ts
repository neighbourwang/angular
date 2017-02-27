import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";


import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";

import {HostInfo,DataSet} from'../model/host-info.model';
import {HostGraphModel, CPU, Memory} from '../model/host-graph.model';
//service
import { HostDetailService } from "../service/host-detail.service";


@Component({
    selector: "host-detail",
    templateUrl: "../template/host-detail.html",
    styleUrls: [],
    providers: []
})
export class HostDetailComponent implements OnInit {
    constructor(
        private service: HostDetailService,
        private router: Router,
        private layoutService: LayoutService,
         private activatedRouter: ActivatedRoute,
        private validationService: ValidationService
    ) {
    }

    @ViewChild("notice")
    notice: NoticeComponent;

    noticeTitle = "";
    noticeMsg = "";
    HostId: string;
    Period="1";
    hostInfo: HostInfo = new HostInfo();
    hostGraph: HostGraphModel = new HostGraphModel();

    cpuData: Array<DataSet>;
    cpuColor: Array<any>;
    cpuLabels:Array<any>;

    ngOnInit() {
        this.activatedRouter.params.forEach((params: Params) => {
            if (params["host_Id"] != null) {
                this.HostId = params["host_Id"];                
                
            }
            
        });
        this.getHostDetail();
        
    }

    getHostDetail() {
         this.layoutService.show();
        this.service.getHostDetail(this.HostId,this.Period)
            .then(
            response => {
                this.layoutService.hide();
                if (response && "100" == response["resultCode"]) {
                    this.hostInfo = response["resultContent"];
                   
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //获取宿主机折线图数据
    getHostGraph() {
         this.layoutService.show();
        this.service.getHostGraph(this.HostId,this.Period)
            .then(
            response => {
                this.layoutService.hide();
                if (response && "100" == response["resultCode"]) {
                    this.hostGraph = response["resultContent"];
                   
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //画折线图
    showGraph() {
        
        this.cpuData = [{ data:[65, 59, 80, 81, 56, 55, 40], label: 'Series A' }];
        this.cpuColor = [
            { // grey
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];

        this.cpuLabels=['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    }

    refresh() {
        this.getHostDetail();
        this.getHostGraph();
        this.showGraph();
    }

    BacktoComputeRes(){
        this.router.navigate([`mtc-center/capacity-mng/compute-res`]);
    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
    }

     showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "NET_MNG_VM_IP_MNG.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }
}