import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";
import { PlfModel, RegionModel, ZoneModel } from "../model/plf.model";
import { BasicModel, Percent } from "../model/basic.model";
import {GrowthRate, DateRate} from "../model/growth-rate.model";
import { Bar, ZoneBar, Item } from "../model/bar.model";
import { ComputeQuery } from "../model/compute-query.model";
import { GrowthRatelist_mock } from '../model/growth-rate-list.mock';
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


    showType:number;
    isSelected=false;
    hostId: string;

    queryOpt: ComputeQuery = new ComputeQuery();
    //平台联动列表
    defaultPlf: PlfModel = new PlfModel();
    selectedPlf: PlfModel = this.defaultPlf;
    defaultRegion: RegionModel = new RegionModel();
    selectedRegion: RegionModel = this.defaultRegion;
    defaultZone: ZoneModel = new ZoneModel();
    selectedZone: ZoneModel = this.defaultZone;

    plfList: Array<PlfModel>;
    cloudHostSpecList: Array<string>;
    basicList: Array<BasicModel>;
    growthRateList: Array<GrowthRate>;
    //growthRateList=GrowthRatelist_mock.resultContent;

    cpuData: Bar = new Bar();
    vmData: Bar = new Bar();
    memData: Bar = new Bar();

    ngOnInit() {
        this.queryOpt.queryType = "1";
        this.defaultPlf.platformId = 'all';
        this.defaultRegion.regionId = 'all';
        this.defaultZone.zoneId = 'all';
        this.queryOpt.flaovarId = '';
        this.getPlfList();
        this.getCloudHostSpec();
        
        this.reset();
        this.confirm();
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

    //获取云主机规格
    getCloudHostSpec() {
        this.layoutService.show();
        this.service.getCloudHostSpec()
            .then(
            response => {
                this.layoutService.hide();
                if (response && "100" == response["resultCode"]) {
                    this.cloudHostSpecList = response["resultContent"];                   
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //获取基本信息表格数据
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
        this.service.getCpuData(this.queryOpt)
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

    

    getMemData() {
        this.layoutService.show();
        this.service.getMemData(this.queryOpt)
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

    getDefaultflaovarId() {
        if (this.queryOpt.queryType == "2") {
            this.queryOpt.flaovarId = 'all';
        }
        else {
            this.queryOpt.flaovarId = '';
        }
    }

    getQuery() {
        this.queryOpt.platformId = this.selectedPlf.platformId;
        this.queryOpt.regionId = this.selectedRegion.regionId;
        
        if (this.selectedZone == this.defaultZone) {
            if (this.isSelected == false) {
                this.queryOpt.zoneId = 'all';
            }
            else {
                this.queryOpt.zoneId = 'each';
            }
        } else {
            this.queryOpt.zoneId = this.selectedZone.zoneId;
        }
    }

    confirm() {
        this.getQuery();
        if (this.queryOpt.queryType == "1") {
            this.showType = 1;
            
            this.getBasicList();
            this.getCpuData();

        } else if (this.queryOpt.queryType == "2") {
            this.showType = 2;
            this.layoutService.show();
            Promise.all([this.service.getGrowthRateList(this.queryOpt), this.service.getVmData(this.queryOpt)])
            .then((arr) =>{
                this.layoutService.hide();
                this.growthRateList= arr[0];
                this.vmData = arr[1];
                this.showChart(this.vmData, 2);
            }).catch((e) => this.onRejected(e));
            

        } else if (this.queryOpt.queryType == "3") {
            this.showType = 3;
           
            this.getBasicList();
            this.getMemData();
     
        }
    }

    reset() {
        
        this.selectedPlf=this.defaultPlf;
        this.selectedRegion=this.defaultRegion;
        this.selectedZone = this.defaultZone;
        
        this.queryOpt.powerStatus = '0';
       // this.queryOpt.flaovarId = 'all';
        this.queryOpt.period = '1';
    }

    showChart(chartData: Bar, showType: number) {
        let thx = chartData.thx;
        let zonesData = chartData.zone;
        if (zonesData[0].series.length==0) {
                this.showAlert("没有数据！");
                return;
            }

        for (let m = 0; m < zonesData.length; m++) {
            let sum = new Array<number>();
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
                                
                                if (value.data == 0) { return ""; }
                                else {
                                    return (value.data * 100).toFixed(1) + "%";
                                }
                                
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
                            
                            return (value.data * zonesData[m].total[value.dataIndex]).toFixed(0)+"GB";
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




            let option = {
                tooltip: {
                    show: true,

                },
                legend: {
                    data: TempLegend,
                    formatter: function (name) {
                        return echarts.format.truncateText(name.replace("主机规格:",""), 160, '14px Microsoft Yahei', '…');
                    }

                },
                grid: {
                    //top:'30%',
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

                                return (value * 100).toFixed(1) + "%";
                            }
                        }
                    }
                ],
                series: TempSeries
            };

           
                window.setTimeout(() => {
                    let myChart = echarts.init(document.getElementById(chartId));
                        myChart.setOption(option);
                    },
                    10);
          


        }


    } //函数结尾

    exportCurrent() {
        this.getQuery();

        //this.layoutService.show();
        this.service.exportCurrent(this.queryOpt);  
            //.then(
            //response => {
            //    this.layoutService.hide();
            //    if (response && 100 == response["resultCode"]) {
            //        console.log('export current');
            //    } else {
            //        this.showAlert("COMMON.OPERATION_ERROR");
            //    }
            //}
            //)
            //.catch((e) => this.onRejected(e));
    }

    exportAll() {
        this.layoutService.show();
        this.service.exportAll();  
            //.then(
            //response => {
            //    this.layoutService.hide();
            //    if (response && 100 == response["resultCode"]) {
            //        console.log('export current');
            //    } else {
            //        this.showAlert("COMMON.OPERATION_ERROR");
            //    }
            //}
            //)
            //.catch((e) => this.onRejected(e));
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