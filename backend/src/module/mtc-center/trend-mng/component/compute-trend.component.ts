import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";
import {PlfModel, RegionModel, ZoneModel} from"../model/plf.model";
import {BasicModel, Percent}from "../model/basic.model";
import {BarItem} from"../model/bar-item.model";
//service
import { ComputeTrendService } from "../service/compute-trend.service";
const echarts = require('echarts');

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

    analysisType = "1";
    isSelected: boolean;
    //平台联动列表
    defaultPlf: PlfModel = new PlfModel();
    selectedPlf: PlfModel = this.defaultPlf;
    defaultRegion: RegionModel = new RegionModel();
    selectedRegion: RegionModel = this.defaultRegion;
    defaultZone: ZoneModel = new ZoneModel();
    selectedZone: ZoneModel = this.defaultZone;

    plfList: Array<PlfModel>;
    basicList: Array<BasicModel>;
    legendList: Array<string>;
    cpuData: Array<BarItem>;
    legendLen: number;
    cpuLen: number;

    ngOnInit() {
        this.getPlfList();
        this.getBasicList();
        this.getLegend();
        this.getCpuData();
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

    //post 待完善
    getBasicList() {
        this.layoutService.show();
        this.service.getBasicList()  
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
    

    getLegend() {
        this.layoutService.show();
        this.service.getLegend()  
            .then(
            response => {
                this.layoutService.hide();
                if (response && "100" == response["resultCode"]) {
                    this.legendList = response["resultContent"];
                    console.log("legend", this.legendList);
                    this.legendLen = this.legendList.length;
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
                    this.cpuLen = this.cpuData.length;
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    showChart() {
        let ar = [[1, 23], [3, 4]];
        
        let cpuSeries= new Array<any>();
        let finalData = new Array<any>();
        
        let cpuTemp = this.cpuData;
        let final1 = new Array<any>();
        let final2 = new Array<any>();
        let final3 = new Array<any>();
        let final4 = new Array<any>();
        let final5 = new Array<any>();
        let final6 = new Array<any>();
        for (let i = 0; i < this.cpuLen; i++) {
           
            final1.push(cpuTemp[i]._2Core);
            final2.push(cpuTemp[i]._4Core);           
            final3.push(cpuTemp[i]._8Core);
            final4.push(cpuTemp[i]._16Core);
            final5.push(cpuTemp[i]._32Core);
            final6.push(cpuTemp[i].Total);
        }
        finalData[0] = final1;
        finalData[1] = final2;
        finalData[2]=final3;
        finalData[3]=final4;
        finalData[4] = final5;
        finalData[5]=final6;
        let j = 0;
        for (; j < this.legendLen; j++) {
            cpuSeries.push({
                name: this.legendList[j],
                type: 'bar',
                stack: '广告',
                data: finalData[j],
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
        cpuSeries.push({
                name: '总计',
                type: 'line',
                
                data: finalData[j],
                label: {
                    normal: {
                        show: true,
                        formatter: function (value) {
                            return (value.data * 1000).toFixed(0) 
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

        var myChart = echarts.init(document.getElementById('mychart'));
        var option = {
            tooltip: {
                show: false,

            },
            legend: {
                data: ['2Core', '4Core', '8Core','16Core','32Core']
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
                    data: ['2017-01', '2017-02', '2017-03', '2017-04']
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
            series:cpuSeries           
        };


        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    } //函数结尾

    confirm() {
        if (this.analysisType == "2") {
        
        this.showChart();
        }
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