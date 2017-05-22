import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";
import { chartColors } from "../model/color.mock";
import { HostInfo } from '../model/host-info.model';
import { HostGraphModel, GraphItem, LineChart } from '../model/host-graph.model';
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
    Period = "1";
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
        this.service.getHostDetail(this.HostId, this.Period)
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
        this.service.getHostGraph(this.HostId, this.Period)
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
                    console.log("cpu_value", this.cpuChart.DataSets);
                    console.log("cpu_time", this.cpuChart.Labels);
                    console.log("mem_value", this.memChart.DataSets);
                    console.log("mem_time", this.memChart.Labels);
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //将源数据转化成折线图数据格式
    getGraphData(chart: LineChart) {
        //获取_data
        let temp_value = new Array<number>();
        let temp_time = new Array<any>();
        chart.SourceData.forEach((s) => {
            temp_value.push(s.value);
            temp_time.push(s.time);
        })
        chart._data = temp_value;
        chart.Labels = temp_time;

        let _label = "";
        if (chart == this.cpuChart) {
            _label = "CPU使用率";
        } else {
            _label = "内存使用率";
        }

        chart.DataSets = [{

            data: chart._data,
            label: _label,
            borderWidth: 2,
            pointBorderWidth: 0,
            pointRadius: 1,
            pointHoverRadius: 3,
            fill: false
        }
        ];

       
        chart.options={                    
                        scales: {
                            xAxes: [{
                                display: true,
                                ticks: {
                                    maxTicksLimit:20
                                    //userCallback: function (dataLabel, index) {
                                    //    return index % Math.ceil(chart.SourceData.length/10) === 0 ? dataLabel : '';
                                    //}
                                }
                            }],
                            yAxes: [{
                                display: true,
                                 ticks: {
                                    min: 0,
                                    suggestedMax: 50
                                },
                                beginAtZero: true
                            }]
                        }
                    } 

        chart.ChartType= "line";
        
        chart.Colors = [
            {
                backgroundColor: chartColors.lineBg,
                borderColor: chartColors.lineBorder,
                pointBackgroundColor: chartColors.linePointBg,
                pointBorderColor: chartColors.linePointBorder,
                pointHoverBackgroundColor: chartColors.linePointHoverBg,
                pointHoverBorderColor: chartColors.linePointHoverBorder
            }
        ];

    }


    refresh() {
        this.getHostDetail();
        this.getHostGraph();

    }

    BacktoComputeRes() {
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