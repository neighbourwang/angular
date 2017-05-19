import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";
import { PlfModel, RegionModel, ZoneModel } from "../model/plf.model";
import {StoreQuery} from "../model/store-query.model";
import {GeneralModel, zoneDisk, DoughnutChart} from "../model/general.model";
import { Bar, ZoneBar, Item } from "../model/bar.model";
//service
import { StoreTrendService } from "../service/store-trend.service";
const echarts = require('echarts');

@Component({
    selector: "store-trend",
    templateUrl: "../template/store-trend.html",
    styleUrls: [],
    providers: []
})
export class StoreTrendComponent implements OnInit {
    constructor(
        private service: StoreTrendService ,
        private router: Router,
        private layoutService: LayoutService,
        private validationService: ValidationService
    ) {
    }

    @ViewChild("notice")
    notice: NoticeComponent;

    noticeTitle = "";
    noticeMsg = "";

    isSelected=false;
    queryOpt: StoreQuery = new StoreQuery();
    //平台联动列表
    defaultPlf: PlfModel = new PlfModel();
    selectedPlf: PlfModel = this.defaultPlf;
    defaultRegion: RegionModel = new RegionModel();
    selectedRegion: RegionModel = this.defaultRegion;
    defaultZone: ZoneModel = new ZoneModel();
    selectedZone: ZoneModel = this.defaultZone;

    plfList: Array<PlfModel>;
    general: GeneralModel=new GeneralModel();
    zoneDiskList: Array<zoneDisk>;
    diskCircle: DoughnutChart = new DoughnutChart();
    barData: Bar = new Bar();

    ngOnInit() {
        this.defaultPlf.platformId = 'all';
        this.defaultRegion.regionId = 'all';
        this.defaultZone.zoneId = 'all';
        this.reset();
        this.getPlfList();
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
        this.getGeneral();
        this.getBarData();
    }
    reset() {
        this.selectedPlf=this.defaultPlf;
        this.selectedRegion=this.defaultRegion;
        this.selectedZone = this.defaultZone;
        this.queryOpt.diskStatus = '1';
        this.queryOpt.diskSize = '1';
        this.queryOpt.period = '1';
    }

    getGeneral() {
        this.layoutService.show();
        this.service.getGeneral(this.queryOpt)
            .then(
            response => {
                this.layoutService.hide();
                if (response && "100" == response["resultCode"]) {
                    this.general = response["resultContent"];
                    this.zoneDiskList = response["resultContent"].zones;
                    this.getCircleData(this.diskCircle, this.general);
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    getCircleData(chart:DoughnutChart,source:GeneralModel) {
        chart.DataSets = [{ data: [source.level1, source.level2,source.level3, source.level4,source.level5]}];
        chart.Colors = [{ backgroundColor: ["#2bd2c8","#05ab83","#c9cacc","#85f46f","#fa88ec"] }];
        chart.ChartType = "doughnut";
        chart.Options = {
            cutoutPercentage: 70,
            rotation: -1.2* Math.PI,
        }
    }

    getBarData() {
        this.layoutService.show();
        this.service.getBarData(this.queryOpt)
            .then(
            response => {
                this.layoutService.hide();
                if (response && "100" == response["resultCode"]) {
                    this.barData = response["resultContent"];
                    
                    this.showChart(this.barData);
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    showChart(chartData: Bar) {
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
            let chartId = 'chart' + m;
            

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
                    show: true

                },
                legend: {
                    data: TempLegend,
                    formatter: function (name) {
                        return echarts.format.truncateText(name.replace("主机规格:",""), 160, '14px Microsoft Yahei', '…');
                    },
                    tooltip: {
                     show: true
                    }
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