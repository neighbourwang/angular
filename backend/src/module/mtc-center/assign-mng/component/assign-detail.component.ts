import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";

import {HyperInfo} from "../model/hyper-info.model";
import {HyperGraph,GraphItem,LineChart}from "../model/hyper-graph.model";
//service
import { AssignDetailService } from "../service/assign-detail.service";


@Component({
    selector: "assign-detail",
    templateUrl: "../template/assign-detail.html",
    styleUrls: [],
    providers: []
})
export class AssignDetailComponent implements OnInit {
    constructor(
        private service: AssignDetailService,
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

    Period="1";
    vmId: string;
    hyperInfo: HyperInfo = new HyperInfo();
    hyperGraph: HyperGraph = new HyperGraph();

    cpuList: Array<GraphItem>;
    memList: Array<GraphItem>;
    cpuChart = new LineChart();
    memChart = new LineChart();

    ngOnInit() {
        this.activatedRouter.params.forEach((params: Params) => {
            if (params["vm_Id"] != null) {
                this.vmId = params["vm_Id"];

            }
        });
        this.getHyperInfo();
        this.getHyperGraph();
    }

    getHyperInfo() {
        this.layoutService.show();
        this.service.getHyperInfo(this.vmId, this.Period)  
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.hyperInfo = response["resultContent"];
                   
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //获取超分管理详情折线图数据
    getHyperGraph() {
         this.layoutService.show();
        this.service.getHyperGraph(this.vmId,this.Period)
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

        let _label="";
        if (chart == this.cpuChart) {
            _label = "CPU使用率";
        } else {
            _label = "内存使用率";
        }

        chart.DataSets = [{

            data: chart._data,
            label:_label,
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

        chart.ChartType= "line";
        
        chart.Colors = [
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
        this.getHyperInfo();
        this.getHyperGraph();
        
    }

    BacktoAssignMng() {
        this.router.navigate([`mtc-center/assign-mng/assign-mng`]);  
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