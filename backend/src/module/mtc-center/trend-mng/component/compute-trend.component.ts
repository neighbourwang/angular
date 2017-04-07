import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";
import {PlfModel, RegionModel, ZoneModel} from"../model/plf.model";
import {BasicModel, Percent}from "../model/basic.model";
import {Bar, ZoneBar, Item} from"../model/bar.model";
import {ComputeQuery} from"../model/compute-query.model";
//service
import { ComputeTrendService } from "../service/compute-trend.service";
const echarts = require('echarts');
//git commit test
@Component({
    selector: "compute-trend",
    templateUrl: "../template/compute-trend.html",
    styleUrls: [],
    providers: []
})
export class ComputeTrendComponent implements OnInit {
    constructor(
        private service: ComputeTrendService,
        private router: Router,
        private layoutService: LayoutService,
        private validationService: ValidationService
    ) {
        
    }

    @ViewChild("notice")
    notice: NoticeComponent;

    noticeTitle = "";
    noticeMsg = "";

    
    showType = 1;
    isSelected: boolean;

    queryOpt: ComputeQuery = new ComputeQuery();
    //平台联动列表
    defaultPlf: PlfModel = new PlfModel();
    selectedPlf: PlfModel = this.defaultPlf;
    defaultRegion: RegionModel = new RegionModel();
    selectedRegion: RegionModel = this.defaultRegion;
    defaultZone: ZoneModel = new ZoneModel();
    selectedZone: ZoneModel = this.defaultZone;

    plfList: Array<PlfModel>;
    basicList: Array<BasicModel>;
    
    cpuData: Bar=new Bar();
    vmData:Bar=new Bar();
    memData: Bar = new Bar();
    
    ngOnInit() {
        this.getPlfList();
         this.reset();
        
      
    }

    //获取平台联动列表
    getPlfList() {
        this.layoutService.show();
        this.service.getPlfList()  
            .then(
            response => {
                this.layoutService.hide();
                if (response && "100" == response["resultCode"]) {
                    this.plfList = response["resultContent"];
                   
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    
    getBasicList() {
        this.layoutService.show();
        this.service.getBasicList(this.queryOpt)  
            .then(
            response => {
                this.layoutService.hide();
                if (response && "100" == response["resultCode"]) {
                    this.basicList = response["resultContent"].zones;
                    console.log("基本信息", this.basicList);
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }
    

    getCpuData() {
        this.layoutService.show();
        this.service.getCpuData()  
            .then(
            response => {
                this.layoutService.hide();
                if (response && "100" == response["resultCode"]) {
                    this.cpuData = response["resultContent"];
                    console.log("cpuData", this.cpuData);
                    this.showChart(this.cpuData, 1);
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    getVmData() {
        this.layoutService.show();
        this.service.getVmData()  
            .then(
            response => {
                this.layoutService.hide();
                if (response && "100" == response["resultCode"]) {
                    this.vmData = response["resultContent"];
                    console.log("vmData", this.vmData);
                    this.showChart(this.vmData, 2);
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    getMemData() {
        this.layoutService.show();
        this.service.getMemData()  
            .then(
            response => {
                this.layoutService.hide();
                if (response && "100" == response["resultCode"]) {
                    this.memData = response["resultContent"];
                    console.log("memData", this.memData);
                    this.showChart(this.memData, 3);
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    confirm() {
        this.queryOpt.platformId = this.selectedPlf.platformId;
        this.queryOpt.regionId = this.selectedRegion.regionId;
        this.queryOpt.zoneId = this.selectedZone.zoneId;
        if (this.queryOpt.queryType == "1") {
            this.showType = 1;
            this.getBasicList();
        
            this.getCpuData();
        
            //this.showChart(this.cpuData, 1);
        } else if (this.queryOpt.queryType == "2") {
            this.showType = 2;
            this.getVmData();
       
           // this.showChart(this.vmData, 2);
        }else if (this.queryOpt.queryType == "3") {
            this.showType = 3;
            this.getBasicList();     
            this.getMemData();
            //this.showChart(this.memData, 3);
        
        }
    }

    reset() {
        this.queryOpt.queryType = "1";
        this.queryOpt.platformId = this.defaultPlf.platformId;
        this.queryOpt.regionId = this.defaultRegion.regionId;
        this.queryOpt.zoneId = this.defaultZone.zoneId;
        this.queryOpt.powerStatus = 'start';
        this.queryOpt.flaovarId = 'all';
        this.queryOpt.period = '1';
    }

    showChart(chartData:Bar,showType:number) {       
        let thx = chartData.thx;
        let zonesData = chartData.zone;
        let sum = new Array<number>();
        
        for (let m = 0; m < zonesData.length; m++) {
            let TempSeries = new Array<any>();
            let TempLegend = new Array<string>();
            let chartId = '';
            if (showType == 1) {
                chartId = 'cpuchart' + m;
            } else if (showType == 2) {
                chartId = 'vmchart' + m;
            } else if (showType == 3) {
                chartId = 'memchart' + m;
            }

                
            //获取第m个可用区的series
            let zoneSeries = zonesData[m].series;
            let dataLength = zoneSeries[0].data.length;
            //获取‘总计’数据
            for (let i = 0; i < dataLength; i++) {
                sum[i] = 0;
                for (let j = 0; j < zoneSeries.length; j++) {
                    sum[i] += zoneSeries[j].data[i];
                }
            }
            console.log("sum", sum);

            for (let k = 0; k < zoneSeries.length; k++) {
            TempLegend.push(zoneSeries[k].name);
            TempSeries.push({
                name: zoneSeries[k].name,
                type: 'bar',
                stack: '广告',
                data: zoneSeries[k].data,
                label: {
                    normal: {
                        show: true,
                        formatter: function (value) {
                            return (value.data * 100).toFixed(1) + "%"
                        }
                    }
                }
            });
            }

            TempSeries.push({
                name: '总计',
                type: 'line',
                
                data: sum,
                label: {
                    normal: {
                        show: true,
                        formatter: function (value) {                         
                                return (value.data * 1000).toFixed(0);
                            
                        },
                        textStyle: {
                                color: "#000"
                        }
                    }
                },
                itemStyle: {
                        normal: {
                            color: "transparent"
                        }
                }
            });

            var myChart = echarts.init(document.getElementById(chartId));
            var option = {
            tooltip: {
                show: false,

            },
            legend: {
                data: TempLegend
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: thx
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: function (value, index) {

                            return value * 100 + "%"
                        }
                    }
                }
            ],
            series:TempSeries           
            };
             myChart.setOption(option);

       }
        
      
    } //函数结尾

    
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