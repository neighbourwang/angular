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

    cpuData: any;
    cpuColor: Array<any>;
    cpuLabels: Array<any>;
    cpuChartType: string;
    
    ngOnInit() {
        this.activatedRouter.params.forEach((params: Params) => {
            if (params["host_Id"] != null) {
                this.HostId = params["host_Id"];                
                
            }
            
        });
        this.getHostDetail();
    //    window.setTimeout(() => { this.showGraph();}, 100);
        this.showGraph();
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

        this.cpuData = [{

            data: [65, 59, 80, 81, 56, 55, 40],
            label: 'Series A',
            fill: true,
           
            lineTension: 0.1,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            spanGaps: false,
        }
        ];
        
        this.cpuColor = [
            { // grey
                backgroundColor: '#f9f9fb',
                borderColor: '#5b9b9b',
                pointBackgroundColor: '#f1f3f2',
                pointBorderColor: '#2cd2c8',
                pointHoverBackgroundColor: '#e8f0f2',
                pointHoverBorderColor: '#6fdcd6'
            }
        ];
        this.cpuChartType = "line";

        this.cpuLabels=['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    }

    refresh() {
        this.getHostDetail();
        this.getHostGraph();
        
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