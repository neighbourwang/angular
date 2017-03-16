import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";


import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";

import {HostInfo} from'../model/host-info.model';
import {HostGraphModel, GraphItem,LineChart} from '../model/host-graph.model';
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

    cpuList: Array<GraphItem>;
    memList: Array<GraphItem>;
    cpuChart = new LineChart();
    memChart = new LineChart();
    
    ngOnInit() {
        this.activatedRouter.params.forEach((params: Params) => {
            if (params["host_Id"] != null) {
                this.HostId = params["host_Id"];                
                
            }
            
        });
        this.getHostDetail();
    
        this.getHostGraph();
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
                    this.showAlert("COMMON.OPERATION_ERROR");
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
                    this.cpuList = response["resultContent"].cpu;
                    this.memList = response["resultContent"].memory;
                    this.cpuChart.SourceData = this.cpuList;
                    this.memChart.SourceData = this.memList;
                    this.getGraphData(this.cpuChart);
                    this.getGraphData(this.memChart);
                    this.showGraph();
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //将源数据转化成折线图数据格式
    getGraphData(chart: LineChart) {
        let temp_value = new Array<number>();
        let temp_time = new Array<any>();
        chart.SourceData.forEach((s)=>{
            temp_value.push(s.value);
            temp_time.push(s.time);
        })
        chart._data = temp_value;
        chart.Labels = temp_time;
    }
    //画折线图
    showGraph() {
        //CPU使用率数据
        this.cpuChart.DataSets = [{

            data: this.cpuChart._data,
            label: 'CPU使用率',
            fill: true,
           
            lineTension: 0.1,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderWidth: 2,
            pointHoverRadius: 5,
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            spanGaps: false,
        }
        ];

         this.cpuChart.ChartType= "line";
        
        this.cpuChart.Colors = [
            { // grey
                backgroundColor: '#f9f9fb',
                borderColor: '#2bd2c8',
                pointBackgroundColor: '#f1f3f2',
                pointBorderColor: '#2cd2c8',
                pointHoverBackgroundColor: '#e8f0f2',
                pointHoverBorderColor: '#6fdcd6'
            }
        ];
       
        

        //内存使用率数据
        this.memChart.DataSets = [{

            data: this.memChart._data,
            label: '内存使用率',
            fill: true,
           
            lineTension: 0.1,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderWidth: 2,
            pointHoverRadius: 5,
            pointHoverBorderWidth: 2,
            pointRadius: 4,
            pointHitRadius: 10,
            spanGaps: false,
        }
        ];

         this.memChart.ChartType= "line";
        
        this.memChart.Colors = [
            { // grey
                backgroundColor: '#f9f9fb',
                borderColor: '#2bd2c8',
                pointBackgroundColor: '#f1f3f2',
                pointBorderColor: '#2cd2c8',
                pointHoverBackgroundColor: '#e8f0f2',
                pointHoverBorderColor: '#6fdcd6'
            }
        ];
       
        

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