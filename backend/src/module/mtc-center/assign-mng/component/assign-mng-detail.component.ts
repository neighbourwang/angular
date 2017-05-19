import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";

import { chartColors } from "../../capacity-mng/model/color.mock";
import {EntModel, DeptModel} from"../model/ent.model";
import {PlfModel, RegionModel, ZoneModel} from"../model/plf.model";
import {UsageState, ItemModel, PowerStatModel, DoughnutChart}from "../model/usage-state.model";
import {Hyper} from "../model/hyper.model";
import {QueryModel} from "../model/query.model";
//service
import { AssignMngService } from "../service/assign-mng.service";

//详情页
import {HyperInfo} from "../model/hyper-info.model";
import {HyperGraph,GraphItem,LineChart}from "../model/hyper-graph.model";
import { AssignDetailService } from "../service/assign-detail.service";

@Component({
    selector: "assign-mng-detail",
    templateUrl: "../template/assign-mng-detail.html",
    styleUrls: ["../style/assign-mng.less"],
    providers: []
})
export class AssignMngDetailComponent implements OnInit {
    constructor(
        private service: AssignMngService,
        private service2: AssignDetailService,
        private router: Router,
        private layoutService: LayoutService,
        private validationService: ValidationService
    ) {
    }

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild('exportAllData')
    exportAllData: PopupComponent;

    noticeTitle = "";
    noticeMsg = "";
    

    queryOpt: QueryModel = new QueryModel();
    
    defaultEnt:EntModel = new EntModel();
    selectedEnt: EntModel = this.defaultEnt;
    defaultDept: DeptModel = new DeptModel();
    selectedDept: DeptModel = this.defaultDept;

    defaultPlf: PlfModel = new PlfModel();
    
    selectedPlf: PlfModel = this.defaultPlf;
    defaultRegion: RegionModel = new RegionModel();
    selectedRegion: RegionModel = this.defaultRegion;
    defaultZone: ZoneModel = new ZoneModel();
    selectedZone: ZoneModel = this.defaultZone;

    entList: Array<EntModel>;
    plfList: Array<PlfModel>;
    cloudHostSpecList: Array<string>;
    
    cpuInfo: ItemModel = new ItemModel();
    memInfo: ItemModel = new ItemModel();
    powerStat: PowerStatModel = new PowerStatModel();
    flavor: Object = new Object();
    flavorName: Array<string>=new Array<string>();
    flavorValue: Array<number> = new Array<number>();
    pstName: Array<string>=new Array<string>();
    pstValue: Array<number>=new Array<number>();
    cpuCircle: DoughnutChart = new DoughnutChart(); //cpu环形图
    memCircle: DoughnutChart = new DoughnutChart(); //mem环形图
    hyperList: Array<Hyper>;

    flag=1;
    startDate: string;
    endDate: string;
    period = "1";

    showFirst=true;//切换两个页面
    //详情页变量
    Period="1";
    vmId: string;
    hyperInfo: HyperInfo = new HyperInfo();
    hyperGraph: HyperGraph = new HyperGraph();

    cpuList: Array<GraphItem>;
    memList: Array<GraphItem>;
    cpuLine = new LineChart();
    memLine = new LineChart();

    ngOnInit() {
        this.defaultEnt.enterpriseId = 'all';
        this.defaultDept.departmentId = 'all';
        this.defaultPlf.platformId = 'all';
        this.defaultRegion.regionId = 'all';
        this.defaultZone.zoneId = 'all';
        this.getEntList();
        this.getPlfList();
        this.getCloudHostSpec();
        console.log('云主机状态', this.service.powerStatusDic);
        console.log('period', this.service.peridDic);
        console.log('top', this.service.topDic);
        this.reset();
        this.getQuery();
        this.getUsageState();
        this.getHyperList();
    }

    //获取企业联动列表
    getEntList() {
        this.layoutService.show();
        this.service.getEntList()  
            .then(
            response => {
                this.layoutService.hide();
                if (response && "100" == response["resultCode"]) {
                    this.entList = response["resultContent"];
                   
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
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

    getCloudHostSpec() {
        this.layoutService.show();
        this.service.getCloudHostSpec()
            .then(
            response => {
                this.layoutService.hide();
                if (response && "100" == response["resultCode"]) {
                    this.cloudHostSpecList = response["resultContent"];
                    console.log("云主机规格",this.cloudHostSpecList)
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //获取环形图
    getUsageState() {
        this.layoutService.show();
        this.service.getUsageState(this.queryOpt)  //post 待完善
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.cpuInfo = response["resultContent"].cpu;
                    this.memInfo = response["resultContent"].mem;
                    this.powerStat = response["resultContent"].powerStat;
                    this.flavor = response["resultContent"].flavor;
                    let flv = this.flavor;
                    for (var f in flv) {
                        this.flavorName.push(f);
                        this.flavorValue.push(flv[f]);
                    }
                    let pst = this.powerStat;
                    for (var p in pst) {
                        this.pstName.push(p);
                        this.pstValue.push(pst[p]);
                    }
                    //数据处理
                    this.getGraphData(this.cpuCircle, this.cpuInfo);
                    this.getGraphData(this.memCircle, this.memInfo);
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    getGraphData(chart:DoughnutChart,source:ItemModel) {
        chart.DataSets = [{ data: [source.level1, source.level2, source.level3] }];
        chart.Colors = [{ backgroundColor: [chartColors.circleLegend1,chartColors.circleLegend2,chartColors.circleLegend3] }];
        chart.ChartType = "doughnut";
        chart.Options = {
            cutoutPercentage: 70,
            rotation: -1.2* Math.PI,
        }
    }

    //获取Hyper列表
    getHyperList() {
        this.layoutService.show();
        this.service.getHyperList(this.queryOpt)  //post 待完善
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.hyperList = response["resultContent"].computers;
                   
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //获取当前查询条件
    getQuery() {
       this.queryOpt.enterpriseId = this.selectedEnt.enterpriseId;
        this.queryOpt.departmentId = this.selectedDept.departmentId;
        this.queryOpt.platformId = this.selectedPlf.platformId;
        this.queryOpt.regionId = this.selectedRegion.regionId;
        this.queryOpt.zoneId = this.selectedZone.zoneId;
        console.log("query", this.queryOpt);
    }

    //确认
    confirm() {
        this.getQuery();
        this.getUsageState();
        this.getHyperList();
    }

    reset() {
        this.selectedEnt = this.defaultEnt;
        this.selectedDept= this.defaultDept;
        this.selectedPlf = this.defaultPlf;
        this.selectedRegion= this.defaultRegion;
        this.selectedZone = this.defaultZone;
        
        this.queryOpt.powerStatus = '0';
        this.queryOpt.flaovarId = 'all';
        this.queryOpt.rate = '1';
        this.queryOpt.top = 'all';
        this.queryOpt.period = '1';
    }

    //导出当前数据
    exportCurrent() {
        this.getQuery();
        this.layoutService.show();
        this.service.exportCurrent(this.queryOpt)  
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
        this.exportAllData.open("导出所有数据");
    }

    gotoAssignDetail(HyperId: string) {
        this.vmId = HyperId;
        this.showFirst = false;
        this.getHyperInfo();
        this.getHyperGraph();
    }

    //弹出框“导出所有数据”中的相关函数
    
    StartDateChange($event) {
        this.startDate=$event.formatted;
    }

    EndDateChange($event) {
        this.endDate=$event.formatted;
    }
   
    acceptExport() {
        if (!this.flag) {
            this.showAlert("请选择！");
            return;
        }
        if (this.flag == 2) {
            if ((!this.startDate) || (!this.endDate)) {
                this.showAlert("请选择时间范围！");
                return;
            }
            if (this.startDate >= this.endDate) {
                this.showAlert("开始日期必须小于结束日期！");
                return;
            }
        }
        this.layoutService.show();
        this.service.acceptExport(this.flag,this.startDate,this.endDate,this.period)  
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    console.log('export ');
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //超分管理详情相关函数
     getHyperInfo() {
        this.layoutService.show();
        this.service2.getHyperInfo(this.vmId, this.Period)  
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
        this.service2.getHyperGraph(this.vmId,this.Period)
            .then(
            response => {
                this.layoutService.hide();
                if (response && "100" == response["resultCode"]) {
                    this.cpuList = response["resultContent"].cpu;
                    this.memList = response["resultContent"].memory;
                    this.cpuLine.SourceData = this.cpuList;
                    this.memLine.SourceData = this.memList;
                    this.getLineGraph(this.cpuLine);
                    this.getLineGraph(this.memLine);
                    console.log("cpu_value", this.cpuLine.DataSets);
                    console.log("cpu_time", this.cpuLine.Labels);
                    console.log("mem_value", this.memLine.DataSets);
                    console.log("mem_time", this.memLine.Labels);
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //将源数据转化成折线图数据格式
    getLineGraph(chart: LineChart) {
        let temp_value = new Array<number>();
        let temp_time = new Array<any>();
        chart.SourceData.forEach((s)=>{
            temp_value.push(s.value);
            temp_time.push(s.time);
        })
        chart._data = temp_value;
        chart.Labels = temp_time;

        let _label="";
        if (chart == this.cpuLine) {
            _label = "CPU使用率";
        } else {
            _label = "内存使用率";
        }

        chart.DataSets = [{

            data: chart._data,
            label:_label,
            borderWidth: 2,
            pointBorderWidth: 0,
            pointRadius: 1,
            pointHoverRadius: 3,
            fill:false
        }
        ];

         chart.options={
                       
                        scales: {
                            xAxes: [{
                                display: true,
                                ticks: {
                                    userCallback: function(dataLabel, index) {
                                        return index % 10 === 0 ? dataLabel : '';
                                    }
                                }
                            }],
                            yAxes: [{
                                display: true,
                                ticks: {
                                    min: 0,
                                    suggestedMax: 50
                                },
                                beginAtZero: false
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
        this.getHyperInfo();
        this.getHyperGraph();
        
    }

    BacktoAssignMng() {
        this.showFirst = true;  
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
