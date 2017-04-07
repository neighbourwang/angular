import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";

import {EntModel, DeptModel} from"../model/ent.model";
import {PlfModel, RegionModel, ZoneModel} from"../model/plf.model";
import {UsageState, ItemModel, PowerStatModel, FlavorModel,DoughnutChart}from "../model/usage-state.model";
import {Hyper} from "../model/hyper.model";
import {QueryModel} from "../model/query.model";
//service
import { AssignMngService } from "../service/assign-mng.service";


@Component({
    selector: "assign-mng",
    templateUrl: "../template/assign-mng.html",
    styleUrls: ["../style/assign-mng.less"],
    providers: []
})
export class AssignMngComponent implements OnInit {
    constructor(
        private service: AssignMngService,
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
    
    cpuInfo: ItemModel = new ItemModel();
    memInfo: ItemModel = new ItemModel();
    powerStat: PowerStatModel = new PowerStatModel();
    flavor:FlavorModel = new FlavorModel();
    cpuChart: DoughnutChart = new DoughnutChart(); //cpu环形图
    memChart: DoughnutChart = new DoughnutChart(); //mem环形图
    hyperList: Array<Hyper>;

    flag: number;
    startDate: string;
    endDate: string;
    period="1";

    ngOnInit() {
        this.getEntList();
        this.getPlfList();
        
        this.reset();
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

                    //数据处理
                    this.getGraphData(this.cpuChart, this.cpuInfo);
                    this.getGraphData(this.memChart, this.memInfo);
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    getGraphData(chart:DoughnutChart,source:ItemModel) {
        chart.DataSets = [{ data: [source.level1, source.level2, source.level3] }];
        chart.Colors = [{ backgroundColor: ["#2bd2c8","#05ab83","#c9cacc"] }];
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

    //确认
    confirm() {
        this.queryOpt.enterpriseID = this.selectedEnt.enterpriseId;
        this.queryOpt.departmentId = this.selectedDept.departmentId;
        this.queryOpt.platformId = this.selectedPlf.platformId;
        this.queryOpt.regionId = this.selectedRegion.region;
        this.queryOpt.zoneId = this.selectedZone.zoneId;
        console.log("query", this.queryOpt);
        this.getUsageState();
        this.getHyperList();
    }

    reset() {
        this.selectedEnt = this.defaultEnt;
        this.selectedDept= this.defaultDept;
        this.selectedPlf = this.defaultPlf;
        this.selectedRegion= this.defaultRegion;
        this.selectedZone = this.defaultZone;
        this.queryOpt.enterpriseID = 'all';
        this.queryOpt.departmentId = 'all';
        this.queryOpt.platformId = 'all';
        this.queryOpt.regionId = 'all';
        this.queryOpt.zoneId = 'all';
        this.queryOpt.powerStatus = 'start';
        this.queryOpt.flaovarId = 'all';
        this.queryOpt.rate = '1';
        this.queryOpt.top = '1';
        this.queryOpt.period = '1';
    }

    exportCurrent() {
        this.layoutService.show();
        this.service.exportCurrent(this.queryOpt)  //post 待完善
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    console.log('export current');
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }
    exportAll() {
        this.exportAllData.open("导出所有数据");
    }

    gotoAssignDetail(HyperId:string) {
        this.router.navigate([`mtc-center/assign-mng/assign-detail`,
            {
                "wm_Id":HyperId
            }
        ]);
    }

    //弹出框“导出所有数据”中的相关函数
    selectFirst() {
        this.flag = 1;
    }
    selectSecond() {
        this.flag = 2;
    }
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