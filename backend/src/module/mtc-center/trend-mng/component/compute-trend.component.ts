import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";
import {PlfModel, RegionModel, ZoneModel} from"../model/plf.model";
import {BasicModel, Percent}from "../model/basic.model";
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
    //平台联动列表
    defaultPlf: PlfModel = new PlfModel();
    selectedPlf: PlfModel = this.defaultPlf;
    defaultRegion: RegionModel = new RegionModel();
    selectedRegion: RegionModel = this.defaultRegion;
    defaultZone: ZoneModel = new ZoneModel();
    selectedZone: ZoneModel = this.defaultZone;

    plfList: Array<PlfModel>;
    basicList:Array<BasicModel>;

    ngOnInit() {
        this.getPlfList();
        this.getBasicList();
        this.showChart();
        //echarts: any = require('echarts')
        
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
                   
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    showChart(){
        var myChart = echarts.init(document.getElementById('mychart'));
        var option = {
            tooltip: {
                show: false,

            },
            legend: {
                data: ['邮件营销', '联盟广告', '视频广告']
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
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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

            series: [

                {
                    name: '邮件营销',
                    type: 'bar',
                    stack: '广告',
                    data: [120 / 1000, 132 / 1000, 101 / 1000, 134 / 1000, 90 / 1000, 230 / 1000, 210 / 1000],
                    label: {
                        normal: {
                            show: true,
                            formatter: function (value) {
                                return (value.data * 100).toFixed(1) + "%"
                            }
                        }
                    },
                    tooltip: {
                        formatter: '{b0}: {c0}<br />{b1}: {c1}'
                    }
                },

                {
                    name: '联盟广告',
                    type: 'bar',
                    stack: '广告',
                    data: [220 / 1000, 182 / 1000, 191 / 1000, 234 / 1000, 290 / 1000, 330 / 1000, 310 / 1000],
                    label: {
                        normal: {
                            show: true,
                            formatter: function (value) {
                                return (value.data * 100).toFixed(1) + "%"
                            }
                        }
                    }
                },

                {
                    name: '视频广告',
                    type: 'bar',
                    stack: '广告',
                    data: [150 / 1000, 232 / 1000, 201 / 1000, 154 / 1000, 190 / 1000, 330 / 1000, 410 / 1000],
                    label: {
                        normal: {
                            show: true,
                            formatter: function (value) {
                                return (value.data * 100).toFixed(1) + "%"
                            }
                        }
                    }
                },

                {
                    name: '总计',
                    type: 'line',
                    data: [ 0.49,0.55,0.49, 0.52, 0.57, 0.89, 0.93],
                    label: {
                        normal: {
                            show: true,
                            formatter: function (value) {

                                return (value.data * 1500).toFixed(0)
                            },
                            textStyle: {
                                color: "#000"
                            }
                        },

                    },
                    itemStyle: {
                        normal: {
                            color: "transparent"
                        }
                    },
                }
            ]
        };


        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
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